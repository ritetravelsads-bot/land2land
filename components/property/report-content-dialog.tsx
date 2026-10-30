"use client"

import { useState } from "react"
import { Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const REASONS = [
  { value: "fraud", label: "Fraud or scam" },
  { value: "inaccurate", label: "Inaccurate or misleading details" },
  { value: "spam", label: "Spam" },
  { value: "offensive", label: "Offensive or inappropriate content" },
  { value: "duplicate", label: "Duplicate listing" },
  { value: "other", label: "Something else" },
]

interface ReportContentDialogProps {
  targetType: "property" | "user" | "review"
  targetId: string
  label?: string
}

export function ReportContentDialog({ targetType, targetId, label = "listing" }: ReportContentDialogProps) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const reset = () => {
    setReason("")
    setDetails("")
    setStatus("idle")
  }

  const submit = async () => {
    if (!reason) return
    setStatus("sending")
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ targetType, targetId, reason, details }),
      })
      setStatus(res.ok ? "sent" : "error")
    } catch {
      setStatus("error")
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={`Report this ${label}`}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Flag className="h-4 w-4" aria-hidden="true" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {status === "sent" ? (
          <>
            <DialogHeader>
              <DialogTitle>Thanks for reporting</DialogTitle>
              <DialogDescription>
                Our team reviews every report within 24 hours and removes content that breaks our policies.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Report this {label}</DialogTitle>
              <DialogDescription>Tell us what is wrong. Reports are confidential.</DialogDescription>
            </DialogHeader>
            <RadioGroup value={reason} onValueChange={setReason} className="flex flex-col gap-3">
              {REASONS.map((r) => (
                <div key={r.value} className="flex items-center gap-2">
                  <RadioGroupItem value={r.value} id={`report-${r.value}`} />
                  <Label htmlFor={`report-${r.value}`} className="font-normal">
                    {r.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            <div className="flex flex-col gap-2">
              <Label htmlFor="report-details">Details (optional)</Label>
              <Textarea
                id="report-details"
                value={details}
                maxLength={1000}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Add anything that helps us review this faster"
              />
            </div>
            {status === "error" && (
              <p className="text-sm text-destructive" role="alert">
                Could not send your report. Please try again.
              </p>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submit} disabled={!reason || status === "sending"}>
                {status === "sending" ? "Sending..." : "Submit report"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
