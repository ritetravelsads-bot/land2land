import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ensureRewardIndexes, RewardError } from "@/lib/reward-system"
import { runAgentTransaction } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  const agent = await getCurrentUser()
  if (!agent || agent.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const credits = Number(body.posting_credits)
    if (!Number.isSafeInteger(credits) || credits < 1 || credits > 100) throw new RewardError("Choose between 1 and 100 posting credits.")
    const idempotencyKey = typeof body.idempotency_key === "string" && /^[a-zA-Z0-9_-]{8,100}$/.test(body.idempotency_key) ? body.idempotency_key : new ObjectId().toHexString()
    const result = await runAgentTransaction(async (db, session) => {
      await ensureRewardIndexes(db)
      const settings = await db.collection<{ _id: string; points_per_posting_credit?: number; minimum_redemption_points?: number; maximum_posting_credits?: number }>("reward_settings").findOne({ _id: "default" }, { session })
      const rate = Number(settings?.points_per_posting_credit)
      const minimum = Number(settings?.minimum_redemption_points ?? rate)
      const maximumCredits = Number(settings?.maximum_posting_credits ?? 100)
      if (!Number.isSafeInteger(rate) || rate < 1) throw new RewardError("Redemption is not configured.", 409)
      if (credits > maximumCredits) throw new RewardError("The requested credits exceed the configured limit.")
      const requiredPoints = credits * rate
      if (!Number.isSafeInteger(requiredPoints)) throw new RewardError("The requested redemption amount is too large.")
      if (requiredPoints < minimum) throw new RewardError("This request is below the minimum redemption amount.")
      const existing = await db.collection("reward_redemptions").findOne({ agent_id: agent._id, idempotency_key: idempotencyKey }, { session })
      if (existing) return { redemption: existing, duplicate: true }
      const account = await db.collection("agent_reward_accounts").findOne({ agent_id: agent._id }, { session })
      const before = Number(account?.available_points || 0)
      if (before < requiredPoints) throw new RewardError("Insufficient available points.", 409)
      const now = new Date()
      const redemptionId = new ObjectId().toHexString()
      const updated = await db.collection("agent_reward_accounts").updateOne({ agent_id: agent._id, available_points: { $gte: requiredPoints } }, { $inc: { available_points: -requiredPoints, pending_points: requiredPoints }, $set: { updated_at: now } }, { session })
      if (updated.modifiedCount !== 1) throw new RewardError("Your balance changed. Refresh and retry.", 409)
      const inserted = await db.collection("reward_redemptions").insertOne({ redemption_id: redemptionId, agent_id: agent._id, points_requested: requiredPoints, posting_credits_requested: credits, conversion_rate_snapshot: rate, status: "pending", idempotency_key: idempotencyKey, created_at: now, updated_at: now }, { session })
      await db.collection("reward_transactions").insertOne({ transaction_id: new ObjectId().toHexString(), agent_id: agent._id, type: "redemption_reserved", points: -requiredPoints, balance_before: before, balance_after: before - requiredPoints, reference_type: "redemption", reference_id: inserted.insertedId, description: `Reserved for ${credits} posting credits`, idempotency_key: `redemption-reserve:${redemptionId}`, created_at: now }, { session })
      return { redemption: { _id: inserted.insertedId, redemption_id: redemptionId, points_requested: requiredPoints, posting_credits_requested: credits, status: "pending" }, duplicate: false }
    })
    return NextResponse.json(result, { status: result.duplicate ? 200 : 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof RewardError ? error.message : "Unable to request redemption." }, { status: error instanceof RewardError ? error.status : 500 })
  }
}
