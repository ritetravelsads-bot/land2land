"use client"

import Link from "next/link"
import useSWR from "swr"
import { ArrowRight, MapPin } from "lucide-react"

interface PropertySummary {
  city?: string
  state?: string
  main_thumbnail?: string
  images?: string[]
}

interface PropertyResponse {
  properties: PropertySummary[]
}

const fetcher = async (url: string): Promise<PropertyResponse> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error("Could not load locations")
  return response.json()
}

export default function MedianPopularLocations() {
  const { data, isLoading } = useSWR("/api/properties?limit=60&sort=newest", fetcher, {
    revalidateOnFocus: false,
  })
  const locations = Array.from(
    new Map(
      (data?.properties ?? [])
        .filter((property) => property.city?.trim())
        .map((property) => [property.city!.trim(), property]),
    ),
  ).slice(0, 8)

  return (
    <section aria-labelledby="app-locations-heading" className="py-5">
      <div className="mb-3 flex items-end justify-between gap-3 px-4">
        <div>
          <h2 id="app-locations-heading" className="text-base font-bold">Explore popular locations</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Places with published land listings.</p>
        </div>
        <MapPin className="mb-1 size-5 text-primary" aria-hidden="true" />
      </div>

      {isLoading ? (
        <div className="scrollbar-hide flex gap-3 overflow-hidden px-4" aria-label="Loading locations">
          {[0, 1, 2].map((item) => <div key={item} className="h-28 w-40 shrink-0 animate-pulse rounded-2xl bg-muted" />)}
        </div>
      ) : locations.length ? (
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2">
          {locations.map(([city, property]) => (
            <Link
              key={city}
              href={`/properties?city=${encodeURIComponent(city)}`}
              className="group relative flex h-28 w-40 shrink-0 snap-start items-end overflow-hidden rounded-2xl border border-border bg-muted p-3 text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {(property.main_thumbnail || property.images?.[0]) && (
                <img
                  src={property.main_thumbnail || property.images?.[0]}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <span className="relative z-10 flex w-full items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold">{city}</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mx-4 rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
          Locations will appear as published listings become available.
        </p>
      )}
    </section>
  )
}
