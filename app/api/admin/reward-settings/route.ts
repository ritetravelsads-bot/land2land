import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { RewardError } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    const settings = await db.collection<{ _id: string; points_per_posting_credit?: number; minimum_redemption_points?: number; minimum_posting_credits?: number; maximum_posting_credits?: number; approval_required?: boolean; automatic_redemption_enabled?: boolean }>("reward_settings").findOne({ _id: "default" })
    return NextResponse.json(settings || { points_per_posting_credit: 0, minimum_redemption_points: 0, minimum_posting_credits: 1, maximum_posting_credits: 0, approval_required: true, automatic_redemption_enabled: false })
  } catch {
    return NextResponse.json({ error: "Failed to load reward settings." }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const rate = Number(body.points_per_posting_credit)
    const minimum = Number(body.minimum_redemption_points)
    const maximum = Number(body.maximum_posting_credits)
    if (![rate, minimum, maximum].every(Number.isSafeInteger) || rate < 1 || minimum < rate || maximum < 1 || maximum > 1000) throw new RewardError("Rate and limits must be valid positive whole numbers; the minimum must be at least one credit.")
    const db = await getDatabase()
    const now = new Date()
    const settings = { points_per_posting_credit: rate, minimum_redemption_points: minimum, minimum_posting_credits: 1, maximum_posting_credits: maximum, approval_required: true, automatic_redemption_enabled: false, updated_by: admin._id, updated_at: now }
    await db.collection<{ _id: string; points_per_posting_credit: number; minimum_redemption_points: number; minimum_posting_credits: number; maximum_posting_credits: number; approval_required: boolean; automatic_redemption_enabled: boolean; updated_by: ObjectId; updated_at: Date; created_at?: Date }>("reward_settings").updateOne({ _id: "default" }, { $set: settings, $setOnInsert: { created_at: now } }, { upsert: true })
    await db.collection("admin_activity").insertOne({ actor_id: admin._id, actor_role: "admin", action: "reward_settings_updated", target_type: "reward_settings", target_id: "default", after: settings, created_at: now })
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update reward settings." }, { status: error instanceof RewardError ? error.status : 400 })
  }
}
