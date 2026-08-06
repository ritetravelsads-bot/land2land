import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Public endpoint: list registered associates for the "Find an Associate" page.
// Only non-sensitive fields are exposed (never email or password).
export async function GET() {
  try {
    const db = await getDatabase()
    const associates = await db
      .collection("users")
      .find({ user_type: "associate" })
      .project({
        _id: 1,
        username: 1,
        phone_number: 1,
        profile_picture: 1,
        is_verified: 1,
        created_at: 1,
        date_joined: 1,
      })
      .sort({ is_verified: -1, created_at: -1, date_joined: -1 })
      .toArray()

    const serialized = associates.map((a) => ({
      id: a._id.toString(),
      name: a.username || "Associate",
      phone: a.phone_number || null,
      profile_picture: a.profile_picture || null,
      verified: Boolean(a.is_verified),
      joined: a.created_at || a.date_joined || null,
    }))

    return NextResponse.json({ success: true, associates: serialized })
  } catch (error) {
    return NextResponse.json({ success: false, associates: [], error: "Failed to fetch associates" }, { status: 500 })
  }
}
