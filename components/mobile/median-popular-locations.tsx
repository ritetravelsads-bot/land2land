
"use client"

import Link from "next/link"
import useSWR from "swr"
import { ArrowRight, MapPin, Map as MapIcon } from "lucide-react"

interface PropertySummary {
  city?: string
  state?: string
  main_thumbnail?: string
  images?: string[]
}

interface PropertyResponse {
  properties: PropertySummary[]
}

interface LocationItem {
  city: string
  image?: string
  count: number
}

const fetcher = async (url: string): Promise<PropertyResponse> => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Could not load locations")
  }

  return response.json()
}

function LocationSkeleton() {
  return (
    <div className="flex gap-2.5 overflow-hidden px-5 sm:px-6">
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="aspect-[1.55/1] w-[26vw] min-w-[6.5rem] max-w-[13rem] shrink-0 animate-pulse rounded-[15px] bg-muted"
        />
      ))}
    </div>
  )
}

export default function MedianPopularLocations() {
  const { data, error, isLoading } = useSWR<PropertyResponse>(
    "/api/properties?limit=60&sort=newest",
    fetcher,
    {
      revalidateOnFocus: false,
    }
  )

  // Group real listings by city and use the first available property
  // image for that city.
  const locations: LocationItem[] = Array.from(
    (data?.properties ?? []).reduce((map, property) => {
      const city = property.city?.trim()

      if (!city) return map

      const existing = map.get(city)

      if (existing) {
        existing.count += 1

        if (
          !existing.image &&
          (property.main_thumbnail || property.images?.[0])
        ) {
          existing.image =
            property.main_thumbnail || property.images?.[0]
        }
      } else {
        map.set(city, {
          city,
          image: property.main_thumbnail || property.images?.[0],
          count: 1,
        })
      }

      return map
    }, new Map<string, LocationItem>()).values()
  ).slice(0, 8)

  return (
    <section
      aria-labelledby="app-locations-heading"
      className="py-5"
    >
      {/* Section Heading */}
      <div className="mb-3.5 flex items-center justify-between gap-3 px-5 sm:px-6">

        <h2
          id="app-locations-heading"
          className="border-l-[5px] border-primary pl-3 text-[19px] font-bold tracking-[-0.035em] text-foreground sm:text-[21px]"
        >
          Popular Locations
        </h2>

        <Link
          href="/properties"
          className="flex min-h-10 shrink-0 items-center gap-1 rounded-full px-1.5 text-xs font-bold text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          See All
          <ArrowRight
            className="size-3.5"
            aria-hidden="true"
          />
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <LocationSkeleton />
      ) : error ? (
        <p
          role="alert"
          className="mx-5 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground"
        >
          Popular locations are temporarily unavailable.
        </p>
      ) : locations.length > 0 ? (
        /* Location Cards */
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-5 pb-2 sm:gap-3 sm:px-6">

          {locations.map((location) => (
            <Link
              key={location.city}
              href={`/properties?city=${encodeURIComponent(location.city)}`}
              aria-label={`Explore properties in ${location.city}`}
              className="group relative flex aspect-[1.55/1] w-[26vw] min-w-[6.5rem] max-w-[13rem] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-[15px] border border-border/40 bg-muted shadow-[0_5px_15px_-10px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >

              {/* Location Image */}
              {location.image ? (
                <img
                  src={location.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#e9efe5]">
                  <MapIcon className="size-8 text-primary/40" aria-hidden="true" />
                </div>
              )}

              {/* Dark Image Overlay */}
              <span
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"
                aria-hidden="true"
              />

              {/* Location Name and Listing Information */}
              <span className="relative z-10 flex flex-col gap-0.5 p-2 sm:p-3">

                <span className="flex min-w-0 items-center gap-1 text-[11px] font-bold leading-tight text-white sm:text-sm">
                  <MapPin
                    className="size-3 shrink-0 fill-white text-white sm:size-3.5"
                    aria-hidden="true"
                  />

                  <span className="truncate">
                    {location.city}
                  </span>
                </span>

                <span className="truncate pl-4 text-[9px] font-medium leading-tight text-white/90 sm:pl-5 sm:text-[11px]">
                  Explore properties
                </span>

              </span>
            </Link>
          ))}

        </div>
      ) : (
        /* Empty State */
        <div className="mx-5 rounded-xl border border-dashed border-border bg-card p-5 text-center">
          <MapPin
            className="mx-auto size-7 text-primary/40"
            aria-hidden="true"
          />

          <p className="mt-2 text-sm font-semibold text-foreground">
            No locations available
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Locations will appear as published listings become available.
          </p>
        </div>
      )}
    </section>
  )
}
