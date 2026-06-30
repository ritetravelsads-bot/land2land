import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"

const locations = [
  { name: "Alwar", href: "/buy?region=alwar" },
  { name: "Kotputli", href: "/buy?region=kotputli" },
  { name: "Dausa", href: "/buy?region=dausa" },
  { name: "Neemrana", href: "/buy?region=neemrana" },
  { name: "Bhiwadi", href: "/buy?region=bhiwadi" },
  { name: "Ladiyaka", href: "/buy?region=ladiyaka" },
  { name: "Gurugram", href: "/buy?region=gurugram" },
  { name: "Faridabad", href: "/buy?region=faridabad" },
  { name: "Sonipat", href: "/buy?region=sonipat" },
  { name: "Panipat", href: "/buy?region=panipat" },
  { name: "Rohtak", href: "/buy?region=rohtak" },
  { name: "Jaipur", href: "/buy?region=jaipur" },
]

export default function PopularLocations() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[#f8faf5] border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={20} className="text-[#2d5016]" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Popular Locations</h2>
            </div>
            <p className="text-sm text-gray-500">Explore new investments</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              href={loc.href}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#2d5016] hover:text-[#2d5016] hover:bg-[#2d5016]/5 transition-all duration-200 shadow-sm hover:shadow group"
            >
              <MapPin size={13} className="text-gray-400 group-hover:text-[#2d5016] transition-colors" />
              {loc.name}
            </Link>
          ))}
          <Link
            href="/buy"
            className="flex items-center gap-1.5 px-4 py-2 bg-[#2d5016] text-white rounded-full text-sm font-medium hover:bg-[#1d3610] transition-all duration-200 shadow-sm hover:shadow group"
          >
            View All
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
