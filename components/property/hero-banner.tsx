"use client"

import { MapPin, IndianRupee, Maximize2, Layers } from "lucide-react"
import { formatPriceToIndian } from "@/lib/utils"

interface HeroBannerProps {
  property: {
    property_name: string
    main_banner?: string
    main_thumbnail?: string
    address?: string
    city?: string
    state?: string
    lowest_price?: number
    max_price?: number
    area_value?: number | string
    area_unit?: string
    property_category?: string
    property_type?: string
    ownership_type?: string
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  agricultural: "Agricultural Land",
  residential_plot: "Residential Land",
  commercial_plot: "Commercial Land",
  industrial: "Industrial Land",
  farmland: "Farmland",
  vacant: "Vacant Land",
  abadi_land: "Abadi Land",
}

const OWNERSHIP_LABELS: Record<string, string> = {
  freehold: "Freehold",
  leasehold: "Leasehold",
  cooperative: "Co-operative Society",
  power_of_attorney: "Power of Attorney",
}

export function HeroBanner({ property }: HeroBannerProps) {
  const bgImage = property.main_banner || property.main_thumbnail
  const formatPrice = (price: number) => formatPriceToIndian(price)
  const fullAddress = [property.address, property.city, property.state].filter(Boolean).join(", ")

  const categoryLabel =
    CATEGORY_LABELS[property.property_category || property.property_type || ""] ||
    property.property_category?.replace(/_/g, " ") ||
    "Land"

  const ownershipLabel =
    OWNERSHIP_LABELS[property.ownership_type || ""] || property.ownership_type?.replace(/_/g, " ") || ""

  const areaDisplay =
    property.area_value
      ? `${property.area_value} ${property.area_unit?.toUpperCase() || "BIGHA"}`
      : null

  return (
    <section className="bg-muted/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* LEFT: Background image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[260px] sm:min-h-[340px] lg:min-h-[440px] bg-muted">
            {bgImage ? (
              <img
                src={bgImage || "/placeholder.svg"}
                alt={property.property_name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-background" />
            )}
            {/* Category badge over the image */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wide shadow-md">
                <Layers className="h-3 w-3" />
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* RIGHT: All banner info */}
          <div className="flex flex-col justify-center">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 text-balance leading-tight">
              {property.property_name}
            </h1>

            {/* Address */}
            {fullAddress && (
              <p className="flex items-start gap-1.5 text-muted-foreground text-sm md:text-base mb-6">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
                <span>{fullAddress}</span>
              </p>
            )}

            {/* Key stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Price */}
              <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                <IndianRupee className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Price</p>
                  <p className="font-bold text-sm text-foreground truncate">
                    {property.lowest_price
                      ? `₹${formatPrice(property.lowest_price)}${property.max_price && property.max_price !== property.lowest_price ? ` – ₹${formatPrice(property.max_price)}` : ""}`
                      : "On Request"}
                  </p>
                </div>
              </div>

              {/* Area */}
              {areaDisplay && (
                <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                  <Maximize2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Area</p>
                    <p className="font-bold text-sm text-foreground truncate">{areaDisplay}</p>
                  </div>
                </div>
              )}

              {/* Ownership */}
              {ownershipLabel && (
                <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-3">
                  <Layers className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Ownership</p>
                    <p className="font-bold text-sm text-foreground truncate">{ownershipLabel}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
