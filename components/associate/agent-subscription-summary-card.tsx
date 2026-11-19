"use client"

import Link from "next/link"
import useSWR from "swr"
import { ArrowRight, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SubscriptionSummary {
  subscription: { plan_name: string; status: string; expires_at?: string | null } | null
  quota: { total_allowance: number; total_used: number; total_remaining: number }
}

const fetcher = async (url: string): Promise<SubscriptionSummary> => {
  const response = await fetch(url, { cache: "no-store", credentials: "include" })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || "Could not load plan")
  return data
}

export default function AgentSubscriptionSummaryCard() {
  const { data, error, isLoading } = useSWR<SubscriptionSummary>("/api/agent/subscription", fetcher)
  const allowance = data?.quota.total_allowance || 0
  const used = data?.quota.total_used || 0
  const progress = allowance > 0 ? Math.min(100, Math.round(used / allowance * 100)) : 0
  const daysUntilExpiry = data?.subscription?.expires_at
    ? Math.ceil((new Date(data.subscription.expires_at).getTime() - Date.now()) / (24 * 60 * 60 * 1000))
    : null
  const expiresSoon = data?.subscription?.status === "active" && daysUntilExpiry !== null && daysUntilExpiry >= 0 && daysUntilExpiry <= 30

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <CardTitle className="flex items-center gap-2 text-base"><Wallet className="size-4 text-primary" aria-hidden="true" />My Plan</CardTitle>
          <CardDescription className="mt-1">{isLoading ? "Loading plan details…" : data?.subscription?.plan_name || "No plan assigned"}</CardDescription>
        </div>
        {data?.subscription && <Badge variant={data.subscription.status === "active" ? "default" : "secondary"}>{data.subscription.status}</Badge>}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {error ? (
          <p role="alert" className="text-sm text-destructive">Could not load subscription details.</p>
        ) : (
          <>
            <div className="flex items-end justify-between gap-3"><p className="text-2xl font-bold">{isLoading ? "—" : data?.quota.total_remaining ?? 0}</p><p className="text-xs text-muted-foreground">credits remaining</p></div>
            <Progress value={progress} aria-label="Publishing quota used" />
            <p className="text-xs text-muted-foreground">{used} used of {allowance} total publishing credits.</p>
            {expiresSoon && <p role="status" className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">Your plan expires {daysUntilExpiry === 0 ? "today" : `in ${daysUntilExpiry} days`}.</p>}
          </>
        )}
        <Button asChild variant="outline" className="w-full">
          <Link href="/associate/subscription">View plan and quota <ArrowRight data-icon="inline-end" /></Link>
        </Button>
      </CardContent>
    </Card>
  )
}
