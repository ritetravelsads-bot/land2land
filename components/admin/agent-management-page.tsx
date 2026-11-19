"use client"

import Link from "next/link"
import useSWR from "swr"
import { useMemo, useState } from "react"
import { ArrowRight, Search, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AgentSubscriptionAnalytics from "@/components/admin/agent-subscription-analytics"

interface AgentRow {
  agent: { id: string; username: string; email: string; phone_number?: string; account_status: string }
  subscription: { plan_name: string; status: string; expires_at?: string | null } | null
  quota: { total_remaining: number; plan_quota: number; plan_used: number; special_credits_remaining: number }
  stats: { total_submissions: number; published: number; pending: number; rejected: number; sold: number }
}

interface AgentResponse {
  agents: AgentRow[]
  pagination: { page: number; limit: number; total: number; pages: number }
}

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Failed to load agents")
  return data
}

function statusVariant(status: string) {
  if (status === "active") return "default" as const
  if (status === "suspended") return "destructive" as const
  return "secondary" as const
}

export default function AgentManagementPage() {
  const [search, setSearch] = useState("")
  const [accountStatus, setAccountStatus] = useState("all")
  const [planCode, setPlanCode] = useState("all")
  const [page, setPage] = useState(1)

  const query = useMemo(() => {
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (search.trim()) params.set("search", search.trim())
    if (accountStatus !== "all") params.set("account_status", accountStatus)
    if (planCode !== "all") params.set("plan_code", planCode)
    return params.toString()
  }, [accountStatus, page, planCode, search])
  const { data, error, isLoading, mutate } = useSWR<AgentResponse>(`/api/admin/agents?${query}`, fetcher)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">People and publishing access</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">Agent Management</h1>
        </div>
        <Button variant="outline" onClick={() => mutate()}>Refresh list</Button>
      </div>

      <AgentSubscriptionAnalytics />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base"><Users className="size-4 text-primary" /> Registered agents</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FieldGroup className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px_180px]">
            <Field className="relative gap-1.5">
              <FieldLabel htmlFor="agent-search" className="sr-only">Search agents by name, email, phone, or ID</FieldLabel>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="agent-search"
                value={search}
                onChange={(event) => { setSearch(event.target.value); setPage(1) }}
                placeholder="Search name, email, phone, or agent ID"
                aria-label="Search agents"
                className="pl-9"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="agent-status-filter" className="sr-only">Filter by account status</FieldLabel>
              <Select value={accountStatus} onValueChange={(value) => { setAccountStatus(value); setPage(1) }}>
                <SelectTrigger id="agent-status-filter"><SelectValue placeholder="All account statuses" /></SelectTrigger>
                <SelectContent><SelectGroup>
                  <SelectItem value="all">All account statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectGroup></SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="agent-plan-filter" className="sr-only">Filter by subscription plan</FieldLabel>
              <Select value={planCode} onValueChange={(value) => { setPlanCode(value); setPage(1) }}>
                <SelectTrigger id="agent-plan-filter"><SelectValue placeholder="All plans" /></SelectTrigger>
                <SelectContent><SelectGroup>
                  <SelectItem value="all">All plans</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectGroup></SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          {error ? (
            <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error.message}</div>
          ) : isLoading ? (
            <div className="grid gap-3" aria-label="Loading agents">
              {[0, 1, 2].map((item) => <div key={item} className="h-20 animate-pulse rounded-xl bg-muted" />)}
            </div>
          ) : data?.agents.length ? (
            <div className="overflow-hidden rounded-xl border border-border">
              <div className="hidden grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr_40px] gap-3 bg-muted/50 px-4 py-3 text-xs font-semibold text-muted-foreground md:grid">
                <span>Agent</span><span>Plan</span><span>Account</span><span>Properties</span><span>Quota left</span><span />
              </div>
              <div className="divide-y divide-border">
                {data.agents.map((row) => (
                  <Link key={row.agent.id} href={`/admin/agents/${row.agent.id}`} className="grid min-h-16 gap-2 px-4 py-3 transition-colors hover:bg-muted/40 md:grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr_40px] md:items-center md:gap-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-foreground">{row.agent.username || "Unnamed agent"}</span>
                      <span className="block truncate text-xs text-muted-foreground">{row.agent.email}{row.agent.phone_number ? ` · ${row.agent.phone_number}` : ""}</span>
                    </span>
                    <span className="text-sm text-foreground">{row.subscription?.plan_name || "No plan assigned"}</span>
                    <span><Badge variant={statusVariant(row.agent.account_status)}>{row.agent.account_status}</Badge></span>
                    <span className="text-sm text-foreground">{row.stats.published} live <span className="text-xs text-muted-foreground">/ {row.stats.total_submissions} total</span></span>
                    <span className="text-sm font-semibold text-foreground">{row.quota.total_remaining}</span>
                    <ArrowRight className="hidden size-4 text-muted-foreground md:block" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border p-10 text-center">
              <Users className="mx-auto size-8 text-muted-foreground/60" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">No matching agents</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different search or account filter.</p>
            </div>
          )}

          {data && data.pagination.pages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Page {data.pagination.page} of {data.pagination.pages} · {data.pagination.total} agents</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}>Previous</Button>
                <Button size="sm" variant="outline" disabled={page >= data.pagination.pages} onClick={() => setPage((value) => value + 1)}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
