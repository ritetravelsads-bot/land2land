"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Edit2,
  Trash2,
  Eye,
  Plus,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  X,
} from "lucide-react"
import { useEffect, useState } from "react"
import { formatPriceToIndian, getPropertyUrl } from "@/lib/utils"

// Resolve a listing's moderation state (legacy listings have no review_status → treat as approved).
function getReviewStatus(p: any): "pending" | "approved" | "rejected" {
  return (p.review_status as "pending" | "approved" | "rejected") || "approved"
}

const REVIEW_META: Record<
  "pending" | "approved" | "rejected",
  { label: string; cls: string; Icon: typeof Clock }
> = {
  pending: { label: "Under Review", cls: "bg-yellow-100 text-yellow-700", Icon: Clock },
  approved: { label: "Live", cls: "bg-green-100 text-green-700", Icon: CheckCircle2 },
  rejected: { label: "Needs Changes", cls: "bg-red-100 text-red-700", Icon: XCircle },
}

export default function AssociatePropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSubmitted, setShowSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("submitted") === "1") {
      setShowSubmitted(true)
    }
  }, [])

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const res = await fetch("/api/associate/properties", { cache: "no-store", credentials: "include" })
        const data = await res.json()
        setProperties(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error loading properties:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        const res = await fetch(`/api/associate/properties/${id}`, { method: "DELETE" })
        if (res.ok) {
          setProperties(properties.filter((p) => p._id !== id))
        }
      } catch (error) {
        console.error("Error deleting property:", error)
      }
    }
  }

  const counts = {
    total: properties.length,
    pending: properties.filter((p) => getReviewStatus(p) === "pending").length,
    approved: properties.filter((p) => getReviewStatus(p) === "approved").length,
    rejected: properties.filter((p) => getReviewStatus(p) === "rejected").length,
  }

  const stats = [
    { label: "Total", value: counts.total, Icon: Building2, tint: "bg-primary/10 text-primary" },
    { label: "Live", value: counts.approved, Icon: CheckCircle2, tint: "bg-green-500/10 text-green-600" },
    { label: "Under Review", value: counts.pending, Icon: Clock, tint: "bg-yellow-500/10 text-yellow-600" },
    { label: "Needs Changes", value: counts.rejected, Icon: XCircle, tint: "bg-red-500/10 text-red-600" },
  ]

  return (
    <div className="space-y-6">
      {/* Submitted confirmation */}
      {showSubmitted && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
          <div className="flex-1 text-sm text-green-800">
            <p className="font-semibold">Your land has been submitted for review.</p>
            <p className="mt-0.5 text-green-700">
              Our team will check your details and documents. You will see it go Live here once approved.
            </p>
          </div>
          <button onClick={() => setShowSubmitted(false)} className="text-green-700 hover:text-green-900" aria-label="Dismiss">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Properties</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your listed properties</p>
        </div>
        <Button asChild>
          <Link href="/associate/properties/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.Icon
          return (
            <div key={s.label} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${s.tint}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Properties List */}
      {loading ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <p className="text-sm text-muted-foreground">Loading properties...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-4">No properties yet</p>
          <Button asChild>
            <Link href="/associate/properties/new">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Listing
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {properties.map((property) => {
            const review = getReviewStatus(property)
            const meta = REVIEW_META[review]
            const MetaIcon = meta.Icon
            return (
              <div
                key={property._id}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">{property.property_name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{property.address}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${meta.cls}`}>
                        <MetaIcon className="h-3 w-3" />
                        {meta.label}
                      </span>
                      {Number(property.submission_count) > 1 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                          <RefreshCw className="h-3 w-3" />
                          {`Attempt #${property.submission_count}`}
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-muted rounded text-xs">
                        {formatPriceToIndian(property.lowest_price)}
                      </span>
                      {property.property_type && (
                        <span className="px-2 py-0.5 bg-muted rounded text-xs capitalize">
                          {String(property.property_type).replace(/_/g, " ")}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-4">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={getPropertyUrl(property)}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link href={`/associate/properties/${property._id}/edit`}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(property._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Rejection feedback + resubmit */}
                {review === "rejected" && (
                  <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-3">
                    <p className="text-xs font-semibold text-red-800">Our team asked for some changes:</p>
                    <p className="mt-1 text-xs text-red-700">
                      {property.review_notes || "Please review your details and documents, then resubmit."}
                    </p>
                    <Button asChild size="sm" className="mt-2 h-8">
                      <Link href={`/associate/properties/${property._id}/edit`}>
                        <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                        Fix & Resubmit
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Pending note */}
                {review === "pending" && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    This land is being reviewed by our team and is not public yet.
                  </p>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
