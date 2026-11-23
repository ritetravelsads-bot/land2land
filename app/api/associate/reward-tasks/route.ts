import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ensureRewardIndexes, RewardError, parseRewardId } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const agent = await getCurrentUser()
  if (!agent || agent.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const now = new Date()
    const [tasks, submissions] = await Promise.all([
      db.collection("reward_tasks").find({ status: "active", $and: [{ $or: [{ start_at: { $exists: false } }, { start_at: { $lte: now } }] }, { $or: [{ end_at: { $exists: false } }, { end_at: null }, { end_at: { $gte: now } }] }, { $or: [{ assignment_type: "all" }, { assigned_agent_ids: agent._id }, { assigned_agent_ids: agent._id.toHexString() }] }] }).sort({ priority: -1, created_at: -1 }).limit(50).toArray(),
      db.collection("reward_task_submissions").find({ agent_id: agent._id }).project({ task_id: 1, status: 1, submitted_at: 1 }).toArray(),
    ])
    const statusByTask = new Map(submissions.map((submission) => [submission.task_id.toString(), submission.status]))
    return NextResponse.json(tasks.map((task) => ({ ...task, completion_status: statusByTask.get(task._id.toString()) || "available" })))
  } catch {
    return NextResponse.json({ error: "Failed to load tasks." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const agent = await getCurrentUser()
  if (!agent || agent.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const taskId = parseRewardId(String(body.task_id || ""))
    const submissionText = typeof body.submission_text === "string" ? body.submission_text.trim().slice(0, 4000) : ""
    const proof = Array.isArray(body.proof_files) ? body.proof_files.slice(0, 5).filter((item: unknown) => typeof item === "string" && item.length <= 500 && /^https:\/\//i.test(item)) : []
    if (!submissionText && proof.length === 0) throw new RewardError("Describe the completed work or attach at least one proof link.")
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const task = await db.collection("reward_tasks").findOne({ _id: taskId, status: "active", $or: [{ assignment_type: "all" }, { assigned_agent_ids: agent._id }, { assigned_agent_ids: agent._id.toHexString() }] })
    if (!task || (task.deadline && new Date(task.deadline) < new Date())) throw new RewardError("This task is not available.", 404)
    const existing = await db.collection("reward_task_submissions").findOne({ task_id: taskId, agent_id: agent._id, status: { $in: ["pending", "approved", "revision_requested"] } }, { sort: { updated_at: -1 } })
    if (existing && existing.status !== "revision_requested") throw new RewardError("You already have an active or approved submission for this task.", 409)
    const approvedCount = await db.collection("reward_task_submissions").countDocuments({ task_id: taskId, agent_id: agent._id, status: "approved" })
    if (approvedCount >= Math.max(1, Number(task.max_completions_per_agent || 1))) throw new RewardError("You have reached the completion limit for this task.", 409)
    if (task.max_completions) {
      const completionCount = await db.collection("reward_task_submissions").countDocuments({ task_id: taskId, status: "approved" })
      if (completionCount >= Number(task.max_completions)) throw new RewardError("This task has reached its completion limit.", 409)
    }
    const now = new Date()
    if (existing) {
      const revision = { submission_text: existing.submission_text, proof_files: existing.proof_files || [], feedback: existing.admin_feedback || "", submitted_at: existing.submitted_at }
      const history = Array.isArray(existing.revision_history) ? existing.revision_history : []
      await db.collection("reward_task_submissions").updateOne({ _id: existing._id, status: "revision_requested" }, { $set: { revision_history: [...history, revision], submission_text: submissionText, proof_files: proof, status: "pending", submitted_at: now, updated_at: now } })
      await db.collection("admin_activity").insertOne({ actor_id: agent._id, actor_role: "associate", action: "reward_task_resubmitted", target_type: "reward_task_submission", target_id: existing._id, created_at: now })
      return NextResponse.json({ success: true, id: existing._id }, { status: 200 })
    }
    const inserted = await db.collection("reward_task_submissions").insertOne({ task_id: taskId, agent_id: agent._id, status: "pending", submission_text: submissionText, proof_files: proof, submitted_at: now, revision_history: [], created_at: now, updated_at: now })
    await db.collection("admin_activity").insertOne({ actor_id: agent._id, actor_role: "associate", action: "reward_task_submitted", target_type: "reward_task_submission", target_id: inserted.insertedId, created_at: now })
    return NextResponse.json({ success: true, id: inserted.insertedId }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error instanceof RewardError ? error.message : "Unable to submit this task." }, { status: error instanceof RewardError ? error.status : 500 })
  }
}
