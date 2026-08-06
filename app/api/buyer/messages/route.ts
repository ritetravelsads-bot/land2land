import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ObjectId } from "mongodb"
import { requireAuthWithCsrf } from "@/lib/auth"

// GET — list all message threads for the authenticated buyer
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()

    const threads = await db
      .collection("buyer_messages")
      .find({ buyer_user_id: user._id.toString() })
      .sort({ updated_at: -1 })
      .toArray()

    const serialized = threads.map((t) => ({ ...t, _id: t._id.toString() }))

    return NextResponse.json({ threads: serialized })
  } catch (error) {
    console.error("[Buyer Messages API] GET error:", error)
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}

// POST — create a new message thread (buyer sends a new message)
export async function POST(request: NextRequest) { try { const user = await requireAuthWithCsrf(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { subject, message, property_id, property_name, property_slug } = body

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Subject and message are required" }, { status: 400 })
    }

    const db = await getDatabase()

    const now = new Date()
    const thread = {
      buyer_user_id: user._id.toString(),
      buyer_name: (user as unknown as Record<string, string>).display_name || user.username,
      buyer_phone: user.phone_number || "",
      buyer_email: user.email || "",
      subject: subject.trim(),
      property_id: property_id || null,
      property_name: property_name || null,
      property_slug: property_slug || null,
      status: "open" as const,
      messages: [
        {
          id: new ObjectId().toString(),
          sender: "buyer" as const,
          sender_id: user._id.toString(),
          sender_name: (user as unknown as Record<string, string>).display_name || user.username,
          content: message.trim(),
          created_at: now,
        },
      ],
      created_at: now,
      updated_at: now,
    }

    const result = await db.collection("buyer_messages").insertOne(thread)

    return NextResponse.json(
      { _id: result.insertedId.toString(), ...thread },
      { status: 201 }
    )
  } catch (error) {
    console.error("[Buyer Messages API] POST error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
