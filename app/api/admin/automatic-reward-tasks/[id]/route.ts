import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

const verificationTriggers: Record<string, string> = { profile_complete: "profile_saved", profile_photo: "profile_saved", mobile_verified: "mobile_verified", rera_approved: "rera_approved", first_listing_approved: "listing_approved" }

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid task ID." }, { status: 400 })
    const body = await request.json()
    const set: Record<string, unknown> = { updated_at: new Date(), updated_by: admin._id }
    if (body.title !== undefined) {
      if (typeof body.title !== "string" || !body.title.trim()) return NextResponse.json({ error: "Task title is required." }, { status: 400 })
      set.title = body.title.trim().slice(0, 140)
    }
    if (body.description !== undefined) set.description = String(body.description).trim().slice(0, 1000)
    if (body.category !== undefined) set.category = String(body.category).trim().slice(0, 80)
    if (body.points !== undefined) {
      const points = Number(body.points)
      if (!Number.isSafeInteger(points) || points < 1 || points > 1000000) return NextResponse.json({ error: "Points must be a positive whole number." }, { status: 400 })
      set.points = points
    }
    if (body.active !== undefined) set.active = body.active === true
    if (body.roles !== undefined) {
      if (!Array.isArray(body.roles) || body.roles.length < 1 || body.roles.some((role: unknown) => role !== "associate")) return NextResponse.json({ error: "Eligible roles must include Associate." }, { status: 400 })
      set.roles = ["associate"]
    }
    for (const field of ["start_at", "end_at"] as const) {
      if (body[field] !== undefined) {
        const date = body[field] ? new Date(body[field]) : null
        if (date && Number.isNaN(date.getTime())) return NextResponse.json({ error: `Invalid ${field}.` }, { status: 400 })
        set[field] = date
      }
    }
    const db = await getDatabase()
    if (body.trigger !== undefined || body.verification_rule !== undefined) {
      const existing = await db.collection("automatic_reward_tasks").findOne({ _id: new ObjectId(id) })
      if (!existing) return NextResponse.json({ error: "Task not found." }, { status: 404 })
      const rule = String(body.verification_rule ?? existing.verification_rule)
      const trigger = String(body.trigger ?? existing.trigger)
      if (verificationTriggers[rule] !== trigger) return NextResponse.json({ error: "Choose a supported verifier and its matching trigger." }, { status: 400 })
      set.verification_rule = rule
      set.trigger = trigger
    }
    const result = await db.collection("automatic_reward_tasks").updateOne({ _id: new ObjectId(id) }, { $set: set })
    if (result.matchedCount !== 1) return NextResponse.json({ error: "Task not found." }, { status: 404 })
    await db.collection("admin_activity").insertOne({ actor_id: admin._id, actor_role: "admin", action: "automatic_reward_task_updated", target_type: "automatic_reward_task", target_id: new ObjectId(id), after: set, created_at: new Date() })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Unable to update automatic task." }, { status: 500 })
  }
}
