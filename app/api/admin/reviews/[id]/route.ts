import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid review ID" }, { status: 400 })
    const db = await getDatabase()
    const body = await req.json()
    if (typeof body.is_approved !== "boolean") return NextResponse.json({ error: "Only the moderation status can be changed." }, { status: 400 })
    const now = new Date()
    const result = await db.collection("reviews").updateOne({ _id: new ObjectId(id) }, { $set: { is_approved: body.is_approved, status: body.is_approved ? "published" : "pending", ...(body.is_approved ? { published_at: now } : {}), updated_at: now } })

    if (result.matchedCount === 0) return NextResponse.json({ error: "Review not found" }, { status: 404 })
    await db.collection("admin_activity").insertOne({ actor_id: user._id, actor_role: "admin", action: body.is_approved ? "review_published" : "review_unpublished", target_type: "review", target_id: new ObjectId(id), created_at: now })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating review:", error)
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid review ID" }, { status: 400 })
    const db = await getDatabase()
    const now = new Date()
    const result = await db.collection("reviews").updateOne({ _id: new ObjectId(id) }, { $set: { status: "hidden", is_approved: false, deleted_at: now, updated_at: now } })

    if (result.matchedCount === 0) return NextResponse.json({ error: "Review not found" }, { status: 404 })
    await db.collection("admin_activity").insertOne({ actor_id: user._id, actor_role: "admin", action: "review_hidden", target_type: "review", target_id: new ObjectId(id), created_at: now })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error deleting review:", error)
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 })
  }
}
