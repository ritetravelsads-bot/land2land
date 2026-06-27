"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Maximize2, TrendingUp, Leaf } from "lucide-react"
import { formatPriceRange, getPropertyUrl } from "@/lib/utils"

export default function TrendingLandProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("/api/properties?limit=6&sort=featured&featured=true")
        const data = await response.json()
        setProperties(data.properties || [])
      } catch (error) {
        console.error("[v0] Error fetching trending land properties:", error)
        setProperties([])
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  if (loading) {
    return (
      <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-gradient-to-b from-white to-green-50/30 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf size={20} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Land Properties</h2>
              <p className="text-sm text-gray-600 font-medium">Most viewed & high-demand land listings across India</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <Link key={property._id} href={getPropertyUrl(property)} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full">
                  {/* Image container */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={property.main_thumbnail || property.images?.[0] || "/placeholder.jpg"}
                      alt={property.property_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg"
                      }}
                    />
                    {property.is_featured && (
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <TrendingUp size={14} />
                        Trending
                      </div>
                    )}
                    {property.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{property.discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col gap-3">
                    {/* Title and location */}
                    <div className="space-y-1">
                      <h3 className="font-bold text-base text-gray-900 line-clamp-2">{property.property_name}</h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin size={14} className="shrink-0 text-green-600" />
                        <span className="line-clamp-1">{property.neighborhood || property.address}</span>
                      </div>
                    </div>

                    {/* Property details */}
                    <div className="flex items-center gap-3 flex-wrap py-2 border-t border-b border-gray-100">
                      {(property.area_value || property.area_sqft) && (
                        <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded text-xs font-medium text-green-700">
                          <Maximize2 size={12} />
                          {property.area_value
                            ? `${property.area_value} ${property.area_unit || "acre"}`
                            : `${property.area_sqft?.toLocaleString("en-IN")} sqft`}
                        </div>
                      )}
                      {property.property_type && (
                        <div className="flex items-center gap-1.5 bg-blue-50 px-2 py-1 rounded text-xs font-medium text-blue-700 capitalize">
                          <Leaf size={12} />
                          {property.property_type.replace(/_/g, " ")}
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between">
                        <p className="text-lg font-bold text-green-700">
                          {property.price_range || formatPriceRange(property.lowest_price, property.max_price)}
                        </p>
                        {property.old_price && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPriceRange(property.old_price, property.old_price)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white h-9 text-sm font-semibold">
                      View Details
                    </Button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              <p className="text-sm">No trending land properties available at the moment</p>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/buy">Browse All Land Listings</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
