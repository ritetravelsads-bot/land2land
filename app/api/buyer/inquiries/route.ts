import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// GET — fetch all leads/enquiries for the authenticated buyer
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const status = searchParams.get("status")

    const db = await getDatabase()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = { buyer_user_id: user._id.toString() }
    if (status && status !== "all") filter.status = status

    const skip = (page - 1) * limit

    const [leads, total] = await Promise.all([
      db
        .collection("leads")
        .find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("leads").countDocuments(filter),
    ])

    const serialized = leads.map((l) => ({ ...l, _id: l._id.toString() }))

    // Stats
    const stats = {
      total: await db.collection("leads").countDocuments({ buyer_user_id: user._id.toString() }),
      new: await db.collection("leads").countDocuments({ buyer_user_id: user._id.toString(), status: "new" }),
      contacted: await db.collection("leads").countDocuments({ buyer_user_id: user._id.toString(), status: "contacted" }),
      qualified: await db.collection("leads").countDocuments({ buyer_user_id: user._id.toString(), status: "qualified" }),
      converted: await db.collection("leads").countDocuments({ buyer_user_id: user._id.toString(), status: "converted" }),
    }

    return NextResponse.json({
      leads: serialized,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      stats,
    })
  } catch (error) {
    console.error("[Buyer Inquiries API] Error:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}
