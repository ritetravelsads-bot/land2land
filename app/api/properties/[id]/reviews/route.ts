import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid property." }, { status: 400 })
    const propertyId = new ObjectId(id)
    const db = await getDatabase()
    const [reviews, user] = await Promise.all([
      db.collection("reviews").aggregate([
        { $match: { property: propertyId, $or: [{ is_approved: true }, { status: "published" }] } },
        { $sort: { created_at: -1 } }, { $limit: 50 },
        { $lookup: { from: "users", localField: "user", foreignField: "_id", as: "reviewer" } },
        { $project: { rating: { $ifNull: ["$overall_rating", "$rating"] }, comment: { $ifNull: ["$content", "$comment"] }, title: 1, created_at: 1, helpful_count: { $ifNull: ["$helpful_count", 0] }, verified: { $eq: ["$verification_status", "verified"] }, reviewer_name: { $ifNull: [{ $arrayElemAt: ["$reviewer.username", 0] }, "Verified customer"] } } },
      ]).toArray(),
      getCurrentUser(),
    ])
    let eligible = false
    if (user?.user_type === "customer") {
      const buyerIds: unknown[] = [user._id, user._id.toHexString()]
      const match = await db.collection("enquiries").findOne({ buyer_user_id: { $in: buyerIds }, property_id: id })
      eligible = Boolean(match)
    }
    return NextResponse.json({ reviews, can_review: eligible, rating_count: reviews.length, average_rating: reviews.length ? Number((reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length).toFixed(1)) : 0 })
  } catch {
    return NextResponse.json({ error: "Failed to load reviews." }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser()
  if (!user || user.user_type !== "customer") return NextResponse.json({ error: "Sign in as a customer to write a review." }, { status: 401 })
  try {
    const { id } = await params
    if (!ObjectId.isValid(id)) return NextResponse.json({ error: "Invalid property." }, { status: 400 })
    const propertyId = new ObjectId(id)
    const body = await request.json()
    const rating = Number(body.rating)
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 120) : ""
    const comment = typeof body.comment === "string" ? body.comment.trim().slice(0, 2000) : ""
    if (!Number.isInteger(rating) || rating < 1 || rating > 5 || !comment) return NextResponse.json({ error: "Provide a rating from 1 to 5 and a written review." }, { status: 400 })
    const db = await getDatabase()
    const [property, enquiry, duplicate] = await Promise.all([
      db.collection("listings").findOne({ _id: propertyId, $or: [{ review_status: "approved" }, { review_status: { $exists: false } }] }, { projection: { associate: 1 } }),
      db.collection("enquiries").findOne({ buyer_user_id: { $in: [user._id, user._id.toHexString()] }, property_id: id }),
      db.collection("reviews").findOne({ property: propertyId, user: user._id, status: { $ne: "deleted" } }),
    ])
    if (!property || !enquiry) return NextResponse.json({ error: "A verified enquiry for this property is required before reviewing." }, { status: 403 })
    if (duplicate) return NextResponse.json({ error: "You have already reviewed this property." }, { status: 409 })
    const now = new Date()
    const inserted = await db.collection("reviews").insertOne({ property: propertyId, property_id: propertyId, user: user._id, reviewer_id: user._id, rating, overall_rating: rating, title, comment, content: comment, verification_status: "verified", verification_source: "property_enquiry", status: "pending", is_approved: false, helpful_count: 0, created_at: now, updated_at: now })
    return NextResponse.json({ id: inserted.insertedId, status: "pending" }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Unable to submit review." }, { status: 500 })
  }
}
