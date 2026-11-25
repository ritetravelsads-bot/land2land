import { ObjectId, type Db } from "mongodb"
import { runAgentTransaction } from "@/lib/agent-subscriptions"
import { ensureRewardIndexes } from "@/lib/reward-system"
import { getDatabase } from "@/lib/mongodb"

export const AUTOMATIC_REWARD_TASKS = [
  { task_key: "profile_complete", title: "Complete Your Profile", description: "Add your name and mobile number to your account profile.", category: "Profile", trigger: "profile_saved", points: 500, roles: ["associate"], verification_rule: "profile_complete", active: true },
  { task_key: "profile_photo", title: "Upload Profile Photo", description: "Add a profile photo to help clients recognize you.", category: "Profile", trigger: "profile_saved", points: 100, roles: ["associate"], verification_rule: "profile_photo", active: true },
  { task_key: "verify_mobile", title: "Verify Mobile Number", description: "Verify your mobile number using the one-time code.", category: "Profile", trigger: "mobile_verified", points: 200, roles: ["associate"], verification_rule: "mobile_verified", active: true },
  { task_key: "rera_approved", title: "Add RERA Details", description: "Submit valid RERA details and receive approval.", category: "Compliance", trigger: "rera_approved", points: 300, roles: ["associate"], verification_rule: "rera_approved", active: true },
  { task_key: "first_listing_approved", title: "Publish Your First Land Listing", description: "Get your first land listing approved and published.", category: "Listings", trigger: "listing_approved", points: 500, roles: ["associate"], verification_rule: "first_listing_approved", active: true },
] as const

export async function seedAutomaticRewardTasks(db: Db, actorId: ObjectId) {
  const now = new Date()
  await Promise.all(AUTOMATIC_REWARD_TASKS.map((task) => db.collection("automatic_reward_tasks").updateOne(
    { task_key: task.task_key },
    { $setOnInsert: { ...task, repeatable: false, max_rewards_per_user: 1, created_by: actorId, created_at: now, updated_at: now } },
    { upsert: true },
  )))
}

