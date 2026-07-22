import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    // Associates only see their own listings; admins see everything.
    // Match both ObjectId and string forms of `associate` so listings whose owner
    // field may have been stored as a string still show up.
    const query =
      user.user_type === "admin"
        ? {}
        : { associate: { $in: [user._id, user._id?.toString()] } }
    const properties = await db
      .collection("listings")
      .find(query)
      .sort({ created_at: -1 })
      .toArray()

    return NextResponse.json(properties)
  } catch (error) {
    console.error("[v0] Error fetching associate properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const body = await req.json()

    // Generate slug from property name if not provided
    let slug = body.slug
    if (!slug && body.property_name) {
      slug = body.property_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      
      // Ensure unique slug
      let counter = 1
      let uniqueSlug = slug
      while (await db.collection("listings").findOne({ slug: uniqueSlug })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }
      slug = uniqueSlug
    }

    // Moderation workflow: associate submissions must be reviewed by an admin
    // before they go public. Admin-created listings are auto-approved.
    const isAdmin = user.user_type === "admin"

    const property = {
      ...body,
      slug,
      associate: user._id,
      review_status: isAdmin ? "approved" : "pending",
      review_notes: "",
      submission_count: 1,
      submitted_at: new Date(),
      ...(isAdmin ? { reviewed_at: new Date(), reviewed_by: user._id } : {}),
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.collection("listings").insertOne(property)
    return NextResponse.json({ _id: result.insertedId, ...property }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error creating property:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
