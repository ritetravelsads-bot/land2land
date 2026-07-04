import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

// POST /api/admin/properties/[id]/review
// body: { action: "approve" | "reject", notes?: string }
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ error: "Invalid property ID format" }, { status: 400 })
    }

    const body = await req.json().catch(() => ({}))
    const action = body.action as "approve" | "reject"
    const notes = typeof body.notes === "string" ? body.notes.trim() : ""

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    if (action === "reject" && !notes) {
      return NextResponse.json(
        { error: "Please provide a reason so the owner knows what to fix." },
        { status: 400 },
      )
    }

    const db = await getDatabase()

    const update =
      action === "approve"
        ? {
            review_status: "approved",
            review_notes: "",
            reviewed_at: new Date(),
            reviewed_by: user._id,
          }
        : {
            review_status: "rejected",
            review_notes: notes,
            reviewed_at: new Date(),
            reviewed_by: user._id,
          }

    const result = await db.collection("listings").updateOne(
      { _id: objectId },
      { $set: { ...update, updated_at: new Date() } },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    const updated = await db.collection("listings").findOne({ _id: objectId })
    return NextResponse.json({
      success: true,
      property: updated ? { ...updated, _id: updated._id.toString() } : null,
    })
  } catch (error) {
    console.error("[v0] Error reviewing property:", error)
    return NextResponse.json({ error: "Failed to review property" }, { status: 500 })
  }
}
