"use client"

import { useEffect, useState, useRef } from "react"
import {
  MessageSquare,
  Loader2,
  Send,
  RefreshCw,
  Search,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Phone,
  Mail,
  Filter,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ---- Types ----------------------------------------------------------------

interface MessageEntry {
  id: string
  sender: "buyer" | "admin"
  sender_name: string
  content: string
  created_at: string
}

interface Thread {
  _id: string
  subject: string
  buyer_user_id: string
  buyer_name: string
  buyer_phone: string
  buyer_email: string
  property_name?: string
  property_slug?: string
  status: "open" | "replied" | "closed"
  messages: MessageEntry[]
  created_at: string
  updated_at: string
}

interface Stats {
  total: number
  open: number
  replied: number
  closed: number
}

// ---- Helpers ---------------------------------------------------------------

const STATUS_CONFIG: Record<
  Thread["status"],
  { label: string; color: string; icon: React.ElementType }
> = {
  open: {
    label: "Open",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    icon: AlertCircle,
  },
  replied: {
    label: "Replied",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
    icon: CheckCircle2,
  },
  closed: {
    label: "Closed",
    color: "bg-muted text-muted-foreground",
    icon: XCircle,
  },
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
}

// ---- Stat Cards -----------------------------------------------------------

function StatRow({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { label: "Total", value: stats.total, color: "text-muted-foreground" },
        { label: "Open", value: stats.open, color: "text-blue-600" },
        { label: "Replied", value: stats.replied, color: "text-emerald-600" },
        { label: "Closed", value: stats.closed, color: "text-muted-foreground" },
      ].map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-4">
          <p className="text-2xl font-bold text-foreground">{s.value}</p>
          <p className={`text-xs font-medium ${s.color}`}>{s.label}</p>
        </div>
      ))}
    </div>
  )
}

// ---- Thread Panel (Admin) -------------------------------------------------

