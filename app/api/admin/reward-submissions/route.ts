import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { approveRewardSubmission, ensureRewardIndexes, parseRewardId, RewardError } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const submissions = await db.collection("reward_task_submissions").aggregate([
      { $sort: { submitted_at: -1 } }, { $limit: 100 },
      { $lookup: { from: "users", localField: "agent_id", foreignField: "_id", as: "agent" } },
      { $lookup: { from: "reward_tasks", localField: "task_id", foreignField: "_id", as: "task" } },
      { $project: { submission_text: 1, proof_files: 1, status: 1, submitted_at: 1, admin_feedback: 1, awarded_points: 1, agent_name: { $ifNull: [{ $arrayElemAt: ["$agent.username", 0] }, "Agent"] }, task_title: { $ifNull: [{ $arrayElemAt: ["$task.title", 0] }, "Task"] }, task_points: { $arrayElemAt: ["$task.points", 0] } } },
    ]).toArray()
    return NextResponse.json(submissions)
  } catch {
    return NextResponse.json({ error: "Failed to load submissions." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const id = parseRewardId(String(body.id || ""))
    const action = body.action
    if (!["approved", "rejected", "revision_requested"].includes(action)) throw new RewardError("Choose approve, reject, or request revision.")
    return NextResponse.json(await approveRewardSubmission(id, admin._id, action, typeof body.feedback === "string" ? body.feedback : ""))
  } catch (error) {
    return NextResponse.json({ error: error instanceof RewardError ? error.message : "Unable to review submission." }, { status: error instanceof RewardError ? error.status : 500 })
  }
}
