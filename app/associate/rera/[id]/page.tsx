"use client"

import Link from "next/link"
import { useEffect, useState, use } from "react"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  ShieldCheck,
  Loader2,
  FileWarning,
  CheckCircle2,
  XCircle,
  Award,
} from "lucide-react"
import ReraStatusBadge, { RERA_STATUS_STYLES } from "@/components/rera/rera-status-badge"
import DocumentUploadField from "@/components/forms/document-upload-field"
import {
  RERA_STATUS_LABELS,
  RERA_APPLICANT_TYPE_LABELS,
  type ReraRequest,
  type LandDocumentFile,
  type ReraApplicantType,
} from "@/lib/models"

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

export default function AssociateReraDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [request, setRequest] = useState<ReraRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [docFiles, setDocFiles] = useState<Record<string, LandDocumentFile | undefined>>({})
  const [saving, setSaving] = useState(false)

  const load = async () => {
    try {
      const res = await fetch(`/api/associate/rera-requests/${id}`, {
        cache: "no-store",
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to load")
      setRequest(data)
      const initial: Record<string, LandDocumentFile | undefined> = {}
      for (const d of data.requested_documents || []) {
        if (d.file) initial[d.key] = d.file
      }
      setDocFiles(initial)
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

  const submitDocuments = async () => {
    if (!request) return
    setSaving(true)
    setError(null)
    try {
      const documents = (request.requested_documents || [])
        .filter((d) => docFiles[d.key])
        .map((d) => ({ key: d.key, file: docFiles[d.key] }))

      const res = await fetch(`/api/associate/rera-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ documents }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to submit")
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setSaving(false)
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
        <Link
          href="/associate/rera"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to RERA Requests
        </Link>
        <p className="text-sm text-destructive">{error || "Request not found."}</p>
      </div>
    )
  }

  const requestedDocs = request.requested_documents || []
  const needsDocs = request.status === "documents_requested"
  const allRequiredReady = requestedDocs
    .filter((d) => d.required)
    .every((d) => docFiles[d.key])

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Back */}
      <Link
        href="/associate/rera"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to RERA Requests
      </Link>

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
            <p className="text-sm text-muted-foreground">RERA registration request</p>
          </div>
        </div>
        <ReraStatusBadge status={request.status} />
      </div>

      {/* Approved banner */}
      {request.status === "approved" && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="text-sm text-green-800">
            <p className="font-semibold">RERA registration approved!</p>
            {request.rera_number && (
              <p className="mt-0.5">
                Your RERA number: <span className="font-mono font-semibold">{request.rera_number}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Rejected banner */}
      {request.status === "rejected" && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
          <div className="text-sm text-red-800">
            <p className="font-semibold">This request was rejected.</p>
            <p className="mt-0.5 text-red-700">{request.rejection_reason}</p>
          </div>
        </div>
      )}

      {/* Admin note */}
      {request.admin_notes && (
        <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm">
          <p className="mb-1 font-semibold text-foreground">Message from admin</p>
          <p className="text-muted-foreground">{request.admin_notes}</p>
        </div>
      )}

      {/* Requested documents */}
      {requestedDocs.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <FileWarning className="h-4 w-4 text-orange-600" />
            <h2 className="text-sm font-semibold text-foreground">Requested Documents</h2>
          </div>
          {needsDocs && (
            <p className="mb-4 text-sm text-muted-foreground">
              The admin has asked for the documents below. Upload each one and submit.
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {requestedDocs.map((d) => (
              <div key={d.key}>
                <DocumentUploadField
                  label={`${d.label}${d.required ? " *" : ""}`}
                  hint={d.note || "Upload a clear photo or PDF"}
                  value={docFiles[d.key]}
                  onChange={(file) =>
                    setDocFiles((prev) => ({ ...prev, [d.key]: file }))
                  }
                />
              </div>
            ))}
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {request.status !== "approved" && request.status !== "rejected" && (
            <div className="mt-4 flex justify-end">
              <Button onClick={submitDocuments} disabled={saving || !allRequiredReady}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Submit Documents
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Request details */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Request Details</h2>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
          <Detail label="Applicant" value={request.applicant_name} />
          <Detail
            label="Applicant Type"
            value={RERA_APPLICANT_TYPE_LABELS[request.applicant_type as ReraApplicantType] || request.applicant_type}
          />
          <Detail label="Phone" value={request.contact_phone} />
          <Detail label="Email" value={request.contact_email} />
          <Detail label="Location" value={request.project_location} />
          <Detail label="Land Area" value={request.land_area} />
          {request.estimated_value ? (
            <Detail label="Estimated Value" value={`₹ ${request.estimated_value.toLocaleString("en-IN")}`} />
          ) : null}
          <Detail label="PAN / Aadhaar" value={request.aadhaar_or_pan} />
        </dl>
        {request.agent_notes && (
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-1 text-xs font-semibold text-muted-foreground">Your note</p>
            <p className="text-sm text-foreground">{request.agent_notes}</p>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Progress Timeline</h2>
        <ol className="space-y-4">
          {[...(request.stage_history || [])].reverse().map((ev, idx) => {
            const meta = RERA_STATUS_STYLES[ev.status] || RERA_STATUS_STYLES.submitted
            const Icon = meta.Icon
            return (
              <li key={idx} className="flex gap-3">
                <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${meta.cls}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {RERA_STATUS_LABELS[ev.status] || ev.status}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {ev.by_role === "admin" ? "Admin" : "You"}
                    </span>
                  </div>
                  {ev.note && <p className="mt-0.5 text-sm text-muted-foreground">{ev.note}</p>}
                  <p className="mt-0.5 text-xs text-muted-foreground">{formatDate(ev.at)}</p>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
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
