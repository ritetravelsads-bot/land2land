import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { AgentSubscriptionError, adjustAgentCredits, parseObjectId } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const admin = await getCurrentUser()
    if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const body = await request.json()
    if (body.action !== "grant" && body.action !== "deduct") {
      return NextResponse.json({ error: "Action must be grant or deduct" }, { status: 400 })
    }
    const result = await adjustAgentCredits({
      agentId: id,
      actorId: parseObjectId(admin._id, "admin ID"),
      action: body.action,
      amount: Number(body.amount),
      expiresAt: typeof body.expires_at === "string" && body.expires_at ? body.expires_at : null,
      note: typeof body.note === "string" ? body.note : undefined,
    })
    return NextResponse.json(result, { status: body.action === "grant" ? 201 : 200 })
  } catch (error) {
    const status = error instanceof AgentSubscriptionError ? error.status : 500
    console.error("[admin/agents/credits] Failed to adjust credits:", error)
    return NextResponse.json({ error: error instanceof AgentSubscriptionError ? error.message : "Failed to adjust credits" }, { status })
  }
}
