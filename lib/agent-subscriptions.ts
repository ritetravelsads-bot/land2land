import { ObjectId, type ClientSession, type Db } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"
import type { SubscriptionBillingCycle, SubscriptionPlanCode } from "@/lib/models"

export const SUBSCRIPTION_COLLECTIONS = {
  plans: "subscription_plans",
  subscriptions: "agent_subscriptions",
  creditLots: "agent_credit_lots",
  quotaTransactions: "agent_quota_transactions",
  payments: "agent_subscription_payments",
  activity: "admin_activity_logs",
} as const

export const DEFAULT_PLAN_CATEGORIES = [
  {
    plan_code: "free",
    name: "Free",
    description: "No-cost plan with a publishing limit assigned individually by an administrator.",
    billing_cycle: "free",
    price_amount: 0,
    currency: "INR",
    duration_days: null,
    publishing_limit: null,
    benefits: [],
    status: "active",
    display_order: 0,
    featured: false,
    purchase_enabled: false,
    refund_on_unpublish: false,
  },
  ...(["basic", "standard", "premium", "business"] as const).map((plan_code, index) => ({
    plan_code,
    name: plan_code[0].toUpperCase() + plan_code.slice(1),
    description: "Configure price, publishing allowance, duration, and benefits before activation.",
    billing_cycle: null,
    price_amount: null,
    currency: "INR",
    duration_days: null,
    publishing_limit: null,
    benefits: [] as string[],
    status: "inactive",
    display_order: index + 1,
    featured: false,
    purchase_enabled: false,
    refund_on_unpublish: false,
  })),
]

export class AgentSubscriptionError extends Error {
  constructor(
    message: string,
    readonly status = 400,
    readonly code = "SUBSCRIPTION_ERROR",
  ) {
    super(message)
    this.name = "AgentSubscriptionError"
  }
}

export function parseObjectId(value: unknown, label = "ID"): ObjectId {
  const text = typeof value === "string" ? value : String(value ?? "")
  if (!ObjectId.isValid(text)) throw new AgentSubscriptionError(`Invalid ${label}.`, 400, "INVALID_ID")
  return new ObjectId(text)
}

export function serializeMongoValue(value: any): any {
  if (value instanceof ObjectId) return value.toHexString()
  if (value instanceof Date) return value.toISOString()
  if (Array.isArray(value)) return value.map(serializeMongoValue)
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, serializeMongoValue(item)]))
  }
  return value
}

let indexesPromise: Promise<void> | null = null

