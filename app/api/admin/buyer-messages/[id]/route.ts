import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ObjectId } from "mongodb"
import { requireAdminWithCsrf } from "@/lib/auth"

// GET a single thread (admin)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const thread = await db
      .collection("buyer_messages")
      .findOne({ _id: new ObjectId(id) })

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json({ ...thread, _id: thread._id.toString() })
  } catch (error) {
    console.error("[Admin Buyer Messages GET] Error:", error)
    return NextResponse.json({ error: "Failed to fetch thread" }, { status: 500 })
  }
}

// PATCH — admin replies or changes thread status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const body = await request.json()
    const { reply, status } = body

    const db = await getDatabase()
    const now = new Date()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const update: any = { $set: { updated_at: now } }

    if (reply?.trim()) {
      const newMessage = {
        id: new ObjectId().toString(),
        sender: "admin" as const,
        sender_id: user._id.toString(),
        sender_name: user.username,
        content: reply.trim(),
        created_at: now,
      }
      update.$push = { messages: newMessage }
      update.$set.status = "replied"
    }

    if (status) {
      update.$set.status = status
    }

    const result = await db
      .collection("buyer_messages")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        update,
        { returnDocument: "after" }
      )

    if (!result) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json({ ...result, _id: result._id.toString() })
  } catch (error) {
    console.error("[Admin Buyer Messages PATCH] Error:", error)
    return NextResponse.json({ error: "Failed to update thread" }, { status: 500 })
  }
}
