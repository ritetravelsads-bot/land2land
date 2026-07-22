"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import PropertyFormStep1 from "./property-form-step-1"
import PropertyFormStep2 from "./property-form-step-2"
import PropertyFormStep3 from "./property-form-step-3"
import PropertyFormStep4 from "./property-form-step-4"

export default function PropertyFormMultiStep({
  apiEndpoint = "/api/associate/properties",
  initialData,
  isEdit = false,
  onSubmit, // Declare the onSubmit variable here
}: {
  apiEndpoint?: string
  initialData?: any
  isEdit?: boolean
  onSubmit?: () => Promise<void> // Declare the type of onSubmit
}) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const defaultFormData = {
    property_name: "",
    slug: "",
    property_type: "agricultural",
    listing_type: "sale",
    property_category: "agricultural",
    lowest_price: "",
    max_price: "",
    area_sqft: "",
    // Land-specific fields
    area_value: "",
    area_unit: "bigha",
    road_width: "",
    road_access: false,
    water_available: false,
    electricity_available: false,
    boundary_wall: false,
    corner_plot: false,
    is_negotiable: false,
    // New land fields
    soil_type: "",
    zoning: "",
    survey_number: "",
    khasra_number: "",
    price_per_unit: "",
    water_level: "",
    highway_connectivity: "",
    nearest_town: "",
    title_clear: false,
    loan_available: false,
    ownership_type: "freehold",
    facing: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    status: "active",
    neighborhood: "",
    about_project: "",
    project_highlights: [] as string[],
    special_sections: [] as Array<{ id: string; title: string; subtitle: string; content: string; position: string }>,
    location_connectivity: [] as Array<{ type: string; name: string; distance: string }>,
    faqs: [] as Array<{ question: string; answer: string }>,
    amenities: [] as string[],
    facilities: [] as string[],
    luxury_amenities: [] as string[],
    units: [] as Array<{ type: string; size_range?: string; price_range?: string; available?: boolean; floor_plan_image?: string }>,
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    main_thumbnail: "",
    multiple_images: [] as string[],
    rera_registered: false,
    rera_id: "",
    rera_website_link: "",
    google_map_link: "",
    landmark: "",
    // Land documents for verification
    documents: {} as Record<string, any>,
  }
  
  // Helper function to ensure array fields are properly formatted
  const normalizeArrayField = (value: any): string[] => {
    if (Array.isArray(value)) {
      return value
    }
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : []
      } catch (e) {
        return []
      }
    }
    if (typeof value === 'string' && value.length > 0) {
      // Single URL stored as string
      return [value]
    }
    return []
  }
  
  // Merge initial data with defaults to ensure all fields exist
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      // Normalize array fields that might come from the database in unexpected formats
      const normalizedData = {
        ...defaultFormData,
        ...initialData,
        // Ensure slug is properly loaded
        slug: initialData.slug || "",
        // Ensure image arrays are properly formatted
        multiple_images: normalizeArrayField(initialData.multiple_images),
        floor_plans: normalizeArrayField(initialData.floor_plans),
        amenities: normalizeArrayField(initialData.amenities),
        facilities: normalizeArrayField(initialData.facilities),
        luxury_amenities: normalizeArrayField(initialData.luxury_amenities),
        project_highlights: normalizeArrayField(initialData.project_highlights),
        // Ensure SEO fields are properly loaded (handle both old and new field names)
        meta_title: initialData.meta_title || initialData.seo_title || "",
        meta_description: initialData.meta_description || "",
        meta_keywords: initialData.meta_keywords || "",
        // Preserve uploaded documents as an object
        documents: initialData.documents && typeof initialData.documents === "object" ? initialData.documents : {},
      }
      

      
      return normalizedData
    }
    return defaultFormData
  })

  const handleStepChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const method = isEdit ? "PUT" : "POST"
      

      
      // Clean up the form data - remove _id for updates (it's in the URL)
      // and convert numeric strings to numbers
      const cleanedData: Record<string, any> = {}
      
      for (const [key, value] of Object.entries(formData)) {
        // Skip _id field for updates - it's already in the API endpoint URL
        if (key === "_id") continue
        
        // Convert numeric string fields to numbers
        const numericFields = [
          "lowest_price", "max_price", "area_sqft",
          "area_value", "road_width", "price_per_unit",
          "latitude", "longitude"
        ]
        
        if (numericFields.includes(key) && value !== "" && value !== null && value !== undefined) {
          const num = Number(value)
          cleanedData[key] = isNaN(num) ? value : num
        } else if (value !== undefined) {
          cleanedData[key] = value
        }
      }
      

      
      const res = await fetch(apiEndpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        const slug = data.property?.slug || data.slug || cleanedData.slug
        const id = data.property?._id || data._id

        // Associates/owners return to their dashboard so they can track review status.
        // Admins go straight to the published listing.
        if (apiEndpoint.includes("/associate/")) {
          router.push("/associate/properties?submitted=1")
        } else {
          router.push(`/properties/${slug || id}`)
        }
      } else {
        alert(`Error saving property: ${data.error || data.message || "Unknown error"}`)
      }
    } catch (error) {
      console.error("[v0] Error submitting property:", error)
      alert(`Error saving property: ${error instanceof Error ? error.message : "Network error"}`)
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: "Land Details" },
    { number: 2, title: "Size & Price" },
    { number: 3, title: "Location" },
    { number: 4, title: "Photos & SEO" },
  ]

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, idx) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  step.number < currentStep
                    ? "bg-primary text-primary-foreground"
                    : step.number === currentStep
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number < currentStep ? <Check size={18} /> : step.number}
              </div>
              <div className="ml-2 hidden text-sm font-medium sm:block md:ml-3">{step.title}</div>
              {idx < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 md:mx-3 ${step.number < currentStep ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm font-medium text-foreground sm:hidden">
          Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
        </p>
      </div>

      {/* Form Steps */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        {currentStep === 1 && <PropertyFormStep1 formData={formData} onChange={handleStepChange} />}
        {currentStep === 2 && <PropertyFormStep2 formData={formData} onChange={handleStepChange} />}
        {currentStep === 3 && <PropertyFormStep3 formData={formData} onChange={handleStepChange} />}
        {currentStep === 4 && <PropertyFormStep4 formData={formData} onChange={handleStepChange} />}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-between">
        <Button onClick={handlePrev} variant="outline" disabled={currentStep === 1} className="px-6 bg-transparent">
          <ArrowLeft size={16} className="mr-2" />
          Previous
        </Button>

        {currentStep === 4 ? (
          <Button onClick={handleSubmit} disabled={loading} className="px-8">
            {loading ? "Submitting..." : isEdit ? "Save & Resubmit for Review" : "Submit for Review"}
          </Button>
        ) : (
          <Button onClick={handleNext} className="px-6">
            Next
            <ArrowRight size={16} className="ml-2" />
          </Button>
        )}
      </div>
    </div>
  )
}