export async function ensureAgentSubscriptionIndexes(db: Db) {
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      db.collection(SUBSCRIPTION_COLLECTIONS.plans).createIndex({ plan_code: 1 }, { unique: true, name: "plan_code_unique" }),
      db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).createIndex(
        { agent_id: 1 },
        { unique: true, partialFilterExpression: { status: "active" }, name: "one_active_subscription_per_agent" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).createIndex(
        { agent_id: 1, created_at: -1 },
        { name: "agent_subscription_history" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).createIndex(
        { plan_code: 1, created_at: -1, status: 1 },
        { name: "subscription_plan_cohort" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).createIndex(
        { agent_id: 1, remaining_credits: 1, expires_at: 1 },
        { name: "agent_credit_availability" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).createIndex(
        { idempotency_key: 1 },
        { unique: true, sparse: true, name: "quota_idempotency_unique" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).createIndex(
        { agent_id: 1, created_at: -1 },
        { name: "agent_quota_history" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).createIndex(
        { subscription_id: 1, created_at: -1 },
        { name: "subscription_quota_history" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.payments).createIndex(
        { agent_id: 1, created_at: -1 },
        { name: "agent_payment_history" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.payments).createIndex(
        { status: 1, verified_at: -1, plan_code: 1 },
        { name: "verified_payment_reports" },
      ),
      db.collection(SUBSCRIPTION_COLLECTIONS.activity).createIndex(
        { agent_id: 1, created_at: -1 },
        { name: "agent_admin_activity_history" },
      ),
    ]).then(() => undefined).catch((error) => {
      indexesPromise = null
      throw error
    })
  }
  await indexesPromise
}

export async function runAgentTransaction<T>(work: (db: Db, session: ClientSession) => Promise<T>): Promise<T> {
  const { client, db } = await connectToDatabase()
  await ensureAgentSubscriptionIndexes(db)
  const session = client.startSession()
  try {
    const result = await session.withTransaction(() => work(db, session))
    if (result === undefined) throw new Error("MongoDB transaction returned no result")
    return result as T
  } finally {
    await session.endSession()
  }
}

export async function initializeDefaultPlanCategories(db: Db, actorId: ObjectId) {
  await ensureAgentSubscriptionIndexes(db)
  const now = new Date()
  await Promise.all(DEFAULT_PLAN_CATEGORIES.map((plan) =>
    db.collection(SUBSCRIPTION_COLLECTIONS.plans).updateOne(
      { plan_code: plan.plan_code },
      { $setOnInsert: { ...plan, created_by: actorId, created_at: now, updated_at: now } },
      { upsert: true },
    ),
  ))
  return db.collection(SUBSCRIPTION_COLLECTIONS.plans).find({}).sort({ display_order: 1 }).toArray()
}

export function validatePlanConfiguration(input: Record<string, any>) {
  const codes = ["free", "basic", "standard", "premium", "business"]
  if (!codes.includes(input.plan_code)) throw new AgentSubscriptionError("Choose one of the five supported plan categories.")
  if (!input.status) input.status = input.plan_code === "free" ? "active" : "inactive"
  if (input.price_amount === undefined) input.price_amount = null
  if (input.publishing_limit === undefined) input.publishing_limit = null
  if (input.duration_days === undefined) input.duration_days = null
  if (input.billing_cycle === undefined) input.billing_cycle = null
  if (input.benefits === undefined) input.benefits = []
  if (input.status !== "active" && input.status !== "inactive") throw new AgentSubscriptionError("Plan status must be Active or Inactive.")
  if (typeof input.name !== "string" || !input.name.trim()) throw new AgentSubscriptionError("Plan name is required.")
  if (!Array.isArray(input.benefits) || input.benefits.some((item) => typeof item !== "string")) {
    throw new AgentSubscriptionError("Plan benefits must be a list of text items.")
  }
  if (input.price_amount !== null && input.price_amount !== undefined && (!Number.isFinite(Number(input.price_amount)) || Number(input.price_amount) < 0)) {
    throw new AgentSubscriptionError("Plan price must be a non-negative amount.")
  }
  if (input.publishing_limit !== null && input.publishing_limit !== undefined && (!Number.isInteger(Number(input.publishing_limit)) || Number(input.publishing_limit) < 0)) {
    throw new AgentSubscriptionError("Publishing limit must be a non-negative whole number.")
  }
  if (input.duration_days !== null && input.duration_days !== undefined && (!Number.isInteger(Number(input.duration_days)) || Number(input.duration_days) < 1)) {
    throw new AgentSubscriptionError("Custom duration must be a positive number of days.")
  }
  const billingCycles = ["free", "monthly", "yearly", "custom", null]
  if (!billingCycles.includes(input.billing_cycle ?? null)) throw new AgentSubscriptionError("Invalid billing cycle.")
  if (input.status !== "active" && input.status !== "inactive") throw new AgentSubscriptionError("Plan status must be Active or Inactive.")
  if (input.plan_code === "free") {
    input.billing_cycle = "free"
    input.price_amount = 0
    input.duration_days = null
    input.publishing_limit = null
    input.purchase_enabled = false
  } else if (input.status === "active") {
    if (input.price_amount == null || input.publishing_limit == null || !input.billing_cycle || input.billing_cycle === "free") {
      throw new AgentSubscriptionError("Configure price, publishing limit, and billing cycle before activating a paid plan.")
    }
    if (input.billing_cycle === "custom" && input.duration_days == null) {
      throw new AgentSubscriptionError("Custom billing cycles require a duration in days.")
    }
  }
  input.name = input.name.trim()
  input.description = typeof input.description === "string" ? input.description.trim() : ""
  input.currency = "INR"
  input.benefits = input.benefits.map((item: string) => item.trim()).filter(Boolean)
  input.display_order = Number.isInteger(Number(input.display_order)) ? Number(input.display_order) : 0
  input.featured = input.featured === true
  input.purchase_enabled = input.purchase_enabled === true && input.plan_code !== "free"
  input.refund_on_unpublish = input.refund_on_unpublish === true
  return input
}

function ownerMatch(agentId: ObjectId) {
  return { associate: { $in: [agentId, agentId.toHexString()] } }
}

function dateOrNull(value: unknown) {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(String(value))
  return Number.isNaN(date.getTime()) ? null : date
}

export async function getAgentSubscriptionOverview(db: Db, agentIdValue: unknown, includeInternal = false, includeHistory = true) {
  const agentId = parseObjectId(agentIdValue, "agent ID")
  const agent = await db.collection("users").findOne({ _id: agentId })
  if (!agent || agent.user_type !== "associate") return null

  const [subscriptions, creditLots, quotaTransactions, payments, activity, listingStats] = await Promise.all([
    db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).find({ agent_id: agentId }).sort({ created_at: -1 }).limit(includeHistory ? 20 : 1).toArray(),
    db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).find({ agent_id: agentId }).sort({ created_at: -1 }).toArray(),
    includeHistory ? db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).find({ agent_id: agentId }).sort({ created_at: -1 }).limit(30).toArray() : Promise.resolve([]),
    includeHistory ? db.collection(SUBSCRIPTION_COLLECTIONS.payments).find({ agent_id: agentId }).sort({ created_at: -1 }).limit(30).toArray() : Promise.resolve([]),
    includeInternal && includeHistory ? db.collection(SUBSCRIPTION_COLLECTIONS.activity).find({ agent_id: agentId }).sort({ created_at: -1 }).limit(50).toArray() : Promise.resolve([]),
    db.collection("listings").aggregate([
      { $match: ownerMatch(agentId) },
      { $group: {
        _id: null,
        total_submissions: { $sum: 1 },
        pending: { $sum: { $cond: [{ $eq: ["$review_status", "pending"] }, 1, 0] } },
        rejected: { $sum: { $cond: [{ $eq: ["$review_status", "rejected"] }, 1, 0] } },
        published: { $sum: { $cond: [{ $and: [
          { $in: [{ $ifNull: ["$review_status", "approved"] }, ["approved"]] },
          { $not: [{ $in: [{ $ifNull: ["$status", "available"] }, ["sold", "reserved"]] }] },
          { $not: [{ $in: [{ $ifNull: ["$availability_status", "available"] }, ["sold", "reserved"]] }] },
        ] }, 1, 0] } },
        sold: { $sum: { $cond: [{ $or: [
          { $eq: ["$status", "sold"] },
          { $eq: ["$availability_status", "sold"] },
        ] }, 1, 0] } },
      } },
    ]).toArray(),
  ])

  const latest = subscriptions[0] || null
  const latestExpiry = dateOrNull(latest?.expires_at)
  const effectiveStatus = latest?.status === "active" && latestExpiry && latestExpiry.getTime() <= Date.now()
    ? "expired"
    : (latest?.status || "unassigned")
  const validLots = creditLots.filter((lot) => {
    const expires = dateOrNull(lot.expires_at)
    return !expires || expires.getTime() > Date.now()
  })
  const activeLotIds = validLots.map((lot) => lot._id)
  const specialUsageRows = activeLotIds.length ? await db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).aggregate([
    { $match: { agent_id: agentId, credit_lot_id: { $in: activeLotIds }, type: "publish_debit", source: "special" } },
    { $group: { _id: null, used: { $sum: "$amount" } } },
  ]).toArray() : []
  const activeLots = validLots.filter((lot) => Number(lot.remaining_credits || 0) > 0)
  const planQuota = Math.max(0, Number(latest?.plan_quota || 0))
  const planUsed = Math.max(0, Number(latest?.plan_used || 0))
  const planRemaining = Math.max(0, planQuota - planUsed)
  const specialGranted = creditLots.reduce((sum, lot) => sum + Number(lot.granted_credits || 0), 0)
  const specialActiveGranted = validLots.reduce((sum, lot) => sum + Number(lot.granted_credits || 0), 0)
  const specialRemaining = activeLots.reduce((sum, lot) => sum + Number(lot.remaining_credits || 0), 0)
  const specialExpired = creditLots.reduce((sum, lot) => {
    const expires = dateOrNull(lot.expires_at)
    return expires && expires.getTime() <= Date.now() ? sum + Number(lot.remaining_credits || 0) : sum
  }, 0)
  const specialUsed = Number(specialUsageRows[0]?.used || 0)
  const stats = listingStats[0] || { total_submissions: 0, pending: 0, published: 0, rejected: 0, sold: 0 }
  const accountStatus = agent.account_status || "active"
  const subscriptionView: Record<string, any> | null = latest ? { ...latest, status: effectiveStatus } : null
  if (!includeInternal && subscriptionView) {
    delete subscriptionView.admin_notes
    delete subscriptionView.assigned_by
  }
  const subscriptionHistory = includeInternal ? subscriptions : subscriptions.map(({ admin_notes, assigned_by, ...item }) => item)
  const quotaHistory = includeInternal ? quotaTransactions : quotaTransactions.map(({ note, actor_id, ...item }) => item)
  const paymentHistory = payments.map(({ provider_reference, ...item }) => item)
  const plans = includeHistory ? await db.collection(SUBSCRIPTION_COLLECTIONS.plans)
    .find({ status: "active" })
    .project({ plan_code: 1, name: 1, description: 1, billing_cycle: 1, price_amount: 1, currency: 1, duration_days: 1, publishing_limit: 1, benefits: 1, status: 1, display_order: 1, featured: 1, purchase_enabled: 1 })
    .sort({ display_order: 1 })
    .toArray() : []

  return serializeMongoValue({
    agent: {
      id: agentId,
      username: agent.username || "",
      email: agent.email || "",
      phone_number: agent.phone_number || "",
      user_type: agent.user_type,
      account_status: accountStatus,
      is_verified: Boolean(agent.is_verified),
      date_joined: agent.date_joined,
      admin_notes: includeInternal ? (agent.admin_notes || "") : undefined,
    },
    stats,
    subscription: subscriptionView,
    quota: {
      plan_quota: planQuota,
      plan_used: planUsed,
      plan_remaining: planRemaining,
      special_credits_granted: specialGranted,
      special_credits_active_granted: specialActiveGranted,
      special_credits_remaining: specialRemaining,
      special_credits_expired: specialExpired,
      special_credits_used: specialUsed,
      total_allowance: planQuota + specialActiveGranted,
      total_used: planUsed + specialUsed,
      total_remaining: planRemaining + specialRemaining,
    },
    plans,
    subscription_history: subscriptionHistory,
    quota_history: quotaHistory,
    payment_history: paymentHistory,
    admin_activity: activity,
    can_publish: accountStatus === "active" && effectiveStatus === "active" && planRemaining + specialRemaining > 0,
  })
}

