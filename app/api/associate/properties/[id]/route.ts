import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const property = await db.collection("listings").findOne({ _id: new ObjectId(id) })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    if (user.user_type === "associate" && property.associate?.toString() !== user._id?.toString()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(property)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const body = await req.json()

    let slug = body.slug
    if (!slug && body.property_name) {
      slug = body.property_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      
      let counter = 1
      let uniqueSlug = slug
      while (await db.collection("listings").findOne({ slug: uniqueSlug, _id: { $ne: new ObjectId(id) } })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }
      slug = uniqueSlug
    }

    const isAdmin = user.user_type === "admin"

    const {
      _id: _id,
      associate: _associate,
      review_status: _rs,
      review_notes: _rn,
      reviewed_at: _ra,
      reviewed_by: _rb,
      submitted_at: _sa,
      submission_count: _sc,
      created_at: _ca,
      ...safeBody
    } = body as Record<string, any>

    const moderationUpdate = isAdmin
      ? {}
      : {
          review_status: "pending",
          review_notes: "",
          submitted_at: new Date(),
          reviewed_at: null,
          reviewed_by: null,
        }

    const ownershipFilter = isAdmin
      ? { _id: new ObjectId(id) }
      : { _id: new ObjectId(id), associate: { $in: [user._id, user._id?.toString()] } }

    const incUpdate = isAdmin ? {} : { $inc: { submission_count: 1 } }

    const result = await db.collection("listings").updateOne(ownershipFilter, {
      $set: {
        ...safeBody,
        slug,
        ...moderationUpdate,
        updated_at: new Date(),
      },
      ...incUpdate,
    })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Property not found or unauthorized" }, { status: 404 })
    }

    const updatedProperty = await db.collection("listings").findOne({ _id: new ObjectId(id) })
    return NextResponse.json({ success: true, property: updatedProperty })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update property" }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const deleteFilter =
      user.user_type === "admin"
        ? { _id: new ObjectId(id) }
        : { _id: new ObjectId(id), associate: { $in: [user._id, user._id?.toString()] } }
    const result = await db.collection("listings").deleteOne(deleteFilter)

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Property not found or unauthorized" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 })
  }
}
