import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()

    // Get all properties owned by this associate
    const properties = await db
      .collection("listings")
      .find({ agent: { $in: [user._id, user._id?.toString()] } })
      .project({ _id: 1, property_name: 1 })
      .toArray()

    const propertyIds = properties.map((p) => p._id?.toString())

    if (propertyIds.length === 0) {
      return NextResponse.json([])
    }

    // Get reviews for those properties
    const reviews = await db
      .collection("reviews")
      .find({ property: { $in: propertyIds } })
      .sort({ created_at: -1 })
      .toArray()

    // Attach property name to each review
    const propertyNameMap = Object.fromEntries(properties.map((p) => [p._id?.toString(), p.property_name]))
    const reviewsWithPropertyName = reviews.map((r) => ({
      ...r,
      property: propertyNameMap[r.property] || r.property,
    }))

    return NextResponse.json(reviewsWithPropertyName)
  } catch (error) {
    console.error("[v0] Error fetching associate reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
