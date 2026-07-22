import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
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

    if (typeof body.phone_number === "string") {
      updates.phone_number = body.phone_number.trim()
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

    return NextResponse.json({ success: true, profile_picture: updates.profile_picture })
  } catch (error) {
    console.error("[v0] Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}
