"use client"

import { useState, useEffect, useCallback } from "react"
import { ComboSelect } from "@/components/ui/combo-select"
import { Link2, ShieldCheck } from "lucide-react"
import DocumentUploadField from "./document-upload-field"
import { LAND_DOCUMENT_TYPES, type LandDocumentFile, type LandDocumentKey } from "@/lib/models"

// Generate slug from text
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

interface Option {
  _id: string
  name: string
  [key: string]: any
}

export default function PropertyFormStep1({ formData, onChange }: any) {
  const [developers, setDevelopers] = useState<Option[]>([])
  const [loadingDevelopers, setLoadingDevelopers] = useState(false)
  const [currentUser, setCurrentUser] = useState<{ username?: string; user_type?: string } | null>(null)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!formData.slug)
  // Raw text for the Key Highlights textarea so spaces aren't stripped while typing
  const [highlightsText, setHighlightsText] = useState<string>(
    Array.isArray(formData.project_highlights) ? formData.project_highlights.join("\n") : "",
  )

  // Handle property name change - auto-generate slug if not manually edited
  const handlePropertyNameChange = useCallback(
    (value: string) => {
      onChange("property_name", value)
      if (!slugManuallyEdited) {
        onChange("slug", generateSlug(value))
      }
    },
    [onChange, slugManuallyEdited]
  )

  const handleSlugChange = useCallback(
    (value: string) => {
      setSlugManuallyEdited(true)
      onChange("slug", generateSlug(value))
    },
    [onChange]
  )

  useEffect(() => {
    const loadDevelopers = async () => {
      setLoadingDevelopers(true)
      try {
        const res = await fetch("/api/admin/developers")
        const data = await res.json()
        setDevelopers(data)
      } catch (error) {
        console.error("Error loading developers:", error)
      } finally {
        setLoadingDevelopers(false)
      }
    }
    loadDevelopers()
  }, [])

  // Load the logged-in user so agents see their own name as the Seller / Agent
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { cache: "no-store", credentials: "include" })
        const data = await res.json()
        if (data?.user) {
          setCurrentUser(data.user)
          // For agents creating a new listing, default the seller/agent to themselves
          if (data.user.user_type === "agent" && data.user.username && !formData.developer_name) {
            onChange("developer_name", data.user.username)
          }
        }
      } catch (error) {
        console.error("Error loading current user:", error)
      }
    }
    loadCurrentUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddDeveloper = async (name: string): Promise<Option | null> => {
    try {
      const res = await fetch("/api/admin/developers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        const newDeveloper = await res.json()
        setDevelopers((prev) => [...prev, newDeveloper].sort((a, b) => a.name.localeCompare(b.name)))
        return newDeveloper
      }
    } catch (error) {
      console.error("Error adding developer:", error)
    }
    return null
  }

  const handleDeveloperChange = (value: string | string[]) => {
    const selectedName = Array.isArray(value) ? value[0] : value
    const selectedDeveloper = developers.find((d) => d.name === selectedName)
    onChange("developer_id", selectedDeveloper?._id || "")
    onChange("developer_name", selectedName || "")
  }

  const selectedDeveloperName =
    developers.find((d) => d._id === formData.developer_id)?.name ||
    formData.developer_name ||
    ""

  // Land documents (Fard / Intkal / Girdawari) uploaded for verification
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

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold mb-1">Land Details</h3>
        <p className="text-sm text-muted-foreground">Basic information about the land being listed</p>
      </div>

      {/* Listing type + Land category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Listing Type</label>
          <select
            value={formData.listing_type || "sale"}
            onChange={(e) => onChange("listing_type", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="sale">For Sale</option>
            <option value="resale">Resale</option>
            <option value="lease">For Lease</option>
            <option value="auction">Auction</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Land Category</label>
          <select
            value={formData.property_category || "agricultural"}
            onChange={(e) => {
              onChange("property_category", e.target.value)
              onChange("property_type", e.target.value)
            }}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="agricultural">Agricultural Land</option>
            <option value="residential_plot">Residential Land</option>
            <option value="commercial_plot">Commercial Land</option>
            <option value="industrial">Industrial Land</option>
            <option value="farmland">Farmland</option>
            <option value="vacant">Vacant / Other Land</option>
            <option value="abadi_land">Abadi Land</option>
          </select>
        </div>
      </div>

      {/* Listing title */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Listing Title *</label>
        <input
          type="text"
          value={formData.property_name}
          onChange={(e) => handlePropertyNameChange(e.target.value)}
          placeholder="e.g., 2 Acre Agricultural Land near NH-48, Alwar"
          required
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-1">Be clear and descriptive — buyers read this first</p>
      </div>

      {/* URL Slug */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
          <span className="flex items-center gap-1.5">
            <Link2 className="h-3 w-3" />
            URL Slug
          </span>
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">/properties/</span>
            <input
              type="text"
              value={formData.slug || ""}
              onChange={(e) => handleSlugChange(e.target.value)}
              placeholder="auto-generated-from-title"
              className="w-full pl-[85px] pr-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          {slugManuallyEdited && (
            <button
              type="button"
              onClick={() => {
                setSlugManuallyEdited(false)
                onChange("slug", generateSlug(formData.property_name || ""))
              }}
              className="px-3 py-2 text-xs font-medium text-primary hover:text-primary/80 border border-border rounded-md hover:bg-muted transition-colors"
            >
              Reset
            </button>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {slugManuallyEdited
            ? "Custom URL. Click Reset to auto-generate from title."
            : "Auto-generated from title. Edit to customize."}
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">About the Land</label>
        <textarea
          value={formData.about_project || ""}
          onChange={(e) => onChange("about_project", e.target.value)}
          placeholder="Describe the land — its history, surrounding area, soil quality, water sources, accessibility, and why it is a good buy..."
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring resize-none h-28"
        />
      </div>

      {/* Seller / Agent + Ownership */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentUser?.user_type === "agent" ? (
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">Seller / Agent</label>
            <input
              type="text"
              value={formData.developer_name || currentUser.username || ""}
              readOnly
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-muted/50 text-muted-foreground cursor-not-allowed focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">Listed under your account</p>
          </div>
        ) : (
          <ComboSelect
            label="Seller / Agent"
            value={selectedDeveloperName}
            onChange={handleDeveloperChange}
            options={developers}
            onAddNew={handleAddDeveloper}
            placeholder="Select or add seller / agent..."
            loading={loadingDevelopers}
          />
        )}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Ownership Type</label>
          <select
            value={formData.ownership_type || "freehold"}
            onChange={(e) => onChange("ownership_type", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="freehold">Freehold</option>
            <option value="cooperative">Co-operative Society</option>
            <option value="power_of_attorney">Power of Attorney</option>
          </select>
        </div>
      </div>

      {/* Soil type + Zoning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Soil Type</label>
          <select
            value={formData.soil_type || ""}
            onChange={(e) => onChange("soil_type", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Not specified</option>
            <option value="alluvial">Alluvial (Khadar / Bangar)</option>
            <option value="black_cotton">Black Cotton (Regur)</option>
            <option value="red_laterite">Red &amp; Laterite</option>
            <option value="arid_desert">Arid / Desert</option>
            <option value="loamy">Loamy</option>
            <option value="sandy">Sandy</option>
            <option value="clayey">Clayey</option>
            <option value="rocky">Rocky / Stony</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Land Zoning / Use</label>
          <select
            value={formData.zoning || ""}
            onChange={(e) => onChange("zoning", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Not specified</option>
            <option value="agricultural">Agricultural</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
            <option value="mixed_use">Mixed Use</option>
            <option value="green_belt">Green Belt</option>
            <option value="forest">Forest / Reserved</option>
          </select>
        </div>
      </div>

      {/* Land Facing + Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Land Facing</label>
          <select
            value={formData.facing || ""}
            onChange={(e) => onChange("facing", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Not specified</option>
            <option value="north">North</option>
            <option value="south">South</option>
            <option value="east">East</option>
            <option value="west">West</option>
            <option value="north_east">North-East</option>
            <option value="north_west">North-West</option>
            <option value="south_east">South-East</option>
            <option value="south_west">South-West</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Listing Status</label>
          <select
            value={formData.status}
            onChange={(e) => onChange("status", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="sold">Sold</option>
          </select>
        </div>
      </div>

      {/* Title clear + Loan available */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { key: "title_clear", label: "Title Clear (No Dispute)" },
          { key: "loan_available", label: "Bank Loan Available" },
        ].map((feature) => (
          <label
            key={feature.key}
            className="flex items-center gap-2 text-sm border border-border rounded-md px-3 py-2.5 bg-input cursor-pointer"
          >
            <input
              type="checkbox"
              checked={!!formData[feature.key]}
              onChange={(e) => onChange(feature.key, e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
            />
            <span>{feature.label}</span>
          </label>
        ))}
      </div>

      {/* Key Highlights */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">
          Key Highlights (one per line or comma-separated)
        </label>
        <textarea
          value={highlightsText}
          onChange={(e) => {
            const raw = e.target.value
            setHighlightsText(raw)
            const items = raw
              .split(/[\n,]/)
              .map((item: string) => item.trim())
              .filter((item: string) => item)
            onChange("project_highlights", items)
          }}
          placeholder={"Fertile black soil land, Nearest highway 2 km\nYear-round water (borewell + canal)\nClear title, registry ready\nGood road access from main village"}
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring resize-none h-28"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Separate highlights with a new line or a comma — each becomes a bullet point on the listing page
        </p>
      </div>

      {/* Land Documents */}
      <div className="border-t border-border pt-5 space-y-4">
        <div>
          <h3 className="text-base font-semibold">Land Documents</h3>
          <p className="text-sm text-muted-foreground">
            Enter your Khasra number and upload photos or PDF scans of your land papers. Our team checks these before
            your land goes live.
          </p>
        </div>

        {/* Khasra number — text input */}
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Khasra Number</label>
          <input
            type="text"
            value={formData.khasra_number || ""}
            onChange={(e) => onChange("khasra_number", e.target.value)}
            placeholder="e.g., 123/4"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">खसरा — plot / field record number</p>
        </div>

        {/* Reassurance / help note */}
        <div className="flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
          <ShieldCheck className="h-5 w-5 flex-shrink-0 text-primary" />
          <div className="text-sm text-foreground">
            <p className="font-medium">Your documents are safe.</p>
            <p className="text-muted-foreground mt-0.5">
              They are used only to verify ownership. You can add whatever papers you have now and upload the rest
              later. Adding more documents means faster approval.
            </p>
          </div>
        </div>

        {/* Document uploads: Fard / Intkal / Girdawari */}
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
      </div>
    </div>
  )
}
