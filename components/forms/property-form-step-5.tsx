"use client"

import { ShieldCheck, Info } from "lucide-react"
import DocumentUploadField from "./document-upload-field"
import { LAND_DOCUMENT_TYPES, type LandDocumentFile, type LandDocumentKey } from "@/lib/models"

export default function PropertyFormStep5({
  formData,
  onChange,
}: {
  formData: any
  onChange: (field: string, value: any) => void
}) {
  const documents: Partial<Record<LandDocumentKey, LandDocumentFile>> = formData.documents || {}

  const setDocument = (key: LandDocumentKey, doc: LandDocumentFile | undefined) => {
    const next = { ...documents }
    if (doc) {
      next[key] = doc
    } else {
      delete next[key]
    }
    onChange("documents", next)
  }

  const uploadedCount = LAND_DOCUMENT_TYPES.filter((d) => documents[d.key]).length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Land Documents</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload photos or PDF scans of your land papers. Our team checks these before your land goes live.
        </p>
      </div>

      {/* Reassurance / help note */}
      <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <ShieldCheck className="h-5 w-5 flex-shrink-0 text-primary" />
        <div className="text-sm text-foreground">
          <p className="font-medium">Your documents are safe.</p>
          <p className="text-muted-foreground mt-0.5">
            They are used only to verify ownership. You can add whatever papers you have now and upload the rest later.
            Add more documents means faster approval.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {LAND_DOCUMENT_TYPES.map((doc) => (
          <DocumentUploadField
            key={doc.key}
            label={doc.label}
            hint={doc.hint}
            value={documents[doc.key]}
            onChange={(file) => setDocument(doc.key, file)}
          />
        ))}
      </div>

      {/* Progress hint */}
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        <Info className="h-4 w-4 flex-shrink-0" />
        <span>
          {uploadedCount} of {LAND_DOCUMENT_TYPES.length} documents added.
          {uploadedCount < LAND_DOCUMENT_TYPES.length
            ? " You can still submit and add the rest later."
            : " All documents added — great!"}
        </span>
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
