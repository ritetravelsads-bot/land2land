import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import {
  AgentSubscriptionError,
  assignAgentPlan,
  parseObjectId,
  updateAgentSubscription,
} from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

type RouteContext = { params: Promise<{ id: string }> }

export async function POST(request: NextRequest, { params }: RouteContext) {
  try {
    const admin = await getCurrentUser()
    if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const body = await request.json()
    const actorId = parseObjectId(admin._id, "admin ID")

    if (body.action === "assign") {
      if (!["free", "basic", "standard", "premium", "business"].includes(body.plan_code)) {
        return NextResponse.json({ error: "Choose a valid plan category" }, { status: 400 })
      }
      const result = await assignAgentPlan({
        agentId: id,
        actorId,
        planCode: body.plan_code,
        customQuota: body.custom_quota === "" || body.custom_quota == null ? undefined : Number(body.custom_quota),
        startsAt: typeof body.starts_at === "string" && body.starts_at ? body.starts_at : undefined,
        expiresAt: typeof body.expires_at === "string" && body.expires_at ? body.expires_at : undefined,
        note: typeof body.note === "string" ? body.note : undefined,
      })
      return NextResponse.json({ success: true, subscription: result }, { status: 201 })
    }

    if (!["adjust_quota", "reset_usage", "set_expiry"].includes(body.action)) {
      return NextResponse.json({ error: "Invalid subscription action" }, { status: 400 })
    }
    const result = await updateAgentSubscription({
      agentId: id,
      actorId,
      action: body.action,
      planQuota: body.plan_quota === "" || body.plan_quota == null ? undefined : Number(body.plan_quota),
      expiresAt: typeof body.expires_at === "string" && body.expires_at ? body.expires_at : undefined,
      note: typeof body.note === "string" ? body.note : undefined,
    })
    return NextResponse.json(result)
  } catch (error) {
    const status = error instanceof AgentSubscriptionError ? error.status : 500
    console.error("[admin/agents/subscription] Failed to update subscription:", error)
    return NextResponse.json({ error: error instanceof AgentSubscriptionError ? error.message : "Failed to update subscription" }, { status })
  }
}
