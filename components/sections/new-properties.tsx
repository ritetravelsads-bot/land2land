"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize2, Clock, ChevronRight, ChevronLeft } from "lucide-react"
import { formatPriceRange, getPropertyUrl } from "@/lib/utils"

export default function NewProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [scrollIndex, setScrollIndex] = useState(0)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties?limit=6&sort=newest")
        const data = await response.json()
        setProperties(data.properties || [])
      } catch {
        setProperties([])
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const canScrollLeft = scrollIndex > 0
  const canScrollRight = scrollIndex < Math.max(0, properties.length - 3)

  if (loading) {
    return (
      <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-gray-50 border-t border-border/50">
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
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-gray-50 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={20} className="text-[#2d5016]" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Properties</h2>
            </div>
            <p className="text-sm text-gray-500">Latest listings on Land2Land</p>
          </div>
          {properties.length > 3 && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setScrollIndex(i => Math.max(0, i - 1))}
                disabled={!canScrollLeft}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setScrollIndex(i => Math.min(properties.length - 3, i + 1))}
                disabled={!canScrollRight}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProperties.length > 0 ? (
            visibleProperties.map((property) => (
              <Link key={property._id} href={getPropertyUrl(property)} className="group block">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 h-full flex flex-col">
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={property.main_thumbnail || property.images?.[0] || "/placeholder.jpg"}
                      alt={property.property_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => { e.currentTarget.src = "/placeholder.jpg" }}
                    />
                    <div className="absolute top-3 left-3 bg-white/90 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 shadow">
                      <Clock size={10} />
                      New
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-2.5 flex-1">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-[#2d5016] transition-colors">
                      {property.property_name}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} className="shrink-0 text-[#2d5016]" />
                      <span className="line-clamp-1">{property.neighborhood || property.address}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {(property.area_value || property.area_sqft) && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                          <Maximize2 size={10} />
                          {property.area_value
                            ? `${property.area_value} ${property.area_unit || "acre"}`
                            : `${property.area_sqft?.toLocaleString("en-IN")} sqft`}
                        </span>
                      )}
                      {property.property_type && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded capitalize">
                          {property.property_type.replace(/_/g, " ")}
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-2 border-t border-gray-100">
                      <p className="text-sm font-bold text-[#2d5016]">
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
          <Button asChild className="bg-[#2d5016] hover:bg-[#1d3610] text-white">
            <Link href="/buy">View All New Listings</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
