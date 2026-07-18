"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Save } from "lucide-react"
import ProfileImageUpload from "@/components/account/profile-image-upload"
import DeleteAccountSection from "@/components/account/delete-account-section"

export default function BuyerProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
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
    setSaving(true)
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: phoneNumber, profile_picture: profilePicture }),
      })
      alert(res.ok ? "Profile updated successfully" : "Failed to update profile")
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      alert("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
      </div>

      <form onSubmit={handleSubmit} className="border border-border rounded-lg p-6 bg-card space-y-4">
        <div className="pb-4 border-b border-border">
          <ProfileImageUpload name={user?.username} value={profilePicture} onChange={setProfilePicture} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Username</label>
            <Input type="text" value={user?.username || ""} disabled className="text-xs bg-muted/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input type="email" value={user?.email || ""} disabled className="text-xs bg-muted/50" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Phone Number</label>
          <Input
            type="tel"
            placeholder="+91 98765 43210"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="text-xs"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" className="text-sm h-9" disabled={saving || loading}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      <DeleteAccountSection />
    </div>
  )
}
