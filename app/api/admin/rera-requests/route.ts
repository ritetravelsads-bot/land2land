import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { COLLECTIONS, RERA_REQUEST_STATUSES } from "@/lib/models"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET /api/admin/rera-requests?status=submitted
// Returns RERA requests for the admin queue plus counts per status.
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const status = req.nextUrl.searchParams.get("status") || "active"

    let query: Record<string, unknown> = {}
    if (status === "active") {
      query = { status: { $nin: ["approved", "rejected"] } }
    } else if (status === "all") {
      query = {}
    } else if (RERA_REQUEST_STATUSES.includes(status as any)) {
      query = { status }
    }

    const requests = await db
      .collection(COLLECTIONS.RERA_REQUESTS)
      .find(query)
      .sort({ updated_at: -1, created_at: -1 })
      .toArray()

    // Counts for the queue tabs
    const grouped = await db
      .collection(COLLECTIONS.RERA_REQUESTS)
      .aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }])
      .toArray()

    const counts: Record<string, number> = { active: 0, all: 0 }
    for (const s of RERA_REQUEST_STATUSES) counts[s] = 0
    for (const g of grouped) {
      counts[g._id] = g.count
      counts.all += g.count
      if (g._id !== "approved" && g._id !== "rejected") counts.active += g.count
    }

    return NextResponse.json({
      requests: requests.map((r) => ({ ...r, _id: r._id.toString() })),
      counts,
    })
  } catch (error) {

    return NextResponse.json({ error: "Failed to load RERA requests" }, { status: 500 })
  }
}
