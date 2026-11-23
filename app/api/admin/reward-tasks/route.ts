import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ensureRewardIndexes, RewardError } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const tasks = await db.collection("reward_tasks").find({}).sort({ created_at: -1 }).limit(100).toArray()
    return NextResponse.json(tasks)
  } catch {
    return NextResponse.json({ error: "Failed to load tasks." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 140) : ""
    const description = typeof body.description === "string" ? body.description.trim().slice(0, 1500) : ""
    const instructions = typeof body.instructions === "string" ? body.instructions.trim().slice(0, 5000) : ""
    const category = typeof body.category === "string" ? body.category.trim().slice(0, 80) : "General"
    const points = Number(body.points)
    const deadline = body.deadline ? new Date(body.deadline) : null
    if (!title || !description || !instructions || !Number.isSafeInteger(points) || points < 1 || points > 1000000) throw new RewardError("Provide a title, description, instructions, and a positive whole-number reward.")
    if (deadline && Number.isNaN(deadline.getTime())) throw new RewardError("Deadline is invalid.")
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const now = new Date()
    const task = { title, description, instructions, category, points, priority: ["low", "normal", "high"].includes(body.priority) ? body.priority : "normal", assignment_type: body.assignment_type === "selected" ? "selected" : "all", assigned_agent_ids: Array.isArray(body.assigned_agent_ids) ? body.assigned_agent_ids.filter((id: unknown) => typeof id === "string" && /^[a-f\d]{24}$/i.test(id)).map((id: string) => id) : [], proof_requirements: typeof body.proof_requirements === "string" ? body.proof_requirements.trim().slice(0, 1000) : "Describe your work and attach a proof link.", max_completions_per_agent: Number.isSafeInteger(body.max_completions_per_agent) ? Math.max(1, Math.min(20, body.max_completions_per_agent)) : 1, deadline, status: "active", created_by: admin._id, updated_by: admin._id, created_at: now, updated_at: now }
    const result = await db.collection("reward_tasks").insertOne(task)
    await db.collection("admin_activity").insertOne({ actor_id: admin._id, actor_role: "admin", action: "reward_task_created", target_type: "reward_task", target_id: result.insertedId, after: { title, points }, created_at: now })
    return NextResponse.json({ ...task, _id: result.insertedId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof RewardError ? error.message : "Failed to create task." }, { status: error instanceof RewardError ? error.status : 500 })
  }
}
