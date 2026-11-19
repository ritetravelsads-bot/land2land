"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import useSWR from "swr"
import { CalendarClock, CircleDollarSign, FileText, ShieldCheck, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AgentSubscriptionData {
  agent: { username: string; account_status: string }
  stats: { total_submissions: number; published: number; pending: number; rejected: number; sold: number }
  subscription: { plan_code: string; plan_name: string; status: string; starts_at: string; expires_at?: string | null; plan_quota: number; plan_used: number } | null
  quota: { plan_quota: number; plan_used: number; plan_remaining: number; special_credits_granted: number; special_credits_remaining: number; special_credits_expired: number; special_credits_used: number; total_allowance: number; total_used: number; total_remaining: number }
  plans: Array<{ _id: string; plan_code: string; name: string; description: string; billing_cycle: string | null; price_amount: number | null; currency: string; duration_days: number | null; publishing_limit: number | null; benefits: string[]; featured: boolean; purchase_enabled: boolean }>
  subscription_history: Array<Record<string, any>>
  quota_history: Array<Record<string, any>>
  payment_history: Array<Record<string, any>>
}

const fetcher = async (url: string): Promise<AgentSubscriptionData> => {
  const response = await fetch(url, { cache: "no-store", credentials: "include" })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Failed to load subscription")
  return data
}

function dateLabel(value?: string | null) {
  if (!value) return "No expiry"
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function formatPrice(amount: number | null, currency = "INR", cycle?: string | null) {
  if (cycle === "free") return "Free"
  if (amount == null) return "Price set by admin"
  const price = new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount)
  return cycle === "monthly" || cycle === "yearly" ? `${price} / ${cycle === "monthly" ? "month" : "year"}` : price
}

export default function AgentSubscriptionPage() {
  const { data, error, isLoading } = useSWR<AgentSubscriptionData>("/api/agent/subscription", fetcher)

  if (isLoading) return <div className="flex flex-col gap-4" aria-label="Loading plan details">{[0, 1, 2].map((item) => <div key={item} className="h-32 animate-pulse rounded-2xl bg-muted" />)}</div>
  if (error || !data) return <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 text-sm text-destructive">{error?.message || "Could not load your plan details."}</div>

  const subscription = data.subscription
  const usedPercent = data.quota.total_allowance > 0 ? Math.min(100, Math.round(data.quota.total_used / data.quota.total_allowance * 100)) : 0
  const isExpired = subscription?.status === "expired"
  const daysUntilExpiry = subscription?.expires_at
    ? Math.ceil((new Date(subscription.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    : null
  const expiresSoon = subscription?.status === "active" && daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 30

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-muted-foreground">Publishing access and account history</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">My Plan</h1>
      </div>

      {data.agent.account_status !== "active" && (
        <div role="status" className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          Your account is {data.agent.account_status}. New listings cannot be published until an administrator reactivates it.
        </div>
      )}
      {isExpired && (
        <div role="status" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Your subscription has expired. Contact the Land2Land team to renew or request a new plan assignment.
        </div>
      )}
      {expiresSoon && (
        <div role="status" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          Your plan expires {daysUntilExpiry === 0 ? "today" : `in ${daysUntilExpiry} days`}. Contact support to arrange renewal before your publishing access ends.
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg"><ShieldCheck className="size-5 text-primary" />{subscription?.plan_name || "No plan assigned"}</CardTitle>
            <CardDescription className="mt-1">{subscription ? `Active since ${dateLabel(subscription.starts_at)}` : "An administrator must assign your initial plan and Free-plan quota."}</CardDescription>
          </div>
          <Badge variant={subscription?.status === "active" ? "default" : "secondary"}>{subscription?.status || "unassigned"}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric icon={<FileText className="size-4" aria-hidden="true" />} label="Plan allowance" value={data.quota.plan_quota} detail={`${data.quota.plan_used} used · ${data.quota.plan_remaining} left`} />
            <Metric icon={<Wallet className="size-4" aria-hidden="true" />} label="Special credits" value={data.quota.special_credits_remaining} detail={`${data.quota.special_credits_granted} granted · ${data.quota.special_credits_expired} expired`} />
            <Metric icon={<CircleDollarSign className="size-4" aria-hidden="true" />} label="Total available" value={data.quota.total_remaining} detail={`${data.quota.total_used} used of ${data.quota.total_allowance}`} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground"><span>Publishing quota used</span><span>{usedPercent}%</span></div>
            <Progress value={usedPercent} aria-label="Publishing quota used" />
          </div>
          {data.quota.total_remaining <= 0 && (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              Your publishing quota is exhausted. Existing listings remain; ask an administrator to assign a plan or grant extra credits.
            </div>
          )}
          {subscription && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground"><CalendarClock className="size-4" aria-hidden="true" /> Valid through {dateLabel(subscription.expires_at)}</div>
          )}
          <p className="text-xs leading-relaxed text-muted-foreground">Draft, pending, and rejected submissions do not use credits. A credit is used only after an administrator approves and publishes a listing.</p>
        </CardContent>
      </Card>

      <section aria-labelledby="available-plans-heading" className="flex flex-col gap-3">
        <div>
          <h2 id="available-plans-heading" className="text-lg font-bold">Available plans</h2>
          <p className="mt-1 text-sm text-muted-foreground">Plan settings are configured by the Land2Land administrator.</p>
        </div>
        {data.plans.length ? (
          <div className="grid gap-3 md:grid-cols-2">
            {data.plans.map((plan) => {
              const isCurrent = subscription?.plan_code === plan.plan_code
              return (
                <Card key={plan._id} className={plan.featured ? "border-primary/50" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2"><CardTitle className="text-base">{plan.name}</CardTitle>{isCurrent && <Badge>Current plan</Badge>}</div>
                    <CardDescription>{plan.description || "Contact an administrator for plan details."}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3">
                    <p className="text-xl font-bold">{formatPrice(plan.price_amount, plan.currency, plan.billing_cycle)}</p>
                    <p className="text-sm text-muted-foreground">Publishing allowance: {plan.publishing_limit ?? (plan.plan_code === "free" ? "Set per agent" : "Not configured")}</p>
                    <ul className="flex flex-col gap-1 text-sm text-muted-foreground">{plan.benefits?.length ? plan.benefits.map((benefit) => <li key={benefit}>• {benefit}</li>) : <li>Plan details available from the administrator.</li>}</ul>
                    <Button type="button" variant={isCurrent ? "secondary" : "outline"} disabled className="mt-1 w-full">
                      {isCurrent ? "Current plan" : "Online purchase not configured"}
                    </Button>
                    {!isCurrent && <p className="text-center text-xs text-muted-foreground">Contact the administrator for manual assignment. No payment is taken here.</p>}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">No active plans are available yet. Contact the administrator.</p>
        )}
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        <HistoryList title="Subscription history" rows={data.subscription_history} empty="No subscription history yet." />
        <HistoryList title="Payment history" rows={data.payment_history} empty="No payment records are available." />
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Publishing credit history</CardTitle></CardHeader>
        <CardContent><HistoryList title="" rows={data.quota_history} empty="No quota changes or publishing activity yet." /></CardContent>
      </Card>
      <Button asChild variant="outline" className="self-start"><Link href="/contact">Contact Land2Land support</Link></Button>
    </div>
  )
}

function Metric({ icon, label, value, detail }: { icon: ReactNode; label: string; value: number; detail: string }) {
  return <div className="rounded-xl border border-border bg-background p-4"><div className="flex items-center gap-2 text-xs text-muted-foreground">{icon}{label}</div><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-muted-foreground">{detail}</p></div>
}

function HistoryList({ title, rows, empty }: { title: string; rows: Array<Record<string, any>>; empty: string }) {
  return (
    <section className="flex flex-col gap-2">
      {title && <h2 className="text-base font-bold">{title}</h2>}
      {rows.length ? rows.slice(0, 10).map((row, index) => (
        <div key={row._id || `${row.action || row.type}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
          <div className="min-w-0"><p className="truncate font-medium">{String(row.action || row.type || row.status || "Record").replaceAll("_", " ")}</p><p className="mt-0.5 truncate text-xs text-muted-foreground">{row.plan_name || row.source || row.status || ""}</p></div>
          <div className="shrink-0 text-right"><p className="font-semibold">{row.amount != null ? `${row.amount} ${row.currency || "credits"}` : ""}</p><p className="text-xs text-muted-foreground">{dateLabel(row.created_at || row.starts_at)}</p></div>
        </div>
      )) : <p className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">{empty}</p>}
    </section>
  )
}
