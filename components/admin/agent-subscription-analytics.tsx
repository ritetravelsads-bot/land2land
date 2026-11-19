"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import { BarChart3, Building2, CircleDollarSign, Clock3, ShieldCheck, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Analytics {
  agents: { total: number; active: number; inactive: number; suspended: number }
  subscriptions: { active: number; expired: number; by_plan: Record<string, number> }
  properties: { currently_published: number }
  quota: { used: number; unused: number }
  revenue: { verified_total: number; verified_payment_count: number; currency: string }
}

const fetcher = async (url: string): Promise<Analytics> => {
  const response = await fetch(url, { cache: "no-store" })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Failed to load analytics")
  return data
}

const planLabels: Record<string, string> = { free: "Free", basic: "Basic", standard: "Standard", premium: "Premium", business: "Business" }

export default function AgentSubscriptionAnalytics() {
  const [planCode, setPlanCode] = useState("all")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (planCode !== "all") params.set("plan_code", planCode)
    if (from) params.set("from", from)
    if (to) params.set("to", to)
    return params.toString()
  }, [from, planCode, to])
  const { data, error, isLoading } = useSWR<Analytics>(`/api/admin/agents/analytics${query ? `?${query}` : ""}`, fetcher)

  const metrics = [
    { label: "Registered agents", value: data?.agents.total, icon: Building2 },
    { label: "Active agents", value: data?.agents.active, icon: ShieldCheck },
    { label: "Active subscriptions", value: data?.subscriptions.active, icon: BarChart3 },
    { label: "Expired subscriptions", value: data?.subscriptions.expired, icon: Clock3 },
    { label: "Published listings", value: data?.properties.currently_published, icon: Building2 },
    { label: "Credits used · selected period", value: data?.quota.used, icon: Wallet },
    { label: "Unused active credits", value: data?.quota.unused, icon: Wallet },
    { label: "Verified revenue", value: data ? new Intl.NumberFormat("en-IN", { style: "currency", currency: data.revenue.currency || "INR", maximumFractionDigits: 0 }).format(data.revenue.verified_total || 0) : undefined, icon: CircleDollarSign },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <CardTitle className="text-base">Agent subscription analytics</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">Revenue counts verified, paid records only.</p>
        </div>
        <FieldGroup className="grid gap-2 sm:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="analytics-plan-filter" className="sr-only">Filter analytics by plan</FieldLabel>
            <Select value={planCode} onValueChange={setPlanCode}>
              <SelectTrigger id="analytics-plan-filter"><SelectValue /></SelectTrigger>
              <SelectContent><SelectGroup>
                <SelectItem value="all">All plans</SelectItem>
                {Object.entries(planLabels).map(([code, label]) => <SelectItem key={code} value={code}>{label}</SelectItem>)}
              </SelectGroup></SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="analytics-from" className="sr-only">Report start date</FieldLabel>
            <Input id="analytics-from" type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
          </Field>
          <Field>
            <FieldLabel htmlFor="analytics-to" className="sr-only">Report end date</FieldLabel>
            <Input id="analytics-to" type="date" value={to} onChange={(event) => setTo(event.target.value)} />
          </Field>
        </FieldGroup>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {error && <p role="alert" className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{error.message}</p>}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-xl border border-border bg-background p-3.5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">{label}</p>
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-2 text-xl font-bold">{isLoading ? "—" : value ?? 0}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-3">
          <span className="text-xs font-semibold text-muted-foreground">Active by plan</span>
          {Object.entries(data?.subscriptions.by_plan || {}).map(([code, count]) => (
            <Badge key={code} variant="secondary">{planLabels[code] || code}: {count}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
