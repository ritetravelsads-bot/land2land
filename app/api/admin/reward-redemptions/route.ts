import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ensureRewardIndexes, parseRewardId, RewardError } from "@/lib/reward-system"
import { adjustAgentCredits, runAgentTransaction } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const rows = await db.collection("reward_redemptions").aggregate([
      { $sort: { created_at: -1 } }, { $limit: 100 },
      { $lookup: { from: "users", localField: "agent_id", foreignField: "_id", as: "agent" } },
      { $project: { redemption_id: 1, points_requested: 1, posting_credits_requested: 1, status: 1, created_at: 1, failure_reason: 1, agent_name: { $ifNull: [{ $arrayElemAt: ["$agent.username", 0] }, "Agent"] } } },
    ]).toArray()
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json({ error: "Failed to load redemption requests." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  let redemptionId: ObjectId
  let action: string
  let reason: string
  try {
    const body = await request.json()
    redemptionId = parseRewardId(String(body.id || ""))
    action = body.action
    reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 1000) : ""
    if (!["approve", "reject"].includes(action)) throw new RewardError("Choose approve or reject.")
    if (action === "reject" && !reason) throw new RewardError("A rejection reason is required.")
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request." }, { status: error instanceof RewardError ? error.status : 400 })
  }

  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    if (action === "reject") {
      await runAgentTransaction(async (transactionDb, session) => {
        const redemption = await transactionDb.collection("reward_redemptions").findOne({ _id: redemptionId }, { session })
        if (!redemption) throw new RewardError("Redemption not found.", 404)
        if (redemption.status !== "pending") throw new RewardError("Only pending requests can be rejected.", 409)
        const account = await transactionDb.collection("agent_reward_accounts").findOne({ agent_id: redemption.agent_id }, { session })
        const before = Number(account?.available_points || 0)
        const released = await transactionDb.collection("agent_reward_accounts").updateOne({ agent_id: redemption.agent_id, pending_points: { $gte: redemption.points_requested } }, { $inc: { available_points: redemption.points_requested, pending_points: -redemption.points_requested }, $set: { updated_at: new Date() } }, { session })
        if (released.modifiedCount !== 1) throw new RewardError("Reserved points could not be reconciled.", 409)
        const now = new Date()
        await transactionDb.collection("reward_transactions").insertOne({ transaction_id: new ObjectId().toHexString(), agent_id: redemption.agent_id, type: "redemption_reversed", points: redemption.points_requested, balance_before: before, balance_after: before + redemption.points_requested, reference_type: "redemption", reference_id: redemption._id, description: "Points released after redemption rejection", reason, created_by: admin._id, idempotency_key: `redemption-reject:${redemption.redemption_id}`, created_at: now }, { session })
        await transactionDb.collection("reward_redemptions").updateOne({ _id: redemption._id, status: "pending" }, { $set: { status: "rejected", rejection_reason: reason, approved_by: admin._id, processed_at: now, updated_at: now } }, { session })
        await transactionDb.collection("admin_activity").insertOne({ actor_id: admin._id, actor_role: "admin", action: "reward_redemption_rejected", target_type: "reward_redemption", target_id: redemption._id, reason, created_at: now }, { session })
      })
      return NextResponse.json({ success: true, status: "rejected" })
    }

    const redemption = await runAgentTransaction(async (transactionDb, session) => {
      const current = await transactionDb.collection("reward_redemptions").findOne({ _id: redemptionId }, { session })
      if (!current) throw new RewardError("Redemption not found.", 404)
      if (current.status === "completed") return current
      if (current.status !== "pending" && current.status !== "processing") throw new RewardError("This redemption cannot be approved in its current state.", 409)
      const now = new Date()
      await transactionDb.collection("reward_redemptions").updateOne({ _id: current._id, status: current.status }, { $set: { status: "processing", approved_by: admin._id, approved_at: current.approved_at || now, updated_at: now } }, { session })
      return current
    })
    if (redemption.status === "completed") return NextResponse.json({ success: true, status: "completed" })

    try {
      const quotaResult = await adjustAgentCredits({ agentId: redemption.agent_id.toHexString(), actorId: admin._id, action: "grant", amount: redemption.posting_credits_requested, note: `Rewards redemption ${redemption.redemption_id}`, idempotencyKey: `reward-redemption:${redemption.redemption_id}` })
      await runAgentTransaction(async (transactionDb, session) => {
        const latest = await transactionDb.collection("reward_redemptions").findOne({ _id: redemptionId }, { session })
        if (latest?.status === "completed") return true
        if (latest?.status !== "processing") throw new RewardError("Redemption state changed before completion.", 409)
        const account = await transactionDb.collection("agent_reward_accounts").findOne({ agent_id: redemption.agent_id }, { session })
        const balance = Number(account?.available_points || 0)
        const settled = await transactionDb.collection("agent_reward_accounts").updateOne({ agent_id: redemption.agent_id, pending_points: { $gte: redemption.points_requested } }, { $inc: { pending_points: -redemption.points_requested, lifetime_redeemed_points: redemption.points_requested }, $set: { updated_at: new Date() } }, { session })
        if (settled.modifiedCount !== 1) throw new RewardError("Reserved points could not be settled.", 409)
        const now = new Date()
        await transactionDb.collection("reward_redemptions").updateOne({ _id: redemptionId, status: "processing" }, { $set: { status: "completed", quota_transaction_reference: quotaResult.success ? "issued" : "issued", processed_at: now, updated_at: now } }, { session })
        await transactionDb.collection("admin_activity").insertOne({ actor_id: admin._id, actor_role: "admin", action: "reward_redemption_processed", target_type: "reward_redemption", target_id: redemptionId, after: { credits: redemption.posting_credits_requested, balance }, created_at: now }, { session })
        return true
      })
      return NextResponse.json({ success: true, status: "completed" })
    } catch {
      await db.collection("reward_redemptions").updateOne({ _id: redemptionId, status: "processing" }, { $set: { failure_reason: "Credit issuance needs retry or administrator reconciliation.", updated_at: new Date() } })
      return NextResponse.json({ error: "Credit issuance did not complete. The request is safely marked for retry; reserved points remain held." }, { status: 409 })
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof RewardError ? error.message : "Unable to process redemption." }, { status: error instanceof RewardError ? error.status : 500 })
  }
}
