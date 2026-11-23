import { ObjectId, type Db } from "mongodb"
import { runAgentTransaction } from "@/lib/agent-subscriptions"

export class RewardError extends Error {
  status: number
  constructor(message: string, status = 400) {
    super(message)
    this.status = status
  }
}

export function parseRewardId(value: string) {
  if (!ObjectId.isValid(value)) throw new RewardError("Invalid resource ID.", 400)
  return new ObjectId(value)
}

export async function ensureRewardIndexes(db: Db) {
  await Promise.all([
    db.collection("reward_tasks").createIndex({ status: 1, start_at: 1, end_at: 1 }),
    db.collection("reward_task_submissions").createIndex({ task_id: 1, agent_id: 1, status: 1 }),
    db.collection("reward_task_submissions").createIndex({ task_id: 1, agent_id: 1 }, { unique: true, partialFilterExpression: { status: "pending" } }),
    db.collection("agent_reward_accounts").createIndex({ agent_id: 1 }, { unique: true }),
    db.collection("reward_transactions").createIndex({ transaction_id: 1 }, { unique: true }),
    db.collection("reward_transactions").createIndex({ idempotency_key: 1 }, { unique: true, partialFilterExpression: { idempotency_key: { $type: "string" } } }),
    db.collection("reward_redemptions").createIndex({ redemption_id: 1 }, { unique: true }),
    db.collection("reward_redemptions").createIndex({ idempotency_key: 1 }, { unique: true, partialFilterExpression: { idempotency_key: { $type: "string" } } }),
  ])
}

export async function getAgentRewardOverview(db: Db, agentId: ObjectId) {
  await ensureRewardIndexes(db)
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const [account, transactions, submissions, tasks, settings, redemptions, monthlyTotals] = await Promise.all([
    db.collection("agent_reward_accounts").findOne({ agent_id: agentId }),
    db.collection("reward_transactions").find({ agent_id: agentId }).sort({ created_at: -1 }).limit(50).toArray(),
    db.collection("reward_task_submissions").find({ agent_id: agentId }).sort({ updated_at: -1 }).limit(50).toArray(),
    db.collection("reward_tasks").find({ status: "active", $and: [{ $or: [{ start_at: { $exists: false } }, { start_at: { $lte: new Date() } }] }, { $or: [{ end_at: { $exists: false } }, { end_at: null }, { end_at: { $gte: new Date() } }] }, { $or: [{ assignment_type: "all" }, { assigned_agent_ids: agentId }, { assigned_agent_ids: agentId.toHexString() }] }] }).sort({ priority: -1, created_at: -1 }).limit(50).toArray(),
    db.collection<{ _id: string; points_per_posting_credit?: number; minimum_redemption_points?: number; approval_required?: boolean }>("reward_settings").findOne({ _id: "default" }),
    db.collection("reward_redemptions").find({ agent_id: agentId }).sort({ created_at: -1 }).limit(50).toArray(),
    db.collection("reward_transactions").aggregate([{ $match: { agent_id: agentId, points: { $gt: 0 }, created_at: { $gte: monthStart } } }, { $group: { _id: null, total: { $sum: "$points" } } }]).toArray(),
  ])
  return { account: account || { available_points: 0, pending_points: 0, lifetime_earned_points: 0, lifetime_redeemed_points: 0 }, transactions, submissions, tasks, settings: settings || { points_per_posting_credit: 0, minimum_redemption_points: 0, approval_required: true }, redemptions, points_earned_this_month: Number(monthlyTotals[0]?.total || 0) }
}

