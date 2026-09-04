import Link from "next/link"
import { Building2, MapPin, ArrowRight, ArrowUpRight } from "lucide-react"

type City = {
  name: string
  state: string
  count: string
  href: string
}

const cities: City[] = [
  { name: "Gurugram", state: "Haryana", count: "620+", href: "/buy?region=gurugram" },
  { name: "Faridabad", state: "Haryana", count: "410+", href: "/buy?region=faridabad" },
  { name: "Bhiwadi", state: "Rajasthan", count: "530+", href: "/buy?region=bhiwadi" },
  { name: "Neemrana", state: "Rajasthan", count: "290+", href: "/buy?region=neemrana" },
  { name: "Alwar", state: "Rajasthan", count: "480+", href: "/buy?region=alwar" },
  { name: "Jaipur", state: "Rajasthan", count: "710+", href: "/buy?region=jaipur" },
  { name: "Noida", state: "Uttar Pradesh", count: "650+", href: "/buy?region=noida" },
  { name: "Sonipat", state: "Haryana", count: "340+", href: "/buy?region=sonipat" },
]

export default function PopularCities() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[var(--land-cream)] border-t border-[var(--land-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg border border-[var(--land-border)] shadow-sm">
              <Building2 size={20} className="text-[var(--land-sage)]" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--land-earth)]">Explore Land by City</h2>
              <p className="text-sm text-[var(--land-earth)]/60 font-medium">
                Verified plots &amp; land parcels in India&apos;s fastest-growing cities
              </p>
            </div>
          </div>
          <Link
            href="/buy"
            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[var(--land-primary)] hover:gap-2 transition-all"
          >
            View all cities <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={city.href}
              className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[var(--land-border)] p-5 shadow-sm hover:shadow-lg hover:border-[var(--land-sage)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              {/* decorative pin watermark */}
              <MapPin
                size={64}
                className="absolute -right-3 -bottom-3 text-[var(--land-sage)]/10 group-hover:text-[var(--land-sage)]/20 transition-colors"
                strokeWidth={1.5}
              />

              <div className="relative flex items-start justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--land-primary)]/8 px-2.5 py-1 text-[11px] font-semibold text-[var(--land-primary)]">
                  {city.count} listings
                </span>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--land-earth)]/30 group-hover:text-[var(--land-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </div>

              <div className="relative mt-8">
                <h3 className="text-lg font-bold text-[var(--land-earth)] group-hover:text-[var(--land-primary)] transition-colors">
                  {city.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--land-earth)]/55 font-medium">
                  <MapPin size={11} className="text-[var(--land-sage)]" />
                  {city.state}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:hidden">
          <Link
            href="/buy"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--land-primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--land-primary)]/85 transition-colors"
          >
            View all cities <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
