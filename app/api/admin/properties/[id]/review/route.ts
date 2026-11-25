import { getCurrentUser } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { NextResponse, type NextRequest } from "next/server"
import {
  AgentSubscriptionError,
  parseObjectId,
  reviewListingWithQuota,
} from "@/lib/agent-subscriptions"
import { getDatabase } from "@/lib/mongodb"
import { creditAutomaticRewardsForEvent, seedAutomaticRewardTasks } from "@/lib/automatic-rewards"

export const dynamic = "force-dynamic"
export const revalidate = 0

// Quota debit, approval state, and audit entry commit in one MongoDB transaction.
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json().catch(() => ({}))
    const action = body.action
    const notes = typeof body.notes === "string" ? body.notes.trim() : ""

    if (action !== "approve" && action !== "reject") {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
    if (action === "reject" && !notes) {
      return NextResponse.json({ error: "Please provide a reason so the owner knows what to fix." }, { status: 400 })
    }

    const result = await reviewListingWithQuota({
      listingId: id,
      action,
      notes,
      actorId: parseObjectId(user._id, "admin ID"),
    })
    const associateId = result.property?.associate
    if (action === "approve" && !result.alreadyReviewed && typeof associateId === "string" && ObjectId.isValid(associateId)) {
      const db = await getDatabase()
      await seedAutomaticRewardTasks(db, user._id)
      await creditAutomaticRewardsForEvent(new ObjectId(associateId), "listing_approved")
    }
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof AgentSubscriptionError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: error.status })
    }
    console.error("[v0] Error reviewing property:", error)
    return NextResponse.json({ error: "Failed to review property" }, { status: 500 })
  }
}
