import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid task ID." }, { status: 400 })
    const body = await request.json()
    const status = ["active", "paused", "archived"].includes(body.status) ? body.status : null
    if (!status) return NextResponse.json({ error: "Choose active, paused, or archived." }, { status: 400 })
    const db = await getDatabase()
    const now = new Date()
    const result = await db.collection("reward_tasks").updateOne({ _id: new ObjectId(id) }, { $set: { status, updated_by: admin._id, updated_at: now } })
    if (result.matchedCount !== 1) return NextResponse.json({ error: "Task not found." }, { status: 404 })
    await db.collection("admin_activity").insertOne({ actor_id: admin._id, actor_role: "admin", action: `reward_task_${status}`, target_type: "reward_task", target_id: new ObjectId(id), created_at: now })
    return NextResponse.json({ success: true, status })
  } catch {
    return NextResponse.json({ error: "Unable to update task." }, { status: 500 })
  }
}
