"use client"

import type React from "react"
import { useState } from "react"
import { Upload, X, ImageIcon, CheckCircle2, AlertCircle, Loader2, FileImage } from "lucide-react"
import { cn } from "@/lib/utils"

interface UploadedImage {
  url: string
  name: string
  thumbnailUrl?: string
  size?: number
}

export default function PropertyFormStep4({ formData, onChange }: any) {
  const [uploading, setUploading] = useState<Record<string, boolean>>({})
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({})
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({})

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    isMultiple = false
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading((prev) => ({ ...prev, [fieldName]: true }))
    setUploadErrors((prev) => ({ ...prev, [fieldName]: "" }))

    try {
      const uploadedImages: UploadedImage[] = []
      const totalFiles = files.length

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        setUploadProgress((prev) => ({
          ...prev,
          [fieldName]: Math.round(((i + 0.5) / totalFiles) * 100),
        }))

        const uploadFormData = new FormData()
        uploadFormData.append("file", file)
        uploadFormData.append("folder", "properties")

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.error || "Upload failed")
        }

        const data = await response.json()

        uploadedImages.push({
          url: data.url,
          name: data.name || file.name,
          thumbnailUrl: data.thumbnailUrl,
          size: data.size || file.size,
        })

        setUploadProgress((prev) => ({
          ...prev,
          [fieldName]: Math.round(((i + 1) / totalFiles) * 100),
        }))
      }

      if (isMultiple) {
        let rawExisting = formData[fieldName]
        let existingUrls: string[] = []
        if (Array.isArray(rawExisting)) {
          existingUrls = rawExisting
        } else if (typeof rawExisting === "string" && rawExisting.startsWith("[")) {
          try {
            existingUrls = JSON.parse(rawExisting)
          } catch {
            existingUrls = []
          }
        } else if (typeof rawExisting === "string" && rawExisting.length > 0) {
          existingUrls = [rawExisting]
        }

        const newUrls = uploadedImages.map((img) => img.url)
        onChange(fieldName, [...existingUrls, ...newUrls])

        const existingMeta = formData[`${fieldName}_meta`] || []
        onChange(`${fieldName}_meta`, [...existingMeta, ...uploadedImages])
      } else {
        onChange(fieldName, uploadedImages[0]?.url || "")
        onChange(`${fieldName}_meta`, uploadedImages[0] || null)
      }
    } catch (error) {
      setUploadErrors((prev) => ({
        ...prev,
        [fieldName]: error instanceof Error ? error.message : "Upload failed",
      }))
    } finally {
      setUploading((prev) => ({ ...prev, [fieldName]: false }))
      setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }))
      e.target.value = ""
    }
  }

  const removeImage = (fieldName: string, index?: number) => {
    if (index !== undefined) {
      let rawUrls = formData[fieldName]
      let urls: string[] = []
      if (Array.isArray(rawUrls)) {
        urls = [...rawUrls]
      } else if (typeof rawUrls === "string" && rawUrls.startsWith("[")) {
        try {
          urls = JSON.parse(rawUrls)
        } catch {
          urls = []
        }
      }
      urls.splice(index, 1)
      onChange(fieldName, urls)
      const updatedMeta = [...(formData[`${fieldName}_meta`] || [])]
      updatedMeta.splice(index, 1)
      onChange(`${fieldName}_meta`, updatedMeta)
    } else {
      onChange(fieldName, "")
      onChange(`${fieldName}_meta`, null)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return ""
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getImageMeta = (fieldName: string, index?: number): UploadedImage | null => {
    if (index !== undefined) {
      return formData[`${fieldName}_meta`]?.[index] || null
    }
    return formData[`${fieldName}_meta`] || null
  }

  // Single image upload component
  const SingleImageUpload = ({
    fieldName,
    title,
    description,
    height = "h-48",
  }: {
    fieldName: string
    title: string
    description: string
    height?: string
  }) => {
    const imageUrl = formData[fieldName]
    const imageMeta = getImageMeta(fieldName)
    const isUploading = uploading[fieldName]
    const error = uploadErrors[fieldName]

    return (
      <div className="border border-border rounded-xl p-4 space-y-3 bg-card">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {imageUrl && (
            <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
              <CheckCircle2 className="h-3 w-3" />
              Uploaded
            </span>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {imageUrl ? (
          <div className="relative group">
            <div className={cn("relative overflow-hidden rounded-lg bg-muted", height)}>
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
              <button
                type="button"
                onClick={() => removeImage(fieldName)}
                className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {imageMeta && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <FileImage className="h-3.5 w-3.5" />
                <span className="truncate max-w-[200px]">{imageMeta.name}</span>
                {imageMeta.size && (
                  <span className="text-muted-foreground/60">({formatFileSize(imageMeta.size)})</span>
                )}
              </div>
            )}
          </div>
        ) : (
          <label
            className={cn(
              "flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
              isUploading ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary hover:bg-muted/50",
              height
            )}
          >
            <div className="flex flex-col items-center justify-center py-4">
              {isUploading ? (
                <>
                  <Loader2 className="w-8 h-8 mb-2 text-primary animate-spin" />
                  <p className="text-sm text-primary font-medium">Uploading...</p>
                  {uploadProgress[fieldName] > 0 && (
                    <div className="w-32 h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress[fieldName]}%` }}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, fieldName)}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        )}
      </div>
    )
  }

  // Multiple image upload component
  const MultipleImageUpload = ({
    fieldName,
    title,
    description,
  }: {
    fieldName: string
    title: string
    description: string
  }) => {
    let rawImages = formData[fieldName]
    let images: string[] = []
    if (Array.isArray(rawImages)) {
      images = rawImages
    } else if (typeof rawImages === "string" && rawImages.startsWith("[")) {
      try {
        images = JSON.parse(rawImages)
      } catch {
        images = []
      }
    } else if (typeof rawImages === "string" && rawImages.length > 0) {
      images = [rawImages]
    }

    const imagesMeta = formData[`${fieldName}_meta`] || []
    const isUploading = uploading[fieldName]
    const error = uploadErrors[fieldName]

    return (
      <div className="border border-border rounded-xl p-4 space-y-3 bg-card">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-sm">{title}</h4>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
          {images.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              {images.length} image{images.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((url: string, index: number) => {
            const meta = imagesMeta[index]
            return (
              <div key={`${fieldName}-${index}`} className="relative group">
                <div className="relative h-28 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={url}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                  <button
                    type="button"
                    onClick={() => removeImage(fieldName, index)}
                    className="absolute top-1.5 right-1.5 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                {meta && (
                  <p className="mt-1 text-[10px] text-muted-foreground truncate" title={meta.name}>
                    {meta.name}
                  </p>
                )}
              </div>
            )
          })}

          <label
            className={cn(
              "flex flex-col items-center justify-center h-28 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200",
              isUploading ? "border-primary/50 bg-primary/5" : "border-border hover:border-primary hover:bg-muted/50"
            )}
          >
            <div className="flex flex-col items-center justify-center">
              {isUploading ? (
                <>
                  <Loader2 className="w-6 h-6 mb-1 text-primary animate-spin" />
                  <p className="text-xs text-primary font-medium">{uploadProgress[fieldName]}%</p>
                </>
              ) : (
                <>
                  <ImageIcon className="w-6 h-6 mb-1 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Add Photos</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e, fieldName, true)}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Photos &amp; SEO</h3>
        <p className="text-sm text-muted-foreground">Upload land photos and set the page title for search engines</p>
      </div>

      {/* Main Thumbnail - Required */}
      <SingleImageUpload
        fieldName="main_thumbnail"
        title="Main Photo *"
        description="Primary photo shown in search results and listing cards"
        height="h-52"
      />

      {/* Gallery Images */}
      <MultipleImageUpload
        fieldName="multiple_images"
        title="Additional Photos"
        description="Upload more photos of the land — boundaries, soil, access road, water source, etc."
      />

      {/* SEO */}
      <div className="border border-border rounded-xl p-4 space-y-4 bg-card">
        <div>
          <h4 className="font-semibold text-sm">SEO Settings</h4>
          <p className="text-xs text-muted-foreground">Helps the listing appear in Google search results</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">
            Meta Title
            <span className="ml-1 text-muted-foreground/60 font-normal">(max 60 chars)</span>
          </label>
          <input
            type="text"
            value={formData.meta_title || ""}
            onChange={(e) => onChange("meta_title", e.target.value)}
            maxLength={60}
            placeholder="e.g., Agricultural Land for Sale in Alwar, Rajasthan"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {(formData.meta_title || "").length}/60 characters
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">
            Meta Description
            <span className="ml-1 text-muted-foreground/60 font-normal">(max 160 chars)</span>
          </label>
          <textarea
            value={formData.meta_description || ""}
            onChange={(e) => onChange("meta_description", e.target.value)}
            maxLength={160}
            placeholder="Short description shown under the page title in Google results"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring resize-none h-20"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {(formData.meta_description || "").length}/160 characters
          </p>
        </div>
      </div>

      {/* What happens next */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-semibold text-foreground">What happens after you submit?</h3>
        <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              1
            </span>
            Your land is sent to our team for review — it is not public yet.
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              2
            </span>
            We check your details and documents.
          </li>
          <li className="flex gap-2">
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              3
            </span>
            If approved, your land goes live. If something is missing, we tell you what to fix so you can resubmit.
          </li>
        </ol>
      </div>
    </div>
  )
}
