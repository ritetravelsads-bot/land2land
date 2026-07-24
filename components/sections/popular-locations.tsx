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
    <section className="w-full py-10 md:py-14 px-3 md:px-4 bg-[var(--land-cream)] border-t border-[var(--land-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={18} className="text-[var(--land-sage)]" />
              <h2 className="text-xl md:text-2xl font-bold text-[var(--land-earth)]">Popular Locations</h2>
            </div>
            <p className="text-sm text-[var(--land-earth)]/60">Explore verified land for sale in India's top cities and districts.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {locations.map((loc) => (
            <Link
              key={loc.name}
              href={loc.href}
              className="flex items-center gap-1.5 px-4 py-2 bg-white border border-[var(--land-border)] rounded-full text-sm text-[var(--land-earth)] hover:border-[var(--land-sage)] hover:text-[var(--land-primary)] hover:bg-[var(--muted)] transition-all duration-200 shadow-sm group"
            >
              <MapPin size={12} className="text-[var(--land-sage)] opacity-70 group-hover:opacity-100 transition-opacity" />
              {loc.name}
            </Link>
          ))}
          <Link
            href="/buy"
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--land-primary)] text-white rounded-full text-sm font-medium hover:bg-[var(--land-primary)]/85 transition-all duration-200 shadow-sm group"
          >
            View All
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
