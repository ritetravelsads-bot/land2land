import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { SUBSCRIPTION_COLLECTIONS, ensureAgentSubscriptionIndexes } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentUser()
    if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const db = await getDatabase()
    await ensureAgentSubscriptionIndexes(db)
    const params = request.nextUrl.searchParams
    const planCode = params.get("plan_code") || ""
    const fromText = params.get("from")
    const toText = params.get("to")
    const dateFilter: Record<string, Date> = {}
    if (fromText) {
      const from = new Date(fromText)
      if (Number.isNaN(from.getTime())) return NextResponse.json({ error: "Invalid from date" }, { status: 400 })
      dateFilter.$gte = from
    }
    if (toText) {
      const to = new Date(toText)
      if (Number.isNaN(to.getTime())) return NextResponse.json({ error: "Invalid to date" }, { status: 400 })
      to.setUTCHours(23, 59, 59, 999)
      dateFilter.$lte = to
    }
    if (dateFilter.$gte && dateFilter.$lte && dateFilter.$gte > dateFilter.$lte) {
      return NextResponse.json({ error: "The start date must be before the end date" }, { status: 400 })
    }
    const planCodes = ["free", "basic", "standard", "premium", "business"]
    if (planCode && !planCodes.includes(planCode)) {
      return NextResponse.json({ error: "Invalid plan filter" }, { status: 400 })
    }
    const subscriptionFilter: Record<string, any> = planCode ? { plan_code: planCode } : {}
    if (Object.keys(dateFilter).length) subscriptionFilter.created_at = dateFilter
    const paymentFilter: Record<string, any> = { status: "paid", verified_at: { $exists: true } }
    const quotaFilter: Record<string, any> = { type: { $in: ["publish_debit", "baseline_usage", "unpublish_refund"] } }
    if (Object.keys(dateFilter).length) {
      paymentFilter.verified_at = dateFilter
      quotaFilter.created_at = dateFilter
    }
    if (planCode) paymentFilter.plan_code = planCode

    const [agentCounts, subscriptions, payments] = await Promise.all([
      db.collection("users").aggregate([
        { $match: { user_type: "associate" } },
        { $group: {
          _id: null,
          total: { $sum: 1 },
          active: { $sum: { $cond: [{ $in: [{ $ifNull: ["$account_status", "active"] }, ["active"]] }, 1, 0] } },
          inactive: { $sum: { $cond: [{ $eq: ["$account_status", "inactive"] }, 1, 0] } },
          suspended: { $sum: { $cond: [{ $eq: ["$account_status", "suspended"] }, 1, 0] } },
        } },
      ]).toArray(),
      db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).find(subscriptionFilter).toArray(),
      db.collection(SUBSCRIPTION_COLLECTIONS.payments).aggregate([
        { $match: paymentFilter },
        { $group: { _id: null, revenue: { $sum: "$amount" }, count: { $sum: 1 } } },
      ]).toArray(),
    ])
    if (planCode) quotaFilter.subscription_id = { $in: subscriptions.map((subscription) => subscription._id) }
    const usage = await db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).aggregate([
      { $match: quotaFilter },
      { $group: { _id: "$type", credits: { $sum: "$amount" } } },
    ]).toArray()

    const now = new Date()
    const activeSubscriptions = subscriptions.filter((sub) => sub.status === "active" && (!sub.expires_at || new Date(sub.expires_at).getTime() > now.getTime()))
    const expiredSubscriptions = subscriptions.filter((sub) => sub.status === "expired" || (sub.status === "active" && sub.expires_at && new Date(sub.expires_at).getTime() <= now.getTime()))
    const subscriptionsByPlan = Object.fromEntries(["free", "basic", "standard", "premium", "business"].map((code) => [
      code,
      activeSubscriptions.filter((sub) => sub.plan_code === code).length,
    ]))
    const quotaMap = Object.fromEntries(usage.map((item) => [item._id, Number(item.credits || 0)]))
    const agentCountsResult = agentCounts[0] || { total: 0, active: 0, inactive: 0, suspended: 0 }
    const filteredSubscriptions = planCode ? activeSubscriptions.filter((sub) => sub.plan_code === planCode) : activeSubscriptions
    const agentIds = filteredSubscriptions.map((sub) => sub.agent_id)
    const planRemaining = filteredSubscriptions.reduce((sum, sub) => sum + Math.max(0, Number(sub.plan_quota || 0) - Number(sub.plan_used || 0)), 0)
    const creditLots = agentIds.length
      ? await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).find({
          agent_id: { $in: agentIds },
          remaining_credits: { $gt: 0 },
          $or: [{ expires_at: null }, { expires_at: { $exists: false } }, { expires_at: { $gt: now } }],
        }).toArray()
      : []
    const specialRemaining = creditLots.reduce((sum, lot) => sum + Number(lot.remaining_credits || 0), 0)
    const publishedListingFilter: Record<string, any> = {
      review_status: { $in: ["approved", null] },
      status: { $nin: ["sold", "reserved"] },
      availability_status: { $ne: "sold" },
      ...(Object.keys(dateFilter).length ? { created_at: dateFilter } : {}),
    }
    if (planCode) {
      publishedListingFilter.associate = { $in: subscriptions.flatMap((subscription) => [subscription.agent_id, String(subscription.agent_id)]) }
    } else {
      publishedListingFilter.associate = { $exists: true, $ne: null }
    }
    const publishedListings = await db.collection("listings").countDocuments(publishedListingFilter)
    const used = Math.max(0, Number(quotaMap.publish_debit || 0) + Number(quotaMap.baseline_usage || 0) - Number(quotaMap.unpublish_refund || 0))
    const paidRevenue = payments[0]?.revenue || 0

    return NextResponse.json({
      agents: agentCountsResult,
      subscriptions: { active: filteredSubscriptions.length, expired: expiredSubscriptions.length, by_plan: subscriptionsByPlan },
      properties: { currently_published: publishedListings },
      quota: { used, unused: planRemaining + specialRemaining },
      revenue: { verified_total: paidRevenue, verified_payment_count: payments[0]?.count || 0, currency: "INR" },
      filters: { from: fromText, to: toText, plan_code: planCode || null },
    })
  } catch (error) {
    console.error("[admin/agents/analytics] Failed to load analytics:", error)
    return NextResponse.json({ error: "Failed to load agent subscription analytics" }, { status: 500 })
  }
}
