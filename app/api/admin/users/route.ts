import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import type { NextRequest } from "next/server"
import { requireAdminWithCsrf } from "@/lib/auth"

const ALLOWED_USER_TYPES = ["admin", "associate", "customer", "buyer", "seller", "builder"]

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const users = await db.collection("users")
      .find({})
      .project({
        _id: 1,
        username: 1,
        email: 1,
        phone_number: 1,
        user_type: 1,
        profile_picture: 1,
        created_at: 1,
        date_joined: 1,
        is_verified: 1
      })
      .sort({ created_at: -1, date_joined: -1 })
      .toArray()

    // Convert ObjectId to string for all users
    const serializedUsers = users.map(u => ({
      ...u,
      _id: u._id.toString()
    }))

    return NextResponse.json(serializedUsers)
  } catch (error) {

    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) { try { const user = await requireAdminWithCsrf(request)
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { username, email, password, phone_number, user_type } = body

    // Validate required fields
    if (!username || !email || !password || !phone_number || !user_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Validate user type
    if (!ALLOWED_USER_TYPES.includes(user_type)) {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }

    const db = await getDatabase()
    const collection = db.collection("users")

    // Check if user already exists
    const existingUser = await collection.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "A user with this email or username already exists" },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await collection.insertOne({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      phone_number,
      user_type,
      date_joined: new Date(),
      created_at: new Date(),
      is_verified: true,
      profile_picture: null,
    })

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: {
          _id: result.insertedId.toString(),
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          phone_number,
          user_type,
          created_at: new Date().toISOString(),
          is_verified: true,
        },
      },
      { status: 201 }
    )
  } catch (error) {

    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) { try { const user = await requireAdminWithCsrf(request)
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    const db = await getDatabase()

    // Check if user exists and is not an admin
    let objectId: ObjectId
    try {
      objectId = new ObjectId(userId)
    } catch {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 })
    }

    const targetUser = await db.collection("users").findOne({ _id: objectId })
    
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (targetUser.user_type === "admin") {
      return NextResponse.json({ error: "Cannot delete admin users" }, { status: 403 })
    }

    // Delete the user
    await db.collection("users").deleteOne({ _id: objectId })

    return NextResponse.json({ success: true, message: "User deleted successfully" })
  } catch (error) {

    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 })
  }
}
