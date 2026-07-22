"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, ShieldCheck, FileWarning, MapPin, ArrowRight, Loader2 } from "lucide-react"
import ReraStatusBadge from "@/components/rera/rera-status-badge"
import type { ReraRequest } from "@/lib/models"

export default function AssociateReraPage() {
  const [requests, setRequests] = useState<ReraRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/associate/rera-requests", {
          cache: "no-store",
          credentials: "include",
        })
        const data = await res.json()
        setRequests(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error loading RERA requests:", error)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const actionNeeded = requests.filter((r) => r.status === "documents_requested").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <ShieldCheck className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">RERA Requests</h1>
            <p className="text-sm text-muted-foreground">
              Request our help to register your land with RERA.
            </p>
          </div>
        </div>
        <Button asChild>
          <Link href="/associate/rera/new">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      {/* Action needed banner */}
      {actionNeeded > 0 && (
        <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4">
          <FileWarning className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600" />
          <p className="text-sm text-orange-800">
            <span className="font-semibold">
              {actionNeeded} request{actionNeeded > 1 ? "s" : ""} need
              {actionNeeded > 1 ? "" : "s"} your documents.
            </span>{" "}
            Open the request to upload what the admin asked for.
          </p>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center rounded-lg border border-border bg-card py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-lg border border-border bg-card py-16 text-center">
          <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="mb-1 text-sm font-medium text-foreground">No RERA requests yet</p>
          <p className="mb-4 text-sm text-muted-foreground">
            Start a request and we&apos;ll guide you through RERA registration.
          </p>
          <Button asChild>
            <Link href="/associate/rera/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Request
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((r) => (
            <Link
              key={r._id}
              href={`/associate/rera/${r._id}`}
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
