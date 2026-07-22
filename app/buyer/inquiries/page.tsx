"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  FileText,
  Clock,
  Phone,
  MapPin,
  ChevronRight,
  Loader2,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Lead {
  _id: string
  name: string
  phone: string
  email?: string
  message?: string
  property_id?: string
  property_name?: string
  property_slug?: string
  status: "new" | "contacted" | "qualified" | "converted" | "lost"
  priority: "low" | "medium" | "high" | "urgent"
  source: string
  created_at: string
  updated_at: string
}

interface Stats {
  total: number
  new: number
  contacted: number
  qualified: number
  converted: number
}

const STATUS_CONFIG: Record<
  Lead["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  new: { label: "New", variant: "secondary" },
  contacted: { label: "Contacted", variant: "default" },
  qualified: { label: "Qualified", variant: "default" },
  converted: { label: "Converted", variant: "default" },
  lost: { label: "Closed", variant: "destructive" },
}

const STATUS_COLORS: Record<Lead["status"], string> = {
  new: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  contacted: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  qualified: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  converted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  lost: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col gap-1">
      <span className="text-2xl font-bold text-foreground">{value}</span>
      <span className={`text-xs font-medium ${color}`}>{label}</span>
    </div>
  )
}

export default function InquiriesPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, new: 0, contacted: 0, qualified: 0, converted: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchLeads = async (pageNum = 1, status = "all") => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams({ page: String(pageNum), limit: "10" })
      if (status !== "all") params.set("status", status)
      const res = await fetch(`/api/buyer/inquiries?${params}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setLeads(data.leads || [])
      setStats(data.stats || { total: 0, new: 0, contacted: 0, qualified: 0, converted: 0 })
      setTotalPages(data.pagination?.pages || 1)
    } catch {
      setError("Could not load inquiries. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads(page, statusFilter)
  }, [page, statusFilter])

  const filtered = leads.filter((l) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      l.property_name?.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.status.includes(q)
    )
  })

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Property Inquiries</h1>
          <p className="text-sm text-muted-foreground">
            Track every inquiry you have submitted and its current status.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => fetchLeads(page, statusFilter)} className="shrink-0">
          <RefreshCw className="h-3.5 w-3.5 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatCard label="Total" value={stats.total} color="text-muted-foreground" />
        <StatCard label="New" value={stats.new} color="text-blue-600" />
        <StatCard label="Contacted" value={stats.contacted} color="text-yellow-600" />
        <StatCard label="Qualified" value={stats.qualified} color="text-purple-600" />
        <StatCard label="Converted" value={stats.converted} color="text-emerald-600" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search property name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="qualified">Qualified</SelectItem>
            <SelectItem value="converted">Converted</SelectItem>
            <SelectItem value="lost">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-6 text-center">
          <p className="text-sm text-destructive mb-3">{error}</p>
          <Button variant="outline" size="sm" onClick={() => fetchLeads(page, statusFilter)}>
            Try Again
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-border rounded-xl p-12 bg-card text-center">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="font-semibold text-foreground mb-1">No inquiries found</p>
          <p className="text-sm text-muted-foreground mb-4">
            {statusFilter !== "all"
              ? "No inquiries match this filter."
              : "Browse properties and use the Quick Enquiry form to get started."}
          </p>
          <Link href="/properties">
            <Button size="sm">Browse Properties</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((lead) => (
            <div
              key={lead._id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                {/* Icon */}
                <div className="hidden sm:flex h-10 w-10 rounded-lg bg-primary/10 items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>

                {/* Main content */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-start gap-2">
                    <div className="flex-1 min-w-0">
                      {lead.property_name ? (
                        lead.property_slug ? (
                          <Link
                            href={`/properties/${lead.property_slug}`}
                            className="font-semibold text-foreground hover:text-primary transition-colors truncate block"
                          >
                            {lead.property_name}
                          </Link>
                        ) : (
                          <p className="font-semibold text-foreground truncate">{lead.property_name}</p>
                        )
                      ) : (
                        <p className="font-semibold text-foreground">General Inquiry</p>
                      )}
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[lead.status]}`}
                    >
                      {STATUS_CONFIG[lead.status]?.label ?? lead.status}
                    </span>
                  </div>

                  {lead.message && (
                    <p className="text-sm text-muted-foreground line-clamp-2">{lead.message}</p>
                  )}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(lead.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {lead.phone}
                    </span>
                    {lead.property_name && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Property Inquiry
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                {lead.property_slug && (
                  <Link
                    href={`/properties/${lead.property_slug}`}
                    className="hidden sm:flex items-center gap-1 text-xs text-primary hover:underline shrink-0"
                  >
                    View Property
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
