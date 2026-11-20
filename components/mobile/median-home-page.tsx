import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Factory,
  FileCheck2,
  Handshake,
  Home,
  Search,
  SlidersHorizontal,
  Sprout,
  Store,
  Wheat,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import MedianPropertyFeed from "@/components/mobile/median-property-feed"
import MedianPopularLocations from "@/components/mobile/median-popular-locations"

const categories = [
  { name: "Agricultural", href: "/land/agricultural", icon: Wheat },
  { name: "Farmhouse", href: "/land/farmland", icon: Sprout },
  { name: "Residential", href: "/land/residential-plot", icon: Home },
  { name: "Commercial", href: "/land/commercial-plot", icon: Store },
  { name: "Industrial", href: "/land/industrial", icon: Factory },
  { name: "Vacant land", href: "/land/vacant", icon: Building2 },
  { name: "Abadi land", href: "/land/abadi-land", icon: Home },
]

const landServices = [
  { title: "Land advisory", description: "Guidance for your land search and investment goals.", href: "/services/advisory", icon: Handshake },
  { title: "Legal & document support", description: "Explore due-diligence resources and state record portals.", href: "/services/legal", icon: FileCheck2 },
  { title: "Home loan assistance", description: "Learn about financing options for your property.", href: "/services/home-loans", icon: Home },
  { title: "NRI services", description: "Support for non-resident Indians exploring property in India.", href: "/services/nri", icon: Building2 },
]

export default function MedianHomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl bg-background pb-6 text-foreground">
      <section className="px-4 pb-3 pt-4">
        <p className="text-xs font-medium text-muted-foreground">Explore land that fits your plans</p>
        <h1 className="mt-1 text-xl font-bold leading-tight tracking-tight">Find your place to grow.</h1>
        <form action="/properties" method="get" role="search" className="mt-4 flex min-h-14 items-center gap-2 rounded-2xl border border-border bg-card p-1.5 pl-4 shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="app-land-search" className="sr-only">Search land, plots, and locations</label>
          <input
            id="app-land-search"
            name="search"
            type="search"
            placeholder="Search land, plots, locations..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Link href="/properties" aria-label="Open property filters" className="flex size-11 shrink-0 items-center justify-center rounded-xl text-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <SlidersHorizontal className="size-5" aria-hidden="true" />
          </Link>
        </form>
      </section>

      <section aria-labelledby="app-categories-heading" className="py-4">
        <div className="mb-3 flex items-center justify-between px-4">
          <h2 id="app-categories-heading" className="text-base font-bold">Explore categories</h2>
          <Link href="/properties" className="flex min-h-10 items-center gap-1 text-xs font-semibold text-primary">See all <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
        </div>
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1">
          {categories.map(({ name, href, icon: Icon }) => (
            <Link key={name} href={href} className="flex w-[4.75rem] shrink-0 snap-start flex-col items-center gap-2 rounded-xl py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/5">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <span className="text-[11px] font-medium leading-tight text-foreground">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Explore land listings" className="px-4 py-3">
        <div className="relative isolate flex min-h-44 overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-sm">
          <Image src="/banners/banner-all.webp" alt="Open land and countryside" fill sizes="(max-width: 672px) 100vw, 640px" className="-z-20 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="flex max-w-[78%] flex-col items-start justify-center p-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/80">Land2Land marketplace</span>
            <h2 className="mt-1.5 text-xl font-bold leading-tight text-white">A better way to find your next piece of land.</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-white/85">Browse real listings, compare locations, and explore your options.</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button asChild size="sm" className="min-h-10 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/properties">Explore properties <ArrowRight data-icon="inline-end" /></Link>
              </Button>
              <Link href="/sell" className="inline-flex min-h-10 items-center rounded-xl border border-white/50 bg-black/15 px-3 text-xs font-semibold text-white transition-colors hover:bg-black/30">List your land</Link>
            </div>
          </div>
        </div>
      </section>

      <MedianPropertyFeed
        title="Featured Properties"
        description="Explore featured land listings."
        href="/properties?featured=true"
        endpoint="/api/properties?limit=4&sort=featured&featured=true"
        emptyMessage="No featured listings are available right now. Browse all land to see current inventory."
        layout="grid"
      />

      <MedianPropertyFeed
        title="Recently Added"
        description="The latest published land listings."
        href="/properties?sort=newest"
        endpoint="/api/properties?limit=6&sort=newest"
        emptyMessage="New listings will appear here as they become available."
      />

      <MedianPopularLocations />

      <section aria-labelledby="app-services-heading" className="px-4 py-5">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 id="app-services-heading" className="text-base font-bold">Land2Land services</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Support for your next land decision.</p>
          </div>
          <Link href="/services" className="flex min-h-10 shrink-0 items-center gap-1 text-xs font-semibold text-primary">All services <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {landServices.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="flex min-h-32 flex-col items-start rounded-2xl border border-border bg-card p-3.5 transition-colors hover:border-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-5" aria-hidden="true" /></span>
              <span className="mt-3 text-sm font-bold leading-tight">{title}</span>
              <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="app-resources-heading" className="px-4 py-5">
        <div className="mb-3 flex items-center gap-2">
          <FileCheck2 className="size-5 text-primary" aria-hidden="true" />
          <h2 id="app-resources-heading" className="text-base font-bold">Land buyer resources</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/how-it-works" className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-border bg-card p-3 text-sm font-semibold">
            How it works <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          </Link>
          <Link href="/state-land-portals" className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-border bg-card p-3 text-sm font-semibold">
            State land portals <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          </Link>
          <Link href="/blogs" className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-border bg-card p-3 text-sm font-semibold">
            Land buying guides <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          </Link>
          <Link href="/area-converter" className="flex min-h-16 items-center justify-between gap-2 rounded-xl border border-border bg-card p-3 text-sm font-semibold">
            Area converter <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>
        <details className="group mt-3 rounded-xl border border-border bg-card p-3.5">
          <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            What should I check before buying land?
            <ArrowRight className="size-4 shrink-0 rotate-90 text-muted-foreground transition-transform group-open:-rotate-90" aria-hidden="true" />
          </summary>
          <p className="pb-1 pt-2 text-sm leading-relaxed text-muted-foreground">
            Review ownership and revenue records, land use, access, and boundaries. Requirements vary by state and parcel, so confirm details with local authorities or a qualified professional.
          </p>
        </details>
      </section>
    </main>
  )
}
