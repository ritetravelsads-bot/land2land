import Link from "next/link"
import {
  ArrowRight,
  BookOpenText,
  Factory,
  FileCheck2,
  Handshake,
  Home,
  MapPin,
  Ruler,
  Search,
  ShieldCheck,
  Sprout,
  Store,
  Wheat,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import MedianPropertyFeed from "@/components/mobile/median-property-feed"

const categories = [
  { name: "Agricultural", href: "/land/agricultural", icon: Wheat },
  { name: "Residential", href: "/land/residential-plot", icon: Home },
  { name: "Commercial", href: "/land/commercial-plot", icon: Store },
  { name: "Industrial", href: "/land/industrial", icon: Factory },
]

const popularLocations = ["Gurugram", "Sonipat", "Faridabad", "Panipat", "Jaipur", "Ludhiana"]

const landServices = [
  {
    title: "Land advisory",
    description: "Get guidance for your land search and investment goals.",
    href: "/services/advisory",
    icon: Handshake,
  },
  {
    title: "Legal & document support",
    description: "Explore due-diligence resources and state record portals.",
    href: "/services/legal",
    icon: FileCheck2,
  },
  {
    title: "Transaction support",
    description: "Get help with next steps after a land purchase or sale.",
    href: "/services/after-sales",
    icon: Handshake,
  },
]

const buyingFaqs = [
  {
    question: "What should I check before buying land?",
    answer: "Review ownership and revenue records, land use, access, and boundaries. Requirements vary by state and parcel, so confirm details with local authorities or a qualified professional.",
  },
  {
    question: "Do land measurements vary by state?",
    answer: "Yes. Regional units and conversion conventions can differ. Confirm the recorded unit for the parcel before comparing areas or prices.",
  },
]

export default function MedianHomePage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl bg-muted/20 pb-6 text-foreground">
      <section className="bg-gradient-to-br from-primary to-primary/85 px-4 pb-7 pt-5 text-primary-foreground">
        <div className="mx-auto max-w-xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">Land2Land marketplace</p>
          <h1 className="max-w-md text-3xl font-bold leading-tight">Find land for what comes next.</h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            Discover land listings, explore locations, and get practical help with your search.
          </p>
          <form action="/properties" method="get" className="mt-5 flex min-h-14 items-center gap-2 rounded-2xl bg-card p-1.5 pl-4 shadow-lg">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="app-land-search" className="sr-only">Search land and properties</label>
            <input
              id="app-land-search"
              name="search"
              type="search"
              placeholder="Search land, city, or state"
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" size="icon" className="size-11 shrink-0 rounded-xl" aria-label="Search">
              <Search data-icon="inline-start" />
            </Button>
          </form>
        </div>
      </section>

      <section aria-label="Choose how to get started" className="grid grid-cols-2 gap-3 px-4 py-5">
        <Link href="/properties" className="group flex min-h-28 flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="size-5" aria-hidden="true" />
          </span>
          <span className="flex items-center justify-between gap-2 text-sm font-bold">
            Buy land <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
        <Link href="/sell" className="group flex min-h-28 flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:border-primary/40">
          <span className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          <span className="flex items-center justify-between gap-2 text-sm font-bold">
            Sell land <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      </section>

      <section aria-labelledby="app-categories-heading" className="px-4 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 id="app-categories-heading" className="text-lg font-bold">Browse by category</h2>
          <Link href="/properties" className="flex min-h-10 items-center gap-1 text-xs font-semibold text-primary">
            All land <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {categories.map(({ name, href, icon: Icon }) => (
            <Link key={name} href={href} className="flex min-h-16 items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 transition-colors hover:border-primary/40">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold">{name}</span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <MedianPropertyFeed
        title="Featured properties"
        description="Listings selected for your discovery."
        href="/properties?sort=featured"
        endpoint="/api/properties?limit=6&sort=featured&featured=true"
        emptyMessage="No featured listings are available right now. Browse all land to see current inventory."
      />

      <section aria-labelledby="app-locations-heading" className="px-4 py-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 id="app-locations-heading" className="text-lg font-bold">Popular locations</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">Explore land in key cities and districts.</p>
          </div>
          <MapPin className="size-5 text-primary" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap gap-2">
          {popularLocations.map((city) => (
            <Link
              key={city}
              href={`/properties?city=${encodeURIComponent(city)}`}
              className="inline-flex min-h-10 items-center rounded-full border border-border bg-card px-3.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
            >
              {city}
            </Link>
          ))}
        </div>
      </section>

      <MedianPropertyFeed
        title="Recently added"
        description="New listings from across India."
        href="/properties?sort=newest"
        endpoint="/api/properties?limit=6&sort=newest"
        emptyMessage="New listings will appear here as they become available."
      />

      <section aria-labelledby="app-services-heading" className="px-4 py-5">
        <div className="mb-3">
          <h2 id="app-services-heading" className="text-lg font-bold">Land services</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">Support for your next land decision.</p>
        </div>
        <div className="grid gap-3">
          {landServices.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className="flex min-h-20 items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold">{title}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{description}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="app-verification-heading" className="mx-4 my-4 rounded-2xl bg-primary p-5 text-primary-foreground">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h2 id="app-verification-heading" className="text-lg font-bold">Know what to verify</h2>
            <p className="mt-1 text-sm leading-relaxed text-primary-foreground/80">
              Understand which checks are available for a listing. Requirements vary by state and parcel.
            </p>
          </div>
        </div>
        <ol className="mt-4 grid gap-2 text-xs text-primary-foreground/90">
          <li className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2.5">
            <span className="font-bold text-primary-foreground/65">01</span> Ownership and revenue records
          </li>
          <li className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2.5">
            <span className="font-bold text-primary-foreground/65">02</span> Parcel boundaries and land use
          </li>
          <li className="flex items-center gap-2 rounded-xl bg-primary-foreground/10 px-3 py-2.5">
            <span className="font-bold text-primary-foreground/65">03</span> Access, water, and utilities
          </li>
        </ol>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href="/how-it-works" className="flex min-h-11 items-center justify-center gap-1 rounded-xl bg-primary-foreground/10 px-3 text-center text-xs font-semibold transition-colors hover:bg-primary-foreground/20">
            How it works <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <Link href="/state-land-portals" className="flex min-h-11 items-center justify-center gap-1 rounded-xl bg-primary-foreground/10 px-3 text-center text-xs font-semibold transition-colors hover:bg-primary-foreground/20">
            State portals <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="app-guides-heading" className="px-4 py-5">
        <div className="mb-3 flex items-center gap-2">
          <BookOpenText className="size-5 text-primary" aria-hidden="true" />
          <h2 id="app-guides-heading" className="text-lg font-bold">Guides & answers</h2>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-3">
          <Link href="/blogs" className="flex min-h-20 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-sm font-semibold">
            Land buying guides <ArrowRight className="size-4 text-primary" aria-hidden="true" />
          </Link>
          <Link href="/area-converter" className="flex min-h-20 flex-col justify-between rounded-xl border border-border bg-card p-3.5 text-sm font-semibold">
            Area converter <Ruler className="size-4 text-primary" aria-hidden="true" />
          </Link>
        </div>
        <div className="divide-y divide-border rounded-2xl border border-border bg-card px-4">
          {buyingFaqs.map((faq) => (
            <details key={faq.question} className="group py-3.5">
              <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ArrowRight className="size-4 shrink-0 rotate-90 text-muted-foreground transition-transform group-open:-rotate-90" aria-hidden="true" />
              </summary>
              <p className="pb-1 pt-2 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  )
}
