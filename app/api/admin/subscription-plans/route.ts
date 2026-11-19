import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import {
  AgentSubscriptionError,
  ensureAgentSubscriptionIndexes,
  parseObjectId,
  recordAgentAdminActivity,
  runAgentTransaction,
  serializeMongoValue,
  validatePlanConfiguration,
} from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

function errorResponse(error: unknown) {
  if (error instanceof AgentSubscriptionError) {
    return NextResponse.json({ error: error.message, code: error.code }, { status: error.status })
  }
  if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
    return NextResponse.json({ error: "A plan already exists for that category." }, { status: 409 })
  }
  console.error("[admin/subscription-plans] Error:", error)
  return NextResponse.json({ error: "Could not save subscription plan." }, { status: 500 })
}

export async function GET() {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const db = await getDatabase()
    await ensureAgentSubscriptionIndexes(db)
    const plans = await db.collection("subscription_plans").find({}).sort({ display_order: 1, name: 1 }).toArray()
    return NextResponse.json({ plans: serializeMongoValue(plans) })
  } catch (error) {
    return errorResponse(error)
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const body = validatePlanConfiguration(await request.json())
    const actorId = parseObjectId(user._id, "admin ID")
    return await runAgentTransaction(async (db, session) => {
      const now = new Date()
      const plan: Record<string, any> = { ...body, created_by: actorId, updated_by: actorId, created_at: now, updated_at: now }
      const result = await db.collection("subscription_plans").insertOne(plan, { session })
      await recordAgentAdminActivity(db, session, {
        actorId,
        entityType: "subscription_plan",
        entityId: result.insertedId.toHexString(),
        action: "plan_created",
        after: { plan_code: plan.plan_code, name: plan.name, status: plan.status },
      })
      return NextResponse.json({ success: true, plan: serializeMongoValue({ ...plan, _id: result.insertedId }) }, { status: 201 })
    })
  } catch (error) {
    return errorResponse(error)
  }
}
