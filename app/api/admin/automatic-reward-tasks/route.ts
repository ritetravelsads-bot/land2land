import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { seedAutomaticRewardTasks } from "@/lib/automatic-rewards"
import { ensureRewardIndexes } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

const verificationTriggers: Record<string, string> = { profile_complete: "profile_saved", profile_photo: "profile_saved", mobile_verified: "mobile_verified", rera_approved: "rera_approved", first_listing_approved: "listing_approved" }

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    await seedAutomaticRewardTasks(db, admin._id)
    const tasks = await db.collection("automatic_reward_tasks").find({}).sort({ created_at: 1 }).toArray()
    const results = await Promise.all(tasks.map(async (task) => {
      const [completed, totals] = await Promise.all([
        db.collection("automatic_reward_completions").find({ task_id: task._id }).sort({ credited_at: -1 }).limit(200).toArray(),
        db.collection("automatic_reward_completions").aggregate([{ $match: { task_id: task._id } }, { $group: { _id: null, users: { $sum: 1 }, points: { $sum: "$points" } } }]).toArray(),
      ])
      const userIds = completed.map((entry) => entry.user_id)
      const [users, creditedTransactions, notCompletedUsers] = await Promise.all([
        userIds.length ? db.collection("users").find({ _id: { $in: userIds } }).project({ username: 1, display_name: 1, email: 1 }).toArray() : Promise.resolve([]),
        completed.length ? db.collection("reward_transactions").find({ idempotency_key: { $in: completed.map((entry) => entry.idempotency_key) } }).project({ idempotency_key: 1, type: 1, points: 1, created_at: 1, description: 1 }).toArray() : Promise.resolve([]),
        db.collection("users").find({ user_type: "associate", _id: { $nin: userIds } }).project({ username: 1, display_name: 1, email: 1 }).limit(200).toArray(),
      ])
      const userById = new Map(users.map((user) => [user._id.toString(), user]))
      const transactionByKey = new Map(creditedTransactions.map((entry) => [entry.idempotency_key, entry]))
      return { ...task, _id: task._id.toString(), completed_users: Number(totals[0]?.users || 0), points_distributed: Number(totals[0]?.points || 0), not_completed_count: Math.max(0, await db.collection("users").countDocuments({ user_type: "associate" }) - Number(totals[0]?.users || 0)), not_completed_users: notCompletedUsers.map((user) => ({ id: user._id.toString(), name: user.display_name || user.username, email: user.email })), completions: completed.map((entry) => ({ ...entry, _id: entry._id.toString(), user_id: entry.user_id.toString(), task_id: entry.task_id.toString(), user: userById.get(entry.user_id.toString()) ? { name: userById.get(entry.user_id.toString())?.display_name || userById.get(entry.user_id.toString())?.username, email: userById.get(entry.user_id.toString())?.email } : null, transaction: transactionByKey.get(entry.idempotency_key) || null })) }
    }))
    return NextResponse.json(results)
  } catch {
    return NextResponse.json({ error: "Unable to load automatic rewards." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const task_key = typeof body.task_key === "string" ? body.task_key.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").slice(0, 60) : ""
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 140) : ""
    const description = typeof body.description === "string" ? body.description.trim().slice(0, 1000) : ""
    const points = Number(body.points)
    if (!/^[a-z0-9_]{3,60}$/.test(task_key) || !title || !description || !Number.isSafeInteger(points) || points < 1 || points > 1000000 || verificationTriggers[String(body.verification_rule)] !== body.trigger) return NextResponse.json({ error: "Provide a unique task key, title, description, positive points, and a supported trigger/verifier pair." }, { status: 400 })
    if (!Array.isArray(body.roles) || body.roles.length === 0 || body.roles.some((role: unknown) => !["associate"].includes(String(role)))) return NextResponse.json({ error: "Eligible roles must include Associate." }, { status: 400 })
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const now = new Date()
    const task = { task_key, title, description, points, category: String(body.category || "General").slice(0, 80), trigger: body.trigger, roles: ["associate"], active: body.active !== false, repeatable: false, max_rewards_per_user: 1, verification_rule: String(body.verification_rule), created_by: admin._id, updated_by: admin._id, created_at: now, updated_at: now }
    const result = await db.collection("automatic_reward_tasks").insertOne(task)
    return NextResponse.json({ ...task, _id: result.insertedId.toString() }, { status: 201 })
  } catch (error) {
    const message = error instanceof Error && error.message.includes("duplicate key") ? "That task identifier already exists." : "Unable to create automatic task."
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
