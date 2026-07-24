"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowRight } from "lucide-react"

const regions = [
  {
    name: "Haryana",
    description: "Explore NCR, industrial, residential & investment land in Haryana.",
    count: "1,240+",
    image: "/regions/punjab.png",
    href: "/buy?region=punjab",
    accent: "from-amber-600/80 to-amber-900/80",
  },
  {
    name: "Punjab",
    description: "Verified agricultural, residential, commercial & industrial land across Punjab.",
    count: "980+",
    image: "/regions/haryana.png",
    href: "/buy?region=haryana",
    accent: "from-slate-700/80 to-slate-900/80",
  },
  {
    name: "Uttar Pradesh",
    description: "Find verified farmland, plots, commercial & industrial land across Uttar Pradesh.",
    count: "2,150+",
    image: "/regions/up.png",
    href: "/buy?region=uttar-pradesh",
    accent: "from-emerald-700/80 to-emerald-900/80",
  },
  {
    name: "Rajasthan",
    description: "Discover agricultural, tourism, solar & investment land in Rajasthan.",
    count: "890+",
    image: "/regions/rajasthan.png",
    href: "/buy?region=rajasthan",
    accent: "from-orange-600/80 to-orange-900/80",
  },
  {
    name: "Madhya Pradesh",
    description: "Browse affordable agricultural, residential & commercial land in Madhya Pradesh.",
    count: "760+",
    image: "/regions/mp.png",
    href: "/buy?region=madhya-pradesh",
    accent: "from-stone-600/80 to-stone-900/80",
  },
  {
    name: "Maharashtra",
    description: "Explore premium commercial, industrial, residential & investment land in Maharashtra.",
    count: "1,120+",
    image: "/regions/maharashtra.png",
    href: "/buy?region=maharashtra",
    accent: "from-blue-700/80 to-blue-900/80",
  },
]

export default function PopularRegions() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[#f7f5f2] border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg border border-stone-200">
              <MapPin size={20} className="text-stone-600" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Lands For You</h2>
              <p className="text-sm text-gray-500 font-medium">Explore Verified Land for Sale Across India by State</p>
            </div>
          </div>
          <Button asChild variant="ghost" size="sm" className="hidden md:flex text-gray-500 hover:text-gray-800">
            <Link href="/buy">View all states <ArrowRight size={14} className="ml-1" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regions.map((region) => (
            <Link
              key={region.name}
              href={region.href}
              className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 h-52"
            >
              {/* Real photo background */}
              <Image
                src={region.image}
                alt={`Land for sale in ${region.name}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient overlay - state-specific accent color */}
              <div className={`absolute inset-0 bg-gradient-to-t ${region.accent}`} />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-5 text-white">
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold">
                    <MapPin size={10} />
                    {region.count} listings
                  </div>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-1">{region.name}</h3>
                  <p className="text-xs text-white/85 line-clamp-2 mb-3">{region.description}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-white/90 group-hover:text-white transition-colors">
                    Explore land <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild variant="outline" className="border-stone-300 text-stone-700 hover:bg-stone-50">
            <Link href="/buy">View All States</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
