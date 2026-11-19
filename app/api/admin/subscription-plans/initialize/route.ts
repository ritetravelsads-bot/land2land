import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import {
  AgentSubscriptionError,
  ensureAgentSubscriptionIndexes,
  initializeDefaultPlanCategories,
  parseObjectId,
  recordAgentAdminActivity,
  runAgentTransaction,
  serializeMongoValue,
} from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST() {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const db = await getDatabase()
    await ensureAgentSubscriptionIndexes(db)
    const actorId = parseObjectId(user._id, "admin ID")
    const plans = await initializeDefaultPlanCategories(db, actorId)
    await runAgentTransaction(async (transactionDb, session) => {
      await recordAgentAdminActivity(transactionDb, session, {
        actorId,
        entityType: "subscription_plan",
        entityId: "default-plan-categories",
        action: "default_plan_categories_initialized",
        after: { categories: plans.length },
      })
    })
    return NextResponse.json({ success: true, plans: serializeMongoValue(plans) })
  } catch (error) {
    const status = error instanceof AgentSubscriptionError ? error.status : 500
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not initialize plans." }, { status })
  }
}
