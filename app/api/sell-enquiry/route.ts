import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import {
  sendEmail,
  sellEnquiryAdminTemplate,
  sellEnquiryOwnerTemplate,
} from "@/lib/email"

const ADMIN_EMAIL = "info@land2land.com"

export async function POST(request: Request) {  const user = await requireAuthWithCsrf(request)

  try {
    const body = await request.json()

    const {
      propertyType,
      size,
      sizeUnit,
      location,
      state,
      price,
      facilities,
      description,
      ownerName,
      ownerPhone,
      ownerEmail,
    }} = body

    // Required field validation
    if (!ownerName || !ownerPhone || !propertyType || !size || !location) {
      return NextResponse.json(
        { error: "Missing required fields: owner name, phone, property type, size, and location are required." },
        { status: 400 }
      )
    }

    // Phone validation — must be at least 10 digits
    const cleanPhone = ownerPhone.replace(/\D/g, "")
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      )
    }

    // Email validation (optional field)
    if (ownerEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(ownerEmail)) {
        return NextResponse.json(
          { error: "Please enter a valid email address." },
          { status: 400 }
        )
      }
    }

    // Persist to MongoDB
    const db = await getDatabase()
    const result = await db.collection("sell_enquiries").insertOne({
      owner_name: ownerName,
      owner_phone: cleanPhone,
      owner_email: ownerEmail || "",
      property_type: propertyType,
      size: size,
      size_unit: sizeUnit || "acres",
      location,
      state: state || "",
      price: price || "",
      facilities: facilities || [],
      description: description || "",
      status: "new",
      created_at: new Date(),
      updated_at: new Date(),
    })

    const emailData = {
      ownerName,
      ownerEmail: ownerEmail || "",
      ownerPhone,
      propertyType,
      size,
      sizeUnit: sizeUnit || "acres",
      location,
      state: state || "",
      price: price || "0",
      facilities: facilities || [],
      description: description || "",
    }

    // Send notification to admin at info@land2land.com
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Sell Enquiry: ${size} ${sizeUnit || "acres"} ${propertyType} in ${state || location}`,
      html: sellEnquiryAdminTemplate(emailData),
    })

    // Send confirmation to the owner (only if they provided an email)
    if (ownerEmail) {
      await sendEmail({
        to: ownerEmail,
        subject: "Your Property Listing Request — Land2Land",
        html: sellEnquiryOwnerTemplate(emailData),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Your listing request has been submitted successfully. Our team will contact you within 24 hours.",
      id: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("[Sell Enquiry API] Error:", error)
    return NextResponse.json(
      { error: "Failed to submit your request. Please try again or call us directly." },
      { status: 500 }
    )
  }
}
