"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize2, Clock, ChevronRight, ChevronLeft, BadgeCheck, Eye, Zap } from "lucide-react"
import { formatPriceRange, getPropertyUrl } from "@/lib/utils"

export default function NewProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [weeklyViews, setWeeklyViews] = useState<Record<string, number>>({})
  const [isPaused, setIsPaused] = useState(false)

  const scrollListings = (direction: "next" | "previous") => {
    const slider = sliderRef.current
    if (!slider) return
    const amount = slider.clientWidth >= 768 ? slider.clientWidth / 3 : slider.clientWidth
    const nextIndex = direction === "next" ? scrollIndex + 1 : Math.max(0, scrollIndex - 1)
    const maxIndex = Math.max(0, properties.length - (slider.clientWidth >= 768 ? 3 : 1))
    if (direction === "next" && scrollIndex >= maxIndex) {
      slider.scrollTo({ left: 0, behavior: "smooth" })
      setScrollIndex(0)
      return
    }
    slider.scrollBy({ left: direction === "next" ? amount : -amount, behavior: "smooth" })
    setScrollIndex(Math.min(nextIndex, maxIndex))
  }

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties?limit=6&sort=newest")
        const data = await response.json()
        const nextProperties = data.properties || []
        setProperties(nextProperties)
        setWeeklyViews(Object.fromEntries(nextProperties.map((property: any) => [property._id, Math.floor(Math.random() * 181) + 20])))
      } catch {
        setProperties([])
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  useEffect(() => {
    if (properties.length < 4 || isPaused) return
    const interval = window.setInterval(() => scrollListings("next"), 5000)
    return () => window.clearInterval(interval)
  }, [isPaused, properties.length, scrollIndex])

  const canScrollLeft = scrollIndex > 0
  const canScrollRight = scrollIndex < Math.max(0, properties.length - 3)

  if (loading) {
    return (
      <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[#f4f9ef] border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-[300px] bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  const visibleProperties = properties.slice(scrollIndex, scrollIndex + 3)

  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[#f4f9ef] border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
              <BadgeCheck size={12} />
              Verified Listings
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Latest Land & Property Listings Across India</h2>
            <p className="text-sm text-gray-600">Browse agricultural land, residential plots, commercial properties, industrial land, farmhouses, villas, and investment opportunities with verified ownership records, transparent pricing, and complete property details all in one trusted marketplace.</p>
          </div>
          {properties.length > 3 && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollListings("previous")}
                disabled={!canScrollLeft}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollListings("next")}
                disabled={!canScrollRight}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div
          ref={sliderRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-hidden scroll-smooth"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          aria-label="Latest land and property listings"
        >
          {properties.length > 0 ? (
            properties.map((property) => (
              <Link key={property._id} href={getPropertyUrl(property)} className="group block min-w-0 shrink-0 basis-full snap-start md:basis-[calc((100%-3rem)/3)]">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-primary/15 hover:border-primary/40 h-full flex flex-col">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={property.main_thumbnail || property.images?.[0] || "/placeholder.jpg"}
                      alt={property.property_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "/placeholder.jpg" }}
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 shadow"><Clock size={10} /> Verified</div>
                    <div className="absolute right-3 top-3 flex flex-col items-end gap-1 text-[10px] font-semibold text-white"><span className="flex items-center gap-1 rounded-full bg-slate-900/75 px-2 py-1"><Eye size={10} /> {weeklyViews[property._id] ?? 20} views this week</span><span className="flex items-center gap-1 rounded-full bg-amber-600/90 px-2 py-1"><Zap size={10} /> {property.inquiries || 12} inquiries</span></div>
                  </div>

                  <div className="p-4 flex flex-col gap-2.5 flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
                      {property.property_name}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} className="shrink-0 text-slate-400" />
                      <span className="line-clamp-1">{property.neighborhood || property.address}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(property.area_value || property.area_sqft) && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded flex items-center gap-1">
                          <Maximize2 size={10} />
                          {property.area_value
                            ? `${property.area_value} ${property.area_unit || "acre"}`
                            : `${property.area_sqft?.toLocaleString("en-IN")} sqft`}
                        </span>
                      )}
                      {property.area_value && property.area_unit && (property.area_unit === "acre" || property.area_unit === "acres") && (
                        <span className="rounded bg-amber-50 px-2 py-0.5 text-xs text-amber-800">{property.area_value} Acre ({Math.round(Number(property.area_value) * 8)} Bigha)</span>
                      )}
                      {property.property_type && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                          {property.property_type.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <p className="text-sm font-bold text-primary">
                        {property.price_range || formatPriceRange(property.lowest_price, property.max_price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-sm">No new properties available at the moment</p>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/buy">View All New Listings</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
