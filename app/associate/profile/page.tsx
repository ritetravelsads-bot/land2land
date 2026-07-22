"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Mail, Phone, User, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import ProfileImageUpload from "@/components/account/profile-image-upload"
import DeleteAccountSection from "@/components/account/delete-account-section"

type FeedbackState = { type: "success" | "error"; message: string } | null

export default function AssociateProfilePage() {
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
        console.error("[v0] Error loading user:", error)
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
        setUser((prev: any) => ({
          ...prev,
          display_name: displayName,
          phone_number: phoneNumber,
          profile_picture: profilePicture,
        }))
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
      <div className="space-y-6 max-w-2xl">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-64 bg-muted animate-pulse rounded-lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Associate Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile information</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Avatar + identity header */}
        <div className="p-6 border-b border-border flex items-center gap-4">
          <ProfileImageUpload
            name={user?.display_name || user?.username}
            value={profilePicture}
            onChange={setProfilePicture}
          />
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {user?.display_name || user?.username}
            </h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary mt-1 capitalize">
              {user?.user_type}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
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

          {/* Full Name */}
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
            <p className="text-xs text-muted-foreground">Shown to buyers on your listings and profile.</p>
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
            <p className="text-xs text-muted-foreground">Buyers may use this to contact you directly.</p>
          </div>

          {/* Read-only: email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              Email
            </label>
            <Input
              type="email"
              value={user?.email || ""}
              disabled
              className="bg-muted/50 text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">Contact support to change your email address.</p>
          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              Username: <span className="font-medium text-foreground">{user?.username}</span>
            </p>
            <Button type="submit" disabled={saving} className="min-w-32">
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
      </div>

      <DeleteAccountSection />
    </div>
  )
}
