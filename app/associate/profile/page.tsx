"use client"

import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"
import ProfileImageUpload from "@/components/account/profile-image-upload"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export default function AssociateProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    phone_number: "",
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me")
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          setFormData({
            phone_number: data.user.phone_number || "",
          })
        }
      } catch (error) {
        console.error("[v0] Error fetching user:", error)
        toast.error("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setUser({ ...user, ...formData })
        toast.success("Profile updated successfully")
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to update profile")
      }
    } catch (error) {
      console.error("[v0] Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
  }

  if (!user) {
    return <div className="text-center py-12">Failed to load profile</div>
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-8">Associate Profile</h1>

      <div className="bg-card border border-border rounded-lg p-6 space-y-6">
        {/* Profile Image */}
        <div>
          <label className="text-sm font-medium text-foreground">Profile Photo</label>
          <ProfileImageUpload 
            name={user.username}
            value={user.profile_picture}
            onChange={(url: string | null) => {
              if (url) {
                setFormData({ ...formData })
              }
            }}
          />
        </div>

        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Username</label>
            <p className="text-foreground mt-1">{user.username}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Email</label>
            <p className="text-foreground mt-1">{user.email}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">User Type</label>
            <p className="text-foreground mt-1 capitalize">{user.user_type}</p>
          </div>
          <div>
            <label htmlFor="phone" className="text-xs font-medium text-foreground">Phone Number</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-foreground bg-background"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => {
              setFormData({ phone_number: user.phone_number || "" })
            }}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  )
}
