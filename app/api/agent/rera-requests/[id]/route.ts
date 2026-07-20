import { getDatabase } from "@/lib/mongodb"
import { getCurrentUser } from "@/lib/auth"
import { COLLECTIONS, type ReraStageEvent, type ReraRequestedDocument } from "@/lib/models"
import { ObjectId } from "mongodb"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

async function loadOwnedRequest(id: string, user: any, db: any) {
  let objectId: ObjectId
  try {
    objectId = new ObjectId(id)
  } catch {
    return { error: "Invalid request ID.", status: 400 as const }
  }
  const request = await db.collection(COLLECTIONS.RERA_REQUESTS).findOne({ _id: objectId })
  if (!request) return { error: "Request not found.", status: 404 as const }
  if (user.user_type !== "admin" && request.agent !== user._id.toString()) {
    return { error: "Not authorized to view this request.", status: 403 as const }
  }
  return { request, objectId }
}

// GET /api/agent/rera-requests/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const loaded = await loadOwnedRequest(id, user, db)
    if ("error" in loaded) {
      return NextResponse.json({ error: loaded.error }, { status: loaded.status })
    }

    return NextResponse.json({ ...loaded.request, _id: loaded.request._id.toString() })
  } catch (error) {
    console.error("[v0] Error loading RERA request:", error)
    return NextResponse.json({ error: "Failed to load request" }, { status: 500 })
  }
}

// PATCH /api/agent/rera-requests/[id]
// Associate responds to a document request by uploading files.
// body: { documents: [{ key, file }] }
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await getCurrentUser()
    if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const loaded = await loadOwnedRequest(id, user, db)
    if ("error" in loaded) {
      return NextResponse.json({ error: loaded.error }, { status: loaded.status })
    }
    const { request, objectId } = loaded

    const body = await req.json().catch(() => ({}))
    const uploads: Array<{ key: string; file: any }> = Array.isArray(body.documents)
      ? body.documents
      : []

    if (uploads.length === 0) {
      return NextResponse.json({ error: "No documents provided." }, { status: 400 })
    }

    const now = new Date()
    const uploadMap = new Map(uploads.map((u) => [u.key, u.file]))

    const existingDocs: ReraRequestedDocument[] = request.requested_documents || []
    const updatedDocs = existingDocs.map((d) => {
      const file = uploadMap.get(d.key)
      if (file && file.url) {
        return { ...d, file, uploaded_at: now }
      }
      return d
    })

    // If every required document now has a file, move to documents_submitted.
    const allRequiredUploaded = updatedDocs
      .filter((d) => d.required)
      .every((d) => d.file && d.file.url)

    const newStatus = allRequiredUploaded ? "documents_submitted" : request.status

    const event: ReraStageEvent = {
      status: newStatus,
      note: allRequiredUploaded
        ? "Agent uploaded the requested documents."
        : "Agent uploaded some documents.",
      by: user._id.toString(),
      by_role: user.user_type === "admin" ? "admin" : "associate",
      at: now,
    }

    await db.collection(COLLECTIONS.RERA_REQUESTS).updateOne({ _id: objectId }, {
      $set: {
        requested_documents: updatedDocs,
        status: newStatus,
        updated_at: now,
      },
      $push: { stage_history: event },
    } as any)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating RERA request:", error)
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }
}