export async function approveRewardSubmission(submissionId: ObjectId, actorId: ObjectId, action: "approved" | "rejected" | "revision_requested", feedback = "") {
  return runAgentTransaction(async (db, session) => {
    await ensureRewardIndexes(db)
    const submission = await db.collection("reward_task_submissions").findOne({ _id: submissionId }, { session })
    if (!submission) throw new RewardError("Submission not found.", 404)
    if (submission.status !== "pending" && submission.status !== "revision_requested") throw new RewardError("This submission has already been reviewed.", 409)
    const task = await db.collection("reward_tasks").findOne({ _id: submission.task_id }, { session })
    if (!task) throw new RewardError("Task not found.", 404)
    const now = new Date()
    if (action === "approved") {
      const points = Number(task.points)
      if (!Number.isInteger(points) || points < 1) throw new RewardError("Task reward is invalid.", 409)
      const key = `task-approval:${submission._id.toHexString()}`
      const existing = await db.collection("reward_transactions").findOne({ idempotency_key: key }, { session })
      if (existing) throw new RewardError("Points have already been awarded for this submission.", 409)
      await db.collection("agent_reward_accounts").updateOne({ agent_id: submission.agent_id }, { $setOnInsert: { available_points: 0, pending_points: 0, lifetime_earned_points: 0, lifetime_redeemed_points: 0, created_at: now }, $set: { updated_at: now } }, { upsert: true, session })
      const account = await db.collection("agent_reward_accounts").findOne({ agent_id: submission.agent_id }, { session })
      const before = Number(account?.available_points || 0)
      await db.collection("agent_reward_accounts").updateOne({ agent_id: submission.agent_id }, { $inc: { available_points: points, lifetime_earned_points: points }, $set: { updated_at: now } }, { session })
      await db.collection("reward_transactions").insertOne({ transaction_id: new ObjectId().toHexString(), agent_id: submission.agent_id, type: "earned", points, balance_before: before, balance_after: before + points, reference_type: "task_submission", reference_id: submission._id, description: `Approved task: ${task.title}`, created_by: actorId, idempotency_key: key, created_at: now }, { session })
    }
    const update: Record<string, unknown> = { $set: { status: action, reviewed_by: actorId, reviewed_at: now, admin_feedback: feedback.slice(0, 2000), awarded_points: action === "approved" ? Number(task.points) : 0, updated_at: now } }
    if (action === "revision_requested") update.$push = { revision_history: { submission_text: submission.submission_text, proof_files: submission.proof_files || [], feedback: feedback.slice(0, 2000), reviewed_by: actorId, reviewed_at: now } }
    const result = await db.collection("reward_task_submissions").updateOne({ _id: submission._id, status: submission.status }, update, { session })
    if (result.modifiedCount !== 1) throw new RewardError("Submission changed while being reviewed. Refresh and retry.", 409)
    await db.collection("admin_activity").insertOne({ actor_id: actorId, actor_role: "admin", action: `reward_submission_${action}`, target_type: "reward_task_submission", target_id: submission._id, reason: feedback.slice(0, 2000), created_at: now }, { session })
    return { success: true, status: action }
  })
}

export async function adjustRewardPoints(agentId: ObjectId, actorId: ObjectId, action: "grant" | "deduct", points: number, reason: string) {
  if (!Number.isSafeInteger(points) || points < 1 || !reason.trim()) throw new RewardError("Enter a positive whole number of points and a reason.")
  return runAgentTransaction(async (db, session) => {
    await ensureRewardIndexes(db)
    const agent = await db.collection("users").findOne({ _id: agentId, user_type: "associate" }, { session })
    if (!agent) throw new RewardError("Agent not found.", 404)
    const now = new Date()
    await db.collection("agent_reward_accounts").updateOne({ agent_id: agentId }, { $setOnInsert: { available_points: 0, pending_points: 0, lifetime_earned_points: 0, lifetime_redeemed_points: 0, created_at: now }, $set: { updated_at: now } }, { upsert: true, session })
    const account = await db.collection("agent_reward_accounts").findOne({ agent_id: agentId }, { session })
    const before = Number(account?.available_points || 0)
    if (action === "deduct" && before < points) throw new RewardError("The agent does not have enough available points.", 409)
    const delta = action === "grant" ? points : -points
    await db.collection("agent_reward_accounts").updateOne({ agent_id: agentId, available_points: before }, { $inc: { available_points: delta, ...(action === "grant" ? { lifetime_earned_points: points } : { lifetime_deducted_points: points }) }, $set: { updated_at: now } }, { session })
    await db.collection("reward_transactions").insertOne({ transaction_id: new ObjectId().toHexString(), agent_id: agentId, type: action === "grant" ? "admin_adjustment" : "deduction", points: delta, balance_before: before, balance_after: before + delta, description: reason.trim().slice(0, 500), reason: reason.trim().slice(0, 2000), created_by: actorId, idempotency_key: `admin-adjustment:${new ObjectId().toHexString()}`, created_at: now }, { session })
    await db.collection("admin_activity").insertOne({ actor_id: actorId, actor_role: "admin", action: `reward_points_${action}`, target_type: "agent_reward_account", target_id: agentId, before: { available_points: before }, after: { available_points: before + delta }, reason: reason.trim().slice(0, 2000), created_at: now }, { session })
    return { available_points: before + delta }
  })
}
