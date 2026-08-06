import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { type NextRequest, NextResponse } from "next/server"
import { escapeRegexChars } from "@/lib/sanitize-regex"
import { requireAdminWithCsrf } from "@/lib/auth"

// Disable caching for admin routes
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const { searchParams } = new URL(req.url)
    
    // Build query from filters
    const query: Record<string, any> = {}
    
    // Search filter - sanitized to prevent ReDoS (property name, address, developer)
    const search = searchParams.get("search")
    if (search) {
      const escapedSearch = escapeRegexChars(search)
      if (escapedSearch) {
        query.$or = [
          { property_name: { $regex: escapedSearch, $options: "i" } },
          { address: { $regex: escapedSearch, $options: "i" } },
          { developer_name: { $regex: escapedSearch, $options: "i" } },
          { city: { $regex: escapedSearch, $options: "i" } },
          { neighborhood: { $regex: escapedSearch, $options: "i" } },
        ]
      }
    }
    
    // Property type filter
    const category = searchParams.get("category")
    if (category) {
      query.property_type = category
    }
    
    // Status filter
    const status = searchParams.get("status")
    if (status) {
      query.status = status
    }
    
    // Listing type filter
    const listingType = searchParams.get("listing_type")
    if (listingType) {
      query.listing_type = listingType
    }
    
    // Ownership type filter
    const ownershipType = searchParams.get("ownership_type")
    if (ownershipType) {
      query.ownership_type = ownershipType
    }
    
    // City filter - sanitized to prevent ReDoS
    const city = searchParams.get("city")
    if (city) {
      const escapedCity = escapeRegexChars(city)
      if (escapedCity) {
        query.city = { $regex: escapedCity, $options: "i" }
      }
    }
    
    // Developer filter - sanitized to prevent ReDoS
    const developer = searchParams.get("developer")
    if (developer) {
      const escapedDeveloper = escapeRegexChars(developer)
      if (escapedDeveloper) {
        query.developer_name = { $regex: escapedDeveloper, $options: "i" }
      }
    }
    
    // Price range filter
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice || maxPrice) {
      query.lowest_price = {}
      if (minPrice) query.lowest_price.$gte = parseInt(minPrice)
      if (maxPrice) query.lowest_price.$lte = parseInt(maxPrice)
    }
    
    // Limit
    const limit = parseInt(searchParams.get("limit") || "100")
    
    const properties = await db
      .collection("listings")
      .find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray()

    // Convert _id to string for consistent handling in the frontend
    const serializedProperties = properties.map(p => ({
      ...p,
      _id: p._id.toString(),
    }))

    // Debug: Log thumbnail status for properties
    console.log("[v0] API GET list - Properties thumbnail status:", 
      serializedProperties.slice(0, 5).map((p: any) => ({
        id: p._id,
        name: p.property_name?.substring(0, 30),
        has_thumbnail: !!p.main_thumbnail,
        thumbnail_preview: p.main_thumbnail?.substring(0, 50),
        has_multiple_images: Array.isArray(p.multiple_images) && p.multiple_images.length > 0,
        multiple_images_count: Array.isArray(p.multiple_images) ? p.multiple_images.length : 0,
      }))
    )

    return NextResponse.json(serializedProperties)
  } catch (error) {

    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
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

    // Debug: Log SEO fields being saved

    const property = {
      ...body,
      slug,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.collection("listings").insertOne(property)
    return NextResponse.json({ _id: result.insertedId, ...property }, { status: 201 })
  } catch (error) {

    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
