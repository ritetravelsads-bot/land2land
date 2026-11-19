import { NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { AgentSubscriptionError, getAgentSubscriptionOverview, parseObjectId } from "@/lib/agent-subscriptions"

export const dynamic = "force-dynamic"
export const revalidate = 0

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export async function GET(request: NextRequest) {
  try {
    const admin = await getCurrentUser()
    if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const params = request.nextUrl.searchParams
    const page = Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1)
    const limit = Math.min(50, Math.max(1, Number.parseInt(params.get("limit") || "25", 10) || 25))
    const filters: Record<string, any> = { user_type: "associate" }
    const clauses: Record<string, any>[] = []
    const search = params.get("search")?.trim()
    const planCode = params.get("plan_code")?.trim()
    const accountStatus = params.get("account_status")?.trim()

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i")
      const searchTerms: Record<string, any>[] = [
        { username: regex },
        { email: regex },
        { phone_number: regex },
      ]
      if (/^[a-f\d]{24}$/i.test(search)) searchTerms.push({ _id: parseObjectId(search) })
      clauses.push({ $or: searchTerms })
    }
    if (accountStatus === "active") {
      clauses.push({ $or: [{ account_status: "active" }, { account_status: { $exists: false } }] })
    } else if (["inactive", "suspended"].includes(accountStatus || "")) {
      clauses.push({ account_status: accountStatus })
    }

    const db = await getDatabase()
    if (planCode) {
      const matchingAgentIds = await db.collection("agent_subscriptions").distinct("agent_id", { plan_code: planCode, status: "active" })
      clauses.push({ _id: { $in: matchingAgentIds } })
    }
    if (clauses.length) filters.$and = clauses

    const [total, users] = await Promise.all([
      db.collection("users").countDocuments(filters),
      db.collection("users")
        .find(filters)
        .project({ username: 1, email: 1, phone_number: 1, user_type: 1, account_status: 1, admin_notes: 1, is_verified: 1, date_joined: 1, created_at: 1 })
        .sort({ created_at: -1, date_joined: -1, _id: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
    ])
    const agents = (await Promise.all(users.map((user) => getAgentSubscriptionOverview(db, user._id, true, false)))).filter(Boolean)
    return NextResponse.json({ agents, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
  } catch (error) {
    const status = error instanceof AgentSubscriptionError ? error.status : 500
    console.error("[admin/agents] Failed to list agents:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to load agents" }, { status })
  }
}