function AdminThreadPanel({
  thread,
  onUpdate,
}: {
  thread: Thread
  onUpdate: (updated: Thread) => void
}) {
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [closing, setClosing] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [thread.messages])

  const patch = async (payload: { reply?: string; status?: string }) => {
    const res = await fetch(`/api/admin/buyer-messages/${thread._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Failed")
    return data as Thread
  }

  const handleSend = async () => {
    if (!reply.trim()) return
    setSending(true)
    setError("")
    try {
      const updated = await patch({ reply })
      setReply("")
      onUpdate(updated)
    } catch {
      setError("Failed to send reply.")
    } finally {
      setSending(false)
    }
  }

  const handleClose = async () => {
    setClosing(true)
    setError("")
    try {
      const updated = await patch({ status: "closed" })
      onUpdate(updated)
    } catch {
      setError("Failed to close thread.")
    } finally {
      setClosing(false)
    }
  }

  const handleReopen = async () => {
    setClosing(true)
    setError("")
    try {
      const updated = await patch({ status: "open" })
      onUpdate(updated)
    } catch {
      setError("Failed to reopen thread.")
    } finally {
      setClosing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey && !e.nativeEvent.isComposing) {
      handleSend()
    }
  }

  const StatusIcon = STATUS_CONFIG[thread.status]?.icon ?? AlertCircle

  return (
    <div className="flex flex-col h-full">
      {/* Thread Header */}
      <div className="p-4 border-b border-border space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm leading-snug flex-1">{thread.subject}</h3>
          <span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1",
              STATUS_CONFIG[thread.status]?.color
            )}
          >
            <StatusIcon className="h-3 w-3" />
            {STATUS_CONFIG[thread.status]?.label}
          </span>
        </div>

        {/* Buyer info */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {thread.buyer_name}
          </span>
          {thread.buyer_phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {thread.buyer_phone}
            </span>
          )}
          {thread.buyer_email && !thread.buyer_email.includes("placeholder") && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {thread.buyer_email}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(thread.created_at)}
          </span>
        </div>

        {thread.property_name && (
          <p className="text-xs text-muted-foreground">Re: {thread.property_name}</p>
        )}

        {/* Status actions */}
        <div className="flex gap-2">
          {thread.status !== "closed" ? (
            <Button variant="outline" size="sm" onClick={handleClose} disabled={closing}>
              {closing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5 mr-1" />}
              Close Thread
            </Button>
          ) : (
            <Button variant="outline" size="sm" onClick={handleReopen} disabled={closing}>
              {closing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5 mr-1" />}
              Reopen
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {thread.messages.map((msg) => {
          const isAdmin = msg.sender === "admin"
          return (
            <div key={msg.id} className={cn("flex", isAdmin ? "justify-end" : "justify-start")}>
              <div className="max-w-[80%] space-y-1">
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    isAdmin
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  {msg.content}
                </div>
                <p className="text-[10px] text-muted-foreground px-1">
                  {isAdmin ? `Admin (${msg.sender_name})` : msg.sender_name} &middot;{" "}
                  {formatTime(msg.created_at)}
                </p>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Reply Box */}
      {thread.status !== "closed" && (
        <div className="p-4 border-t border-border space-y-2">
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex gap-2 items-end">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your reply... (Ctrl+Enter to send)"
              rows={3}
              className="resize-none text-sm"
            />
            <Button
              size="icon"
              className="h-20 w-10 shrink-0"
              disabled={!reply.trim() || sending}
              onClick={handleSend}
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground">Ctrl+Enter to send</p>
        </div>
      )}
    </div>
  )
}

// ---- Main Client ----------------------------------------------------------

export default function AdminBuyerMessagesClient() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [stats, setStats] = useState<Stats>({ total: 0, open: 0, replied: 0, closed: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeThread, setActiveThread] = useState<Thread | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchThreads = async (pageNum = 1, status = "all", q = "") => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams({ page: String(pageNum), limit: "20" })
      if (status !== "all") params.set("status", status)
      if (q) params.set("search", q)
      const res = await fetch(`/api/admin/buyer-messages?${params}`)
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      const list: Thread[] = data.threads || []
      setThreads(list)
      setStats(data.stats || { total: 0, open: 0, replied: 0, closed: 0 })
      setTotalPages(data.pagination?.pages || 1)
      // Refresh active thread if open
      if (activeThread) {
        const refreshed = list.find((t) => t._id === activeThread._id)
        if (refreshed) setActiveThread(refreshed)
      }
    } catch {
      setError("Could not load messages.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreads(page, statusFilter, search)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter])

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchThreads(1, statusFilter, search), 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleUpdate = (updated: Thread) => {
    setThreads((prev) => prev.map((t) => (t._id === updated._id ? updated : t)))
    setActiveThread(updated)
  }

  return (
    <div className="space-y-5">
      {/* Stats */}
      <StatRow stats={stats} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search buyer name, phone, subject..."
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
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={() => fetchThreads(page, statusFilter, search)}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-6 text-center">
          <p className="text-sm text-destructive mb-3">{error}</p>
          <Button variant="outline" size="sm" onClick={() => fetchThreads(page, statusFilter, search)}>
            Retry
          </Button>
        </div>
      ) : threads.length === 0 ? (
        <div className="border border-border rounded-xl p-12 bg-card text-center">
          <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
          <p className="font-semibold text-foreground mb-1">No buyer messages yet</p>
          <p className="text-sm text-muted-foreground">
            Messages will appear here when buyers send them through the portal.
          </p>
        </div>
      ) : (
        <div
          className="border border-border rounded-xl overflow-hidden bg-card flex"
          style={{ height: "calc(100vh - 22rem)" }}
        >
          {/* Thread list */}
          <div
            className={cn(
              "border-r border-border overflow-y-auto shrink-0",
              activeThread ? "hidden sm:block w-80" : "w-full sm:w-80"
            )}
          >
            {threads.map((t) => {
              const isActive = activeThread?._id === t._id
              const lastMsg = t.messages[t.messages.length - 1]
              return (
                <button
                  key={t._id}
                  onClick={() => setActiveThread(t)}
                  className={cn(
                    "w-full text-left px-4 py-3 border-b border-border transition-colors space-y-1",
                    isActive ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted"
                  )}
                >
                  <div className="flex items-start justify-between gap-1">
                    <p className="text-sm font-semibold text-foreground truncate">{t.subject}</p>
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0",
                        STATUS_CONFIG[t.status]?.color
                      )}
                    >
                      {STATUS_CONFIG[t.status]?.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {t.buyer_name}
                    {t.buyer_phone && (
                      <span className="ml-2 flex items-center gap-0.5">
                        <Phone className="h-2.5 w-2.5" />
                        {t.buyer_phone}
                      </span>
                    )}
                  </p>
                  {lastMsg && (
                    <p className="text-xs text-muted-foreground truncate">{lastMsg.content}</p>
                  )}
                  <p className="text-[10px] text-muted-foreground">{formatDate(t.updated_at)}</p>
                </button>
              )
            })}

            {/* Pagination within sidebar */}
            {totalPages > 1 && (
              <div className="p-3 flex items-center justify-center gap-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>
                <span className="text-xs text-muted-foreground">
                  {page}/{totalPages}
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

          {/* Thread panel */}
          {activeThread ? (
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="sm:hidden p-2 border-b border-border">
                <button
                  onClick={() => setActiveThread(null)}
                  className="text-xs text-primary font-medium"
                >
                  &larr; Back to messages
                </button>
              </div>
              <AdminThreadPanel
                key={activeThread._id}
                thread={activeThread}
                onUpdate={handleUpdate}
              />
            </div>
          ) : (
            <div className="flex-1 hidden sm:flex items-center justify-center">
              <div className="text-center space-y-2">
                <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground opacity-30" />
                <p className="text-sm text-muted-foreground">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
