import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "associate") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const db = await getDatabase()
    const ticket = await db.collection("tickets").findOne({
      _id: new ObjectId(id),
      user_id: user._id?.toString(),
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    return NextResponse.json(ticket)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch ticket" }, { status: 500 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "associate") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const db = await getDatabase()

    const ticket = await db.collection("tickets").findOne({
      _id: new ObjectId(id),
      user_id: user._id?.toString(),
    })

    if (!ticket) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 })
    }

    const reply = {
      id: new ObjectId().toString(),
      message,
      sender_type: "associate",
      sender_name: user.username || user.email,
      created_at: new Date(),
    }

    await db.collection("tickets").updateOne(
      { _id: new ObjectId(id) },
      {
        $push: { replies: reply } as any,
        $set: { updated_at: new Date() },
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 })
  }
}
