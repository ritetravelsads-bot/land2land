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
    <article className="group relative overflow-hidden rounded-[19px] border border-border/80 bg-card shadow-[0_7px_24px_-19px_rgba(30,50,30,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-18px_rgba(30,50,30,0.45)]">
      <Link href={getPropertyUrl(listing)} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring">
        <div className="relative flex aspect-[1.48/1] items-center justify-center overflow-hidden bg-[#e9eee5]">
          {image ? (
            <img
              src={image}
              alt={listing.property_name || "Land listing"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <Map className="size-10 text-primary/40" aria-hidden="true" />
          )}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
          {(listing.is_featured || listing.is_verified) && (
            <span className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wide text-white shadow-sm ${listing.is_verified ? "bg-emerald-700" : "bg-primary/90"}`}>
              {listing.is_verified ? "Verified" : "Featured"}
            </span>
          )}
        </div>
        <div className="flex min-h-[132px] flex-col gap-2.5 p-3">
          <h3 className="line-clamp-2 text-[13px] font-bold leading-[1.3] tracking-[-0.01em] text-foreground">{listing.property_name || "Land listing"}</h3>
          {(listing.property_type || location) && (
            <div className="flex min-w-0 flex-col gap-1.5 text-[10px] font-medium text-muted-foreground">
              {location && <p className="flex min-w-0 items-center gap-1"><MapPin className="size-3 shrink-0 text-primary/80" aria-hidden="true" /><span className="truncate">{location}</span></p>}
              {listing.property_type && <p className="truncate pl-4 text-[9px] uppercase tracking-[0.08em]">{listing.property_type}</p>}
            </div>
          )}
          <div className="mt-auto flex items-end justify-between gap-1.5 border-t border-border/70 pt-2.5">
            <p className="min-w-0 truncate text-[12px] font-bold leading-tight text-primary">
              {listing.price_range || formatPriceRange(listing.lowest_price, listing.max_price) || "Price on request"}
            </p>
            {area && (
              <span className="flex shrink-0 items-center gap-1 rounded-md bg-muted/70 px-1.5 py-1 text-[9px] font-medium text-muted-foreground">
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
        className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full border border-white/60 bg-white/95 text-foreground shadow-[0_2px_9px_rgba(0,0,0,0.14)] transition-transform hover:scale-105 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Heart className={`size-[17px] ${isSaved ? "fill-primary text-primary" : ""}`} aria-hidden="true" />
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
        <div className="mb-3 flex items-center justify-between gap-3 px-5 sm:px-6 lg:px-10">
          <div className="min-w-0">
            <h2 id={`${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-heading`} className="border-l-[5px] border-primary pl-3 text-[19px] font-bold tracking-[-0.03em] text-foreground">{title}</h2>
          </div>
          <Link href={href} className="flex min-h-10 shrink-0 items-center gap-1 text-xs font-semibold text-primary">
            See All <ArrowRight className="size-3.5" aria-hidden="true" />
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
