import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { NextResponse } from "next/server"
import {
  AgentSubscriptionError,
  parseObjectId,
  recordAgentAdminActivity,
  runAgentTransaction,
  serializeMongoValue,
  validatePlanConfiguration,
} from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

type RouteContext = { params: Promise<{ id: string }> }

function errorResponse(error: unknown) {
  if (error instanceof AgentSubscriptionError) {
    return NextResponse.json({ error: error.message, code: error.code }, { status: error.status })
  }
  console.error("[admin/subscription-plans/[id]] Error:", error)
  return NextResponse.json({ error: "Could not update subscription plan." }, { status: 500 })
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const planId = parseObjectId(id, "plan ID")
    const actorId = parseObjectId(user._id, "admin ID")
    const body = await request.json()
    return await runAgentTransaction(async (db, session) => {
      const existing = await db.collection("subscription_plans").findOne({ _id: planId }, { session })
      if (!existing) throw new AgentSubscriptionError("Plan not found.", 404, "PLAN_NOT_FOUND")
      const merged = validatePlanConfiguration({ ...existing, ...body, plan_code: existing.plan_code })
      const { _id: _ignoredId, created_at: _createdAt, created_by: _createdBy, ...updates } = merged
      await db.collection("subscription_plans").updateOne(
        { _id: planId },
        { $set: { ...updates, updated_by: actorId, updated_at: new Date() } },
        { session },
      )
      await recordAgentAdminActivity(db, session, {
        actorId,
        entityType: "subscription_plan",
        entityId: planId.toHexString(),
        action: "plan_updated",
        before: { plan_code: existing.plan_code, name: existing.name, status: existing.status, price_amount: existing.price_amount, publishing_limit: existing.publishing_limit },
        after: { plan_code: merged.plan_code, name: merged.name, status: merged.status, price_amount: merged.price_amount, publishing_limit: merged.publishing_limit },
      })
      return NextResponse.json({ success: true, plan: serializeMongoValue({ ...existing, ...updates, updated_by: actorId, updated_at: new Date() }) })
    })
  } catch (error) {
    return errorResponse(error)
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const { id } = await params
    const planId = parseObjectId(id, "plan ID")
    const actorId = parseObjectId(user._id, "admin ID")
    return await runAgentTransaction(async (db, session) => {
      const existing = await db.collection("subscription_plans").findOne({ _id: planId }, { session })
      if (!existing) throw new AgentSubscriptionError("Plan not found.", 404, "PLAN_NOT_FOUND")
      await db.collection("subscription_plans").updateOne(
        { _id: planId },
        { $set: { status: "inactive", purchase_enabled: false, updated_by: actorId, updated_at: new Date() } },
        { session },
      )
      await recordAgentAdminActivity(db, session, {
        actorId,
        entityType: "subscription_plan",
        entityId: planId.toHexString(),
        action: "plan_deactivated",
        before: { status: existing.status, purchase_enabled: existing.purchase_enabled },
        after: { status: "inactive", purchase_enabled: false },
      })
      return NextResponse.json({ success: true })
    })
  } catch (error) {
    return errorResponse(error)
  }
}
