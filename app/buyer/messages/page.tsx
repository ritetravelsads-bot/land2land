"use client"

import { useEffect, useState, useRef } from "react"
import {
  MessageSquare,
  Plus,
  Loader2,
  Send,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
  buyer_name: string
  property_name?: string
  property_slug?: string
  status: "open" | "closed" | "replied"
  messages: MessageEntry[]
  created_at: string
  updated_at: string
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
    icon: CheckCircle2,
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
  return new Date(d).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

// ---- Compose Dialog -------------------------------------------------------

function ComposeDialog({
  onClose,
  onCreated,
}: {
  onClose: () => void
  onCreated: (thread: Thread) => void
}) {
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/buyer/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to send")
      onCreated(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-foreground text-lg">New Message</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Inquiry about farmland in Haryana"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={5}
              required
            />
          </div>
          <div className="flex gap-2 justify-end pt-1">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading || !subject.trim() || !message.trim()}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ---- Thread Panel ---------------------------------------------------------

function ThreadPanel({
  thread,
  onReply,
}: {
  thread: Thread
  onReply: (threadId: string, content: string) => Promise<void>
}) {
  const [reply, setReply] = useState("")
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [thread.messages])

  const handleSend = async () => {
    if (!reply.trim()) return
    setSending(true)
    setError("")
    try {
      await onReply(thread._id, reply)
      setReply("")
    } catch {
      setError("Failed to send reply. Please try again.")
    } finally {
      setSending(false)
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
      <div className="p-4 border-b border-border space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground text-sm leading-snug">{thread.subject}</h3>
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
        {thread.property_name && (
          <p className="text-xs text-muted-foreground">Re: {thread.property_name}</p>
        )}
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Started {formatDate(thread.created_at)}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {thread.messages.map((msg) => {
          const isBuyer = msg.sender === "buyer"
          return (
            <div key={msg.id} className={cn("flex", isBuyer ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[80%] space-y-1", isBuyer ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    isBuyer
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  )}
                >
                  {msg.content}
                </div>
                <p className="text-[10px] text-muted-foreground px-1">
                  {isBuyer ? "You" : msg.sender_name} · {formatTime(msg.created_at)}
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
          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}
          <div className="flex gap-2 items-end">
            <Textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a reply... (Ctrl+Enter to send)"
              rows={2}
              className="resize-none text-sm"
            />
            <Button
              size="icon"
              className="h-[4.5rem] w-10 shrink-0"
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

// ---- Main Page ------------------------------------------------------------

export default function MessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [activeThread, setActiveThread] = useState<Thread | null>(null)
  const [showCompose, setShowCompose] = useState(false)

  const fetchThreads = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/buyer/messages")
      if (!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      const list: Thread[] = data.threads || []
      setThreads(list)
      // Keep the active thread in sync
      if (activeThread) {
        const updated = list.find((t) => t._id === activeThread._id)
        if (updated) setActiveThread(updated)
      }
    } catch {
      setError("Could not load messages. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchThreads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreated = (thread: Thread) => {
    setThreads((prev) => [thread, ...prev])
    setActiveThread(thread)
    setShowCompose(false)
  }

  const handleReply = async (threadId: string, content: string) => {
    const res = await fetch(`/api/buyer/messages/${threadId}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: content }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || "Failed to reply")

    // Optimistically add the message
    const addedMsg: MessageEntry = data.message
    setThreads((prev) =>
      prev.map((t) =>
        t._id === threadId
          ? { ...t, messages: [...t.messages, addedMsg], updated_at: new Date().toISOString() }
          : t
      )
    )
    setActiveThread((prev) =>
      prev?._id === threadId
        ? { ...prev, messages: [...prev.messages, addedMsg], updated_at: new Date().toISOString() }
        : prev
    )
  }

  return (
    <>
      {showCompose && (
        <ComposeDialog
          onClose={() => setShowCompose(false)}
          onCreated={handleCreated}
        />
      )}

      <div className="max-w-6xl mx-auto space-y-4">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">
              Communicate directly with the Land2Land team about your inquiries.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchThreads}>
              <RefreshCw className="h-3.5 w-3.5 mr-2" />
              Refresh
            </Button>
            <Button size="sm" onClick={() => setShowCompose(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        </div>

        {/* Two-panel layout */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="border border-destructive/20 bg-destructive/5 rounded-xl p-6 text-center">
            <p className="text-sm text-destructive mb-3">{error}</p>
            <Button variant="outline" size="sm" onClick={fetchThreads}>
              Try Again
            </Button>
          </div>
        ) : threads.length === 0 ? (
          <div className="border border-border rounded-xl p-12 bg-card text-center">
            <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="font-semibold text-foreground mb-1">No conversations yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Start a new message to communicate with our team.
            </p>
            <Button size="sm" onClick={() => setShowCompose(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Message
            </Button>
          </div>
        ) : (
          <div className="border border-border rounded-xl overflow-hidden bg-card flex" style={{ height: "calc(100vh - 14rem)" }}>
            {/* Thread List */}
            <div
              className={cn(
                "border-r border-border overflow-y-auto shrink-0",
                activeThread ? "hidden sm:block w-72" : "w-full sm:w-72"
              )}
            >
              {threads.map((t) => {
                const isActive = activeThread?._id === t._id
                const lastMsg = t.messages[t.messages.length - 1]
                const hasAdminReply = t.messages.some((m) => m.sender === "admin")
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
                      <p className="text-sm font-semibold text-foreground truncate leading-snug">
                        {t.subject}
                      </p>
                      {hasAdminReply && !isActive && (
                        <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                      )}
                    </div>
                    {lastMsg && (
                      <p className="text-xs text-muted-foreground truncate">{lastMsg.content}</p>
                    )}
                    <p className="text-[10px] text-muted-foreground">{formatDate(t.updated_at)}</p>
                  </button>
                )
              })}
            </div>

            {/* Thread View */}
            {activeThread ? (
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Mobile back button */}
                <div className="sm:hidden p-2 border-b border-border">
                  <button
                    onClick={() => setActiveThread(null)}
                    className="text-xs text-primary font-medium flex items-center gap-1"
                  >
                    &larr; Back to messages
                  </button>
                </div>
                <ThreadPanel
                  key={activeThread._id}
                  thread={activeThread}
                  onReply={handleReply}
                />
              </div>
            ) : (
              <div className="flex-1 hidden sm:flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <MessageSquare className="h-8 w-8 mx-auto opacity-30" />
                  <p className="text-sm">Select a conversation</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}