export async function recordAgentAdminActivity(
  db: Db,
  session: ClientSession,
  input: {
    actorId: ObjectId
    agentId?: ObjectId
    entityType?: "agent" | "subscription_plan" | "listing"
    entityId?: string
    action: string
    note?: string
    before?: unknown
    after?: unknown
  },
) {
  const entityType = input.entityType || "agent"
  const entityId = input.entityId || input.agentId?.toHexString()
  if (!entityId) throw new Error("Audit log entity ID is required")
  await db.collection(SUBSCRIPTION_COLLECTIONS.activity).insertOne({
    actor_id: input.actorId,
    ...(input.agentId ? { agent_id: input.agentId } : {}),
    entity_type: entityType,
    entity_id: entityId,
    action: input.action,
    note: input.note || "",
    before: input.before || null,
    after: input.after || null,
    created_at: new Date(),
  }, { session })
}

export async function recordAgentQuotaTransaction(
  db: Db,
  session: ClientSession,
  input: {
    agentId: ObjectId
    subscriptionId?: ObjectId | null
    listingId?: ObjectId | null
    creditLotId?: ObjectId | null
    type: string
    source: string
    amount: number
    note?: string
    actorId?: ObjectId
    idempotencyKey: string
  },
) {
  await db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).insertOne({
    agent_id: input.agentId,
    subscription_id: input.subscriptionId || null,
    listing_id: input.listingId || null,
    credit_lot_id: input.creditLotId || null,
    type: input.type,
    source: input.source,
    amount: input.amount,
    note: input.note || "",
    actor_id: input.actorId || null,
    idempotency_key: input.idempotencyKey,
    created_at: new Date(),
  }, { session })
}

function computeExpiry(plan: any, start: Date, override?: unknown) {
  if (override !== undefined && override !== null && override !== "") {
    const date = new Date(String(override))
    if (Number.isNaN(date.getTime()) || date <= start) throw new AgentSubscriptionError("Expiry must be a valid date after the start date.")
    return date
  }
  if (plan.billing_cycle === "free") return null
  if (plan.billing_cycle === "monthly") {
    const date = new Date(start)
    date.setMonth(date.getMonth() + 1)
    return date
  }
  if (plan.billing_cycle === "yearly") {
    const date = new Date(start)
    date.setFullYear(date.getFullYear() + 1)
    return date
  }
  if (plan.billing_cycle === "custom" && Number.isInteger(plan.duration_days) && plan.duration_days > 0) {
    return new Date(start.getTime() + plan.duration_days * 24 * 60 * 60 * 1000)
  }
  throw new AgentSubscriptionError("Configure a billing cycle and duration before assigning this plan.")
}

