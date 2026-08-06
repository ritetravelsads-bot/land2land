"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Camera, Loader2, Trash2 } from "lucide-react"
import { UserAvatar } from "@/components/ui/user-avatar"

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"]
const MAX_MB = 5

interface ProfileImageUploadProps {
  name?: string | null
  value?: string | null
  onChange: (url: string | null) => void
  disabled?: boolean
}

/**
 * Circular profile-photo picker. Uploads to /api/upload (ImageKit, "avatars"
 * folder) and reports the resulting URL back through onChange. Shows the current
 * photo (or initials), an upload/change button and a remove button.
 */
export default function ProfileImageUpload({ name, value, onChange, disabled }: ProfileImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    setError(null)

    if (!ACCEPTED.includes(file.type)) {
      setError("Please choose a JPG, PNG, or WebP image.")
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`Image is too large. Maximum size is ${MAX_MB} MB.`)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "avatars")

      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed")
      }
      onChange(data.url)
    } catch (err) {
      setError("Could not upload the image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    e.target.value = ""
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <UserAvatar
          name={name}
          src={value}
          className="h-20 w-20 border border-border"
          textClassName="text-2xl"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled || uploading}
          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:opacity-60"
          aria-label="Upload profile photo"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled || uploading}
            className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
          >
            {uploading ? "Uploading..." : value ? "Change photo" : "Upload photo"}
          </button>
          {value && !uploading && (
            <button
              type="button"
              onClick={() => onChange(null)}
              disabled={disabled}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground">JPG, PNG or WebP, up to {MAX_MB} MB.</p>
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        onChange={onInputChange}
        className="sr-only"
        aria-label="Profile photo file input"
      />
    </div>
  )
}
