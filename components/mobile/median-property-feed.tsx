"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import { ArrowRight, Heart, MapPin, Maximize2, Map } from "lucide-react"
import { formatPriceRange, getPropertyUrl } from "@/lib/utils"

interface ListingSummary {
  _id: string
  slug?: string | null
  property_name?: string
  main_thumbnail?: string
  images?: string[]
  address?: string
  neighborhood?: string
  city?: string
  property_type?: string
  is_featured?: boolean
  is_verified?: boolean
  state?: string
  area_value?: number | string
  area_unit?: string
  area_sqft?: number
  price_range?: string
  lowest_price?: number | null
  max_price?: number | null
}

interface ListingResponse {
  properties: ListingSummary[]
}

interface MedianPropertyFeedProps {
  title: string
  description: string
  href: string
  endpoint: string
  emptyMessage: string
  layout?: "carousel" | "grid"
}

const fetcher = async (url: string): Promise<ListingResponse> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Could not load listings")
  return response.json()
}

function PropertyCard({ listing }: { listing: ListingSummary }) {
  const [isSaved, setIsSaved] = useState(false)
  const image = listing.main_thumbnail || listing.images?.[0]
  const location = [listing.neighborhood || listing.city || listing.address, listing.state]
    .filter(Boolean)
    .join(", ")
  const area = listing.area_value
    ? `${listing.area_value} ${listing.area_unit || "acre"}`
    : listing.area_sqft
      ? `${listing.area_sqft.toLocaleString("en-IN")} sqft`
      : null

  useEffect(() => {
    try {
      const saved: ListingSummary[] = JSON.parse(localStorage.getItem("favoriteProperties") || "[]")
      setIsSaved(saved.some((property) => property._id === listing._id))
    } catch {
      setIsSaved(false)
    }
  }, [listing._id])

  const toggleSaved = () => {
    try {
      const saved: ListingSummary[] = JSON.parse(localStorage.getItem("favoriteProperties") || "[]")
      const next = saved.some((property) => property._id === listing._id)
        ? saved.filter((property) => property._id !== listing._id)
        : [...saved, listing]
      localStorage.setItem("favoriteProperties", JSON.stringify(next))
      setIsSaved((current) => !current)
    } catch {
      setIsSaved(false)
    }
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={getPropertyUrl(listing)} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-muted">
          {image ? (
            <img
              src={image}
              alt={listing.property_name || "Land listing"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <Map className="size-10 text-muted-foreground/45" aria-hidden="true" />
          )}
          {(listing.is_featured || listing.is_verified) && (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-card/95 px-2.5 py-1 text-[10px] font-semibold text-primary shadow-sm">
              {listing.is_verified ? "Verified" : "Featured"}
            </span>
          )}
        </div>
        <div className="flex min-h-32 flex-col gap-2 p-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-foreground">{listing.property_name || "Land listing"}</h3>
          {(listing.property_type || location) && (
            <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
              {listing.property_type && <span className="truncate">{listing.property_type}</span>}
              {listing.property_type && location && <span aria-hidden="true">·</span>}
              {location && <><MapPin className="size-3 shrink-0" aria-hidden="true" /><span className="truncate">{location}</span></>}
            </p>
          )}
          <div className="mt-auto flex items-end justify-between gap-2 border-t border-border pt-2">
            <p className="line-clamp-1 text-xs font-bold text-primary">
              {listing.price_range || formatPriceRange(listing.lowest_price, listing.max_price) || "Price on request"}
            </p>
            {area && (
              <span className="flex shrink-0 items-center gap-1 text-[10px] text-muted-foreground">
                <Maximize2 className="size-3" aria-hidden="true" />
                {area}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={toggleSaved}
        aria-label={isSaved ? `Remove ${listing.property_name || "property"} from saved properties` : `Save ${listing.property_name || "property"}`}
        aria-pressed={isSaved}
        className="absolute right-2.5 top-2.5 flex size-10 items-center justify-center rounded-full bg-card/95 text-foreground shadow-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Heart className={`size-5 ${isSaved ? "fill-primary text-primary" : ""}`} aria-hidden="true" />
      </button>
    </article>
  )
}

export default function MedianPropertyFeed({
  title,
  description,
  href,
  endpoint,
  emptyMessage,
  layout = "carousel",
}: MedianPropertyFeedProps) {
  const { data, error, isLoading } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
  })
  const listings = data?.properties ?? []

  return (
    <section aria-labelledby={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`} className="py-5">
      <div className="mb-3 flex items-end justify-between gap-3 px-4">
        <div>
          <h2 id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`} className="text-lg font-bold text-foreground">{title}</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        </div>
        <Link href={href} className="flex min-h-10 shrink-0 items-center gap-1 text-xs font-semibold text-primary">
          See all <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      {isLoading ? (
        <div className={layout === "grid" ? "grid grid-cols-2 gap-3 px-4" : "flex gap-3 overflow-hidden px-4"} aria-label={`Loading ${title.toLowerCase()}`}>
          {[0, 1].map((item) => <div key={item} className={`h-64 animate-pulse rounded-2xl bg-muted ${layout === "grid" ? "w-full" : "w-[78vw] max-w-[17rem] shrink-0"}`} />)}
        </div>
      ) : error ? (
        <p className="mx-4 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
          Listings are temporarily unavailable. Please try again shortly.
        </p>
      ) : listings.length > 0 ? (
        <div className={layout === "grid" ? "grid grid-cols-2 gap-3 px-4" : "scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2"}>
          {listings.map((listing) => (
            <div key={listing._id} className={layout === "grid" ? "min-w-0" : "w-[78vw] max-w-[17rem] shrink-0 snap-start"}>
              <PropertyCard listing={listing} />
            </div>
          ))}
        </div>
      ) : (
        <p className="mx-4 rounded-xl border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      )}
    </section>
  )
}
