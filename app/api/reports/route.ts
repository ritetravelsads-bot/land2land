import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"

const REASONS = ["spam", "fraud", "inaccurate", "offensive", "duplicate", "other"] as const
const TARGETS = ["property", "user", "review"] as const

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    const targetType = body?.targetType
    const targetId = typeof body?.targetId === "string" ? body.targetId.trim().slice(0, 100) : ""
    const reason = body?.reason
    const details = typeof body?.details === "string" ? body.details.trim().slice(0, 1000) : ""
    const reporterEmail =
      typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 200) : ""

    if (!TARGETS.includes(targetType) || !targetId || !REASONS.includes(reason)) {
      return NextResponse.json({ error: "Invalid report" }, { status: 400 })
    }

    const user = await getCurrentUser()
    const { db } = await connectToDatabase()

    await db.collection("content_reports").insertOne({
      target_type: targetType,
      target_id: targetId,
      reason,
      details,
      reporter_id: user?._id ?? null,
      reporter_email: user?.email ?? (reporterEmail || null),
      status: "open",
      created_at: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Report submission failed:", error)
    return NextResponse.json({ error: "Could not submit report" }, { status: 500 })
  }
}
