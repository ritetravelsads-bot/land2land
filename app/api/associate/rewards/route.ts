import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { getAgentRewardOverview } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const agent = await getCurrentUser()
  if (!agent || agent.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    const overview = await getAgentRewardOverview(db, agent._id)
    const completionStatusByTask = new Map<string, string>()
    for (const submission of overview.submissions) {
      const taskId = submission.task_id.toString()
      if (!completionStatusByTask.has(taskId)) {
        completionStatusByTask.set(taskId, submission.status)
      }
    }
    return NextResponse.json({
      ...overview,
      tasks: overview.tasks.map((task) => ({
        ...task,
        completion_status: completionStatusByTask.get(task._id.toString()) || "available",
      })),
    })
  } catch {
    return NextResponse.json({ error: "Failed to load rewards." }, { status: 500 })
  }
}
