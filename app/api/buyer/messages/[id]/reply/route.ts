import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ObjectId } from "mongodb"

// POST — buyer replies to an existing thread
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { message } = body

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 })
    }

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid thread ID" }, { status: 400 })
    }

    const db = await getDatabase()

    // Verify the thread belongs to this buyer
    const thread = await db.collection("buyer_messages").findOne({
      _id: new ObjectId(id),
      buyer_user_id: user._id.toString(),
    })

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    const now = new Date()
    const newMessage = {
      id: new ObjectId().toString(),
      sender: "buyer" as const,
      sender_id: user._id.toString(),
      sender_name: (user as unknown as Record<string, string>).display_name || user.username,
      content: message.trim(),
      created_at: now,
    }

    await db.collection("buyer_messages").updateOne(
      { _id: new ObjectId(id) },
      {
        $push: { messages: newMessage },
        $set: { updated_at: now, status: "open" },
      }
    )

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error("[Buyer Messages Reply API] Error:", error)
    return NextResponse.json({ error: "Failed to send reply" }, { status: 500 })
  }
}
