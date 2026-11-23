import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { adjustRewardPoints, ensureRewardIndexes, parseRewardId, RewardError } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await ensureRewardIndexes(db)
    const accounts = await db.collection("users").aggregate([
      { $match: { user_type: "associate" } },
      { $lookup: { from: "agent_reward_accounts", localField: "_id", foreignField: "agent_id", as: "account" } },
      { $unwind: { path: "$account", preserveNullAndEmptyArrays: true } },
      { $project: { username: 1, email: 1, available_points: { $ifNull: ["$account.available_points", 0] }, lifetime_earned_points: { $ifNull: ["$account.lifetime_earned_points", 0] }, pending_points: { $ifNull: ["$account.pending_points", 0] } } },
      { $sort: { username: 1 } }, { $limit: 100 },
    ]).toArray()
    return NextResponse.json(accounts)
  } catch {
    return NextResponse.json({ error: "Failed to load agent reward accounts." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const admin = await getCurrentUser()
  if (!admin || admin.user_type !== "admin") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const body = await request.json()
    const agentId = parseRewardId(String(body.agent_id || ""))
    if (body.action !== "grant" && body.action !== "deduct") throw new RewardError("Choose grant or deduct.")
    if (typeof body.reason !== "string") throw new RewardError("An adjustment reason is required.")
    return NextResponse.json(await adjustRewardPoints(agentId, admin._id, body.action, Number(body.points), body.reason))
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to adjust points." }, { status: error instanceof RewardError ? error.status : 400 })
  }
}
