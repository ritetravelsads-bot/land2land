"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const CONFIRM_WORD = "DELETE"

/**
 * Self-service account deletion UI.
 *
 * Required by Apple App Store Guideline 5.1.1(v) and Google Play for any app
 * that supports account creation. Renders a clearly labelled destructive
 * action with a typed confirmation to prevent accidental deletion.
 */
export default function DeleteAccountSection() {
  const router = useRouter()
  const [confirmText, setConfirmText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    if (confirmText.trim().toUpperCase() !== CONFIRM_WORD) return

    setDeleting(true)
    try {
      const res = await fetch("/api/auth/delete-account", {
        method: "POST",
        credentials: "include",
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete account")
      }

      toast.success("Account deleted", {
        description: "Your account and associated data have been permanently removed.",
      })

      // Fully reset client state and send the user to the home page.
      setOpen(false)
      setTimeout(() => {
        window.location.href = "/"
      }, 800)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again."
      toast.error("Could not delete account", { description: message })
      setDeleting(false)
    }
  }

  return (
    <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-6">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-5 w-5 text-destructive" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground">Delete Account</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Permanently delete your account and all associated data, including your profile, listings, and
            support requests. This action cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-4 pl-12">
        <AlertDialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setConfirmText("") }}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="h-9 text-sm">
              Delete My Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete your account permanently?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account and remove your personal data from our servers.
                This cannot be reversed. Type <span className="font-semibold text-foreground">{CONFIRM_WORD}</span>{" "}
                below to confirm.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-2 py-2">
              <Label htmlFor="delete-confirm" className="text-sm">
                Confirmation
              </Label>
              <Input
                id="delete-confirm"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={`Type ${CONFIRM_WORD} to confirm`}
                autoComplete="off"
              />
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault()
                  handleDelete()
                }}
                disabled={deleting || confirmText.trim().toUpperCase() !== CONFIRM_WORD}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {deleting ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
