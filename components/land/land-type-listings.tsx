"use client"

import Link from "next/link"
import useSWR from "swr"
import { MapPin, Maximize2, Compass, Route } from "lucide-react"
import { formatPriceRange, getPropertyUrl } from "@/lib/utils"
import { getLandTypeLabel } from "@/lib/land-types-content"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Listing {
  _id: string
  property_name: string
  slug?: string
  main_thumbnail?: string
  address?: string
  city?: string
  state?: string
  property_type?: string
  area_value?: number
  area_unit?: string
  area_sqft?: number
  facing?: string
  road_access?: boolean
  lowest_price?: number
  max_price?: number
  price_range?: string
}

function formatArea(listing: Listing): string | null {
  if (listing.area_value && listing.area_unit) {
    return `${listing.area_value} ${listing.area_unit}`
  }
  if (listing.area_sqft) return `${listing.area_sqft.toLocaleString("en-IN")} sqft`
  return null
}

function LandCard({ listing }: { listing: Listing }) {
  const area = formatArea(listing)
  const price = listing.price_range || formatPriceRange(listing.lowest_price, listing.max_price)

  return (
    <Link
      href={getPropertyUrl(listing)}
      className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all duration-300"
    >
      <div className="relative h-44 bg-muted overflow-hidden">
        <img
          src={listing.main_thumbnail || "/placeholder.svg?height=176&width=300&query=land+parcel"}
          alt={listing.property_name || "Land"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {listing.property_type && (
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold bg-primary text-primary-foreground rounded-full">
            {getLandTypeLabel(listing.property_type)}
          </span>
        )}
      </div>

      <div className="p-3 space-y-2">
        <div>
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {listing.property_name || "Land Parcel"}
          </h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="line-clamp-1">
              {[listing.address || listing.city, listing.state].filter(Boolean).join(", ") || "Location not available"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          {area && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded">
              <Maximize2 className="h-3 w-3" />
              <span>{area}</span>
            </div>
          )}
          {listing.facing && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded capitalize">
              <Compass className="h-3 w-3" />
              <span>{listing.facing.replace(/_/g, " ")}</span>
            </div>
          )}
          {listing.road_access && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-muted rounded">
              <Route className="h-3 w-3" />
              <span>Road access</span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-sm font-bold text-primary">{price || "Contact for Price"}</p>
        </div>
      </div>
    </Link>
  )
}

export default function LandTypeListings({ landType, label }: { landType: string; label: string }) {
  const { data, isLoading } = useSWR(
    `/api/properties?property_type=${encodeURIComponent(landType)}&limit=12&sort=featured`,
    fetcher,
    { revalidateOnFocus: false },
  )

  const listings: Listing[] = data?.properties || []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border overflow-hidden">
            <div className="h-44 bg-muted animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-3 bg-muted rounded w-2/3 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-border rounded-xl">
        <p className="text-lg font-semibold text-foreground mb-2">No {label.toLowerCase()} listings yet</p>
        <p className="text-sm text-muted-foreground mb-6">
          Be the first to list {label.toLowerCase()} in this category.
        </p>
        <Link
          href="/sell"
          className="inline-flex items-center px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition"
        >
          List Your Land
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {listings.map((listing) => (
        <LandCard key={listing._id} listing={listing} />
      ))}
    </div>
  )
}
