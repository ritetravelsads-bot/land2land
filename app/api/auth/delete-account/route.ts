import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import { getCurrentUser } from "@/lib/auth"

// Never cache an account-mutating endpoint
export const dynamic = "force-dynamic"
export const revalidate = 0

/**
 * Permanently deletes the currently authenticated user's account and the
 * personal data associated with it, then clears the auth session.
 *
 * Required for both Apple App Store (Guideline 5.1.1(v)) and Google Play,
 * which mandate an in-app path to delete an account for any app that
 * supports account creation.
 */
export async function POST() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Not authenticated" }, { status: 401 })
    }

    // Admin accounts cannot be self-deleted to avoid locking out the platform.
    if (user.user_type === "admin") {
      return NextResponse.json(
        { success: false, error: "Admin accounts cannot be deleted from the app. Please contact support." },
        { status: 403 },
      )
    }

    const mongoUrl = process.env.MONGODB_URI
    if (!mongoUrl) {
      return NextResponse.json({ success: false, error: "Database is not configured." }, { status: 503 })
    }

    const userId = user._id
    const userIdString = userId.toString()

    // Open a client against the SAME database that getCurrentUser() reads from
    // (the "land2land" db) so authentication and deletion always target the
    // same data, regardless of the MONGODB_DB env value.
    const client = new MongoClient(mongoUrl)
    try {
      await client.connect()
      const db = client.db("land2land")

      // 1) Remove the account holder's own personal data.
      await Promise.all([
        // The account itself
        db.collection("users").deleteOne({ _id: new ObjectId(userIdString) }),
        // Listings owned by this user (stored with `associate: user._id`)
        db.collection("listings").deleteMany({ associate: userId }),
        // Support tickets opened by this user (`user_id` stored as a string)
        db.collection("tickets").deleteMany({ user_id: userIdString }),
      ])

      // 2) Detach the user from third-party enquiry records (leads) without
      //    deleting the enquiries themselves, which belong to other people.
      await db
        .collection("leads")
        .updateMany({ assigned_to: userId }, { $unset: { assigned_to: "" } })
        .catch(() => {})
    } finally {
      await client.close()
    }

    // 3) Clear the auth session so the client is fully logged out.
    const cookieStore = await cookies()
    cookieStore.delete("auth_token")

    return NextResponse.json({
      success: true,
      message: "Your account and associated data have been permanently deleted.",
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete account" }, { status: 500 })
  }
}
