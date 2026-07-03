"use client"

import { useState, useEffect } from "react"
import { ComboSelect } from "@/components/ui/combo-select"
import { MapPin } from "lucide-react"

interface Option {
  _id: string
  name: string
  [key: string]: any
}

export default function PropertyFormStep3({ formData, onChange }: any) {
  const [states, setStates] = useState<Option[]>([])
  const [locations, setLocations] = useState<Option[]>([])
  const [loadingStates, setLoadingStates] = useState(false)
  const [loadingLocations, setLoadingLocations] = useState(false)

  useEffect(() => {
    const loadStates = async () => {
      setLoadingStates(true)
      try {
        const res = await fetch("/api/admin/states")
        const data = await res.json()
        setStates(data)
      } catch (error) {
        console.error("Error loading states:", error)
      } finally {
        setLoadingStates(false)
      }
    }

    const loadLocations = async () => {
      setLoadingLocations(true)
      try {
        const res = await fetch("/api/admin/locations")
        const data = await res.json()
        setLocations(data)
      } catch (error) {
        console.error("Error loading locations:", error)
      } finally {
        setLoadingLocations(false)
      }
    }

    loadStates()
    loadLocations()
  }, [])

  const handleAddState = async (name: string): Promise<Option | null> => {
    try {
      const res = await fetch("/api/admin/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        const newState = await res.json()
        setStates((prev) => [...prev, newState].sort((a, b) => a.name.localeCompare(b.name)))
        return newState
      }
    } catch (error) {
      console.error("Error adding state:", error)
    }
    return null
  }

  const handleAddLocation = async (name: string): Promise<Option | null> => {
    try {
      const res = await fetch("/api/admin/locations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          type: "city",
          state: formData.state || "",
        }),
      })
      if (res.ok) {
        const newLocation = await res.json()
        setLocations((prev) => [...prev, newLocation].sort((a, b) => a.name.localeCompare(b.name)))
        return newLocation
      }
    } catch (error) {
      console.error("Error adding location:", error)
    }
    return null
  }

  const handleStateChange = (value: string | string[]) => {
    const selectedName = Array.isArray(value) ? value[0] : value
    onChange("state", selectedName || "")
  }

  const handleLocationChange = (value: string | string[]) => {
    const selectedName = Array.isArray(value) ? value[0] : value
    onChange("city", selectedName || "")
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold mb-1">Location</h3>
        <p className="text-sm text-muted-foreground">Where is the land located?</p>
      </div>

      {/* Address */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Full Address / Village Name</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder="e.g., Village Dehlawas, Tehsil Umren"
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* City, State, Pin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-primary" />
              Nearest City / Town
            </span>
          </label>
          <ComboSelect
            value={formData.city || ""}
            onChange={handleLocationChange}
            options={locations}
            onAddNew={handleAddLocation}
            placeholder="Select or add city..."
            loading={loadingLocations}
          />
        </div>
        <ComboSelect
          label="State"
          value={formData.state || ""}
          onChange={handleStateChange}
          options={states}
          onAddNew={handleAddState}
          placeholder="Select or add state..."
          loading={loadingStates}
        />
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">PIN Code</label>
          <input
            type="text"
            value={formData.postal_code}
            onChange={(e) => onChange("postal_code", e.target.value)}
            placeholder="e.g., 301001"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Locality + Landmark */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Locality / Tehsil</label>
          <input
            type="text"
            value={formData.neighborhood}
            onChange={(e) => onChange("neighborhood", e.target.value)}
            placeholder="e.g., Umren, Kishangarh"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Nearby Landmark</label>
          <input
            type="text"
            value={formData.landmark || ""}
            onChange={(e) => onChange("landmark", e.target.value)}
            placeholder="e.g., Near Panchayat Office, Water Tank"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Country</label>
        <input
          type="text"
          value={formData.country || "India"}
          onChange={(e) => onChange("country", e.target.value)}
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
        />
      </div>

      {/* Google Map link */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Google Maps Link (optional)</label>
        <input
          type="url"
          value={formData.google_map_link || ""}
          onChange={(e) => onChange("google_map_link", e.target.value)}
          placeholder="https://maps.google.com/..."
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Paste the Google Maps share link to show a map on the listing
        </p>
      </div>
    </div>
  )
}
