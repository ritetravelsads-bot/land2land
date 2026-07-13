"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShieldCheck, Loader2 } from "lucide-react"
import { RERA_APPLICANT_TYPE_LABELS, type ReraApplicantType } from "@/lib/models"

interface AgentListing {
  _id: string
  property_name: string
  address?: string
  city?: string
  state?: string
  slug?: string
  rera_no?: string
}

const inputCls =
  "w-full rounded-md border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"

export default function NewReraRequestPage() {
  const router = useRouter()
  const [listings, setListings] = useState<AgentListing[]>([])
  const [loadingListings, setLoadingListings] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState({
    listing: "",
    applicant_name: "",
    applicant_type: "individual" as ReraApplicantType,
    contact_phone: "",
    contact_email: "",
    project_location: "",
    land_area: "",
    estimated_value: "",
    aadhaar_or_pan: "",
    agent_notes: "",
  })

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/agent/properties", {
          cache: "no-store",
          credentials: "include",
        })
        const data = await res.json()
        setListings(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("[v0] Error loading properties:", err)
      } finally {
        setLoadingListings(false)
      }
    }
    load()
  }, [])

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  // Prefill location when a property is picked.
  const onSelectListing = (id: string) => {
    set("listing", id)
    const l = listings.find((x) => x._id === id)
    if (l && !form.project_location) {
      const loc = [l.address, l.city, l.state].filter(Boolean).join(", ")
      if (loc) set("project_location", loc)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.listing) {
      setError("Please select a property.")
      return
    }
    if (!form.applicant_name || !form.contact_phone || !form.contact_email) {
      setError("Applicant name, phone and email are required.")
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch("/api/agent/rera-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...form,
          estimated_value: form.estimated_value ? Number(form.estimated_value) : 0,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to submit request")
      router.push(`/agent/rera/${data.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Back */}
      <Link
        href="/agent/rera"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to RERA Requests
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">New RERA Request</h1>
          <p className="text-sm text-muted-foreground">
            Pick a property and share the applicant details to get started.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Property selection */}
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-4 text-sm font-semibold text-foreground">Select Property</h2>
          {loadingListings ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading your properties...
            </div>
          ) : listings.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You have no properties yet.{" "}
              <Link href="/agent/properties/new" className="text-primary underline">
                Add a property
              </Link>{" "}
              first.
            </p>
          ) : (
            <select
              value={form.listing}
              onChange={(e) => onSelectListing(e.target.value)}
              className={inputCls}
              required
            >
              <option value="">Choose a property...</option>
              {listings.map((l) => (
                <option key={l._id} value={l._id}>
                  {l.property_name}
                  {l.rera_no ? " (already has RERA)" : ""}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Applicant details */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Applicant Details</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Applicant / Owner Name *
              </label>
              <input
                type="text"
                value={form.applicant_name}
                onChange={(e) => set("applicant_name", e.target.value)}
                className={inputCls}
                placeholder="Full legal name"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Applicant Type *
              </label>
              <select
                value={form.applicant_type}
                onChange={(e) => set("applicant_type", e.target.value)}
                className={inputCls}
                required
              >
                {(Object.keys(RERA_APPLICANT_TYPE_LABELS) as ReraApplicantType[]).map((t) => (
                  <option key={t} value={t}>
                    {RERA_APPLICANT_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Contact Phone *
              </label>
              <input
                type="tel"
                value={form.contact_phone}
                onChange={(e) => set("contact_phone", e.target.value)}
                className={inputCls}
                placeholder="10-digit mobile"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Contact Email *
              </label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => set("contact_email", e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                PAN / Aadhaar
              </label>
              <input
                type="text"
                value={form.aadhaar_or_pan}
                onChange={(e) => set("aadhaar_or_pan", e.target.value)}
                className={inputCls}
                placeholder="Identity reference"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Estimated Land Value (₹)
              </label>
              <input
                type="number"
                min="0"
                value={form.estimated_value}
                onChange={(e) => set("estimated_value", e.target.value)}
                className={inputCls}
                placeholder="e.g. 5000000"
              />
            </div>
          </div>
        </div>

        {/* Land / project details */}
        <div className="space-y-4 rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Land Details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Project / Land Location
              </label>
              <input
                type="text"
                value={form.project_location}
                onChange={(e) => set("project_location", e.target.value)}
                className={inputCls}
                placeholder="Village, tehsil, district"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Land Area
              </label>
              <input
                type="text"
                value={form.land_area}
                onChange={(e) => set("land_area", e.target.value)}
                className={inputCls}
                placeholder="e.g. 5 acres / 2000 sq.yd"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Anything else we should know?
            </label>
            <textarea
              value={form.agent_notes}
              onChange={(e) => set("agent_notes", e.target.value)}
              className={inputCls}
              rows={3}
              placeholder="Optional message to the admin team"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" asChild disabled={submitting}>
            <Link href="/agent/rera">Cancel</Link>
          </Button>
          <Button type="submit" disabled={submitting || listings.length === 0}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
