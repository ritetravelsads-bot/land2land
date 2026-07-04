import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET /api/admin/properties/review?status=pending
// Returns listings for the admin review queue, plus counts per review state.
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const status = req.nextUrl.searchParams.get("status") || "pending"

    const query =
      status === "all"
        ? { review_status: { $in: ["pending", "approved", "rejected"] } }
        : { review_status: status }

    const properties = await db
      .collection("listings")
      .find(query)
      .sort({ submitted_at: -1, created_at: -1 })
      .toArray()

    // Counts for the queue tabs
    const [pending, approved, rejected] = await Promise.all([
      db.collection("listings").countDocuments({ review_status: "pending" }),
      db.collection("listings").countDocuments({ review_status: "approved" }),
      db.collection("listings").countDocuments({ review_status: "rejected" }),
    ])

    const serialized = properties.map((p) => ({ ...p, _id: p._id.toString() }))

    return NextResponse.json({
      properties: serialized,
      counts: { pending, approved, rejected },
    })
  } catch (error) {
    console.error("[v0] Error fetching review queue:", error)
    return NextResponse.json({ error: "Failed to fetch review queue" }, { status: 500 })
  }
}
