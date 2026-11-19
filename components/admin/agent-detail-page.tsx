"use client"

import { useState } from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import useSWR from "swr"
import { ArrowLeft, CalendarClock, CircleDollarSign, FileText, History, ShieldCheck, UserRound, Wallet } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface AgentOverview {
  agent: { id: string; username: string; email: string; phone_number?: string; account_status: string; date_joined?: string; admin_notes?: string }
  stats: { total_submissions: number; published: number; pending: number; rejected: number; sold: number }
  subscription: { _id: string; plan_code: string; plan_name: string; status: string; starts_at: string; expires_at?: string | null; plan_quota: number; plan_used: number; refund_on_unpublish: boolean } | null
  quota: { plan_quota: number; plan_used: number; plan_remaining: number; special_credits_granted: number; special_credits_remaining: number; special_credits_expired: number; special_credits_used: number; total_allowance: number; total_used: number; total_remaining: number }
  plans: Array<{ _id: string; plan_code: string; name: string; price_amount: number | null; publishing_limit: number | null; billing_cycle: string | null; duration_days: number | null }>
  subscription_history: Array<Record<string, any>>
  quota_history: Array<Record<string, any>>
  payment_history: Array<Record<string, any>>
  admin_activity: Array<Record<string, any>>
}

const fetcher = async (url: string): Promise<AgentOverview> => {
  const response = await fetch(url, { cache: "no-store" })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Failed to load agent")
  return data
}