async function countPublishedListings(db: Db, agentId: ObjectId, session: ClientSession) {
  return db.collection("listings").countDocuments({
    ...ownerMatch(agentId),
    review_status: { $in: ["approved", null] },
    status: { $nin: ["sold", "reserved"] },
    availability_status: { $ne: "sold" },
  }, { session })
}

export async function assignAgentPlan(input: {
  agentId: string
  planCode: SubscriptionPlanCode
  actorId: ObjectId
  note?: string
  customQuota?: number
  startsAt?: string
  expiresAt?: string | null
}) {
  const agentId = parseObjectId(input.agentId, "agent ID")
  if (input.customQuota !== undefined && (!Number.isInteger(input.customQuota) || input.customQuota < 0)) {
    throw new AgentSubscriptionError("Custom publishing limit must be a non-negative whole number.")
  }
  return runAgentTransaction(async (db, session) => {
    const agent = await db.collection("users").findOne({ _id: agentId }, { session })
    if (!agent || agent.user_type !== "associate") throw new AgentSubscriptionError("Agent account not found.", 404, "AGENT_NOT_FOUND")
    const plan = await db.collection(SUBSCRIPTION_COLLECTIONS.plans).findOne({ plan_code: input.planCode }, { session })
    if (!plan) throw new AgentSubscriptionError("Plan category is not initialized.", 404, "PLAN_NOT_FOUND")
    if (plan.plan_code !== "free" && plan.publishing_limit == null) {
      throw new AgentSubscriptionError("Configure this plan's publishing limit before assignment.")
    }
    const planQuota = input.customQuota !== undefined
      ? input.customQuota
      : plan.plan_code === "free"
        ? null
        : Number(plan.publishing_limit)
    if (planQuota === undefined || planQuota === null || !Number.isInteger(Number(planQuota)) || Number(planQuota) < 0) {
      throw new AgentSubscriptionError(plan.plan_code === "free"
        ? "Set a custom publishing limit for this agent before assigning the Free plan."
        : "Configure this plan's publishing limit before assignment.")
    }
    if (plan.plan_code !== "free" && plan.status !== "active") {
      throw new AgentSubscriptionError("Inactive plans cannot be assigned.")
    }
    const start = input.startsAt ? new Date(input.startsAt) : new Date()
    if (Number.isNaN(start.getTime())) throw new AgentSubscriptionError("Subscription start date is invalid.")
    const expires = computeExpiry(plan, start, input.expiresAt)
    const existing = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).findOne(
      { agent_id: agentId, status: "active" }, { session, sort: { created_at: -1 } },
    )
    if (existing) {
      await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).updateOne(
        { _id: existing._id, status: "active" },
        { $set: { status: "superseded", updated_at: new Date() } },
        { session },
      )
    }
    const baseline = await countPublishedListings(db, agentId, session)
    const now = new Date()
    const subscriptionDoc = {
      agent_id: agentId,
      plan_id: plan._id,
      plan_code: plan.plan_code,
      plan_name: plan.name,
      plan_price_amount: plan.price_amount,
      plan_currency: plan.currency || "INR",
      plan_billing_cycle: plan.billing_cycle,
      plan_duration_days: plan.duration_days,
      plan_quota: Number(planQuota),
      plan_used: baseline,
      refund_on_unpublish: plan.refund_on_unpublish === true,
      status: "active",
      starts_at: start,
      expires_at: expires,
      assigned_by: input.actorId,
      admin_notes: input.note?.trim() || "",
      created_at: now,
      updated_at: now,
    }
    const inserted = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).insertOne(subscriptionDoc, { session })
    const subscriptionId = inserted.insertedId

    if (baseline > 0) {
      await db.collection("listings").updateMany(
        { ...ownerMatch(agentId), review_status: { $in: ["approved", null] }, status: { $nin: ["sold", "reserved"] }, availability_status: { $ne: "sold" } },
        { $set: {
          quota_consumed: true,
          quota_source: "baseline",
          quota_subscription_id: subscriptionId,
          quota_consumed_at: now,
          quota_cycle: 0,
        } },
        { session },
      )
      await recordAgentQuotaTransaction(db, session, {
        agentId,
        subscriptionId,
        type: "baseline_usage",
        source: "published_listings_at_assignment",
        amount: baseline,
        note: "Existing approved listings counted when the plan was assigned.",
        actorId: input.actorId,
        idempotencyKey: `baseline:${subscriptionId.toHexString()}`,
      })
    }
    await recordAgentAdminActivity(db, session, {
      actorId: input.actorId,
      agentId,
      action: "subscription_assigned",
      note: input.note,
      before: existing ? { plan_code: existing.plan_code, status: existing.status } : null,
      after: { subscription_id: subscriptionId.toHexString(), plan_code: plan.plan_code, plan_quota: Number(planQuota), starts_at: start, expires_at: expires },
    })
    return serializeMongoValue({ ...subscriptionDoc, _id: subscriptionId })
  })
}

