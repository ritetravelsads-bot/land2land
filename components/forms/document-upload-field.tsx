"use client"

import { useRef, useState } from "react"
import { FileText, Upload, Eye, RefreshCw, Trash2, Loader2, CheckCircle2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { LandDocumentFile } from "@/lib/models"

const ACCEPTED = "image/jpeg,image/png,image/webp,application/pdf"
const MAX_MB = 10

export default function DocumentUploadField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string
  hint: string
  value?: LandDocumentFile
  onChange: (doc: LandDocumentFile | undefined) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isImage = value?.type?.startsWith("image/")
  const isPdf = value?.type === "application/pdf"

  const handleFile = async (file: File) => {
    setError(null)

    if (!ACCEPTED.split(",").includes(file.type)) {
      setError("Please upload a JPG, PNG, or PDF file.")
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${MAX_MB} MB.`)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "documents")

      const res = await fetch("/api/upload", { method: "POST", body: formData })
      const data = await res.json()

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Upload failed")
      }

      onChange({
        url: data.url,
        name: data.name || file.name,
        type: file.type,
        size: file.size,
        uploaded_at: new Date().toISOString(),
      })
    } catch (err) {
      setError("Could not upload the file. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
    // reset so selecting the same file again re-triggers change
    e.target.value = ""
  }

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{label}</span>
            {value && <CheckCircle2 className="h-4 w-4 text-green-600" aria-label="Uploaded" />}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{hint}</p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        onChange={onInputChange}
        className="sr-only"
        aria-label={`Upload ${label} document`}
      />

      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 px-4 py-6 text-center transition-colors hover:border-primary/60 hover:bg-muted disabled:opacity-60"
        >
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Uploading...</span>
            </>
          ) : (
            <>
              <Upload className="h-6 w-6 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Tap to upload</span>
              <span className="text-xs text-muted-foreground">Photo or PDF, up to {MAX_MB} MB</span>
            </>
          )}
        </button>
      ) : (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-background">
            {isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={value.url || "/placeholder.svg"} alt={`${label} preview`} className="h-full w-full object-cover" />
            ) : isPdf ? (
              <FileText className="h-7 w-7 text-primary" />
            ) : (
              <ImageIcon className="h-7 w-7 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{value.name}</p>
            <p className="text-xs text-muted-foreground">{isPdf ? "PDF document" : "Image"} uploaded</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              asChild
              title="Preview"
            >
              <a href={value.url} target="_blank" rel="noopener noreferrer" aria-label={`Preview ${label}`}>
                <Eye className="h-4 w-4" />
              </a>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              title="Replace"
              aria-label={`Replace ${label}`}
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onChange(undefined)}
              title="Remove"
              aria-label={`Remove ${label}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}
