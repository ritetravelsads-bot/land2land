import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { verifyVerificationToken } from "@/lib/otp"
import { creditAutomaticRewardsForEvent, seedAutomaticRewardTasks } from "@/lib/automatic-rewards"
import { type NextRequest, NextResponse } from "next/server"

// Shared profile-update endpoint for ALL user types (customer, buyer, seller,
// associate, builder, admin). Only whitelisted, non-privileged fields can be
// updated so a user can never escalate their own role or change their password
// through this route.
export async function PUT(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    const updates: Record<string, unknown> = {}

    if (typeof body.display_name === "string") {
      const trimmed = body.display_name.trim()
      if (trimmed.length < 2 || trimmed.length > 80) {
        return NextResponse.json({ error: "Name must be between 2 and 80 characters" }, { status: 400 })
      }
      updates.display_name = trimmed
    }

    if (typeof body.phone_number === "string") {
      const cleaned = body.phone_number.replace(/\D/g, "")
      if (cleaned.length > 0 && !/^[6-9]\d{9}$/.test(cleaned)) {
        return NextResponse.json({ error: "Invalid phone number. Must be a 10-digit Indian mobile number." }, { status: 400 })
      }
      const normalizedPhone = cleaned || body.phone_number.trim()
      updates.phone_number = normalizedPhone
      if (typeof body.verification_token === "string" && verifyVerificationToken(body.verification_token, normalizedPhone)) {
        updates.phone_verified = true
        updates.verified_phone = normalizedPhone
        updates.phone_verified_at = new Date()
      } else if (normalizedPhone !== user.phone_number) {
        updates.phone_verified = false
        updates.verified_phone = null
        updates.phone_verified_at = null
      }
    }

    if (typeof body.profile_picture === "string" || body.profile_picture === null) {
      updates.profile_picture = body.profile_picture || null
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No valid fields to update" }, { status: 400 })
    }

    updates.updated_at = new Date()

    const db = await getDatabase()
    const result = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(user._id) }, { $set: updates })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const savedUser = await db.collection("users").findOne({ _id: new ObjectId(user._id) })
    let newlyCredited: Array<{ task_title?: string; points?: number }> = []
    if (savedUser?.user_type === "associate") {
      await seedAutomaticRewardTasks(db, user._id)
      const credits = await Promise.allSettled([
        creditAutomaticRewardsForEvent(user._id, "profile_saved"),
        creditAutomaticRewardsForEvent(user._id, "mobile_verified"),
      ])
      newlyCredited = credits.flatMap((entry) => entry.status === "fulfilled" ? entry.value.flatMap((credit) => credit.credited ? [{ task_title: credit.task_title, points: credit.points }] : []) : [])
    }

    return NextResponse.json({ success: true, profile_picture: updates.profile_picture, newly_credited: newlyCredited })
  } catch (error) {
    console.error("[v0] Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
