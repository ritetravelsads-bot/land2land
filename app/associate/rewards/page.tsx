"use client"

import { useState } from "react"
import useSWR from "swr"
import { Award, CircleDollarSign, Clock3, ListChecks } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Task = { _id: string; title: string; category: string; description: string; instructions: string; points: number; deadline?: string; priority: string; completion_status?: string; proof_requirements?: string }
type Rewards = { account: { available_points: number; pending_points: number; lifetime_earned_points: number; lifetime_redeemed_points: number }; transactions: Array<{ _id: string; type: string; points: number; balance_after: number; description: string; created_at: string }>; submissions: Array<{ _id: string; task_id: string; status: string; admin_feedback?: string }>; tasks: Task[]; settings: { points_per_posting_credit: number; minimum_redemption_points: number }; redemptions: Array<{ _id: string; points_requested: number; posting_credits_requested: number; status: string; created_at: string }> }

export default function AssociateRewardsPage() {
  const { data, isLoading: loading, mutate: load } = useSWR<Rewards>("/api/associate/rewards", async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load rewards.")
    return response.json()
  })
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [text, setText] = useState("")
  const [proof, setProof] = useState("")
  const [points, setPoints] = useState("")
  const [notice, setNotice] = useState("")
  const [busy, setBusy] = useState(false)
  async function submitTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!activeTask) return
    setBusy(true)
    const response = await fetch("/api/associate/reward-tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task_id: activeTask._id, submission_text: text, proof_files: proof ? [proof] : [] }) })
    const result = await response.json()
    setNotice(response.ok ? "Submission received. Points are added after review." : result.error || "Submission failed.")
    setBusy(false)
    if (response.ok) { setActiveTask(null); setText(""); setProof(""); await load() }
  }

  const balance = data?.account.available_points || 0
  const conversion = Number(data?.settings.points_per_posting_credit || 0)
  const redeemable = conversion > 0 && Number(points) > 0 ? Math.floor(Number(points) / conversion) : 0

  async function requestRedemption() {
    setBusy(true)
    const response = await fetch("/api/associate/redeem", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ posting_credits: redeemable, idempotency_key: crypto.randomUUID() }) })
    const result = await response.json()
    setNotice(response.ok ? "Redemption requested. Your points are reserved while an administrator reviews it." : result.error || "Unable to request redemption.")
    setBusy(false)
    if (response.ok) { setPoints(""); await load() }
  }

  return <div className="mx-auto max-w-5xl space-y-6"><header><h1 className="text-2xl font-semibold">My rewards</h1><p className="mt-1 text-sm text-muted-foreground">Earn points from approved activities and follow every balance change in your ledger.</p></header>
    {notice && <p role="status" className="rounded-md border bg-muted/40 px-4 py-3 text-sm">{notice}</p>}
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[{ label: "Available points", value: balance, icon: CircleDollarSign }, { label: "Lifetime earned", value: data?.account.lifetime_earned_points || 0, icon: Award }, { label: "Pending task approvals", value: data?.submissions.filter((submission) => submission.status === "pending").length || 0, icon: Clock3 }, { label: "Available tasks", value: data?.tasks.length || 0, icon: ListChecks }].map((stat) => <Card key={stat.label}><CardContent className="flex items-center justify-between p-5"><div><p className="text-sm text-muted-foreground">{stat.label}</p><p className="mt-1 text-2xl font-semibold">{loading ? "—" : stat.value}</p></div><stat.icon className="text-primary" /></CardContent></Card>)}</div>
    <Card id="tasks"><CardHeader><CardTitle>Available tasks</CardTitle><CardDescription>Complete the instructions and provide evidence. Approval awards the listed points once.</CardDescription></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">{loading ? <p className="text-sm text-muted-foreground">Loading tasks…</p> : !data?.tasks.length ? <p className="text-sm text-muted-foreground">No tasks are available right now.</p> : data.tasks.map((task) => <article key={task._id} className="rounded-lg border p-4"><div className="flex justify-between gap-2"><div><h3 className="font-medium">{task.title}</h3><p className="text-sm text-muted-foreground">{task.category || "General"}</p></div><Badge variant={(task.completion_status || "available") === "available" ? "secondary" : "outline"}>{(task.completion_status || "available").replaceAll("_", " ")}</Badge></div><p className="mt-3 text-sm text-muted-foreground">{task.description}</p><div className="mt-4 flex items-center justify-between"><span className="font-semibold text-primary">{task.points} points</span>{task.deadline && <span className="text-xs text-muted-foreground">Due {new Date(task.deadline).toLocaleDateString()}</span>}</div>{(task.completion_status || "available") !== "pending" && (task.completion_status || "available") !== "approved" && <Button size="sm" className="mt-4" onClick={() => setActiveTask(task)}>View & submit</Button>}</article>)}</CardContent></Card>
    {activeTask && <Card><CardHeader><CardTitle>Submit: {activeTask.title}</CardTitle><CardDescription>{activeTask.instructions}<br />Proof required: {activeTask.proof_requirements}</CardDescription></CardHeader><CardContent><form className="grid gap-4" onSubmit={submitTask}><div className="grid gap-2"><Label htmlFor="submission-text">Work completed</Label><Textarea id="submission-text" maxLength={4000} value={text} onChange={(event) => setText(event.target.value)} /></div><div className="grid gap-2"><Label htmlFor="proof-url">Proof link (HTTPS)</Label><Input id="proof-url" type="url" value={proof} onChange={(event) => setProof(event.target.value)} /></div><div className="flex gap-2"><Button type="submit" disabled={busy}>{busy ? "Submitting…" : "Send for review"}</Button><Button type="button" variant="outline" onClick={() => setActiveTask(null)}>Cancel</Button></div></form></CardContent></Card>}
    <div className="grid gap-5 lg:grid-cols-2"><Card id="submissions"><CardHeader><CardTitle>My submissions</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{data?.submissions.length ? data.submissions.map((submission) => <div key={submission._id} className="flex items-center justify-between gap-3 border-b pb-3 last:border-0"><div><p className="text-sm font-medium">Task submission</p>{submission.admin_feedback && <p className="text-xs text-muted-foreground">{submission.admin_feedback}</p>}</div><Badge variant={submission.status === "approved" ? "default" : "secondary"}>{submission.status.replaceAll("_", " ")}</Badge></div>) : <p className="text-sm text-muted-foreground">Your task submissions will appear here.</p>}</CardContent></Card><Card id="history"><CardHeader><CardTitle>Points history</CardTitle></CardHeader><CardContent className="flex flex-col gap-3">{data?.transactions.length ? data.transactions.map((entry) => <div key={entry._id} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0"><div><p className="text-sm font-medium">{entry.description || entry.type}</p><p className="text-xs text-muted-foreground">{new Date(entry.created_at).toLocaleDateString()} · Balance {entry.balance_after}</p></div><span className={entry.points < 0 ? "text-sm font-semibold text-destructive" : "text-sm font-semibold text-primary"}>{entry.points > 0 ? "+" : ""}{entry.points}</span></div>) : <p className="text-sm text-muted-foreground">Your ledger entries will appear here.</p>}</CardContent></Card>
      <Card id="redeem"><CardHeader><CardTitle>Redeem points</CardTitle><CardDescription>{conversion > 0 ? `Conversion is ${conversion} points per posting credit. Redemption requests require admin approval.` : "Redemption is not available until an administrator configures the conversion rate."}</CardDescription></CardHeader><CardContent className="grid gap-3"><div className="grid gap-2"><Label htmlFor="redeem-points">Points to redeem</Label><Input id="redeem-points" type="number" min={data?.settings.minimum_redemption_points || 1} max={balance} step={conversion || 1} value={points} onChange={(e) => setPoints(e.target.value)} disabled={conversion < 1} /></div><p className="text-sm text-muted-foreground">Estimated posting credits: {redeemable}</p><Button disabled={busy || conversion < 1 || !Number.isSafeInteger(Number(points)) || Number(points) < (data?.settings.minimum_redemption_points || 1) || Number(points) > balance || Number(points) % conversion !== 0 || redeemable < 1} onClick={() => void requestRedemption()}>{busy ? "Submitting…" : "Request redemption"}</Button><p className="text-xs text-muted-foreground">Points are reserved when the request is accepted, and restored if an administrator rejects it.</p></CardContent></Card>
    </div>
  </div>
}
