import { getDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { escapeRegexChars } from "@/lib/sanitize-regex"

// Disable caching for this route to ensure fresh data
export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(req: NextRequest) {
  try {
    const db = await getDatabase()
    const searchParams = req.nextUrl.searchParams

    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Build the query
    const query: any = {}
    const andConditions: any[] = []

    // Status filter - active or available
    andConditions.push({
      $or: [{ status: "active" }, { status: "available" }, { status: { $exists: false } }]
    })

    // Moderation filter - only approved listings are public.
    // Legacy listings without a review_status are treated as approved.
    andConditions.push({
      $or: [{ review_status: "approved" }, { review_status: { $exists: false } }, { review_status: null }]
    })

    // Search query - property name, address, neighborhood, city, developer
    // Sanitized to prevent ReDoS attacks
    const search = searchParams.get("search")
    if (search) {
      const escapedSearch = escapeRegexChars(search)
      if (escapedSearch) {
        andConditions.push({
          $or: [
            { property_name: { $regex: escapedSearch, $options: "i" } },
            { address: { $regex: escapedSearch, $options: "i" } },
            { neighborhood: { $regex: escapedSearch, $options: "i" } },
            { city: { $regex: escapedSearch, $options: "i" } },
            { state: { $regex: escapedSearch, $options: "i" } },
            { seller_name: { $regex: escapedSearch, $options: "i" } },
            { zoning: { $regex: escapedSearch, $options: "i" } },
          ]
        })
      }
    }

    // State filter - sanitized to prevent ReDoS
    const state = searchParams.get("state")
    if (state) {
      const escapedState = escapeRegexChars(state)
      if (escapedState) {
        andConditions.push({ state: { $regex: escapedState, $options: "i" } })
      }
    }

    // City filter - sanitized to prevent ReDoS
    const city = searchParams.get("city")
    if (city) {
      const escapedCity = escapeRegexChars(city)
      if (escapedCity) {
        andConditions.push({ city: { $regex: escapedCity, $options: "i" } })
      }
    }

    // Location filter - sanitized to prevent ReDoS (searches address, neighborhood, city, area)
    const location = searchParams.get("location")
    if (location) {
      const escapedLocation = escapeRegexChars(location)
      if (escapedLocation) {
        andConditions.push({
          $or: [
            { address: { $regex: escapedLocation, $options: "i" } },
            { neighborhood: { $regex: escapedLocation, $options: "i" } },
            { city: { $regex: escapedLocation, $options: "i" } },
            { state: { $regex: escapedLocation, $options: "i" } },
            { property_name: { $regex: escapedLocation, $options: "i" } },
          ]
        })
      }
    }

    // Category / Property Type filter - sanitized to prevent ReDoS
    const category = searchParams.get("category")
    if (category) {
      const escapedCategory = escapeRegexChars(category)
      if (escapedCategory) {
        andConditions.push({
          $or: [
            { property_type: { $regex: escapedCategory, $options: "i" } },
            { property_category: { $regex: escapedCategory, $options: "i" } }
          ]
        })
      }
    }

    // Property Type filter - sanitized to prevent ReDoS, supports multiple values (OR condition)
    const propertyTypes = searchParams.getAll("property_type")
    if (propertyTypes.length > 0) {
      const escapedTypes = propertyTypes.map(escapeRegexChars).filter(Boolean)
      if (escapedTypes.length > 0) {
        andConditions.push({
          $or: escapedTypes.map(pt => ({ property_type: { $regex: `^${pt}$`, $options: "i" } }))
        })
      }
    }

    // Property Category filter - sanitized to prevent ReDoS, supports multiple values (OR condition)
    const propertyCategories = searchParams.getAll("property_category")
    if (propertyCategories.length > 0) {
      const escapedCategories = propertyCategories.map(escapeRegexChars).filter(Boolean)
      if (escapedCategories.length > 0) {
        andConditions.push({
          $or: escapedCategories.map(pc => ({ property_category: { $regex: `^${pc}$`, $options: "i" } }))
        })
      }
    }

    // Target Segment filter - sanitized to prevent ReDoS, supports multiple values (OR condition)
    const targetSegments = searchParams.getAll("target_segment")
    if (targetSegments.length > 0) {
      const escapedSegments = targetSegments.map(escapeRegexChars).filter(Boolean)
      if (escapedSegments.length > 0) {
        andConditions.push({
          $or: escapedSegments.map(ts => ({ target_segment: { $regex: `^${ts}$`, $options: "i" } }))
        })
      }
    }

    // Possession Type filter - sanitized to prevent ReDoS, supports multiple values (OR condition)
    const possessionTypes = searchParams.getAll("possession_type")
    if (possessionTypes.length > 0) {
      const escapedPossessionTypes = possessionTypes.map(escapeRegexChars).filter(Boolean)
      if (escapedPossessionTypes.length > 0) {
        andConditions.push({
          $or: escapedPossessionTypes.map(pt => ({ possession_type: { $regex: `^${pt}$`, $options: "i" } }))
        })
      }
    }

    // Listing Type filter (builder_project, resale, rental, new)
    const listingType = searchParams.get("listing_type")
    if (listingType) {
      andConditions.push({ listing_type: listingType })
    }

    // Project Status filter (launched, under_construction, ready_to_move)
    const projectStatus = searchParams.get("project_status")
    if (projectStatus) {
      andConditions.push({ project_status: projectStatus })
    }

    // Target Segment filter (luxury, premium, mid, affordable)
    const segment = searchParams.get("segment")
    if (segment) {
      andConditions.push({ target_segment: segment })
    }

    // Price filters
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    if (minPrice) {
      andConditions.push({ lowest_price: { $gte: Number.parseInt(minPrice) } })
    }
    if (maxPrice) {
      andConditions.push({
        $or: [
          { lowest_price: { $lte: Number.parseInt(maxPrice) } },
          { max_price: { $lte: Number.parseInt(maxPrice) } }
        ]
      })
    }

    // --- Land-specific filters ---

    // Area unit filter (acre, bigha, hectare, sqft, etc.)
    const areaUnit = searchParams.get("area_unit")
    if (areaUnit) {
      andConditions.push({ area_unit: areaUnit })
    }

    // Ownership type filter (freehold, leasehold, etc.)
    const ownershipType = searchParams.get("ownership_type")
    if (ownershipType) {
      andConditions.push({ ownership_type: ownershipType })
    }

    // Facing filter (north, south, east, west, etc.)
    const facing = searchParams.get("facing")
    if (facing) {
      andConditions.push({ facing: facing })
    }

    // Zoning filter
    const zoning = searchParams.get("zoning")
    if (zoning) {
      andConditions.push({ zoning: { $regex: zoning, $options: "i" } })
    }

    // Corner plot filter
    if (searchParams.get("corner_plot") === "true") {
      andConditions.push({ corner_plot: true })
    }

    // Road access filter
    if (searchParams.get("road_access") === "true") {
      andConditions.push({ road_access: true })
    }

    // Water availability filter
    if (searchParams.get("water_available") === "true") {
      andConditions.push({ water_available: true })
    }

    // Electricity availability filter
    if (searchParams.get("electricity_available") === "true") {
      andConditions.push({ electricity_available: true })
    }

    // Boundary wall filter
    if (searchParams.get("boundary_wall") === "true") {
      andConditions.push({ boundary_wall: true })
    }

    // Negotiable price filter
    if (searchParams.get("is_negotiable") === "true") {
      andConditions.push({ is_negotiable: true })
    }

    // RERA registered filter
    const reraRegistered = searchParams.get("rera_registered")
    if (reraRegistered === "true") {
      andConditions.push({
        $or: [
          { rera_registered: true },
          { rera_id: { $exists: true, $ne: "" } },
          { rera_no: { $exists: true, $ne: "" } }
        ]
      })
    }

    // Seller filter (supports legacy developer_id param)
    const sellerId = searchParams.get("seller_id") || searchParams.get("developer_id")
    if (sellerId) {
      try {
        andConditions.push({ seller_id: new ObjectId(sellerId) })
      } catch (e) {
        // Invalid ObjectId, skip
      }
    }

    // Seller name filter (supports legacy developer/developer_name params)
    const sellerName =
      searchParams.get("seller") ||
      searchParams.get("seller_name") ||
      searchParams.get("developer") ||
      searchParams.get("developer_name")
    if (sellerName) {
      andConditions.push({ seller_name: { $regex: sellerName, $options: "i" } })
    }

    // Featured filter
    const featured = searchParams.get("featured")
    if (featured === "true") {
      andConditions.push({ is_featured: true })
    }

    // Area filters (min/max sqft, canonical area_sqft)
    const minArea = searchParams.get("minArea")
    const maxArea = searchParams.get("maxArea")
    if (minArea) {
      andConditions.push({ area_sqft: { $gte: Number.parseInt(minArea) } })
    }
    if (maxArea) {
      andConditions.push({ area_sqft: { $lte: Number.parseInt(maxArea) } })
    }

    // Build final query
    if (andConditions.length > 0) {
      query.$and = andConditions
    }

    // Sorting - always include _id as secondary sort to ensure consistent pagination
    const sortBy = searchParams.get("sort") || "featured"
    let sortOption: any = { is_featured: -1, created_at: -1, _id: -1 }
    
    switch (sortBy) {
      case "price_low":
        sortOption = { lowest_price: 1, _id: 1 }
        break
      case "price_high":
        sortOption = { lowest_price: -1, _id: -1 }
        break
      case "newest":
        sortOption = { created_at: -1, _id: -1 }
        break
      case "oldest":
        sortOption = { created_at: 1, _id: 1 }
        break
      case "name":
        sortOption = { property_name: 1, _id: 1 }
        break
    }

    const total = await db.collection("listings").countDocuments(query)
    const properties = await db
      .collection("listings")
      .find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .toArray()

    // Serialize _id to string
    const serializedProperties = properties.map(p => ({
      ...p,
      _id: p._id.toString(),
    }))

    return NextResponse.json({
      properties: serializedProperties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("[v0] Error fetching properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
