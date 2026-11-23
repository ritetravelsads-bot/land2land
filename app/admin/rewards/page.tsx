"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Award, CircleDollarSign, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Account = { _id: string; username: string; email: string; available_points: number; lifetime_earned_points: number; pending_points: number }
type Redemption = { _id: string; agent_name: string; points_requested: number; posting_credits_requested: number; status: string; created_at: string; failure_reason?: string }
type Settings = { points_per_posting_credit: number; minimum_redemption_points: number; maximum_posting_credits: number }

export default function AdminRewardsPage() {
  const { data: accountData, isLoading: accountsLoading, mutate: refreshAccounts } = useSWR<Account[]>("/api/admin/reward-accounts", async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load reward accounts.")
    return response.json()
  })
  const { data: redemptionsData, isLoading: redemptionsLoading, mutate: refreshRedemptions } = useSWR<Redemption[]>("/api/admin/reward-redemptions", async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load redemptions.")
    return response.json()
  })
  const { data: settings, isLoading: settingsLoading, mutate: refreshSettings } = useSWR<Settings>("/api/admin/reward-settings", async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load reward settings.")
    return response.json()
  })
  const accounts = accountData || []
  const redemptions = redemptionsData || []
  const [form, setForm] = useState<Settings>({ points_per_posting_credit: 0, minimum_redemption_points: 0, maximum_posting_credits: 0 })
  const loading = accountsLoading || redemptionsLoading || settingsLoading
  const [busy, setBusy] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!settings) return
    setForm({ points_per_posting_credit: settings.points_per_posting_credit || 0, minimum_redemption_points: settings.minimum_redemption_points || 0, maximum_posting_credits: settings.maximum_posting_credits || 0 })
  }, [settings])
  const load = async () => Promise.all([refreshAccounts(), refreshRedemptions(), refreshSettings()])

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy("settings")
    const response = await fetch("/api/admin/reward-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    const result = await response.json()
    setMessage(response.ok ? "Redemption settings saved." : result.error || "Unable to save settings.")
    if (response.ok) await load()
    setBusy("")
  }

  async function adjust(account: Account, action: "grant" | "deduct") {
    const rawPoints = window.prompt(`${action === "grant" ? "Points to grant to" : "Points to deduct from"} ${account.username}`)
    if (!rawPoints) return
    const points = Number(rawPoints)
    const reason = window.prompt("Enter the audit reason")
    if (!reason?.trim()) return
    setBusy(account._id)
    const response = await fetch("/api/admin/reward-accounts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ agent_id: account._id, action, points, reason }) })
    const result = await response.json()
    setMessage(response.ok ? `Points ${action === "grant" ? "granted" : "deducted"}.` : result.error || "Unable to adjust points.")
    if (response.ok) await load()
    setBusy("")
  }

  async function redeem(item: Redemption, action: "approve" | "reject") {
    const reason = action === "reject" ? window.prompt("Reason for rejecting this redemption") : ""
    if (action === "reject" && !reason?.trim()) return
    setBusy(item._id)
    const response = await fetch("/api/admin/reward-redemptions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item._id, action, reason }) })
    const result = await response.json()
    setMessage(response.ok ? `Redemption ${result.status}.` : result.error || "Unable to process redemption.")
    await load()
    setBusy("")
  }

  return <div className="mx-auto max-w-6xl space-y-6"><header className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">Points & redemptions</h1><p className="mt-1 text-sm text-muted-foreground">Manage the point conversion rate, agent balances, and posting-credit requests.</p></div><Button variant="outline" onClick={() => void load()} disabled={loading}><RefreshCw data-icon="inline-start" />Refresh</Button></header>
    {message && <p role="status" className="rounded-md border bg-muted/40 px-4 py-3 text-sm">{message}</p>}
    <div className="grid gap-5 lg:grid-cols-2"><Card><CardHeader><CardTitle className="flex items-center gap-2"><CircleDollarSign />Redemption settings</CardTitle><CardDescription>Conversion remains disabled until an administrator saves a valid rate.</CardDescription></CardHeader><CardContent><form className="grid gap-4" onSubmit={saveSettings}><div className="grid gap-2"><Label htmlFor="conversion-rate">Points per posting credit</Label><Input id="conversion-rate" type="number" min="1" step="1" required value={form.points_per_posting_credit || ""} onChange={(e) => setForm({ ...form, points_per_posting_credit: Number(e.target.value) })} /></div><div className="grid gap-2"><Label htmlFor="minimum-points">Minimum points per redemption</Label><Input id="minimum-points" type="number" min={form.points_per_posting_credit || 1} step="1" required value={form.minimum_redemption_points || ""} onChange={(e) => setForm({ ...form, minimum_redemption_points: Number(e.target.value) })} /></div><div className="grid gap-2"><Label htmlFor="maximum-credits">Maximum posting credits per request</Label><Input id="maximum-credits" type="number" min="1" max="1000" step="1" required value={form.maximum_posting_credits || ""} onChange={(e) => setForm({ ...form, maximum_posting_credits: Number(e.target.value) })} /></div><Button type="submit" disabled={busy === "settings"}>{busy === "settings" ? "Saving…" : "Save settings"}</Button></form></CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Award />Redemption requests</CardTitle><CardDescription>Approval issues credits through the existing quota service; rejection releases reserved points.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">{loading ? <p className="text-sm text-muted-foreground">Loading…</p> : !redemptions.length ? <p className="text-sm text-muted-foreground">No redemption requests.</p> : redemptions.map((item) => <article key={item._id} className="rounded-lg border p-4"><div className="flex flex-wrap justify-between gap-3"><div><p className="font-medium">{item.agent_name}</p><p className="text-sm text-muted-foreground">{item.points_requested} points → {item.posting_credits_requested} credits</p></div><Badge variant={item.status === "pending" ? "secondary" : "outline"}>{item.status}</Badge></div>{item.failure_reason && <p className="mt-2 text-sm text-destructive">{item.failure_reason}</p>}{item.status === "pending" || item.status === "processing" ? <div className="mt-3 flex gap-2"><Button size="sm" disabled={busy === item._id} onClick={() => void redeem(item, "approve")}>{item.status === "processing" ? "Retry processing" : "Approve & issue"}</Button>{item.status === "pending" && <Button size="sm" variant="outline" disabled={busy === item._id} onClick={() => void redeem(item, "reject")}>Reject</Button>}</div> : null}</article>)}</CardContent></Card></div>
    <Card><CardHeader><CardTitle>Agent points accounts</CardTitle><CardDescription>Direct adjustments require a reason and write an audit record and ledger transaction.</CardDescription></CardHeader><CardContent>{loading ? <p className="py-6 text-sm text-muted-foreground">Loading accounts…</p> : <div className="flex flex-col">{accounts.map((account) => <div key={account._id} className="flex flex-wrap items-center justify-between gap-3 border-b py-3 last:border-0"><div><p className="font-medium">{account.username}</p><p className="text-xs text-muted-foreground">{account.email} · {account.available_points} available · {account.pending_points} reserved · {account.lifetime_earned_points} lifetime earned</p></div><div className="flex gap-2"><Button size="sm" variant="outline" disabled={busy === account._id} onClick={() => void adjust(account, "grant")}>Grant</Button><Button size="sm" variant="outline" disabled={busy === account._id} onClick={() => void adjust(account, "deduct")}>Deduct</Button></div></div>)}</div>}</CardContent></Card>
  </div>
}
