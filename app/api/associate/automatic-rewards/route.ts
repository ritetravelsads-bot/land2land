import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getDatabase } from "@/lib/mongodb"
import { getAutomaticRewardTasks, seedAutomaticRewardTasks } from "@/lib/automatic-rewards"

export const dynamic = "force-dynamic"

export async function GET() {
  const user = await getCurrentUser()
  if (!user || user.user_type !== "associate") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const db = await getDatabase()
    await seedAutomaticRewardTasks(db, user._id)
    const overview = await getAutomaticRewardTasks(db, user)
    return NextResponse.json(overview)
  } catch {
    return NextResponse.json({ error: "Unable to load automatic rewards." }, { status: 500 })
  }
}