export async function updateAgentSubscription(input: {
  agentId: string
  actorId: ObjectId
  action: "adjust_quota" | "set_expiry" | "reset_usage"
  planQuota?: number
  expiresAt?: string | null
  note?: string
}) {
  const agentId = parseObjectId(input.agentId, "agent ID")
  return runAgentTransaction(async (db, session) => {
    const subscription = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).findOne(
      { agent_id: agentId, status: "active" }, { session, sort: { created_at: -1 } },
    )
    if (!subscription) throw new AgentSubscriptionError("No active subscription is assigned to this agent.", 404, "NO_ACTIVE_SUBSCRIPTION")
    const before = { plan_quota: subscription.plan_quota, plan_used: subscription.plan_used, expires_at: subscription.expires_at }
    const now = new Date()
    let update: Record<string, unknown>
    let ledger: { type: string; source: string; amount: number } | null = null

    if (input.action === "adjust_quota") {
      if (!Number.isInteger(input.planQuota) || Number(input.planQuota) < 0) throw new AgentSubscriptionError("Quota must be a non-negative whole number.")
      const amount = Number(input.planQuota) - Number(subscription.plan_quota || 0)
      update = { plan_quota: Number(input.planQuota), updated_at: now }
      ledger = { type: "plan_quota_adjustment", source: "admin_adjustment", amount }
    } else if (input.action === "reset_usage") {
      const amount = Number(subscription.plan_used || 0)
      update = { plan_used: 0, updated_at: now }
      ledger = { type: "plan_usage_reset", source: "admin_reset", amount }
    } else {
      if (!input.expiresAt) throw new AgentSubscriptionError("An expiry date is required.")
      const expiry = new Date(input.expiresAt)
      const start = dateOrNull(subscription.starts_at) || now
      if (Number.isNaN(expiry.getTime()) || expiry <= start) throw new AgentSubscriptionError("Expiry must be after the subscription start date.")
      update = { expires_at: expiry, updated_at: now }
    }

    await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).updateOne({ _id: subscription._id }, { $set: update }, { session })
    if (ledger) await recordAgentQuotaTransaction(db, session, {
      agentId,
      subscriptionId: subscription._id,
      type: ledger.type,
      source: ledger.source,
      amount: Math.abs(ledger.amount),
      note: input.note,
      actorId: input.actorId,
      idempotencyKey: `${ledger.type}:${subscription._id.toHexString()}:${new ObjectId().toHexString()}`,
    })
    await recordAgentAdminActivity(db, session, {
      actorId: input.actorId,
      agentId,
      action: input.action,
      note: input.note,
      before,
      after: update,
    })
    return serializeMongoValue({ success: true, before, after: update })
  })
}

export async function setAgentAccountControls(input: {
  agentId: string
  actorId: ObjectId
  accountStatus?: "active" | "inactive" | "suspended"
  adminNotes?: string
}) {
  const agentId = parseObjectId(input.agentId, "agent ID")
  return runAgentTransaction(async (db, session) => {
    const agent = await db.collection("users").findOne({ _id: agentId, user_type: "associate" }, { session })
    if (!agent) throw new AgentSubscriptionError("Agent account not found.", 404, "AGENT_NOT_FOUND")
    const before = { account_status: agent.account_status || "active", admin_notes: agent.admin_notes || "" }
    const update: Record<string, unknown> = { updated_at: new Date() }
    if (input.accountStatus) update.account_status = input.accountStatus
    if (input.adminNotes !== undefined) update.admin_notes = input.adminNotes.trim().slice(0, 2000)
    await db.collection("users").updateOne({ _id: agentId }, { $set: update }, { session })
    await recordAgentAdminActivity(db, session, {
      actorId: input.actorId,
      agentId,
      action: input.accountStatus ? `account_${input.accountStatus}` : "admin_notes_updated",
      note: input.adminNotes,
      before,
      after: update,
    })
    return serializeMongoValue({ success: true, before, after: update })
  })
}

