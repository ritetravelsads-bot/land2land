
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import {
  ArrowRight,
  Heart,
  MapPin,
  Maximize2,
  Map,
  ShieldCheck,
} from "lucide-react"
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

  if (!response.ok) {
    throw new Error("Could not load listings")
  }

  return response.json()
}

function PropertyCard({ listing }: { listing: ListingSummary }) {
  const [isSaved, setIsSaved] = useState(false)

  const image = listing.main_thumbnail || listing.images?.[0]

  const location = [
    listing.neighborhood || listing.city || listing.address,
    listing.state,
  ]
    .filter(Boolean)
    .join(", ")

  const area = listing.area_value
    ? `${listing.area_value} ${listing.area_unit || "acre"}`
    : listing.area_sqft
      ? `${listing.area_sqft.toLocaleString("en-IN")} sqft`
      : null

  const price =
    listing.price_range ||
    formatPriceRange(listing.lowest_price, listing.max_price) ||
    "Price on request"

  // Read saved properties after the component mounts.
  useEffect(() => {
    try {
      const saved: ListingSummary[] = JSON.parse(
        localStorage.getItem("favoriteProperties") || "[]"
      )

      setIsSaved(
        saved.some((property) => property._id === listing._id)
      )
    } catch {
      setIsSaved(false)
    }
  }, [listing._id])

  // Preserve the existing saved-properties functionality.
  const toggleSaved = () => {
    try {
      const saved: ListingSummary[] = JSON.parse(
        localStorage.getItem("favoriteProperties") || "[]"
      )

      const alreadySaved = saved.some(
        (property) => property._id === listing._id
      )

      const next = alreadySaved
        ? saved.filter((property) => property._id !== listing._id)
        : [...saved, listing]

      localStorage.setItem(
        "favoriteProperties",
        JSON.stringify(next)
      )

      setIsSaved(!alreadySaved)
    } catch {
      setIsSaved(false)
    }
  }

  return (
    <article className="group relative h-full overflow-hidden rounded-[20px] border border-border/70 bg-card shadow-[0_5px_22px_-15px_rgba(20,40,20,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-15px_rgba(20,40,20,0.28)]">

      {/* Property Image */}
      <Link
        href={getPropertyUrl(listing)}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <div className="relative aspect-[1.55/1] w-full overflow-hidden bg-[#edf1e9]">

          {image ? (
            <img
              src={image}
              alt={listing.property_name || "Land listing"}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Map className="size-11 text-primary/30" aria-hidden="true" />
            </div>
          )}

          {/* Image overlay */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent"
            aria-hidden="true"
          />

          {/* Verification / Featured badge */}
          {(listing.is_verified || listing.is_featured) && (
            <span
              className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-white shadow-md ${
                listing.is_verified
                  ? "bg-emerald-700"
                  : "bg-primary"
              }`}
            >
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {listing.is_verified ? "Verified" : "Featured"}
            </span>
          )}
        </div>

        {/* Property Information */}
        <div className="flex min-h-[116px] flex-col gap-2 p-3 sm:p-3.5">

          {/* Property Name */}
          <h3 className="line-clamp-1 text-[13px] font-bold leading-[1.35] tracking-[-0.025em] text-foreground sm:text-[15px]">
            {listing.property_name || "Land listing"}
          </h3>

          {/* Property Location */}
          {location && (
            <p className="flex min-w-0 items-center gap-1.5 text-[10px] font-medium text-muted-foreground sm:text-xs">
              <MapPin
                className="size-3.5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="truncate">{location}</span>
            </p>
          )}

          {/* Area and Price */}
          <div className="mt-auto flex items-end justify-between gap-2 border-t border-border/70 pt-2.5">

            {area ? (
              <span className="flex min-w-0 items-center gap-1 text-[10px] font-medium text-muted-foreground sm:text-xs">
                <Maximize2
                  className="size-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="truncate">{area}</span>
              </span>
            ) : (
              <span />
            )}

            <p className="min-w-0 truncate text-right text-[13px] font-extrabold leading-tight tracking-[-0.02em] text-primary sm:text-base">
              {price}
            </p>
          </div>
        </div>
      </Link>

      {/* Save / Favourite Button */}
      <button
        type="button"
        onClick={toggleSaved}
        aria-label={
          isSaved
            ? `Remove ${listing.property_name || "property"} from saved properties`
            : `Save ${listing.property_name || "property"}`
        }
        aria-pressed={isSaved}
        className="absolute right-2.5 top-2.5 flex size-9 items-center justify-center rounded-full border border-white/70 bg-white/95 text-foreground shadow-[0_3px_12px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
      >
        <Heart
          className={`size-[17px] transition-colors ${
            isSaved
              ? "fill-primary text-primary"
              : "text-foreground"
          }`}
          aria-hidden="true"
        />
      </button>
    </article>
  )
}

// Loading Skeleton
function PropertyCardSkeleton({
  layout,
}: {
  layout: "carousel" | "grid"
}) {
  return (
    <div
      className={`overflow-hidden rounded-[20px] border border-border/60 bg-card ${
        layout === "carousel"
          ? "w-[78vw] max-w-[17rem] shrink-0"
          : "w-full"
      }`}
    >
      <div className="aspect-[1.55/1] animate-pulse bg-muted" />

      <div className="space-y-3 p-3.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
        <div className="flex justify-between border-t border-border pt-3">
          <div className="h-3 w-1/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
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
  const { data, error, isLoading } = useSWR<ListingResponse>(
    endpoint,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  const listings = data?.properties ?? []

  const headingId = `${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-heading`

  return (
    <section
      aria-labelledby={headingId}
      className="py-5"
    >
      {/* Section Header */}
      <div className="mb-4 flex items-center justify-between gap-3 px-5 sm:px-6">

        <div className="min-w-0">
          <h2
            id={headingId}
            className="border-l-[5px] border-primary pl-3 text-[19px] font-bold tracking-[-0.035em] text-foreground sm:text-[21px]"
          >
            {title}
          </h2>

          {description && (
            <p className="mt-1.5 pl-4 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
              {description}
            </p>
          )}
        </div>

        <Link
          href={href}
          className="flex min-h-10 shrink-0 items-center gap-1 rounded-full px-2 text-xs font-bold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          See All
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-2 gap-3 px-5 sm:gap-4 sm:px-6"
              : "scrollbar-hide flex gap-3 overflow-hidden px-5 sm:px-6"
          }
          aria-label={`Loading ${title.toLowerCase()}`}
          aria-busy="true"
        >
          {[0, 1].map((item) => (
            <PropertyCardSkeleton
              key={item}
              layout={layout}
            />
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <div
          role="alert"
          className="mx-5 rounded-2xl border border-border bg-card px-4 py-5 text-center sm:mx-6"
        >
          <p className="text-sm font-semibold text-foreground">
            Unable to load properties
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Listings are temporarily unavailable. Please try again shortly.
          </p>
        </div>
      ) : listings.length > 0 ? (
        /* Property Listings */
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-2 gap-3 px-5 sm:gap-4 sm:px-6"
              : "scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:gap-4 sm:px-6"
          }
        >
          {listings.map((listing) => (
            <div
              key={listing._id}
              className={
                layout === "grid"
                  ? "min-w-0"
                  : "w-[78vw] max-w-[17rem] shrink-0 snap-start"
              }
            >
              <PropertyCard listing={listing} />
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="mx-5 rounded-2xl border border-dashed border-border bg-card px-4 py-6 text-center sm:mx-6">
          <Map className="mx-auto size-8 text-primary/35" aria-hidden="true" />

          <p className="mt-2 text-sm font-semibold text-foreground">
            No properties available
          </p>

          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {emptyMessage}
          </p>
        </div>
      )}
    </section>
  )
}
