import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import {
  COLLECTIONS,
  RERA_REQUEST_STATUSES,
  type ReraStageEvent,
  type ReraRequestedDocument,
  type ReraRequestStatus,
} from "@/lib/models"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET /api/admin/rera-requests/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ error: "Invalid request ID." }, { status: 400 })
    }

    const db = await getDatabase()
    const request = await db.collection(COLLECTIONS.RERA_REQUESTS).findOne({ _id: objectId })
    if (!request) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 })
    }

    return NextResponse.json({ ...request, _id: request._id.toString() })
  } catch (error) {
    console.error("[v0] Error loading RERA request:", error)
    return NextResponse.json({ error: "Failed to load request" }, { status: 500 })
  }
}

// PATCH /api/admin/rera-requests/[id]
// Admin actions:
//   { action: "set_status", status, note? }
//   { action: "request_documents", documents: [{ label, note?, required? }], note? }
//   { action: "approve", rera_number, note? }
//   { action: "reject", reason }
//   { action: "update_notes", admin_notes }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || user.user_type !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let objectId: ObjectId
    try {
      objectId = new ObjectId(id)
    } catch {
      return NextResponse.json({ error: "Invalid request ID." }, { status: 400 })
    }

    const db = await getDatabase()
    const existing = await db.collection(COLLECTIONS.RERA_REQUESTS).findOne({ _id: objectId })
    if (!existing) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 })
    }

    const body = await req.json().catch(() => ({}))
    const action = body.action as string
    const now = new Date()

    const set: Record<string, unknown> = { updated_at: now }
    let event: ReraStageEvent | null = null

    if (action === "set_status") {
      const status = body.status as ReraRequestStatus
      if (!RERA_REQUEST_STATUSES.includes(status)) {
        return NextResponse.json({ error: "Invalid status." }, { status: 400 })
      }
      set.status = status
      event = {
        status,
        note: typeof body.note === "string" ? body.note.trim() : "",
        by: user._id.toString(),
        by_role: "admin",
        at: now,
      }
    } else if (action === "request_documents") {
      const items: Array<{ label: string; note?: string; required?: boolean }> = Array.isArray(
        body.documents,
      )
        ? body.documents
        : []
      const cleaned = items
        .filter((d) => d && typeof d.label === "string" && d.label.trim())
        .map<ReraRequestedDocument>((d, idx) => ({
          key: `doc_${Date.now()}_${idx}`,
          label: d.label.trim(),
          note: typeof d.note === "string" ? d.note.trim() : "",
          required: d.required !== false,
          requested_at: now,
        }))

      if (cleaned.length === 0) {
        return NextResponse.json({ error: "Add at least one document to request." }, { status: 400 })
      }

      // Keep any previously requested documents that already have uploads.
      const previous: ReraRequestedDocument[] = (existing.requested_documents || []).filter(
        (d: ReraRequestedDocument) => d.file && d.file.url,
      )
      set.requested_documents = [...previous, ...cleaned]
      set.status = "documents_requested"
      event = {
        status: "documents_requested",
        note:
          typeof body.note === "string" && body.note.trim()
            ? body.note.trim()
            : `Requested ${cleaned.length} document(s) from the agent.`,
        by: user._id.toString(),
        by_role: "admin",
        at: now,
      }
    } else if (action === "approve") {
      const reraNumber = typeof body.rera_number === "string" ? body.rera_number.trim() : ""
      if (!reraNumber) {
        return NextResponse.json({ error: "Please provide the RERA number." }, { status: 400 })
      }
      set.status = "approved"
      set.rera_number = reraNumber
      set.rejection_reason = ""
      event = {
        status: "approved",
        note: `RERA registration approved. RERA No: ${reraNumber}`,
        by: user._id.toString(),
        by_role: "admin",
        at: now,
      }

      // Also stamp the RERA number onto the listing when possible.
      try {
        await db
          .collection(COLLECTIONS.LISTINGS)
          .updateOne({ _id: new ObjectId(existing.listing) }, { $set: { rera_no: reraNumber } })
      } catch {
        // listing id may be invalid; ignore
      }
    } else if (action === "reject") {
      const reason = typeof body.reason === "string" ? body.reason.trim() : ""
      if (!reason) {
        return NextResponse.json(
          { error: "Please provide a reason so the agent knows why." },
          { status: 400 },
        )
      }
      set.status = "rejected"
      set.rejection_reason = reason
      event = {
        status: "rejected",
        note: reason,
        by: user._id.toString(),
        by_role: "admin",
        at: now,
      }
    } else if (action === "update_notes") {
      set.admin_notes = typeof body.admin_notes === "string" ? body.admin_notes.trim() : ""
    } else {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 })
    }

    const update: Record<string, unknown> = { $set: set }
    if (event) update.$push = { stage_history: event }

    await db.collection(COLLECTIONS.RERA_REQUESTS).updateOne({ _id: objectId }, update)

    const updated = await db.collection(COLLECTIONS.RERA_REQUESTS).findOne({ _id: objectId })
    return NextResponse.json({
      success: true,
      request: updated ? { ...updated, _id: updated._id.toString() } : null,
    })
  } catch (error) {
    console.error("[v0] Error updating RERA request:", error)
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }
}
