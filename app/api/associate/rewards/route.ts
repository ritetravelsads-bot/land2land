import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { getAgentRewardOverview } from "@/lib/reward-system"

export const dynamic = "force-dynamic"

export async function GET() {
  const agent = await getCurrentUser()
  if (!agent || agent.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    return NextResponse.json(await getAgentRewardOverview(db, agent._id))
  } catch {
    return NextResponse.json({ error: "Failed to load rewards." }, { status: 500 })
  }
}
