import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// GET — list all buyer message threads (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "30")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const db = await getDatabase()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: any = {}
    if (status && status !== "all") filter.status = status
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: "i" } },
        { buyer_name: { $regex: search, $options: "i" } },
        { buyer_phone: { $regex: search, $options: "i" } },
        { buyer_email: { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const [threads, total] = await Promise.all([
      db
        .collection("buyer_messages")
        .find(filter)
        .sort({ updated_at: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      db.collection("buyer_messages").countDocuments(filter),
    ])

    const serialized = threads.map((t) => ({ ...t, _id: t._id.toString() }))

    const stats = {
      total: await db.collection("buyer_messages").countDocuments({}),
      open: await db.collection("buyer_messages").countDocuments({ status: "open" }),
      replied: await db.collection("buyer_messages").countDocuments({ status: "replied" }),
      closed: await db.collection("buyer_messages").countDocuments({ status: "closed" }),
    }

    return NextResponse.json({
      threads: serialized,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      stats,
    })
  } catch (error) {
    console.error("[Admin Buyer Messages API] GET error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
