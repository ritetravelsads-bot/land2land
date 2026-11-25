"use client"

import { useState } from "react"
import useSWR from "swr"
import { BadgeCheck, Plus, RefreshCw, Save, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type Completion = { _id: string; user_id: string; user?: { name?: string; email?: string }; points: number; credited_at: string; source_event: string; transaction?: { type: string; points: number; created_at: string; description: string } }
type AutomaticTask = { _id: string; task_key: string; title: string; description: string; points: number; category: string; trigger: string; roles: string[]; active: boolean; verification_rule: string; completed_users: number; points_distributed: number; not_completed_count: number; not_completed_users: Array<{ id: string; name: string; email: string }>; completions: Completion[] }

const fetcher = async (url: string) => {
  const response = await fetch(url, { cache: "no-store" })
  if (!response.ok) throw new Error("Unable to load automatic reward tasks.")
  return response.json()
}

const blankTask = { task_key: "", title: "", description: "", category: "General", trigger: "profile_saved", points: "", verification_rule: "profile_complete" }

export default function AutomaticRewardManagementPage() {
  const { data: tasks = [], isLoading, error, mutate } = useSWR<AutomaticTask[]>("/api/admin/automatic-reward-tasks", fetcher)
  const [form, setForm] = useState(blankTask)
  const [busy, setBusy] = useState("")
  const [message, setMessage] = useState("")

  async function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy("create")
    setMessage("")
    const response = await fetch("/api/admin/automatic-reward-tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, points: Number(form.points), roles: ["associate"] }) })
    const result = await response.json()
    setMessage(response.ok ? "Automatic reward task created." : result.error || "Unable to create task.")
    if (response.ok) { setForm(blankTask); await mutate() }
    setBusy("")
  }

  async function updateTask(task: AutomaticTask, patch: Record<string, unknown>) {
    setBusy(task._id)
    const response = await fetch(`/api/admin/automatic-reward-tasks/${task._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) })
    const result = await response.json()
    setMessage(response.ok ? "Automatic reward settings saved." : result.error || "Unable to save settings.")
    if (response.ok) await mutate()
    setBusy("")
  }

  return <main className="mx-auto flex max-w-6xl flex-col gap-6">
    <header className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">Automatic Reward Tasks</h1><p className="mt-1 text-sm text-muted-foreground">Configure server-verified rewards, review completions, and preserve the points ledger.</p></div><Button variant="outline" onClick={() => void mutate()} disabled={isLoading}><RefreshCw data-icon="inline-start" />Refresh</Button></header>
    {message && <p role="status" className="rounded-md border bg-muted/40 px-4 py-3 text-sm">{message}</p>}
    {error && <p role="alert" className="rounded-md border border-destructive/40 px-4 py-3 text-sm text-destructive">Could not load automatic tasks.</p>}
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Plus />Create an automatic task</CardTitle><CardDescription>Each trigger uses a server-side verifier. Custom tasks can use supported platform events.</CardDescription></CardHeader><CardContent><form onSubmit={createTask} className="flex flex-col gap-4">
        <div className="grid gap-2"><Label htmlFor="automatic-key">Unique task identifier</Label><Input id="automatic-key" required pattern="[a-z0-9_]{3,60}" value={form.task_key} onChange={(e) => setForm({ ...form, task_key: e.target.value })} placeholder="e.g. first_referral" /></div>
        <div className="grid gap-2"><Label htmlFor="automatic-title">Task title</Label><Input id="automatic-title" required maxLength={140} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="automatic-description">Description</Label><Textarea id="automatic-description" required maxLength={1000} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="automatic-points">Reward points</Label><Input id="automatic-points" type="number" min="1" max="1000000" step="1" required value={form.points} onChange={(e) => setForm({ ...form, points: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="automatic-category">Category</Label><Input id="automatic-category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="automatic-trigger">Trigger</Label><select id="automatic-trigger" className="h-10 rounded-md border bg-background px-3 text-sm" value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })}><option value="profile_saved">Profile saved</option><option value="mobile_verified">Mobile verified</option><option value="rera_approved">RERA approved</option><option value="listing_approved">Listing approved</option></select></div>
        <div className="grid gap-2"><Label htmlFor="automatic-rule">Completion verifier</Label><select id="automatic-rule" className="h-10 rounded-md border bg-background px-3 text-sm" value={form.verification_rule} onChange={(e) => { const rule = e.target.value; const trigger = rule === "mobile_verified" ? "mobile_verified" : rule === "rera_approved" ? "rera_approved" : rule === "first_listing_approved" ? "listing_approved" : "profile_saved"; setForm({ ...form, verification_rule: rule, trigger }) }}><option value="profile_complete">Profile complete</option><option value="profile_photo">Saved profile photo</option><option value="mobile_verified">Verified mobile</option><option value="rera_approved">Approved RERA request</option><option value="first_listing_approved">First approved listing</option></select></div>
        <p className="text-xs text-muted-foreground">Eligible role in this codebase: Associate. The database currently has no separate Agent role.</p>
        <Button type="submit" disabled={busy === "create"}>{busy === "create" ? "Creating…" : "Create task"}</Button>
      </form></CardContent></Card>
      <section className="flex flex-col gap-4" aria-label="Automatic reward tasks">
        {isLoading ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Loading tasks…</CardContent></Card> : tasks.length === 0 ? <Card><CardContent className="py-10 text-center text-sm text-muted-foreground">Default tasks will appear here after loading.</CardContent></Card> : tasks.map((task) => <Card key={task._id}><CardHeader><div className="flex flex-wrap items-start justify-between gap-3"><div><CardTitle className="flex items-center gap-2"><BadgeCheck />{task.title}</CardTitle><CardDescription className="mt-1">{task.task_key} · {task.trigger.replaceAll("_", " ")} · {task.category}</CardDescription></div><Badge variant={task.active ? "secondary" : "outline"}>{task.active ? "Active" : "Paused"}</Badge></div></CardHeader><CardContent className="flex flex-col gap-4">
          <div className="grid gap-3 sm:grid-cols-3"><div className="rounded-md bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Completed users</p><p className="text-lg font-semibold">{task.completed_users}</p></div><div className="rounded-md bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Points distributed</p><p className="text-lg font-semibold">{task.points_distributed}</p></div><div className="rounded-md bg-muted/40 p-3"><p className="text-xs text-muted-foreground">Current reward</p><p className="text-lg font-semibold">{task.points} points</p></div></div>
          <p className="text-sm text-muted-foreground">{task.description}</p><p className="text-xs text-muted-foreground">Verification: {task.verification_rule}</p>
          <form className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const rule = String(data.get("rule")); const trigger = rule === "mobile_verified" ? "mobile_verified" : rule === "rera_approved" ? "rera_approved" : rule === "first_listing_approved" ? "listing_approved" : "profile_saved"; void updateTask(task, { title: data.get("title"), description: data.get("description"), points: Number(data.get("points")), verification_rule: rule, trigger }) }}>
            <Input name="title" aria-label="Task title" defaultValue={task.title} maxLength={140} required />
            <Input name="points" aria-label="Reward points" type="number" min="1" max="1000000" defaultValue={task.points} required />
            <Button type="submit" size="sm" variant="outline" disabled={busy === task._id}><Save data-icon="inline-start" />Save</Button>
            <Textarea name="description" aria-label="Task description" className="sm:col-span-2" defaultValue={task.description} />
            <select name="rule" aria-label="Completion verifier" defaultValue={task.verification_rule} className="h-10 rounded-md border bg-background px-3 text-sm"><option value="profile_complete">Profile complete</option><option value="profile_photo">Saved profile photo</option><option value="mobile_verified">Verified mobile</option><option value="rera_approved">Approved RERA request</option><option value="first_listing_approved">First approved listing</option></select>
          </form>
          <Button size="sm" variant="outline" className="self-start" disabled={busy === task._id} onClick={() => void updateTask(task, { active: !task.active })}>{task.active ? "Pause task" : "Activate task"}</Button>
          <details className="rounded-md border p-3"><summary className="cursor-pointer text-sm font-medium">Completion history ({task.completed_users})</summary><div className="mt-3 flex flex-col gap-2">{task.completions.length === 0 ? <p className="text-sm text-muted-foreground">No users have earned this reward.</p> : task.completions.map((entry) => <div key={entry._id} className="flex flex-wrap justify-between gap-2 border-b pb-2 text-sm last:border-0"><div><p className="font-medium">{entry.user?.name || entry.user_id}</p><p className="text-xs text-muted-foreground">{entry.user?.email || ""} · {new Date(entry.credited_at).toLocaleString()}</p><p className="text-xs text-muted-foreground">Ledger: {entry.transaction?.type || "automatic_credit"}</p></div><span className="font-semibold text-primary">+{entry.points}</span></div>)}</div><p className="mt-3 text-xs text-muted-foreground">Not yet completed: {task.not_completed_count}. First 200 eligible accounts: {task.not_completed_users.map((user) => user.name || user.email).join(", ") || "None"}</p></details>
        </CardContent></Card>)}
      </section>
    </div>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck />Safety and history</CardTitle><CardDescription>Changing a task reward affects future credits only. Past ledger entries and credited account balances are retained.</CardDescription></CardHeader><CardContent className="text-sm text-muted-foreground">Automatic tasks use unique task/user idempotency keys, a unique completion index, and the existing reward account and transaction collections. Manual task approval and redemption remain separate workflows.</CardContent></Card>
  </main>
}