async function qualifies(db: Db, rule: string, user: any) {
  const userId = user._id instanceof ObjectId ? user._id : new ObjectId(String(user._id))
  if (rule === "profile_complete") return Boolean(String(user.display_name || user.username || "").trim().length >= 2 && String(user.email || "").includes("@") && /^[6-9]\d{9}$/.test(String(user.phone_number || "")))
  if (rule === "profile_photo") {
    if (typeof user.profile_picture !== "string") return false
    try {
      const photo = new URL(user.profile_picture)
      const imageEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
      if (!imageEndpoint || photo.protocol !== "https:" || photo.hostname !== new URL(imageEndpoint).hostname || !/(^|\/)avatars\//i.test(photo.pathname)) return false
      const response = await fetch(photo, { method: "HEAD", cache: "no-store", signal: AbortSignal.timeout(3000) })
      return response.ok && (response.headers.get("content-type") || "").startsWith("image/")
    } catch {
      return false
    }
  }
  if (rule === "mobile_verified") return user.phone_verified === true && user.verified_phone === user.phone_number && /^[6-9]\d{9}$/.test(String(user.phone_number || ""))
  if (rule === "rera_approved") {
    if (user.rera_required === false || user.rera_exempt === true) return false
    return Boolean(await db.collection("rera_requests").findOne({ associate: userId.toHexString(), status: "approved", rera_number: { $type: "string", $ne: "" } }))
  }
  if (rule === "first_listing_approved") {
    const count = await db.collection("listings").countDocuments({ associate: { $in: [userId, userId.toHexString()] }, review_status: "approved", deleted_at: { $exists: false } })
    return count === 1
  }
  return false
}

export async function creditAutomaticRewardsForEvent(userId: ObjectId, event: string) {
  const db = await getDatabase()
  const tasks = await db.collection("automatic_reward_tasks").find({ trigger: event, active: true }).project({ task_key: 1 }).toArray()
  return Promise.all(tasks.map((task) => creditAutomaticReward(userId, task.task_key, event)))
}

export async function creditAutomaticReward(userId: ObjectId, taskKey: string, sourceEvent: string) {
  const db = await getDatabase()
  await ensureRewardIndexes(db)
  return runAgentTransaction(async (db, session) => {
    const task = await db.collection("automatic_reward_tasks").findOne({ task_key: taskKey }, { session })
    const user = await db.collection("users").findOne({ _id: userId }, { session })
    if (!task || task.active !== true || !user || user.user_type !== "associate" || !Array.isArray(task.roles) || !task.roles.includes("associate")) return { credited: false, reason: "not_eligible" as const }
    const now = new Date()
    if ((task.start_at && new Date(task.start_at) > now) || (task.end_at && new Date(task.end_at) < now)) return { credited: false, reason: "outside_schedule" as const }
    if (!await qualifies(db, String(task.verification_rule || ""), user)) return { credited: false, reason: "condition_not_met" as const }
    const idempotencyKey = `automatic-reward:${task._id.toString()}:${userId.toHexString()}:once`
    const existing = await db.collection("reward_transactions").findOne({ idempotency_key: idempotencyKey }, { session })
    if (existing) return { credited: false, reason: "already_credited" as const, points: Number(existing.points || 0) }
    const points = Number(task.points)
    if (!Number.isSafeInteger(points) || points < 1) return { credited: false, reason: "invalid_configuration" as const }
    await db.collection("agent_reward_accounts").updateOne({ agent_id: userId }, { $setOnInsert: { available_points: 0, pending_points: 0, lifetime_earned_points: 0, lifetime_redeemed_points: 0, created_at: now }, $set: { updated_at: now } }, { upsert: true, session })
    const account = await db.collection("agent_reward_accounts").findOne({ agent_id: userId }, { session })
    const before = Number(account?.available_points || 0)
    const updated = await db.collection("agent_reward_accounts").updateOne({ agent_id: userId, available_points: before }, { $inc: { available_points: points, lifetime_earned_points: points }, $set: { updated_at: now } }, { session })
    if (updated.modifiedCount !== 1) throw new Error("Reward account changed during automatic credit")
    await db.collection("reward_transactions").insertOne({ transaction_id: new ObjectId().toHexString(), agent_id: userId, type: "automatic_credit", points, balance_before: before, balance_after: before + points, reference_type: "automatic_reward_task", reference_id: task._id, task_id: task._id, task_key: taskKey, task_title_snapshot: task.title, description: `Automatic reward: ${task.title}`, source_event: sourceEvent, credit_status: "credited", idempotency_key: idempotencyKey, created_at: now }, { session })
    await db.collection("automatic_reward_completions").updateOne({ user_id: userId, task_id: task._id }, { $setOnInsert: { user_id: userId, task_id: task._id, task_key: taskKey, task_title_snapshot: task.title, points, source_event: sourceEvent, credited_at: now, status: "credited", idempotency_key: idempotencyKey } }, { upsert: true, session })
    await db.collection("agent_reward_accounts").updateOne({ agent_id: userId }, { $set: { updated_at: now } }, { session })
    return { credited: true, points, available_points: before + points, task_title: task.title }
  })
}

export async function getAutomaticRewardTasks(db: Db, user: any) {
  await ensureRewardIndexes(db)
  const userId = user._id instanceof ObjectId ? user._id : new ObjectId(String(user._id))
  const tasks = await db.collection("automatic_reward_tasks").find({ active: true, roles: user.user_type, $and: [ { $or: [{ start_at: { $exists: false } }, { start_at: null }, { start_at: { $lte: new Date() } }] }, { $or: [{ end_at: { $exists: false } }, { end_at: null }, { end_at: { $gte: new Date() } }] } ] }).sort({ created_at: 1 }).toArray()
  const completions = await db.collection("automatic_reward_completions").find({ user_id: userId }).sort({ credited_at: -1 }).toArray()
  const latestByKey = new Map(completions.map((entry) => [entry.task_key, entry]))
  const results = []
  for (const task of tasks) {
    const completion = latestByKey.get(task.task_key)
    const ineligible = task.verification_rule === "rera_approved" && (user.rera_required === false || user.rera_exempt === true)
    const complete = completion || (!ineligible && await qualifies(db, String(task.verification_rule || ""), user))
    results.push({ ...task, _id: task._id.toString(), completion_status: completion ? "reward_credited" : ineligible ? "not_eligible" : complete ? "completed" : "not_started", progress: task.verification_rule === "profile_complete" ? profileProgress(user) : null, credited_at: completion?.credited_at || null, credited_points: completion?.points || null })
  }
  const transactions = await db.collection("reward_transactions").find({ agent_id: userId, type: "automatic_credit" }).sort({ created_at: -1 }).limit(50).toArray()
  const account = await db.collection("agent_reward_accounts").findOne({ agent_id: userId })
  return { tasks, transactions, account: account || { available_points: 0 } }
}

function profileProgress(user: any) {
  const required = [Boolean(String(user.display_name || user.username || "").trim().length >= 2), Boolean(String(user.email || "").includes("@")), /^[6-9]\d{9}$/.test(String(user.phone_number || ""))]
  return { percent: Math.round(required.filter(Boolean).length / required.length * 100), missing: ["Name", "Email", "Mobile number"].filter((_, index) => !required[index]) }
}
