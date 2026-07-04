"use client"

import { useEffect, useState, useCallback } from "react"
import { ClipboardCheck, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import PropertyReviewCard from "@/components/admin/property-review-card"

type Tab = "pending" | "approved" | "rejected"

export default function AdminReviewQueuePage() {
  const [tab, setTab] = useState<Tab>("pending")
  const [properties, setProperties] = useState<any[]>([])
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)

  const load = useCallback(async (status: Tab) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/properties/review?status=${status}`)
      const data = await res.json()
      setProperties(data.properties || [])
      if (data.counts) setCounts(data.counts)
    } catch (error) {
      console.error("[v0] Error loading review queue:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(tab)
  }, [tab, load])

  const handleReviewed = (id: string) => {
    // Remove from the current list and refresh counts
    setProperties((prev) => prev.filter((p) => p._id !== id))
    load(tab)
  }

  const tabs: { key: Tab; label: string; icon: typeof Clock; count: number }[] = [
    { key: "pending", label: "Pending", icon: Clock, count: counts.pending },
    { key: "approved", label: "Approved", icon: CheckCircle2, count: counts.approved },
    { key: "rejected", label: "Rejected", icon: XCircle, count: counts.rejected },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <ClipboardCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Review Queue</h1>
          <p className="text-sm text-muted-foreground">Verify land submissions and their documents before they go live.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {tabs.map((t) => {
          const Icon = t.icon
          const active = tab === t.key
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`-mb-px flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {t.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : properties.length === 0 ? (
        <div className="rounded-lg border border-border bg-card py-16 text-center">
          <ClipboardCheck className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {tab === "pending"
              ? "No listings are waiting for review. All caught up!"
              : `No ${tab} listings.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {properties.map((property) => (
            <PropertyReviewCard key={property._id} property={property} onReviewed={handleReviewed} />
          ))}
        </div>
      )}
    </div>
  )
}
