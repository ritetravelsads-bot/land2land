import { getDatabase } from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import {
  sendEmail,
  propertyEnquiryAdminTemplate,
  propertyEnquiryUserTemplate,
} from "@/lib/email"
import type { LeadSource } from "@/lib/models"

const COMPANY_EMAIL = process.env.SMTP_USER || "land2land.comfobirth@gmail.com"

/**
 * Auto-register or log-in a buyer by phone.
 * Returns { userId, username, email, userType, isNew } and sets auth_token cookie.
 */
async function autoRegisterBuyer(
  name: string,
  phone: string,
  req: NextRequest
): Promise<{ userId: string; username: string; email: string; userType: string; isNew: boolean }> {
  const cleanPhone = phone.replace(/\D/g, "")
  const db = await getDatabase()
  const collection = db.collection("users")

  const existingUser = await collection.findOne({ phone_number: cleanPhone })

  let userId: string
  let username: string
  let userEmail: string
  let userType: string
  let isNew = false

  if (existingUser) {
    userId = existingUser._id.toString()
    username = existingUser.username
    userEmail = existingUser.email || ""
    userType = existingUser.user_type
    await collection.updateOne({ _id: existingUser._id }, { $set: { last_login: new Date() } })
  } else {
    isNew = true
    const namePart = name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_|_$/g, "")
      .substring(0, 20)
    const phoneSuffix = cleanPhone.slice(-4)
    const baseUsername = `${namePart}_${phoneSuffix}`
    let finalUsername = baseUsername
    let attempt = 0
    while (await collection.findOne({ username: finalUsername })) {
      attempt++
      finalUsername = `${baseUsername}_${attempt}`
    }

    const randomPassword =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
    const hashedPassword = await bcrypt.hash(randomPassword, 10)
    const placeholderEmail = `buyer_${cleanPhone}@land2land.placeholder`

    const result = await collection.insertOne({
      username: finalUsername,
      email: placeholderEmail,
      password: hashedPassword,
      phone_number: cleanPhone,
      display_name: name,
      user_type: "customer",
      date_joined: new Date(),
      last_login: new Date(),
      profile_picture: null,
      is_quick_registered: true,
    })

    userId = result.insertedId.toString()
    username = finalUsername
    userEmail = placeholderEmail
    userType = "customer"
  }

  // Set auth_token cookie so user is immediately logged in
  const token = Buffer.from(JSON.stringify({ userId, email: userEmail })).toString("base64")
  const cookieStore = await cookies()
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  })

  return { userId, username, email: userEmail, userType, isNew }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const { 
      name, 
      email, 
      phone, 
      message, 
      property_id, 
      property_name,
      property_slug,
      company_name,
      team_size,
      enquiry_type,
      source_url,
      budget_min,
      budget_max,
      preferred_bhk,
      preferred_location,
    } = body

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      )
    }

    // Validate email if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: "Invalid email address" },
          { status: 400 }
        )
      }
    }

    // Validate phone
    const phoneRegex = /^[6-9]\d{9}$/
    if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    // Auto-register / login buyer before saving the enquiry
    let buyerInfo: Awaited<ReturnType<typeof autoRegisterBuyer>> | null = null
    try {
      buyerInfo = await autoRegisterBuyer(name, phone, req)
    } catch (regError) {
      // Non-fatal: enquiry is still saved even if registration fails
      console.error("[Property Enquiry API] Buyer auto-register failed:", regError)
    }

    // Save enquiry to database
    const db = await getDatabase()
    const enquiry = {
      name,
      email: email || "",
      phone,
      message: message || "",
      property_id: property_id || "",
      property_name: property_name || "",
      property_slug: property_slug || "",
      company_name: company_name || "",
      team_size: team_size || "",
      enquiry_type: enquiry_type || "property",
      source: enquiry_type === "office_space" ? "office_space_detail_page" : "property_detail_page",
      buyer_user_id: buyerInfo?.userId || null,
      status: "new",
      created_at: new Date(),
      updated_at: new Date(),
    }

    const result = await db.collection("enquiries").insertOne(enquiry)

    // Get property owner info if property_id is provided
    let propertyOwnerId: string | null = null
    let propertyOwnerType: "admin" | "associate" = "admin"
    
    if (property_id) {
      try {
        const property = await db.collection("listings").findOne({ 
          _id: new ObjectId(property_id) 
        })
        if (property && property.associate) {
          propertyOwnerId = property.associate
          propertyOwnerType = "associate"
        }
      } catch {
        // Invalid property ID, continue without owner info
      }
    }

    // Create a lead record for tracking
    const leadSource: LeadSource = "property_enquiry"
    
    const lead = {
      name,
      email: email || "",
      phone,
      message: message || "",
      property_id: property_id || null,
      property_name: property_name || null,
      property_slug: property_slug || null,
      source: leadSource,
      source_url: source_url || null,
      property_owner_id: propertyOwnerId,
      property_owner_type: propertyOwnerType as "admin" | "associate",
      buyer_user_id: buyerInfo?.userId || null,
      status: "new" as const,
      priority: "medium" as const,
      notes: [],
      budget_min: budget_min ? Number(budget_min) : null,
      budget_max: budget_max ? Number(budget_max) : null,
      preferred_bhk: preferred_bhk ? Number(preferred_bhk) : null,
      preferred_location: preferred_location || null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    // Insert lead into leads collection
    await db.collection("leads").insertOne(lead)

    // Send email notification to admin
    await sendEmail({
      to: COMPANY_EMAIL,
      subject: `New Property Enquiry: ${property_name || "General"}`,
      html: propertyEnquiryAdminTemplate({
        name,
        email,
        phone,
        message,
        property_name,
        property_slug,
      }),
    })

    // Send confirmation email to user if email provided
    if (email) {
      await sendEmail({
        to: email,
        subject: `Thank you for your enquiry - Land2Land`,
        html: propertyEnquiryUserTemplate({
          name,
          property_name,
          property_slug,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      id: result.insertedId.toString(),
      // Return buyer session info so the client can update its auth state
      buyer: buyerInfo
        ? {
            id: buyerInfo.userId,
            username: buyerInfo.username,
            user_type: buyerInfo.userType,
            isNew: buyerInfo.isNew,
          }
        : null,
    })
  } catch (error) {
    console.error("[Property Enquiry API] Error:", error)
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    )
  }
}
