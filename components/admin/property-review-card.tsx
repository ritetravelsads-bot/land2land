"use client"

import { useState } from "react"
import Link from "next/link"
import {
  MapPin,
  FileText,
  ImageIcon,
  Eye,
  Check,
  X,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react"
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
import { LAND_DOCUMENT_TYPES } from "@/lib/models"
import { formatPriceToIndian } from "@/lib/utils"

export default function PropertyReviewCard({
  property,
  onReviewed,
}: {
  property: any
  onReviewed: (id: string, status: "approved" | "rejected") => void
}) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)

  const documents = property.documents || {}
  const uploadedDocs = LAND_DOCUMENT_TYPES.filter((d) => documents[d.key])
  const reviewStatus = property.review_status || "pending"

  const submitReview = async (action: "approve" | "reject", notes?: string) => {
    setLoading(action)
    setError(null)
    try {
      const res = await fetch(`/api/admin/properties/${property._id}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, notes }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed")
      setRejectOpen(false)
      onReviewed(property._id, action === "approve" ? "approved" : "rejected")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(null)
    }
  }

  const statusBadge = {
    pending: { label: "Pending Review", cls: "bg-yellow-100 text-yellow-700", Icon: Clock },
    approved: { label: "Approved", cls: "bg-green-100 text-green-700", Icon: CheckCircle2 },
    rejected: { label: "Rejected", cls: "bg-red-100 text-red-700", Icon: XCircle },
  }[reviewStatus as "pending" | "approved" | "rejected"] || {
    label: reviewStatus,
    cls: "bg-muted text-muted-foreground",
    Icon: Clock,
  }

  const StatusIcon = statusBadge.Icon
  const thumb = property.main_thumbnail || property.multiple_images?.[0]

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Thumbnail */}
        <div className="h-32 w-full flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-24 sm:w-32">
          {thumb ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={thumb || "/placeholder.svg"} alt={property.property_name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageIcon className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-semibold text-foreground">{property.property_name || "Untitled land"}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">
                  {[property.address, property.city, property.state].filter(Boolean).join(", ") || "No location"}
                </span>
              </p>
            </div>
            <span className={`flex flex-shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge.cls}`}>
              <StatusIcon className="h-3.5 w-3.5" />
              {statusBadge.label}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded bg-muted px-2 py-0.5 font-medium">{formatPriceToIndian(property.lowest_price)}</span>
            {property.area_value && (
              <span className="rounded bg-muted px-2 py-0.5">
                {property.area_value} {property.area_unit}
              </span>
            )}
            {property.property_type && (
              <span className="rounded bg-muted px-2 py-0.5 capitalize">{String(property.property_type).replace(/_/g, " ")}</span>
            )}
            <Link
              href={`/properties/${property.slug || property._id}`}
              className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 hover:bg-muted/70"
            >
              <ExternalLink className="h-3 w-3" /> Preview
            </Link>
          </div>

          {/* Documents */}
          <div className="mt-3">
            <p className="mb-1.5 text-xs font-semibold text-muted-foreground">
              Documents ({uploadedDocs.length}/{LAND_DOCUMENT_TYPES.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {LAND_DOCUMENT_TYPES.map((d) => {
                const doc = documents[d.key]
                if (!doc) {
                  return (
                    <span
                      key={d.key}
                      className="inline-flex items-center gap-1 rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground"
                    >
                      {d.label}: missing
                    </span>
                  )
                }
                const isPdf = doc.type === "application/pdf"
                return (
                  <a
                    key={d.key}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {isPdf ? <FileText className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    {d.label}
                  </a>
                )
              })}
            </div>
          </div>

          {/* Existing rejection note */}
          {reviewStatus === "rejected" && property.review_notes && (
            <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              <span className="font-semibold">Reason sent to owner:</span> {property.review_notes}
            </div>
          )}

          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}

          {/* Actions */}
          {reviewStatus !== "approved" && (
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => submitReview("approve")} disabled={loading !== null}>
                {loading === "approve" ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <Check className="mr-1.5 h-4 w-4" />}
                Approve & Publish
              </Button>
              {reviewStatus !== "rejected" && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setRejectOpen(true)}
                  disabled={loading !== null}
                >
                  <X className="mr-1.5 h-4 w-4" />
                  Reject
                </Button>
              )}
            </div>
          )}
          {reviewStatus === "approved" && (
            <div className="mt-4">
              <Button
                size="sm"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setRejectOpen(true)}
                disabled={loading !== null}
              >
                <X className="mr-1.5 h-4 w-4" />
                Unpublish (Reject)
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reject dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject this listing</DialogTitle>
            <DialogDescription>
              Tell the owner what needs fixing. They will see this message and can resubmit after making changes.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. The Fard document is blurry — please upload a clearer photo, and add the Intkal record."
            rows={4}
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)} disabled={loading !== null}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => submitReview("reject", reason)}
              disabled={loading !== null || !reason.trim()}
            >
              {loading === "reject" ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : null}
              Send & Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
