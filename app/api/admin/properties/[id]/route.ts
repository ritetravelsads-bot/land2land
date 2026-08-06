import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

// Disable caching for this route
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    // In Next.js 15+, params is a Promise and must be awaited
    const { id } = await params
    
    const user = await getCurrentUser()
    
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    
    let property
    try {
      const objectId = new ObjectId(id)
      property = await db.collection("listings").findOne({ _id: objectId })
      
      if (property) {
        // Convert _id to string for consistent handling
        property = {
          ...property,
          _id: property._id.toString(),
        }
      }
    } catch (e) {

      property = null
    }

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    // Debug: Log image fields being retrieved
    const propertyData = property as any

    // Debug: Log SEO fields being retrieved

    return NextResponse.json(property)
  } catch (error) {

    return NextResponse.json({ error: "Failed to fetch property", details: String(error) }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {  const user = await requireAdminWithCsrf(request)

  try {
    // In Next.js 15+, params is a Promise and must be awaited
    const { id }} = await params
    
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate ID format
    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch (e) {
      return NextResponse.json({ error: "Invalid property ID format" }, { status: 400 })
    }

    const db = await getDatabase()
    
    let body: Record<string, any>
    try {
      body = await req.json()
    } catch (e) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
    }

    // Remove any _id field from the body to prevent conflicts
    delete body._id
    
    // Generate slug from property name if not provided or if property name changed
    let slug = body.slug
    if (!slug && body.property_name) {
      slug = body.property_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      
      // Ensure unique slug (excluding current property)
      let counter = 1
      let uniqueSlug = slug
      while (await db.collection("listings").findOne({ slug: uniqueSlug, _id: { $ne: objectId } })) {
        uniqueSlug = `${slug}-${counter}`
        counter++
      }
      slug = uniqueSlug
    }

    // Debug: Log image fields being saved

    // Debug: Log SEO fields being saved

    // Build the update object
    const updateData = {
      ...body,
      slug,
      updated_at: new Date(),
    }

    const result = await db.collection("listings").updateOne(
      { _id: objectId },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    const updatedProperty = await db.collection("listings").findOne({ _id: objectId })
    
    // Convert _id to string for consistent frontend handling
    const serializedProperty = updatedProperty ? {
      ...updatedProperty,
      _id: updatedProperty._id.toString(),
    } : null
    
    return NextResponse.json({ success: true, property: serializedProperty, slug })
  } catch (error) {

    return NextResponse.json({ 
      error: "Failed to update property", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {  const user = await requireAdminWithCsrf(request)

  try {
    // In Next.js 15+, params is a Promise and must be awaited
    const { id }} = await params
    
    const user = await getCurrentUser()
    
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    
    let objId
    try {
      objId = new ObjectId(id)
    } catch (e) {

      return NextResponse.json({ error: "Invalid property ID format" }, { status: 400 })
    }

    const result = await db.collection("listings").deleteOne({ _id: objId })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {

    return NextResponse.json({ error: "Failed to delete property", details: String(error) }, { status: 500 })
  }
}