export async function adjustAgentCredits(input: {
  agentId: string
  actorId: ObjectId
  action: "grant" | "deduct"
  amount: number
  expiresAt?: string | null
  note?: string
  idempotencyKey?: string
}) {
  const agentId = parseObjectId(input.agentId, "agent ID")
  if (!Number.isInteger(input.amount) || input.amount < 1) throw new AgentSubscriptionError("Credit amount must be a positive whole number.")
  const expiresAt = input.expiresAt ? new Date(input.expiresAt) : null
  if (expiresAt && Number.isNaN(expiresAt.getTime())) throw new AgentSubscriptionError("Credit expiry date is invalid.")
  return runAgentTransaction(async (db, session) => {
    const agent = await db.collection("users").findOne({ _id: agentId, user_type: "associate" }, { session })
    if (!agent) throw new AgentSubscriptionError("Agent account not found.", 404, "AGENT_NOT_FOUND")
    const now = new Date()
    const actionKey = new ObjectId().toHexString()

    if (input.action === "grant") {
      if (expiresAt && expiresAt <= now) throw new AgentSubscriptionError("Credit expiry must be in the future.")
      const idempotencyKey = input.idempotencyKey?.trim()
      if (idempotencyKey) {
        const prior = await db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).findOne({ idempotency_key: idempotencyKey }, { session })
        if (prior) return { success: true, alreadyGranted: true, transaction: serializeMongoValue(prior) }
      }
      const lot = {
        agent_id: agentId,
        granted_credits: input.amount,
        remaining_credits: input.amount,
        expires_at: expiresAt,
        granted_by: input.actorId,
        note: input.note?.trim() || "",
        created_at: now,
      }
      const inserted = await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).insertOne(lot, { session })
      await recordAgentQuotaTransaction(db, session, {
        agentId,
        creditLotId: inserted.insertedId,
        type: "special_credit_grant",
        source: "admin_grant",
        amount: input.amount,
        note: input.note,
        actorId: input.actorId,
        idempotencyKey: idempotencyKey || `credit-grant:${inserted.insertedId.toHexString()}`,
      })
      await recordAgentAdminActivity(db, session, {
        actorId: input.actorId,
        agentId,
        action: "special_credits_granted",
        note: input.note,
        after: { amount: input.amount, expires_at: expiresAt, lot_id: inserted.insertedId.toHexString() },
      })
      return serializeMongoValue({ success: true, lot: { ...lot, _id: inserted.insertedId } })
    }

    const activeLots = await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).find({
      agent_id: agentId,
      remaining_credits: { $gt: 0 },
      $or: [{ expires_at: null }, { expires_at: { $exists: false } }, { expires_at: { $gt: now } }],
    }, { session }).toArray()
    activeLots.sort((a, b) => {
      const aExpiry = dateOrNull(a.expires_at)?.getTime() ?? Number.MAX_SAFE_INTEGER
      const bExpiry = dateOrNull(b.expires_at)?.getTime() ?? Number.MAX_SAFE_INTEGER
      return aExpiry - bExpiry
    })
    const specialAvailable = activeLots.reduce((sum, lot) => sum + Number(lot.remaining_credits || 0), 0)
    const subscription = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).findOne(
      { agent_id: agentId, status: "active" }, { session, sort: { created_at: -1 } },
    )
    const subscriptionExpiry = dateOrNull(subscription?.expires_at)
    const planAvailable = subscription && (!subscriptionExpiry || subscriptionExpiry > now)
      ? Math.max(0, Number(subscription.plan_quota || 0) - Number(subscription.plan_used || 0))
      : 0
    if (specialAvailable + planAvailable < input.amount) {
      throw new AgentSubscriptionError("There are not enough remaining publishing credits to deduct.", 409, "INSUFFICIENT_CREDITS")
    }
    let remaining = input.amount
    let specialDeducted = 0
    for (const lot of activeLots) {
      if (remaining === 0) break
      const deduction = Math.min(remaining, Number(lot.remaining_credits || 0))
      const result = await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).updateOne(
        { _id: lot._id, remaining_credits: Number(lot.remaining_credits) },
        { $inc: { remaining_credits: -deduction } },
        { session },
      )
      if (result.modifiedCount !== 1) throw new AgentSubscriptionError("Credit balance changed; retry the adjustment.", 409, "CREDIT_CONFLICT")
      await recordAgentQuotaTransaction(db, session, {
        agentId,
        creditLotId: lot._id,
        type: "special_credit_deduction",
        source: "admin_deduction",
        amount: deduction,
        note: input.note,
        actorId: input.actorId,
        idempotencyKey: `credit-deduct:${actionKey}:${lot._id.toHexString()}`,
      })
      remaining -= deduction
      specialDeducted += deduction
    }
    const planDeducted = remaining
    if (planDeducted > 0 && subscription) {
      const result = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).updateOne(
        { _id: subscription._id, status: "active", plan_used: { $lte: Number(subscription.plan_quota || 0) - planDeducted } },
        { $inc: { plan_used: planDeducted }, $set: { updated_at: now } },
        { session },
      )
      if (result.modifiedCount !== 1) throw new AgentSubscriptionError("Plan quota changed; retry the adjustment.", 409, "QUOTA_CONFLICT")
      await recordAgentQuotaTransaction(db, session, {
        agentId,
        subscriptionId: subscription._id,
        type: "plan_credit_deduction",
        source: "admin_deduction",
        amount: planDeducted,
        note: input.note,
        actorId: input.actorId,
        idempotencyKey: `plan-credit-deduct:${actionKey}`,
      })
    }
    await recordAgentAdminActivity(db, session, {
      actorId: input.actorId,
      agentId,
      action: "publishing_credits_deducted",
      note: input.note,
      before: { special_available: specialAvailable, plan_available: planAvailable },
      after: { special_deducted: specialDeducted, plan_deducted: planDeducted, total_deducted: input.amount },
    })
    return { success: true, deducted: input.amount, special_deducted: specialDeducted, plan_deducted: planDeducted, remaining: specialAvailable + planAvailable - input.amount }
  })
}

async function refundListingQuota(db: Db, session: ClientSession, listing: any, actorId: ObjectId, reason: string) {
  if (!listing.quota_consumed || !listing.quota_subscription_id) return false
  const cycle = Number(listing.quota_cycle || 0)
  const key = `unpublish-refund:${listing._id.toString()}:${cycle}`
  const existing = await db.collection(SUBSCRIPTION_COLLECTIONS.quotaTransactions).findOne({ idempotency_key: key }, { session })
  if (existing) return false
  const subscription = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).findOne({ _id: listing.quota_subscription_id }, { session })
  if (!subscription?.refund_on_unpublish) return false
  if (listing.quota_source === "special" && listing.quota_credit_lot_id) {
    const creditResult = await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).updateOne(
      {
        _id: listing.quota_credit_lot_id,
        $or: [{ expires_at: null }, { expires_at: { $exists: false } }, { expires_at: { $gt: new Date() } }],
      },
      { $inc: { remaining_credits: 1 } },
      { session },
    )
    if (creditResult.matchedCount !== 1) return false
  } else {
    const quotaResult = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).updateOne(
      { _id: subscription._id, plan_used: { $gt: 0 } },
      { $inc: { plan_used: -1 }, $set: { updated_at: new Date() } },
      { session },
    )
    if (quotaResult.modifiedCount !== 1) return false
  }
  await recordAgentQuotaTransaction(db, session, {
    agentId: new ObjectId(String(listing.associate)),
    subscriptionId: subscription._id,
    listingId: listing._id,
    creditLotId: listing.quota_credit_lot_id || null,
    type: "unpublish_refund",
    source: listing.quota_source || "plan",
    amount: 1,
    note: reason,
    actorId,
    idempotencyKey: key,
  })
  return true
}

