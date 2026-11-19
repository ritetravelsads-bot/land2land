import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ensureAgentSubscriptionIndexes, getAgentSubscriptionOverview } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const db = await getDatabase()
    await ensureAgentSubscriptionIndexes(db)
    const overview = await getAgentSubscriptionOverview(db, user._id, false, true)
    if (!overview) return NextResponse.json({ error: "Agent account not found" }, { status: 404 })
    return NextResponse.json(overview)
  } catch (error) {
    console.error("[agent/subscription] Failed to load subscription:", error)
    return NextResponse.json({ error: "Failed to load subscription details" }, { status: 500 })
  }
}
