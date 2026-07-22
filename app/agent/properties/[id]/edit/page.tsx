"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import PropertyFormWrapper from "@/components/forms/property-form-wrapper"
import PropertyFormMultiStep from "@/components/forms/property-form-multistep"

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [initialData, setInitialData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const res = await fetch(`/api/associate/properties/${id}`)
        if (res.ok) {
          const data = await res.json()
          setInitialData(data)
        } else {
          console.error("[v0] Failed to fetch property data")
          router.push("/associate/properties")
        }
      } catch (error) {
        console.error("[v0] Error loading property:", error)
        router.push("/associate/properties")
      } finally {
        setLoading(false)
      }
    }
    loadProperty()
  }, [id, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-muted-foreground">Loading property...</div>
      </div>
    )
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-muted-foreground">Property not found</div>
      </div>
    )
  }

  return (
    <PropertyFormWrapper title="Edit Property" description="Update the details of your property listing">
      <PropertyFormMultiStep
        apiEndpoint={`/api/associate/properties/${id}`}
        initialData={initialData}
        isEdit={true}
      />
    </PropertyFormWrapper>
  )
}
