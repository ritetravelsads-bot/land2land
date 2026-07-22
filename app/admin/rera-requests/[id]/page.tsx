"use client"

import Link from "next/link"
import { useEffect, useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  ShieldCheck,
  Loader2,
  Plus,
  Trash2,
  FileText,
  Eye,
  Check,
  X,
  Award,
  Save,
  Send,
} from "lucide-react"
import ReraStatusBadge, { RERA_STATUS_STYLES } from "@/components/rera/rera-status-badge"
import {
  RERA_STATUS_LABELS,
  RERA_APPLICANT_TYPE_LABELS,
  type ReraRequest,
  type ReraRequestStatus,
  type ReraApplicantType,
} from "@/lib/models"

const inputCls =
  "w-full rounded-md border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"

// Stages the admin can move a request into manually.
const MOVE_STATUSES: ReraRequestStatus[] = ["under_review", "processing"]

function formatDate(d: string | Date | undefined) {
  if (!d) return ""
  return new Date(d).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function AdminReraDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [request, setRequest] = useState<ReraRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // document request builder
  const [docItems, setDocItems] = useState<{ label: string; note: string; required: boolean }[]>([
    { label: "", note: "", required: true },
  ])
  const [docRequestNote, setDocRequestNote] = useState("")

  // admin notes
  const [adminNotes, setAdminNotes] = useState("")

  // dialogs
  const [approveOpen, setApproveOpen] = useState(false)
  const [reraNumber, setReraNumber] = useState("")
  const [rejectOpen, setRejectOpen] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const load = async () => {
    try {
      const res = await fetch(`/api/admin/rera-requests/${id}`, {
        cache: "no-store",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to load")
      setRequest(data)
      setAdminNotes(data.admin_notes || "")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const patch = async (payload: Record<string, unknown>) => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/rera-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      if (data.request) {
        setRequest(data.request)
        setAdminNotes(data.request.admin_notes || "")
      }
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      return false
    } finally {
      setBusy(false)
    }
  }

  const requestDocuments = async () => {
    const documents = docItems
      .filter((d) => d.label.trim())
      .map((d) => ({ label: d.label.trim(), note: d.note.trim(), required: d.required }))
    if (documents.length === 0) {
      setError("Add at least one document with a label.")
      return
    }
    const ok = await patch({ action: "request_documents", documents, note: docRequestNote.trim() })
    if (ok) {
      setDocItems([{ label: "", note: "", required: true }])
      setDocRequestNote("")
    }
  }

  const approve = async () => {
    const ok = await patch({ action: "approve", rera_number: reraNumber.trim() })
    if (ok) {
      setApproveOpen(false)
      setReraNumber("")
    }
  }

  const reject = async () => {
    const ok = await patch({ action: "reject", reason: rejectReason.trim() })
    if (ok) {
      setRejectOpen(false)
      setRejectReason("")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!request) {
    return (
      <div className="space-y-4">
        <BackLink />
        <p className="text-sm text-destructive">{error || "Request not found."}</p>
      </div>
    )
  }

  const requestedDocs = request.requested_documents || []
  const uploadedDocs = requestedDocs.filter((d) => d.file && d.file.url)
  const isClosed = request.status === "approved" || request.status === "rejected"

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <BackLink />

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">
              {request.listing_name || "Land property"}
            </h1>
            <p className="text-sm text-muted-foreground">
              Requested by {request.associate_name} · {formatDate(request.created_at)}
            </p>
          </div>
        </div>
        <ReraStatusBadge status={request.status} />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: details + docs */}
        <div className="space-y-6 lg:col-span-2">
          {/* Request details */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Request Details</h2>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <Detail label="Applicant" value={request.applicant_name} />
              <Detail
                label="Applicant Type"
                value={
                  RERA_APPLICANT_TYPE_LABELS[request.applicant_type as ReraApplicantType] ||
                  request.applicant_type
                }
              />
              <Detail label="Phone" value={request.contact_phone} />
              <Detail label="Email" value={request.contact_email} />
              <Detail label="Location" value={request.project_location} />
              <Detail label="Land Area" value={request.land_area} />
              {request.estimated_value ? (
                <Detail
                  label="Estimated Value"
                  value={`₹ ${request.estimated_value.toLocaleString("en-IN")}`}
                />
              ) : null}
              <Detail label="PAN / Aadhaar" value={request.aadhaar_or_pan} />
              <Detail label="Associate" value={request.associate_name} />
              <Detail label="Associate Email" value={request.associate_email} />
            </dl>
            {request.associate_notes && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-1 text-xs font-semibold text-muted-foreground">Associate&apos;s note</p>
                <p className="text-sm text-foreground">{request.associate_notes}</p>
              </div>
            )}
            <div className="mt-4 border-t border-border pt-4">
              <Link
                href={`/properties/${request.listing_slug || request.listing}`}
                className="text-sm text-primary underline"
              >
                View the land listing
              </Link>
            </div>
          </div>

          {/* Uploaded documents */}
          {uploadedDocs.length > 0 && (
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">
                Documents from Associate ({uploadedDocs.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {uploadedDocs.map((d) => {
                  const isPdf = d.file?.type === "application/pdf"
                  return (
                    <a
                      key={d.key}
                      href={d.file?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {isPdf ? <FileText className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      {d.label}
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Pending requested docs (not yet uploaded) */}
          {requestedDocs.some((d) => !d.file) && (
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Awaiting from Associate</h2>
              <ul className="space-y-2">
                {requestedDocs
                  .filter((d) => !d.file)
                  .map((d) => (
                    <li
                      key={d.key}
                      className="flex items-start gap-2 rounded-md border border-dashed border-border px-3 py-2 text-sm"
                    >
                      <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">
                          {d.label}
                          {d.required && <span className="text-destructive"> *</span>}
                        </p>
                        {d.note && <p className="text-xs text-muted-foreground">{d.note}</p>}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Request documents builder */}
          {!isClosed && (
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-1 text-sm font-semibold text-foreground">Request Documents</h2>
              <p className="mb-4 text-xs text-muted-foreground">
                Ask the associate for the papers you need. This moves the request to
                &quot;Documents Requested&quot;.
              </p>
              <div className="space-y-3">
                {docItems.map((item, idx) => (
                  <div key={idx} className="rounded-md border border-border p-3">
                    <div className="flex items-start gap-2">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) =>
                            setDocItems((prev) =>
                              prev.map((d, i) => (i === idx ? { ...d, label: e.target.value } : d)),
                            )
                          }
                          className={inputCls}
                          placeholder="Document name (e.g. Title Deed)"
                        />
                        <input
                          type="text"
                          value={item.note}
                          onChange={(e) =>
                            setDocItems((prev) =>
                              prev.map((d, i) => (i === idx ? { ...d, note: e.target.value } : d)),
                            )
                          }
                          className={inputCls}
                          placeholder="Instructions (optional)"
                        />
                        <label className="flex items-center gap-2 text-xs text-muted-foreground">
                          <input
                            type="checkbox"
                            checked={item.required}
                            onChange={(e) =>
                              setDocItems((prev) =>
                                prev.map((d, i) =>
                                  i === idx ? { ...d, required: e.target.checked } : d,
                                ),
                              )
                            }
                          />
                          Required
                        </label>
                      </div>
                      {docItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setDocItems((prev) => prev.filter((_, i) => i !== idx))}
                          className="text-destructive hover:text-destructive/80"
                          aria-label="Remove document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setDocItems((prev) => [...prev, { label: "", note: "", required: true }])
                }
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <Plus className="h-4 w-4" />
                Add another document
              </button>

              <Textarea
                value={docRequestNote}
                onChange={(e) => setDocRequestNote(e.target.value)}
                placeholder="Optional message to the associate"
                rows={2}
                className="mt-3"
              />

              <div className="mt-3 flex justify-end">
                <Button onClick={requestDocuments} disabled={busy}>
                  {busy ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send Document Request
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right: actions + timeline */}
        <div className="space-y-6">
          {/* Stage actions */}
          {!isClosed && (
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="mb-3 text-sm font-semibold text-foreground">Manage Stage</h2>
              <div className="space-y-2">
                {MOVE_STATUSES.map((s) => {
                  const meta = RERA_STATUS_STYLES[s]
                  const Icon = meta.Icon
                  const isCurrent = request.status === s
                  return (
                    <Button
                      key={s}
                      variant="outline"
                      className="w-full justify-start"
                      disabled={busy || isCurrent}
                      onClick={() => patch({ action: "set_status", status: s })}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {isCurrent ? `Currently ${RERA_STATUS_LABELS[s]}` : `Move to ${RERA_STATUS_LABELS[s]}`}
                    </Button>
                  )
                })}
                <Button
                  className="w-full justify-start"
                  disabled={busy}
                  onClick={() => setApproveOpen(true)}
                >
                  <Award className="mr-2 h-4 w-4" />
                  Approve &amp; Issue RERA
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  disabled={busy}
                  onClick={() => setRejectOpen(true)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject Request
                </Button>
              </div>
            </div>
          )}

          {/* Admin notes */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Message to Associate</h2>
            <Textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Visible to the associate on their request"
              rows={4}
            />
            <div className="mt-3 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                disabled={busy}
                onClick={() => patch({ action: "update_notes", admin_notes: adminNotes })}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Note
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="mb-4 text-sm font-semibold text-foreground">Timeline</h2>
            <ol className="space-y-4">
              {[...(request.stage_history || [])].reverse().map((ev, idx) => {
                const meta = RERA_STATUS_STYLES[ev.status] || RERA_STATUS_STYLES.submitted
                const Icon = meta.Icon
                return (
                  <li key={idx} className="flex gap-3">
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${meta.cls}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">
                        {RERA_STATUS_LABELS[ev.status] || ev.status}
                        <span className="ml-2 text-xs font-normal text-muted-foreground">
                          {ev.by_role === "admin" ? "Admin" : "Associate"}
                        </span>
                      </p>
                      {ev.note && <p className="mt-0.5 text-sm text-muted-foreground">{ev.note}</p>}
                      <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(ev.at)}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Approve dialog */}
      <Dialog open={approveOpen} onOpenChange={setApproveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve &amp; issue RERA</DialogTitle>
            <DialogDescription>
              Enter the official RERA registration number. It will be shown to the associate and saved on
              the listing.
            </DialogDescription>
          </DialogHeader>
          <input
            type="text"
            value={reraNumber}
            onChange={(e) => setReraNumber(e.target.value)}
            className={inputCls}
            placeholder="e.g. PBRERA-XXXX-PRXXXX"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setApproveOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={approve} disabled={busy || !reraNumber.trim()}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject this request</DialogTitle>
            <DialogDescription>
              Tell the associate why. They will see this reason on their request.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="e.g. The land falls outside RERA's applicable area."
            rows={4}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)} disabled={busy}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={reject} disabled={busy || !rejectReason.trim()}>
              {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Send &amp; Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function BackLink() {
  return (
    <Link
      href="/admin/rera-requests"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      Back to RERA Requests
    </Link>
  )
}

function Detail({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-0.5 text-sm text-foreground">{value}</dd>
    </div>
  )
}
