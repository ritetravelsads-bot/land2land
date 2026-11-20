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
    <main className="mx-auto min-h-screen w-full max-w-2xl overflow-hidden bg-background pb-8 text-foreground">
      <section className="px-5 pb-4 pt-5 sm:px-6">
        <p className="text-[12px] font-semibold tracking-wide text-primary">Explore land that fits your plans</p>
        <h1 className="mt-1 max-w-[19rem] text-[28px] font-bold leading-[1.12] tracking-[-0.035em] text-foreground">Find your place to grow.</h1>
        <form action="/properties" method="get" role="search" className="mt-5 flex min-h-[58px] items-center gap-2.5 rounded-[18px] border border-border/80 bg-card p-1.5 pl-4 shadow-[0_5px_18px_-12px_rgba(25,55,30,0.35)] transition-shadow focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/15">
          <Search className="size-5 shrink-0 text-primary" aria-hidden="true" />
          <label htmlFor="app-land-search" className="sr-only">Search land, plots, and locations</label>
          <input
            id="app-land-search"
            name="search"
            type="search"
            placeholder="Search land, plots, locations..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-2 text-[13px] font-medium outline-none placeholder:font-normal placeholder:text-muted-foreground"
          />
          <Link href="/properties" aria-label="Open property filters" className="flex size-11 shrink-0 items-center justify-center rounded-[13px] bg-primary/8 text-primary transition-colors hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <SlidersHorizontal className="size-[19px]" aria-hidden="true" />
          </Link>
        </form>
      </section>

      <section aria-labelledby="app-categories-heading" className="pb-4 pt-2">
        <div className="mb-2 flex items-center justify-between px-5 sm:px-6">
          <div>
            <h2 id="app-categories-heading" className="text-[17px] font-bold tracking-[-0.02em]">Explore categories</h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">A place for every possibility</p>
          </div>
          <Link href="/properties" className="flex min-h-10 items-center gap-1 text-xs font-semibold text-primary">See all <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
        </div>
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:px-6">
          {categories.map(({ name, href, icon: Icon }, index) => (
            <Link key={name} href={href} className="group flex w-[4.55rem] shrink-0 snap-start flex-col items-center gap-2 rounded-2xl py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className={`flex size-[58px] items-center justify-center rounded-[19px] border transition-all duration-200 group-active:scale-95 ${index === 0 ? "border-primary/15 bg-primary text-primary-foreground shadow-[0_7px_16px_-9px_rgba(36,91,35,0.8)]" : "border-primary/10 bg-[#edf3e9] text-primary group-hover:bg-primary/15"}`}>
                <Icon className="size-[23px]" strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="text-[10.5px] font-semibold leading-tight text-foreground">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Explore land listings" className="px-4 py-3 sm:px-5">
        <div className="relative isolate flex min-h-[218px] overflow-hidden rounded-[25px] bg-[#203d25] text-primary-foreground shadow-[0_14px_30px_-17px_rgba(22,48,24,0.55)]">
          <Image src="/banners/banner-all.webp" alt="Open land and countryside" fill sizes="(max-width: 672px) 100vw, 640px" priority className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102516]/90 via-[#17311d]/65 to-[#17311d]/10" />
          <div className="flex max-w-[88%] flex-col items-start justify-center p-5 sm:p-6">
            <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white/90">Land2Land marketplace</span>
            <h2 className="mt-3 max-w-[18rem] text-[23px] font-bold leading-[1.13] tracking-[-0.025em] text-white">A better way to find your next piece of land.</h2>
            <p className="mt-2 max-w-[17rem] text-[12px] leading-[1.55] text-white/85">Browse real listings, compare locations, and explore your options.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button asChild size="sm" className="min-h-10 rounded-xl bg-[#eff5e9] px-3.5 font-semibold text-[#254b24] shadow-sm hover:bg-white">
                <Link href="/properties">Explore properties <ArrowRight data-icon="inline-end" /></Link>
              </Button>
              <Link href="/sell" className="inline-flex min-h-10 items-center rounded-xl border border-white/35 bg-white/10 px-3 text-xs font-semibold text-white transition-colors hover:bg-white/20">List your land</Link>
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

      <section aria-labelledby="app-services-heading" className="px-5 py-5 sm:px-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 id="app-services-heading" className="text-[17px] font-bold tracking-[-0.02em]">Land2Land services</h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Support for your next land decision.</p>
          </div>
          <Link href="/services" className="flex min-h-10 shrink-0 items-center gap-1 text-xs font-semibold text-primary">All services <ArrowRight className="size-3.5" aria-hidden="true" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {landServices.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="group flex min-h-[142px] flex-col items-start rounded-[18px] border border-border/80 bg-card p-3.5 shadow-[0_4px_16px_-14px_rgba(30,50,30,0.35)] transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <span className="flex size-10 items-center justify-center rounded-[14px] bg-[#edf3e9] text-primary transition-colors group-hover:bg-primary/15"><Icon className="size-[19px]" strokeWidth={1.9} aria-hidden="true" /></span>
              <span className="mt-3 text-[13px] font-bold leading-[1.25]">{title}</span>
              <span className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">{description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="app-resources-heading" className="px-5 py-5 sm:px-6">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-xl bg-[#edf3e9] text-primary"><FileCheck2 className="size-[18px]" aria-hidden="true" /></span>
          <div>
            <h2 id="app-resources-heading" className="text-[17px] font-bold tracking-[-0.02em]">Land buyer resources</h2>
            <p className="text-[11px] text-muted-foreground">Helpful guides for a confident purchase</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/how-it-works" className="flex min-h-[62px] items-center justify-between gap-2 rounded-[15px] border border-border/80 bg-card p-3 text-[12px] font-semibold shadow-[0_3px_12px_-11px_rgba(30,50,30,0.4)]">How it works <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" /></Link>
          <Link href="/state-land-portals" className="flex min-h-[62px] items-center justify-between gap-2 rounded-[15px] border border-border/80 bg-card p-3 text-[12px] font-semibold shadow-[0_3px_12px_-11px_rgba(30,50,30,0.4)]">State land portals <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" /></Link>
          <Link href="/blogs" className="flex min-h-[62px] items-center justify-between gap-2 rounded-[15px] border border-border/80 bg-card p-3 text-[12px] font-semibold shadow-[0_3px_12px_-11px_rgba(30,50,30,0.4)]">Land buying guides <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" /></Link>
          <Link href="/area-converter" className="flex min-h-[62px] items-center justify-between gap-2 rounded-[15px] border border-border/80 bg-card p-3 text-[12px] font-semibold shadow-[0_3px_12px_-11px_rgba(30,50,30,0.4)]">Area converter <ArrowRight className="size-4 shrink-0 text-primary" aria-hidden="true" /></Link>
        </div>
        <details className="group mt-3 rounded-[16px] border border-border/80 bg-card p-3.5">
          <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-[13px] font-semibold [&::-webkit-details-marker]:hidden">
            What should I check before buying land?
            <ArrowRight className="size-4 shrink-0 rotate-90 text-muted-foreground transition-transform group-open:-rotate-90" aria-hidden="true" />
          </summary>
          <p className="pb-1 pt-2 text-[12px] leading-relaxed text-muted-foreground">
            Review ownership and revenue records, land use, access, and boundaries. Requirements vary by state and parcel, so confirm details with local authorities or a qualified professional.
          </p>
        </details>
      </section>
    </main>
  )
}
