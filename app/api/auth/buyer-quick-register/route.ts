import { getDatabase } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { rateLimitByIp, createRateLimitResponse } from "@/lib/rate-limit"

/**
 * POST /api/auth/buyer-quick-register
 *
 * Auto-registers a buyer account using only name + phone (from Quick Enquiry).
 * If a user with the same phone already exists:
 *   - Returns existing user session (logs them in silently).
 * If no user exists:
 *   - Creates a new user with user_type="customer", generating a random password.
 *   - Sets the auth_token cookie so the user is immediately logged in.
 *
 * Returns: { success, user: { id, username, email, user_type, phone_number }, isNew }
 */
export async function POST(request: Request) {
  try {
    // Rate limit: 3 attempts per hour per IP
    const rateLimitResult = rateLimitByIp(request, 3, 60 * 60 * 1000)
    if (!rateLimitResult.allowed) {
      return createRateLimitResponse(rateLimitResult.retryAfter)
    }

    const body = await request.json()
    const { name, phone } = body

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      )
    }

    // Sanitise phone – keep digits only for storage/lookup
    const cleanPhone = phone.replace(/\D/g, "")
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      )
    }

    const db = await getDatabase()
    const collection = db.collection("users")

    // --- Check if a buyer already exists with this phone ---
    const existingUser = await collection.findOne({ phone_number: cleanPhone })

    let userId: string
    let username: string
    let userEmail: string
    let userType: string
    let isNew = false

    if (existingUser) {
      // Existing user – log them in silently
      userId = existingUser._id.toString()
      username = existingUser.username
      userEmail = existingUser.email || ""
      userType = existingUser.user_type

      // Update last login
      await collection.updateOne(
        { _id: existingUser._id },
        { $set: { last_login: new Date() } }
      )
    } else {
      // New user – auto-register as buyer (customer)
      isNew = true

      // Build a safe username from name + phone suffix
      const namePart = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "_")
        .replace(/_+/g, "_")
        .replace(/^_|_$/g, "")
        .substring(0, 20)
      const phoneSuffix = cleanPhone.slice(-4)
      const baseUsername = `${namePart}_${phoneSuffix}`

      // Ensure username uniqueness
      let finalUsername = baseUsername
      let attempt = 0
      while (await collection.findOne({ username: finalUsername })) {
        attempt++
        finalUsername = `${baseUsername}_${attempt}`
      }

      // Random strong password – user can reset later
      const randomPassword = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
      const hashedPassword = await bcrypt.hash(randomPassword, 10)

      // Placeholder email (no email provided in quick enquiry)
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
        is_quick_registered: true, // flag so they can complete profile later
      })

      userId = result.insertedId.toString()
      finalUsername = finalUsername
      username = finalUsername
      userEmail = placeholderEmail
      userType = "customer"
    }

    // --- Create auth token (same format as login route) ---
    const tokenPayload = { userId, email: userEmail }
    const token = Buffer.from(JSON.stringify(tokenPayload)).toString("base64")

    // --- Set HTTP-only cookie ---
    const cookieStore = await cookies()
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return NextResponse.json({
      success: true,
      isNew,
      user: {
        id: userId,
        username,
        email: userEmail,
        user_type: userType,
        phone_number: cleanPhone,
      },
    })
  } catch (error) {
    console.error("[BuyerQuickRegister] Error:", error)
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    )
  }
}
