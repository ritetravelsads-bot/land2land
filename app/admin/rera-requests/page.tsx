"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { ShieldCheck, Loader2, MapPin, ArrowRight, Inbox } from "lucide-react"
import ReraStatusBadge from "@/components/rera/rera-status-badge"
import { RERA_STATUS_LABELS, type ReraRequest, type ReraRequestStatus } from "@/lib/models"

type Tab = "active" | ReraRequestStatus | "all"

const TABS: { key: Tab; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "documents_submitted", label: "Docs Submitted" },
  { key: "processing", label: "Processing" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "all", label: "All" },
]

export default function AdminReraQueuePage() {
  const [tab, setTab] = useState<Tab>("active")
  const [requests, setRequests] = useState<ReraRequest[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  const load = useCallback(async (status: Tab) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/rera-requests?status=${status}`, {
        cache: "no-store",
        credentials: "include",
      })
      const data = await res.json()
      setRequests(data.requests || [])
      if (data.counts) setCounts(data.counts)
    } catch (error) {
      console.error("[v0] Error loading RERA queue:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load(tab)
  }, [tab, load])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">RERA Requests</h1>
          <p className="text-sm text-muted-foreground">
            Manage agent RERA registration requests through each stage.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border">
        {TABS.map((t) => {
          const active = tab === t.key
          const count = counts[t.key] ?? 0
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
              {t.label}
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
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
      ) : requests.length === 0 ? (
        <div className="rounded-lg border border-border bg-card py-16 text-center">
          <Inbox className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">No requests in this view.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <Link
              key={r._id}
              href={`/admin/rera-requests/${r._id}`}
              className="block rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-foreground">
                      {r.listing_name || "Land property"}
                    </h3>
                    <ReraStatusBadge status={r.status} />
                  </div>
                  <p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    {r.project_location || "Location not specified"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-muted px-2 py-0.5">Associate: {r.associate_name}</span>
                    <span className="rounded bg-muted px-2 py-0.5">
                      Applicant: {r.applicant_name}
                    </span>
                    {r.rera_number && (
                      <span className="rounded bg-green-100 px-2 py-0.5 font-medium text-green-700">
                        RERA No: {r.rera_number}
                      </span>
                    )}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
