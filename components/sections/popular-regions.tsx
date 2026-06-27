"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"

const regions = [
  {
    name: "Punjab",
    description: "Rich agricultural heritage, high-quality farmland",
    count: "1,240+",
    image: "/regions/punjab.jpg",
    href: "/buy?region=punjab",
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Haryana",
    description: "Strategic location, growing investment potential",
    count: "980+",
    image: "/regions/haryana.jpg",
    href: "/buy?region=haryana",
    color: "from-orange-400 to-red-500",
  },
  {
    name: "Uttar Pradesh",
    description: "Largest agricultural market, diverse land types",
    count: "2,150+",
    image: "/regions/up.jpg",
    href: "/buy?region=uttar-pradesh",
    color: "from-green-400 to-teal-500",
  },
  {
    name: "Rajasthan",
    description: "Investment opportunities in semi-arid regions",
    count: "890+",
    image: "/regions/rajasthan.jpg",
    href: "/buy?region=rajasthan",
    color: "from-pink-400 to-rose-500",
  },
  {
    name: "Madhya Pradesh",
    description: "Central India hub, affordable agricultural land",
    count: "760+",
    image: "/regions/mp.jpg",
    href: "/buy?region=madhya-pradesh",
    color: "from-blue-400 to-indigo-500",
  },
  {
    name: "Maharashtra",
    description: "Commercial farming, high-value orchards",
    count: "1,120+",
    image: "/regions/maharashtra.jpg",
    href: "/buy?region=maharashtra",
    color: "from-purple-400 to-pink-500",
  },
]

export default function PopularRegions() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin size={20} className="text-green-700" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse by Region</h2>
              <p className="text-sm text-gray-600 font-medium">Explore agricultural land opportunities across India</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region) => (
            <Link
              key={region.name}
              href={region.href}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-64"
            >
              {/* Background image with overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${region.color} opacity-80 group-hover:opacity-90 transition-opacity`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-5 text-white">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{region.name}</h3>
                  <p className="text-sm text-white/90 line-clamp-2">{region.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">{region.count}</p>
                    <p className="text-xs text-white/80">Listings</p>
                  </div>
                  <div className="bg-white/20 group-hover:bg-white/40 transition-all p-2 rounded-lg backdrop-blur-sm">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
            <Link href="/buy">View All Regions</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
