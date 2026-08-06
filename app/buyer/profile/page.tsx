"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save, User, Phone, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import ProfileImageUpload from "@/components/account/profile-image-upload"
import DeleteAccountSection from "@/components/account/delete-account-section"

type FeedbackState = { type: "success" | "error"; message: string } | null

export default function BuyerProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackState>(null)

  const [displayName, setDisplayName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profilePicture, setProfilePicture] = useState<string | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store", credentials: "include" })
        const data = await res.json()
        const u = data.user
        if (u) {
          setUser(u)
          setDisplayName(u.display_name || u.username || "")
          setPhoneNumber(u.phone_number || "")
          setProfilePicture(u.profile_picture || null)
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedback(null)
    setSaving(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          display_name: displayName,
          phone_number: phoneNumber,
          profile_picture: profilePicture,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setFeedback({ type: "success", message: "Profile updated successfully." })
        setUser((prev: any) => ({ ...prev, display_name: displayName, phone_number: phoneNumber, profile_picture: profilePicture }))
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to update profile." })
      }
    } catch {
      setFeedback({ type: "error", message: "Network error. Please try again." })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="border border-border rounded-lg bg-card overflow-hidden">
        {/* Avatar section */}
        <div className="p-6 border-b border-border">
          <ProfileImageUpload name={user?.display_name || user?.username} value={profilePicture} onChange={setProfilePicture} />
        </div>

        {/* Fields */}
        <div className="p-6 space-y-5">
          {/* Feedback banner */}
          {feedback && (
            <div
              className={`flex items-start gap-2.5 rounded-lg px-4 py-3 text-sm border ${
                feedback.type === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300"
                  : "bg-destructive/10 border-destructive/20 text-destructive"
              }`}
            >
              {feedback.type === "success" ? (
                <CheckCircle className="h-4 w-4 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* Display Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Full Name
            </label>
            <Input
              type="text"
              placeholder="Enter your full name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              minLength={2}
              maxLength={80}
              required
            />
            <p className="text-xs text-muted-foreground">This is the name shown across the platform.</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Phone Number
            </label>
            <Input
              type="tel"
              placeholder="10-digit mobile number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="[6-9][0-9]{9}"
              title="Please enter a valid 10-digit Indian mobile number"
            />
            <p className="text-xs text-muted-foreground">Used for enquiry callbacks and account verification.</p>
          </div>

          {/* Read-only fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Username</label>
              <Input value={user?.username || ""} disabled className="bg-muted/50 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Cannot be changed.</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input value={user?.email?.startsWith("buyer_") ? "—" : (user?.email || "")} disabled className="bg-muted/50 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Contact support to update.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            Account type:{" "}
            <span className="font-medium capitalize text-foreground">{user?.user_type || "buyer"}</span>
          </p>
          <Button type="submit" disabled={saving || loading} className="min-w-28">
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      <DeleteAccountSection />
    </div>
  )
}
