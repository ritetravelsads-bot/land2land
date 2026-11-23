import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid review." }, { status: 400 })
    const reviewId = new ObjectId(id)
    const body = await request.json()
    const db = await getDatabase()
    const review = await db.collection("reviews").findOne({ _id: reviewId, $or: [{ is_approved: true }, { status: "published" }] }, { projection: { user: 1 } })
    if (!review) return NextResponse.json({ error: "Review not found." }, { status: 404 })
    if (String(review.user) === String(user._id)) return NextResponse.json({ error: "You cannot interact with your own review." }, { status: 403 })
    const now = new Date()
    if (body.action === "helpful") {
      await db.collection("review_votes").createIndex({ review_id: 1, user_id: 1 }, { unique: true })
      try {
        await db.collection("review_votes").insertOne({ review_id: reviewId, review_type: "property", user_id: user._id, created_at: now })
      } catch (error) {
        if ((error as { code?: number }).code === 11000) return NextResponse.json({ error: "You already marked this review helpful." }, { status: 409 })
        throw error
      }
      await db.collection("reviews").updateOne({ _id: reviewId }, { $inc: { helpful_count: 1 } })
      return NextResponse.json({ success: true })
    }
    if (body.action === "report") {
      const reason = typeof body.reason === "string" ? body.reason.trim().slice(0, 1000) : ""
      if (!reason) return NextResponse.json({ error: "Provide a reason for the report." }, { status: 400 })
      await db.collection("review_reports").createIndex({ review_id: 1, reporter_id: 1 }, { unique: true })
      try {
        await db.collection("review_reports").insertOne({ review_id: reviewId, review_type: "property", reporter_id: user._id, reason, status: "open", created_at: now })
      } catch (error) {
        if ((error as { code?: number }).code === 11000) return NextResponse.json({ error: "You already reported this review." }, { status: 409 })
        throw error
      }
      return NextResponse.json({ success: true })
    }
    return NextResponse.json({ error: "Unsupported review action." }, { status: 400 })
  } catch {
    return NextResponse.json({ error: "Unable to process review interaction." }, { status: 500 })
  }
}