function dateLabel(value?: string | null) {
  if (!value) return "No expiry"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function statusVariant(status?: string) {
  if (status === "active") return "default" as const
  if (status === "suspended" || status === "inactive" || status === "expired") return "destructive" as const
  return "secondary" as const
}

export default function AgentDetailPage({ agentId }: { agentId: string }) {
  const { data, error, isLoading, mutate } = useSWR<AgentOverview>(`/api/admin/agents/${agentId}`, fetcher)
  const [accountStatus, setAccountStatus] = useState<string | null>(null)
  const [adminNotes, setAdminNotes] = useState<string | null>(null)
  const [planCode, setPlanCode] = useState("")
  const [customQuota, setCustomQuota] = useState("")
  const [expiresAt, setExpiresAt] = useState("")
  const [note, setNote] = useState("")
  const [creditAmount, setCreditAmount] = useState("")
  const [creditExpiry, setCreditExpiry] = useState("")
  const [creditNote, setCreditNote] = useState("")
  const [saving, setSaving] = useState(false)

  const submit = async (url: string, body: Record<string, unknown>, success: string) => {
    setSaving(true)
    try {
      const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Request failed")
      toast.success(success)
      await mutate()
      return true
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Request failed")
      return false
    } finally {
      setSaving(false)
    }
  }

  const saveAccount = async () => {
    if (!data) return
    setSaving(true)
    try {
      const response = await fetch(`/api/admin/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(accountStatus ? { account_status: accountStatus } : {}),
          ...(adminNotes !== null ? { admin_notes: adminNotes } : {}),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Could not save account changes")
      toast.success("Agent account updated")
      setAccountStatus(null)
      setAdminNotes(null)
      await mutate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save account changes")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <div className="flex flex-col gap-4" aria-label="Loading agent profile">{[0, 1, 2].map((item) => <div key={item} className="h-28 animate-pulse rounded-2xl bg-muted" />)}</div>
  if (error || !data) return <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">{error?.message || "Agent not found"}</div>

  const activeStatus = accountStatus || data.agent.account_status || "active"
  const activeNotes = adminNotes ?? data.agent.admin_notes ?? ""
  const subscription = data.subscription
  const planProgress = data.quota.total_allowance > 0 ? Math.min(100, Math.round(data.quota.total_used / data.quota.total_allowance * 100)) : 0

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="icon" aria-label="Back to agent list"><Link href="/admin/agents"><ArrowLeft /></Link></Button>
          <div>
            <p className="text-sm text-muted-foreground">Agent profile and quota controls</p>
            <h1 className="text-2xl font-bold">{data.agent.username || "Agent"}</h1>
          </div>
        </div>
        <Badge variant={statusVariant(activeStatus)}>{activeStatus}</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Total submissions", data.stats.total_submissions],
          ["Published", data.stats.published],
          ["Pending", data.stats.pending],
          ["Rejected", data.stats.rejected],
          ["Sold", data.stats.sold],
        ].map(([label, value]) => (
          <Card key={String(label)}><CardContent className="p-4"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></CardContent></Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><UserRound className="size-4 text-primary" /> Agent account</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-3 sm:grid-cols-2 text-sm">
              <div><p className="text-xs text-muted-foreground">Email</p><p className="mt-1 break-all font-medium">{data.agent.email}</p></div>
              <div><p className="text-xs text-muted-foreground">Phone</p><p className="mt-1 font-medium">{data.agent.phone_number || "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Agent ID</p><p className="mt-1 break-all font-mono text-xs">{data.agent.id}</p></div>
              <div><p className="text-xs text-muted-foreground">Joined</p><p className="mt-1 font-medium">{dateLabel(data.agent.date_joined)}</p></div>
            </div>
            <FieldGroup className="grid gap-3 sm:grid-cols-[180px_1fr]">
              <Field className="gap-1.5">
                <FieldLabel htmlFor="agent-status">Account status</FieldLabel>
                <Select value={activeStatus} onValueChange={setAccountStatus}>
                  <SelectTrigger id="agent-status"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectGroup><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="suspended">Suspended</SelectItem></SelectGroup></SelectContent>
                </Select>
              </Field>
              <Field className="gap-1.5">
                <FieldLabel htmlFor="agent-notes">Internal admin notes</FieldLabel>
                <Textarea id="agent-notes" value={activeNotes} onChange={(event) => setAdminNotes(event.target.value)} maxLength={2000} rows={2} placeholder="Private notes visible only to admins" />
              </Field>
            </FieldGroup>
            <div className="flex justify-end"><Button onClick={saveAccount} disabled={saving}>{saving ? "Saving…" : "Save account changes"}</Button></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><ShieldCheck className="size-4 text-primary" /> Publishing quota</CardTitle><CardDescription>Only approved listings consume publishing credits.</CardDescription></CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-3">
              <div><p className="text-3xl font-bold">{data.quota.total_remaining}</p><p className="text-xs text-muted-foreground">credits remaining</p></div>
              <p className="text-sm text-muted-foreground">{data.quota.total_used} used of {data.quota.total_allowance}</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={planProgress} aria-valuemin={0} aria-valuemax={100} aria-label="Publishing quota used">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${planProgress}%` }} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs text-muted-foreground">Plan quota</p><p className="mt-1 font-semibold">{data.quota.plan_used} / {data.quota.plan_quota}</p></div>
              <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs text-muted-foreground">Special credits</p><p className="mt-1 font-semibold">{data.quota.special_credits_remaining} remaining</p></div>
            </div>
            <p className="text-xs text-muted-foreground">Special credits granted: {data.quota.special_credits_granted} · Expired unused: {data.quota.special_credits_expired}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><CalendarClock className="size-4 text-primary" /> Assign or change plan</CardTitle><CardDescription>Free-plan quota is set per agent. Paid plan values come from Plan Management.</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={async (event) => {
              event.preventDefault()
              if (!planCode) return toast.error("Choose a plan")
              const success = await submit(`/api/admin/agents/${agentId}/subscription`, { action: "assign", plan_code: planCode, custom_quota: customQuota || undefined, expires_at: expiresAt || undefined, note }, "Plan assigned")
              if (success) { setPlanCode(""); setCustomQuota(""); setExpiresAt(""); setNote("") }
            }}>
              <FieldGroup className="grid gap-3 sm:grid-cols-2">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="agent-plan">Plan</FieldLabel>
                  <Select value={planCode} onValueChange={setPlanCode}>
                    <SelectTrigger id="agent-plan"><SelectValue placeholder="Select plan" /></SelectTrigger>
                    <SelectContent><SelectGroup>{data.plans.map((plan) => <SelectItem key={plan._id} value={plan.plan_code}>{plan.name} · {plan.publishing_limit ?? "custom limit"}</SelectItem>)}</SelectGroup></SelectContent>
                  </Select>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="agent-custom-quota">Per-agent quota override</FieldLabel>
                  <Input id="agent-custom-quota" type="number" min="0" step="1" value={customQuota} onChange={(event) => setCustomQuota(event.target.value)} required={planCode === "free"} placeholder={planCode === "free" ? "Required for Free" : "Optional"} />
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="agent-plan-expiry">Optional expiry override</FieldLabel>
                  <Input id="agent-plan-expiry" type="date" value={expiresAt} onChange={(event) => setExpiresAt(event.target.value)} />
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="agent-plan-note">Admin note</FieldLabel>
                  <Input id="agent-plan-note" value={note} onChange={(event) => setNote(event.target.value)} maxLength={500} placeholder="Reason for assignment" />
                </Field>
                <Button type="submit" className="sm:col-span-2" disabled={saving || !data.plans.length}>{saving ? "Saving…" : "Assign plan"}</Button>
              </FieldGroup>
            </form>
            {!data.plans.length && <p className="mt-3 text-sm text-muted-foreground">Activate and configure a plan first.</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Wallet className="size-4 text-primary" /> Add or deduct special credits</CardTitle><CardDescription>Credits are tracked as dated grants and consumed before plan credits when they expire sooner.</CardDescription></CardHeader>
          <CardContent>
            <form onSubmit={async (event) => {
              event.preventDefault()
              const form = event.currentTarget
              const data = new FormData(form)
              const action = String(data.get("credit-action")) as "grant" | "deduct"
              const amount = Number(data.get("credit-amount"))
              const success = await submit(`/api/admin/agents/${agentId}/credits`, {
                action,
                amount,
                expires_at: action === "grant" ? data.get("credit-expiry") || undefined : undefined,
                note: data.get("credit-note"),
              }, action === "grant" ? "Credits granted" : "Credits deducted")
              if (success) form.reset()
            }}>
              <FieldGroup className="grid gap-3 sm:grid-cols-2">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="credit-action">Action</FieldLabel>
                  <Select name="credit-action" defaultValue="grant">
                    <SelectTrigger id="credit-action"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectGroup><SelectItem value="grant">Add credits</SelectItem><SelectItem value="deduct">Deduct credits</SelectItem></SelectGroup></SelectContent>
                  </Select>
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="credit-amount">Credits</FieldLabel>
                  <Input id="credit-amount" name="credit-amount" type="number" min="1" step="1" required />
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="credit-expiry">Optional expiry date (grant only)</FieldLabel>
                  <Input id="credit-expiry" name="credit-expiry" type="date" />
                </Field>
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="credit-note">Reason / internal note</FieldLabel>
                  <Input id="credit-note" name="credit-note" maxLength={500} placeholder="Why are credits changing?" />
                </Field>
                <Button type="submit" className="sm:col-span-2" disabled={saving}>{saving ? "Saving…" : "Apply credit adjustment"}</Button>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>

      {subscription && (
        <Card>
          <CardHeader><CardTitle>Subscription validity and quota controls</CardTitle><CardDescription>Current assignment: {subscription.plan_name} · {dateLabel(subscription.starts_at)} to {dateLabel(subscription.expires_at)}</CardDescription></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            <form className="rounded-xl border border-border p-4" onSubmit={async (event) => {
              event.preventDefault()
              const form = event.currentTarget
              const result = await submit(`/api/admin/agents/${agentId}/subscription`, { action: "adjust_quota", plan_quota: Number((new FormData(form)).get("adjusted-quota")), note: "Admin adjusted plan quota" }, "Quota updated")
              if (result) form.reset()
            }}>
              <FieldGroup className="gap-3">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="adjusted-quota">Set plan quota</FieldLabel>
                  <Input id="adjusted-quota" name="adjusted-quota" type="number" min="0" step="1" defaultValue={subscription.plan_quota} />
                </Field>
                <Button type="submit" variant="outline" disabled={saving}>Save quota limit</Button>
              </FieldGroup>
            </form>
            <form className="rounded-xl border border-border p-4" onSubmit={async (event) => {
              event.preventDefault()
              const form = event.currentTarget
              const expiry = String((new FormData(form)).get("new-expiry") || "")
              if (!expiry) return toast.error("Choose a new expiry date")
              const result = await submit(`/api/admin/agents/${agentId}/subscription`, { action: "set_expiry", expires_at: expiry, note: "Admin adjusted subscription validity" }, "Subscription validity updated")
              if (result) form.reset()
            }}>
              <FieldGroup className="gap-3">
                <Field className="gap-1.5">
                  <FieldLabel htmlFor="new-expiry">Set subscription expiry</FieldLabel>
                  <Input id="new-expiry" name="new-expiry" type="date" defaultValue={subscription.expires_at?.slice(0, 10) || ""} />
                </Field>
                <Button type="submit" variant="outline" disabled={saving}>Save expiry</Button>
              </FieldGroup>
            </form>
            <form className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 md:col-span-2" onSubmit={async (event) => {
              event.preventDefault()
              if (!window.confirm("Reset plan quota usage to zero? This admin adjustment is recorded in the audit log.")) return
              await submit(`/api/admin/agents/${agentId}/subscription`, { action: "reset_usage", note: "Admin reset plan usage" }, "Plan usage reset")
            }}>
              <div><p className="text-sm font-semibold">Reset used plan quota</p><p className="mt-1 text-xs text-muted-foreground">Special credits remain unchanged. This is an audited manual adjustment.</p></div>
              <Button type="submit" variant="outline" className="self-start border-destructive/40 text-destructive" disabled={saving}>Reset plan usage</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-5 xl:grid-cols-2">
        <HistoryCard title="Subscription history" icon={<CalendarClock className="size-4" aria-hidden="true" />} rows={data.subscription_history} empty="No subscription assignments yet." />
        <HistoryCard title="Payment history" icon={<CircleDollarSign className="size-4" aria-hidden="true" />} rows={data.payment_history} empty="No verified payments are recorded." />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <HistoryCard title="Quota transaction history" icon={<Wallet className="size-4" aria-hidden="true" />} rows={data.quota_history} empty="No quota changes or publishing transactions yet." />
        <HistoryCard title="Admin activity log" icon={<History className="size-4" aria-hidden="true" />} rows={data.admin_activity} empty="No agent-management actions recorded yet." />
      </div>
    </div>
  )
}

function HistoryCard({ title, icon, rows, empty }: { title: string; icon: ReactNode; rows: Array<Record<string, any>>; empty: string }) {
  return (
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-base">{icon}{title}</CardTitle></CardHeader>
      <CardContent className="flex flex-col gap-2">
        {rows.length ? rows.slice(0, 12).map((row, index) => (
          <div key={row._id || `${row.action || row.type}-${index}`} className="flex items-start justify-between gap-3 rounded-lg bg-muted/40 px-3 py-2.5 text-sm">
            <div className="min-w-0"><p className="font-medium">{String(row.action || row.type || row.status || "Activity").replaceAll("_", " ")}</p><p className="mt-0.5 text-xs text-muted-foreground">{row.note || row.plan_name || row.source || "—"}</p></div>
            <div className="shrink-0 text-right"><p className="font-semibold">{row.amount != null ? row.amount : row.plan_code || ""}</p><p className="text-xs text-muted-foreground">{dateLabel(row.created_at || row.starts_at)}</p></div>
          </div>
        )) : <p className="py-3 text-sm text-muted-foreground">{empty}</p>}
      </CardContent>
    </Card>
  )
}