export async function reviewListingWithQuota(input: {
  listingId: string
  action: "approve" | "reject"
  notes?: string
  actorId: ObjectId
}) {
  const listingId = parseObjectId(input.listingId, "listing ID")
  return runAgentTransaction(async (db, session) => {
    const listing = await db.collection("listings").findOne({ _id: listingId }, { session })
    if (!listing) throw new AgentSubscriptionError("Property not found.", 404, "LISTING_NOT_FOUND")
    if (input.action === "reject" && listing.review_status === "rejected") {
      await db.collection("listings").updateOne({ _id: listingId }, { $set: { review_notes: input.notes || "", reviewed_at: new Date(), reviewed_by: input.actorId } }, { session })
      return { success: true, alreadyReviewed: true, property: serializeMongoValue({ ...listing, review_notes: input.notes || "", review_status: "rejected" }) }
    }
    if (input.action === "approve" && listing.review_status === "approved") {
      return { success: true, alreadyReviewed: true, property: serializeMongoValue(listing) }
    }

    const now = new Date()
    const ownerId = listing.associate ? parseObjectId(listing.associate, "listing owner ID") : null
    let agentOwnerId: ObjectId | null = null
    let quotaRefunded = false
    let quotaCharge: { source: string; subscriptionId?: ObjectId; creditLotId?: ObjectId; cycle: number } | null = null

    if (input.action === "approve" && ownerId) {
      const owner = await db.collection("users").findOne({ _id: ownerId }, { session })
      if (!owner) throw new AgentSubscriptionError("The listing owner account could not be found.", 409, "INVALID_LISTING_OWNER")
      if (owner.user_type === "associate") {
        agentOwnerId = ownerId
        const agentId = ownerId
        const accountStatus = owner.account_status || "active"
        if (accountStatus !== "active") {
          throw new AgentSubscriptionError("This agent account is inactive or suspended. Reactivate it before publishing.", 409, "AGENT_INACTIVE")
        }
        const subscription = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).findOne(
          { agent_id: agentId, status: "active" }, { session, sort: { created_at: -1 } },
        )
        if (!subscription) {
          throw new AgentSubscriptionError("This agent needs an active plan or Free allocation before publishing.", 409, "NO_ACTIVE_SUBSCRIPTION")
        }
        const expiresAt = dateOrNull(subscription.expires_at)
        if (expiresAt && expiresAt.getTime() <= now.getTime()) {
          throw new AgentSubscriptionError("This agent subscription has expired. Renew or reassign a plan before publishing.", 409, "SUBSCRIPTION_EXPIRED")
        }

        if (!listing.quota_consumed) {
          const lots = await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).find({
            agent_id: agentId,
            remaining_credits: { $gt: 0 },
            $or: [{ expires_at: null }, { expires_at: { $exists: false } }, { expires_at: { $gt: now } }],
          }, { session }).toArray()
          lots.sort((a, b) => (dateOrNull(a.expires_at)?.getTime() ?? Number.MAX_SAFE_INTEGER) - (dateOrNull(b.expires_at)?.getTime() ?? Number.MAX_SAFE_INTEGER))
          const planRemaining = Math.max(0, Number(subscription.plan_quota || 0) - Number(subscription.plan_used || 0))
          const nextLot = lots[0]
          const planExpiry = expiresAt?.getTime() ?? Number.MAX_SAFE_INTEGER
          const lotExpiry = dateOrNull(nextLot?.expires_at)?.getTime() ?? Number.MAX_SAFE_INTEGER
          const useSpecial = Boolean(nextLot && Number(nextLot.remaining_credits) > 0 && (planRemaining <= 0 || lotExpiry <= planExpiry))
          if (!useSpecial && planRemaining <= 0) {
            throw new AgentSubscriptionError("Publishing quota is exhausted. Ask an administrator for additional credits or a plan change.", 409, "QUOTA_EXHAUSTED")
          }

          const cycle = Number(listing.quota_cycle || 0) + 1
          if (useSpecial && nextLot) {
            const updatedLot = await db.collection(SUBSCRIPTION_COLLECTIONS.creditLots).updateOne(
              { _id: nextLot._id, remaining_credits: { $gt: 0 } },
              { $inc: { remaining_credits: -1 } },
              { session },
            )
            if (updatedLot.modifiedCount !== 1) throw new AgentSubscriptionError("The credit balance changed. Retry approval.", 409, "CREDIT_CONFLICT")
            quotaCharge = { source: "special", subscriptionId: subscription._id, creditLotId: nextLot._id, cycle }
          } else {
            const planUpdate = await db.collection(SUBSCRIPTION_COLLECTIONS.subscriptions).updateOne(
              { _id: subscription._id, status: "active", plan_used: { $lt: Number(subscription.plan_quota || 0) } },
              { $inc: { plan_used: 1 }, $set: { updated_at: now } },
              { session },
            )
            if (planUpdate.modifiedCount !== 1) throw new AgentSubscriptionError("The plan quota changed. Retry approval.", 409, "QUOTA_CONFLICT")
            quotaCharge = { source: "plan", subscriptionId: subscription._id, cycle }
          }

          const quotaKey = `publish:${listingId.toHexString()}:${cycle}`
          await recordAgentQuotaTransaction(db, session, {
            agentId,
            subscriptionId: subscription._id,
            listingId,
            creditLotId: quotaCharge.creditLotId || null,
            type: "publish_debit",
            source: quotaCharge.source,
            amount: 1,
            note: "Publishing credit consumed on approval.",
            actorId: input.actorId,
            idempotencyKey: quotaKey,
          })
        }
      } else if (owner.user_type !== "admin") {
        throw new AgentSubscriptionError("Only associate-owned listings use agent publishing plans.", 409, "INVALID_LISTING_OWNER")
      }
    }

    if (input.action === "reject" && listing.review_status === "approved" && listing.quota_consumed) {
      quotaRefunded = await refundListingQuota(db, session, listing, input.actorId, input.notes || "Listing unpublished")
    }

    const reviewUpdate = input.action === "approve"
      ? { review_status: "approved", review_notes: "", reviewed_at: now, reviewed_by: input.actorId }
      : { review_status: "rejected", review_notes: input.notes || "", reviewed_at: now, reviewed_by: input.actorId }
    const quotaUpdate = input.action === "approve" && quotaCharge
      ? {
          quota_consumed: true,
          quota_source: quotaCharge.source,
          quota_subscription_id: quotaCharge.subscriptionId,
          quota_credit_lot_id: quotaCharge.creditLotId || null,
          quota_cycle: quotaCharge.cycle,
          quota_consumed_at: now,
          quota_refunded_at: null,
        }
      : quotaRefunded
        ? { quota_consumed: false, quota_refunded_at: now }
        : {}
    const updateResult = await db.collection("listings").updateOne(
      { _id: listingId, review_status: { $ne: input.action === "approve" ? "approved" : "rejected" } },
      { $set: { ...reviewUpdate, ...quotaUpdate, updated_at: now } },
      { session },
    )
    if (updateResult.modifiedCount === 0) {
      throw new AgentSubscriptionError("The listing review status changed. Refresh and retry.", 409, "REVIEW_CONFLICT")
    }
    const property = await db.collection("listings").findOne({ _id: listingId }, { session })
    await recordAgentAdminActivity(db, session, {
      actorId: input.actorId,
      agentId: agentOwnerId || undefined,
      entityType: agentOwnerId ? "agent" : "listing",
      entityId: agentOwnerId?.toHexString() || listingId.toHexString(),
      action: input.action === "approve" ? "listing_approved" : "listing_rejected",
      note: input.notes,
      before: { review_status: listing.review_status || "pending", quota_consumed: Boolean(listing.quota_consumed) },
      after: { review_status: reviewUpdate.review_status, quota_consumed: Boolean(property?.quota_consumed) },
    })
    return { success: true, property: serializeMongoValue(property) }
  })
}

