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
  residential_plot: "Residential Plot",
  commercial_plot: "Commercial Plot",
  industrial: "Industrial Land",
  farmland: "Farmland",
  vacant: "Vacant Land",
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
    <section className="relative min-h-[60vh] lg:min-h-[68vh] flex items-end overflow-hidden">
      {/* Background Image */}
      {bgImage ? (
        <>
          <img
            src={bgImage}
            alt={property.property_name}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-background" />
      )}

      {/* Content pinned to bottom */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-10 pt-24">
        {/* Category badge */}
        <div className="mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full uppercase tracking-wide">
            <Layers className="h-3 w-3" />
            {categoryLabel}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 text-balance leading-tight drop-shadow-lg">
          {property.property_name}
        </h1>

        {/* Address */}
        {fullAddress && (
          <p className="flex items-center gap-1.5 text-white/80 text-sm md:text-base mb-8">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{fullAddress}</span>
          </p>
        )}

        {/* Key stats row */}
        <div className="flex flex-wrap gap-3">
          {/* Price */}
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white">
            <IndianRupee className="h-4 w-4 text-primary" />
            <div>
              <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">Price</p>
              <p className="font-bold text-sm">
                {property.lowest_price
                  ? `₹${formatPrice(property.lowest_price)}${property.max_price && property.max_price !== property.lowest_price ? ` – ₹${formatPrice(property.max_price)}` : ""}`
                  : "Price on Request"}
              </p>
            </div>
          </div>

          {/* Area */}
          {areaDisplay && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white">
              <Maximize2 className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">Area</p>
                <p className="font-bold text-sm">{areaDisplay}</p>
              </div>
            </div>
          )}

          {/* Ownership */}
          {ownershipLabel && (
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white">
              <Layers className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[10px] text-white/60 uppercase tracking-wider font-medium">Ownership</p>
                <p className="font-bold text-sm">{ownershipLabel}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
