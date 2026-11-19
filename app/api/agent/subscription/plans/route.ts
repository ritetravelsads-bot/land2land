import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { ensureAgentSubscriptionIndexes, serializeMongoValue } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const db = await getDatabase()
    await ensureAgentSubscriptionIndexes(db)
    const plans = await db.collection("subscription_plans")
      .find({ status: "active" })
      .project({ plan_code: 1, name: 1, description: 1, billing_cycle: 1, price_amount: 1, currency: 1, duration_days: 1, publishing_limit: 1, benefits: 1, featured: 1, display_order: 1, purchase_enabled: 1 })
      .sort({ display_order: 1 })
      .toArray()
    return NextResponse.json({ plans: serializeMongoValue(plans) })
  } catch (error) {
    console.error("[agent/subscription/plans] Failed to load plans:", error)
    return NextResponse.json({ error: "Failed to load available plans" }, { status: 500 })
  }
}
