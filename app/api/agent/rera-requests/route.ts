import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { COLLECTIONS, type ReraRequest, type ReraStageEvent } from "@/lib/models"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const APPLICANT_TYPES = ["individual", "company", "partnership", "huf", "society"]

// GET /api/associate/rera-requests
// Associates get their own requests; admins get everything.
export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const query = user.user_type === "admin" ? {} : { associate: user._id.toString() }

    const requests = await db
      .collection(COLLECTIONS.RERA_REQUESTS)
      .find(query)
      .sort({ created_at: -1 })
      .toArray()

    return NextResponse.json(requests.map((r) => ({ ...r, _id: r._id.toString() })))
  } catch (error) {
    console.error("[v0] Error listing RERA requests:", error)
    return NextResponse.json({ error: "Failed to load RERA requests" }, { status: 500 })
  }
}

// POST /api/associate/rera-requests
// Create a new RERA registration request for one of the associate's listings.
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json().catch(() => ({}))

    const listingId = typeof body.listing === "string" ? body.listing.trim() : ""
    const applicantName = typeof body.applicant_name === "string" ? body.applicant_name.trim() : ""
    const applicantType = APPLICANT_TYPES.includes(body.applicant_type) ? body.applicant_type : ""
    const contactPhone = typeof body.contact_phone === "string" ? body.contact_phone.trim() : ""
    const contactEmail = typeof body.contact_email === "string" ? body.contact_email.trim() : ""

    if (!listingId) {
      return NextResponse.json({ error: "Please select a property." }, { status: 400 })
    }
    if (!applicantName || !applicantType || !contactPhone || !contactEmail) {
      return NextResponse.json(
        { error: "Applicant name, type, phone and email are required." },
        { status: 400 },
      )
    }

    let listingObjectId: ObjectId
    try {
      listingObjectId = new ObjectId(listingId)
    } catch {
      return NextResponse.json({ error: "Invalid property ID." }, { status: 400 })
    }

    const db = await getDatabase()

    // Verify the listing exists and (for associates) belongs to them.
    // Listings store `associate` as the user's ObjectId, so match on that.
    // Also accept the string form to stay robust to either storage type.
    const listingQuery: Record<string, unknown> =
      user.user_type === "admin"
        ? { _id: listingObjectId }
        : { _id: listingObjectId, associate: { $in: [user._id, user._id.toString()] } }
    const listing = await db.collection(COLLECTIONS.LISTINGS).findOne(listingQuery)
    if (!listing) {
      return NextResponse.json({ error: "Property not found or not yours." }, { status: 404 })
    }

    // Prevent duplicate active requests for the same listing.
    const existing = await db.collection(COLLECTIONS.RERA_REQUESTS).findOne({
      listing: listingId,
      status: { $nin: ["approved", "rejected"] },
    })
    if (existing) {
      return NextResponse.json(
        { error: "There is already an active RERA request for this property." },
        { status: 409 },
      )
    }

    const now = new Date()
    const firstEvent: ReraStageEvent = {
      status: "submitted",
      note: "Request submitted by associate.",
      by: user._id.toString(),
      by_role: user.user_type === "admin" ? "admin" : "associate",
      at: now,
    }

    const doc: Omit<ReraRequest, "_id"> = {
      associate: user._id.toString(),
      associate_name: user.username,
      associate_email: user.email,
      listing: listingId,
      listing_name: (listing.property_name as string) || "",
      listing_slug: (listing.slug as string) || "",
      applicant_name: applicantName,
      applicant_type: applicantType,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      project_location:
        typeof body.project_location === "string" ? body.project_location.trim() : "",
      land_area: typeof body.land_area === "string" ? body.land_area.trim() : "",
      estimated_value: Number(body.estimated_value) || 0,
      aadhaar_or_pan: typeof body.aadhaar_or_pan === "string" ? body.aadhaar_or_pan.trim() : "",
      associate_notes: typeof body.associate_notes === "string" ? body.associate_notes.trim() : "",
      status: "submitted",
      requested_documents: [],
      stage_history: [firstEvent],
      created_at: now,
      updated_at: now,
    }

    const result = await db.collection(COLLECTIONS.RERA_REQUESTS).insertOne(doc as any)

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Error creating RERA request:", error)
    return NextResponse.json({ error: "Failed to create RERA request" }, { status: 500 })
  }
}