export async function removeListingWithQuotaRefund(input: {
  listingId: string
  actorId: ObjectId
  agentId?: ObjectId | null
  reason: string
}) {
  const listingId = parseObjectId(input.listingId, "listing ID")
  return runAgentTransaction(async (db, session) => {
    const filter: Record<string, unknown> = { _id: listingId }
    if (input.agentId) filter.associate = { $in: [input.agentId, input.agentId.toHexString()] }
    const listing = await db.collection("listings").findOne(filter, { session })
    if (!listing) throw new AgentSubscriptionError("Property not found or unauthorized.", 404, "LISTING_NOT_FOUND")
    const ownerId = listing.associate ? parseObjectId(listing.associate, "listing owner ID") : null
    const owner = ownerId ? await db.collection("users").findOne({ _id: ownerId }, { session }) : null
    const agentOwnerId = owner?.user_type === "associate" ? ownerId : null
    if (listing.review_status === "approved" && listing.quota_consumed) {
      await refundListingQuota(db, session, listing, input.actorId, input.reason)
    }
    await db.collection("listings").deleteOne({ _id: listingId }, { session })
    await recordAgentAdminActivity(db, session, {
      actorId: input.actorId,
      agentId: agentOwnerId || undefined,
      entityType: agentOwnerId ? "agent" : "listing",
      entityId: agentOwnerId?.toHexString() || listingId.toHexString(),
      action: "listing_deleted",
      note: input.reason,
      before: { property_name: listing.property_name, review_status: listing.review_status, quota_consumed: Boolean(listing.quota_consumed) },
      after: { deleted: true },
    })
    return { success: true }
  })
}

export async function updateAssociateListingWithQuota(input: {
  listingId: string
  agentId: ObjectId
  body: Record<string, any>
}) {
  const listingId = parseObjectId(input.listingId, "listing ID")
  return runAgentTransaction(async (db, session) => {
    const filter = { _id: listingId, associate: { $in: [input.agentId, input.agentId.toHexString()] } }
    const existing = await db.collection("listings").findOne(filter, { session })
    if (!existing) throw new AgentSubscriptionError("Property not found or unauthorized.", 404, "LISTING_NOT_FOUND")
    let refundedQuota = false
    if (existing.review_status === "approved" && existing.quota_consumed) {
      refundedQuota = await refundListingQuota(db, session, existing, input.agentId, "Agent edited a published listing; sent back for review.")
    }
    const quotaFields = existing.quota_consumed && !refundedQuota
      ? {
          quota_consumed: true,
          quota_source: existing.quota_source,
          quota_subscription_id: existing.quota_subscription_id,
          quota_credit_lot_id: existing.quota_credit_lot_id || null,
          quota_cycle: Number(existing.quota_cycle || 0),
        }
      : {
          quota_consumed: false,
          quota_refunded_at: refundedQuota ? new Date() : existing.quota_refunded_at || null,
          quota_cycle: Number(existing.quota_cycle || 0),
        }
    const body = { ...input.body }
    delete body._id
    delete body.associate
    delete body.review_status
    delete body.review_notes
    delete body.reviewed_at
    delete body.reviewed_by
    delete body.quota_consumed
    delete body.quota_source
    delete body.quota_subscription_id
    delete body.quota_credit_lot_id
    delete body.quota_cycle
    const result = await db.collection("listings").updateOne(filter, {
      $set: {
        ...body,
        review_status: "pending",
        review_notes: "",
        submitted_at: new Date(),
        reviewed_at: null,
        reviewed_by: null,
        ...quotaFields,
        updated_at: new Date(),
      },
      $inc: { submission_count: 1 },
    }, { session })
    if (result.matchedCount !== 1) throw new AgentSubscriptionError("Property was changed by another request. Refresh and retry.", 409, "LISTING_CONFLICT")
    return { success: true }
  })
}

export async function createAdminActivityLog(db: Db, session: ClientSession, input: {
  actorId: ObjectId
  agentId: ObjectId
  action: string
  note?: string
  before?: unknown
  after?: unknown
}) {
  return recordAgentAdminActivity(db, session, input)
}

export { type SubscriptionBillingCycle, type SubscriptionPlanCode }
