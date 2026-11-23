"use client"

import { useState } from "react"
import useSWR from "swr"
import { Check, CircleDollarSign, ClipboardList, RefreshCw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

type Submission = { _id: string; agent_name: string; task_title: string; task_points: number; submission_text: string; proof_files?: string[]; status: string; submitted_at: string; admin_feedback?: string }
type RewardTask = { _id: string; title: string; category: string; points: number; status: string }

export default function AdminRewardCenterPage() {
  const { data: submissionsData, isLoading: submissionsLoading, mutate: refreshSubmissions } = useSWR<Submission[]>("/api/admin/reward-submissions", async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load submissions.")
    return response.json()
  })
  const { data: tasksData, isLoading: tasksLoading, mutate: refreshTasks } = useSWR<RewardTask[]>("/api/admin/reward-tasks", async (url: string) => {
    const response = await fetch(url, { cache: "no-store" })
    if (!response.ok) throw new Error("Unable to load tasks.")
    return response.json()
  })
  const submissions = submissionsData || []
  const tasks = tasksData || []
  const loading = submissionsLoading || tasksLoading
  const [busy, setBusy] = useState("")
  const [message, setMessage] = useState("")
  const [task, setTask] = useState({ title: "", category: "General", description: "", instructions: "", points: "", priority: "normal", proof_requirements: "Describe your work and attach a proof link." })

  const load = async () => Promise.all([refreshSubmissions(), refreshTasks()])

  async function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy("task")
    setMessage("")
    const response = await fetch("/api/admin/reward-tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...task, points: Number(task.points), assignment_type: "all" }) })
    const result = await response.json()
    setMessage(response.ok ? "Task published to eligible agents." : result.error || "Could not create task.")
    if (response.ok) setTask({ title: "", category: "General", description: "", instructions: "", points: "", priority: "normal", proof_requirements: "Describe your work and attach a proof link." })
    setBusy("")
  }

  async function taskStatus(task: RewardTask, status: "active" | "paused" | "archived") {
    if (status === "archived" && !window.confirm(`Archive “${task.title}”?`)) return
    setBusy(task._id)
    const response = await fetch(`/api/admin/reward-tasks/${task._id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) })
    const result = await response.json()
    setMessage(response.ok ? `Task ${status}.` : result.error || "Unable to update task.")
    if (response.ok) await load()
    setBusy("")
  }

  async function review(item: Submission, action: "approved" | "rejected" | "revision_requested") {
    const feedback = action === "approved" ? "" : window.prompt(action === "rejected" ? "Reason for rejection" : "What should be revised?")
    if (action !== "approved" && feedback === null) return
    setBusy(item._id)
    const response = await fetch("/api/admin/reward-submissions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: item._id, action, feedback }) })
    const result = await response.json()
    setMessage(response.ok ? (action === "approved" ? `${item.task_points} points awarded to ${item.agent_name}.` : "Submission updated.") : result.error || "Could not review submission.")
    if (response.ok) await load()
    setBusy("")
  }

  return <div className="mx-auto max-w-6xl space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">Rewards & tasks</h1><p className="mt-1 text-sm text-muted-foreground">Publish agent opportunities and review proof before points are issued.</p></div><Button variant="outline" onClick={() => void load()} disabled={loading}><RefreshCw data-icon="inline-start" />Refresh</Button></header>
    {message && <p role="status" className="rounded-md border bg-muted/40 px-4 py-3 text-sm">{message}</p>}
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><ClipboardList />Create a task</CardTitle><CardDescription>Agents submit evidence; points are awarded only after approval.</CardDescription></CardHeader><CardContent><form onSubmit={createTask} className="flex flex-col gap-4">
        <div className="grid gap-2"><Label htmlFor="task-title">Title</Label><Input id="task-title" required maxLength={140} value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="task-category">Category</Label><Input id="task-category" value={task.category} onChange={(e) => setTask({ ...task, category: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="task-description">Short description</Label><Textarea id="task-description" required maxLength={1500} value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="task-instructions">Instructions</Label><Textarea id="task-instructions" required maxLength={5000} value={task.instructions} onChange={(e) => setTask({ ...task, instructions: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="task-points">Reward points</Label><Input id="task-points" type="number" min="1" step="1" required value={task.points} onChange={(e) => setTask({ ...task, points: e.target.value })} /></div>
        <div className="grid gap-2"><Label htmlFor="task-proof">Proof requirements</Label><Input id="task-proof" value={task.proof_requirements} onChange={(e) => setTask({ ...task, proof_requirements: e.target.value })} /></div>
        <Button type="submit" disabled={busy === "task"}>{busy === "task" ? "Publishing…" : "Publish task"}</Button>
      </form></CardContent></Card>
      <Card><CardHeader><CardTitle className="flex items-center gap-2"><Star />Submissions</CardTitle><CardDescription>Each approval creates one immutable ledger entry in the same database transaction.</CardDescription></CardHeader><CardContent className="flex flex-col gap-3">
        {loading ? <p className="py-8 text-center text-sm text-muted-foreground">Loading submissions…</p> : submissions.length === 0 ? <p className="py-8 text-center text-sm text-muted-foreground">No submissions to review yet.</p> : submissions.map((item) => <article key={item._id} className="rounded-lg border p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-medium">{item.task_title}</h3><p className="text-sm text-muted-foreground">{item.agent_name} · {item.task_points} points</p></div><Badge variant={item.status === "pending" ? "secondary" : "outline"}>{item.status.replaceAll("_", " ")}</Badge></div><p className="mt-3 whitespace-pre-wrap text-sm">{item.submission_text}</p>{item.proof_files?.map((url) => <a className="mt-2 block break-all text-sm underline" href={url} key={url} target="_blank" rel="noreferrer">View proof</a>)}{item.status === "pending" || item.status === "revision_requested" ? <div className="mt-4 flex flex-wrap gap-2"><Button size="sm" disabled={busy === item._id} onClick={() => void review(item, "approved")}><Check data-icon="inline-start" />Approve</Button><Button size="sm" variant="outline" disabled={busy === item._id} onClick={() => void review(item, "revision_requested")}>Request revision</Button><Button size="sm" variant="destructive" disabled={busy === item._id} onClick={() => void review(item, "rejected")}>Reject</Button></div> : item.admin_feedback && <p className="mt-3 text-sm text-muted-foreground">Feedback: {item.admin_feedback}</p>}</article>)}
      </CardContent></Card>
    </div>
    <Card><CardHeader><CardTitle>Published tasks</CardTitle><CardDescription>Pause, reopen, or archive tasks without deleting submissions or audit history.</CardDescription></CardHeader><CardContent className="flex flex-col gap-2">{tasks.length === 0 ? <p className="text-sm text-muted-foreground">No tasks created yet.</p> : tasks.map((task) => <div key={task._id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3"><div><p className="font-medium">{task.title}</p><p className="text-xs text-muted-foreground">{task.category} · {task.points} points</p></div><div className="flex items-center gap-2"><Badge variant={task.status === "active" ? "secondary" : "outline"}>{task.status}</Badge>{task.status !== "archived" && <><Button size="sm" variant="outline" disabled={busy === task._id} onClick={() => void taskStatus(task, task.status === "active" ? "paused" : "active")}>{task.status === "active" ? "Pause" : "Reopen"}</Button><Button size="sm" variant="outline" disabled={busy === task._id} onClick={() => void taskStatus(task, "archived")}>Archive</Button></>}</div></div>)}</CardContent></Card>
    <Card><CardHeader><CardTitle className="flex items-center gap-2"><CircleDollarSign />Points issuance controls</CardTitle><CardDescription>Point adjustments and posting-credit conversion remain separate from subscription plan balances.</CardDescription></CardHeader><CardContent><p className="text-sm text-muted-foreground">Manage agent balances, conversion settings, and posting-credit redemptions in <a className="underline underline-offset-4" href="/admin/rewards">Points & redemptions</a>.</p></CardContent></Card>
  </div>
}
