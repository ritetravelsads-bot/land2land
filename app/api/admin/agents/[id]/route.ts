import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import {
  AgentSubscriptionError,
  getAgentSubscriptionOverview,
  parseObjectId,
  setAgentAccountControls,
} from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

type RouteContext = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: RouteContext) {
  try {
    const admin = await getCurrentUser()
    if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const db = await getDatabase()
    const overview = await getAgentSubscriptionOverview(db, id, true, true)
    if (!overview) return NextResponse.json({ error: "Agent not found" }, { status: 404 })
    return NextResponse.json(overview)
  } catch (error) {
    const status = error instanceof AgentSubscriptionError ? error.status : 500
    return NextResponse.json({ error: error instanceof AgentSubscriptionError ? error.message : "Failed to load agent" }, { status })
  }
}

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  try {
    const admin = await getCurrentUser()
    if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const body = await request.json()
    const accountStatus = body.account_status
    if (accountStatus !== undefined && !["active", "inactive", "suspended"].includes(accountStatus)) {
      return NextResponse.json({ error: "Invalid account status" }, { status: 400 })
    }
    const result = await setAgentAccountControls({
      agentId: id,
      actorId: parseObjectId(admin._id, "admin ID"),
      accountStatus,
      adminNotes: typeof body.admin_notes === "string" ? body.admin_notes : undefined,
    })
    return NextResponse.json(result)
  } catch (error) {
    const status = error instanceof AgentSubscriptionError ? error.status : 500
    return NextResponse.json({ error: error instanceof AgentSubscriptionError ? error.message : "Failed to update agent" }, { status })
  }
}
