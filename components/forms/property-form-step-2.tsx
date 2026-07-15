"use client"

import { formatPriceToIndian } from "@/lib/utils"

export default function PropertyFormStep2({ formData, onChange }: any) {
  // Helper to display formatted price preview
  const getPricePreview = (value: number | string | undefined) => {
    if (!value) return ""
    const numValue = typeof value === "string" ? parseFloat(value) : value
    if (isNaN(numValue) || numValue === 0) return ""
    return formatPriceToIndian(numValue)
  }

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold mb-1">Size &amp; Price</h3>
        <p className="text-sm text-muted-foreground">Area, pricing, and land-specific details</p>
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Total Price (₹) *</label>
          <input
            type="number"
            value={formData.lowest_price}
            onChange={(e) => onChange("lowest_price", e.target.value)}
            placeholder="e.g., 5000000"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {formData.lowest_price && (
            <p className="text-xs text-primary mt-1 font-medium">
              Display: ₹{getPricePreview(formData.lowest_price)}
            </p>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Maximum / Asking Price (₹)</label>
          <input
            type="number"
            value={formData.max_price}
            onChange={(e) => onChange("max_price", e.target.value)}
            placeholder="If range, enter upper price"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {formData.max_price && (
            <p className="text-xs text-primary mt-1 font-medium">
              Display: ₹{getPricePreview(formData.max_price)}
            </p>
          )}
        </div>
      </div>

      {/* Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Land Area *</label>
          <input
            type="number"
            value={formData.area_value || ""}
            onChange={(e) => onChange("area_value", e.target.value)}
            placeholder="e.g., 2.5"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Unit of Measurement</label>
          <select
            value={formData.area_unit || "bigha"}
            onChange={(e) => onChange("area_unit", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="bigha">Bigha</option>
            <option value="biswa">Biswa</option>
            <option value="killa">Killa</option>
            <option value="acre">Acre</option>
            <option value="hectare">Hectare</option>
            <option value="sqft">Sq Ft</option>
            <option value="sqyd">Sq Yard</option>
            <option value="marla">Marla</option>
            <option value="kanal">Kanal</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Area in Sq Ft</label>
          <input
            type="number"
            value={formData.area_sqft}
            onChange={(e) => onChange("area_sqft", e.target.value)}
            placeholder="Total sq ft (for search)"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <p className="text-xs text-muted-foreground mt-1">Used for search &amp; sorting</p>
        </div>
      </div>

      {/* Survey / Khasra No. + Price per unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Survey / Khasra No.</label>
          <input
            type="text"
            value={formData.survey_number || ""}
            onChange={(e) => onChange("survey_number", e.target.value)}
            placeholder="e.g., 124/2"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Price per Bigha / Acre (₹)</label>
          <input
            type="number"
            value={formData.price_per_unit || ""}
            onChange={(e) => onChange("price_per_unit", e.target.value)}
            placeholder="e.g., 200000"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
          {formData.price_per_unit && (
            <p className="text-xs text-primary mt-1 font-medium">
              Display: ₹{getPricePreview(formData.price_per_unit)}
            </p>
          )}
        </div>
      </div>

      {/* Road access width + Water level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Approach Road Width</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={formData.road_width || ""}
              onChange={(e) => onChange("road_width", e.target.value)}
              placeholder="e.g., 20"
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <select
              value={formData.road_width_unit || "ft"}
              onChange={(e) => onChange("road_width_unit", e.target.value)}
              className="w-28 px-2 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <option value="ft">Feet (ft)</option>
              <option value="karam">Karam</option>
              <option value="meter">Meter</option>
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Water Level / Borewell Depth (ft)</label>
          <input
            type="text"
            value={formData.water_level || ""}
            onChange={(e) => onChange("water_level", e.target.value)}
            placeholder="e.g., 80 ft or Seasonal"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Water Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Water Type</label>
          <select
            value={formData.water_type || ""}
            onChange={(e) => onChange("water_type", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="">Not specified</option>
            <option value="meetha">Meetha (Sweet / Fresh)</option>
            <option value="khara">Khara (Saline / Brackish)</option>
          </select>
          <p className="text-xs text-muted-foreground mt-1">मीठा / खारा — quality of groundwater</p>
        </div>
      </div>

      {/* Highway connectivity + Nearest town */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Nearest Highway / NH</label>
          <input
            type="text"
            value={formData.highway_connectivity || ""}
            onChange={(e) => onChange("highway_connectivity", e.target.value)}
            placeholder="e.g., NH-48, 3 km"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Nearest Town / Market (km)</label>
          <input
            type="text"
            value={formData.nearest_town || ""}
            onChange={(e) => onChange("nearest_town", e.target.value)}
            placeholder="e.g., Alwar, 12 km"
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Land Features checkboxes */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-2">Land Features</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { key: "road_access", label: "Road Access" },
            { key: "water_available", label: "Water Source Available" },
            { key: "electricity_available", label: "Electricity Available" },
            { key: "boundary_wall", label: "Boundary / Fence" },
            { key: "corner_plot", label: "Corner / Corner Plot" },
            { key: "is_negotiable", label: "Price Negotiable" },
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
      </div>

      {/* RERA (conditional - rarely applies to agricultural, but keep hidden unless set) */}
      <div>
        <label className="text-xs font-medium text-muted-foreground block mb-1.5">RERA Registered?</label>
        <select
          value={formData.rera_registered ? "yes" : "no"}
          onChange={(e) => onChange("rera_registered", e.target.value === "yes")}
          className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>

      {formData.rera_registered && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">RERA ID</label>
            <input
              type="text"
              value={formData.rera_id || ""}
              onChange={(e) => onChange("rera_id", e.target.value)}
              placeholder="RERA registration number"
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground block mb-1.5">RERA Website Link</label>
            <input
              type="url"
              value={formData.rera_website_link || ""}
              onChange={(e) => onChange("rera_website_link", e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 text-sm border border-border rounded-md bg-input focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>
      )}
    </div>
  )
}
