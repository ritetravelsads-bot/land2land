import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const landTypes = [
  {
    name: "Agricultural Land",
    description: "Fertile cropland, irrigated fields & arable parcels",
    listings: "45,000+",
    image: "/land-types/agricultural.png",
    href: "/land/agricultural",
    badge: "Most Popular",
    badgeColor: "bg-amber-500",
  },
  {
    name: "Residential Plot",
    description: "Approved layouts, NA plots & township schemes",
    listings: "32,000+",
    image: "/land-types/residential.png",
    href: "/land/residential-plot",
    badge: "High Demand",
    badgeColor: "bg-blue-600",
  },
  {
    name: "Commercial Plot",
    description: "Highway-facing land, market plots & retail parcels",
    listings: "8,500+",
    image: "/land-types/commercial.png",
    href: "/land/commercial-plot",
    badge: null,
    badgeColor: "",
  },
  {
    name: "Industrial Land",
    description: "MIDC notified zones, warehousing & factory plots",
    listings: "4,200+",
    image: "/land-types/industrial.png",
    href: "/land/industrial",
    badge: null,
    badgeColor: "",
  },
  {
    name: "Farmland",
    description: "Managed farms, orchards, plantations & agri estates",
    listings: "12,800+",
    image: "/land-types/farmland.png",
    href: "/land/farmland",
    badge: null,
    badgeColor: "",
  },
  {
    name: "NA / Vacant Plot",
    description: "Non-agricultural converted plots ready for construction",
    listings: "18,400+",
    image: "/land-types/na-plot.png",
    href: "/land/na-plot",
    badge: "New",
    badgeColor: "bg-amber-500",
  },
]

export default function LandTypesBrowse() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Browse by Category</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-balance">
              Every Type of Land,<br className="hidden sm:block" /> One Marketplace
            </h2>
          </div>
          <Link
            href="/buy"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors shrink-0"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {landTypes.map((type, index) => (
            <Link
              key={type.name}
              href={type.href}
              className={`group relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 ${
                index === 0 ? "col-span-2 md:col-span-1 row-span-1 h-52 md:h-64" : "h-44 md:h-52"
              }`}
            >
              {/* Photo */}
              <Image
                src={type.image}
                alt={type.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Dark overlay — heavier at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5 group-hover:from-black/85 transition-all duration-300" />

              {/* Badge */}
              {type.badge && (
                <div className={`absolute top-3 left-3 ${type.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                  {type.badge}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-[10px] font-semibold text-white/70 uppercase tracking-wider mb-0.5">
                  {type.listings} listings
                </p>
                <h3 className="text-sm md:text-base font-bold text-white leading-tight mb-0.5">
                  {type.name}
                </h3>
                <p className="text-[11px] text-white/75 leading-tight line-clamp-1 hidden md:block">
                  {type.description}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold text-white/80 group-hover:text-white transition-colors">
                  Explore <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View all" */}
        <div className="flex justify-center pt-6 md:hidden">
          <Link
            href="/buy"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-300 px-5 py-2 rounded-full hover:bg-slate-50 transition-colors"
          >
            View all land types <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
