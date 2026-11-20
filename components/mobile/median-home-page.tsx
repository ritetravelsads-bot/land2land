
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
  Star,
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
  {
    title: "Buy Land",
    description: "Explore current land listings.",
    href: "/properties",
    icon: Sprout,
  },
  {
    title: "Sell Land",
    description: "List a property for buyers.",
    href: "/sell",
    icon: Handshake,
  },
  {
    title: "Legal Help",
    description: "Review land records and documents.",
    href: "/services/legal",
    icon: FileCheck2,
  },
  {
    title: "Home Loan",
    description: "Explore property financing options.",
    href: "/services/home-loans",
    icon: Home,
  },
  {
    title: "NRI Services",
    description: "Property support for NRIs.",
    href: "/services/nri",
    icon: Building2,
  },
]

export default function MedianHomePage() {
  return (
    <main className="land-app-home mx-auto min-h-screen w-full max-w-5xl overflow-x-clip bg-background pb-6 text-foreground">

      {/* ==================================================
          INTRODUCTION AND SEARCH
      ================================================== */}
      <section className="px-5 pb-3 pt-5 sm:px-6 sm:pt-7 lg:px-10">

        <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[-0.02em] text-muted-foreground sm:text-sm">
          <Sprout
            className="size-4 shrink-0 text-primary"
            aria-hidden="true"
          />
          Explore land that fits your plans
        </p>

        <h1 className="mt-2 text-[28px] font-bold leading-[1.12] tracking-[-0.045em] text-foreground sm:text-[36px]">
          Find your place to{" "}
          <span className="text-primary">grow.</span>
        </h1>

        <p className="mt-2 max-w-[340px] text-[12px] leading-relaxed text-muted-foreground sm:text-sm">
          Discover land opportunities and find the right property
          for your future.
        </p>

        {/* Search */}
        <form
          action="/properties"
          method="get"
          role="search"
          className="
            mt-5 flex min-h-[56px] w-full min-w-0
            items-center gap-2
            rounded-[18px]
            border border-border/80
            bg-card p-1.5 pl-4
            shadow-[0_5px_18px_-12px_rgba(25,55,30,0.35)]
            transition-all
            focus-within:border-primary/40
            focus-within:ring-2
            focus-within:ring-primary/15
          "
        >
          <Search
            className="size-5 shrink-0 text-primary"
            aria-hidden="true"
          />

          <label htmlFor="app-land-search" className="sr-only">
            Search land, plots, and locations
          </label>

          <input
            id="app-land-search"
            name="search"
            type="search"
            placeholder="Search land, plots, locations..."
            autoComplete="off"
            className="
              min-w-0 flex-1
              bg-transparent py-2
              text-[13px] font-medium
              outline-none
              placeholder:font-normal
              placeholder:text-muted-foreground
            "
          />

          <Link
            href="/properties"
            aria-label="Open property filters"
            className="
              flex size-11 shrink-0
              items-center justify-center
              rounded-[13px]
              bg-primary/8 text-primary
              transition-colors hover:bg-primary/15
              focus-visible:outline-none
              focus-visible:ring-2 focus-visible:ring-ring
            "
          >
            <SlidersHorizontal
              className="size-[19px]"
              aria-hidden="true"
            />
          </Link>
        </form>
      </section>

      {/* ==================================================
          LAND CATEGORIES
      ================================================== */}
      <section
        aria-label="Browse land categories"
        className="pb-3 pt-2"
      >
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:gap-7 sm:px-6 lg:px-10">

          {categories.map(({ name, href, icon: Icon }, index) => (
            <Link
              key={name}
              href={href}
              className="group flex w-[5.2rem] shrink-0 snap-start flex-col items-center gap-2 rounded-2xl py-1 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={`
                  flex size-[64px] items-center justify-center
                  rounded-[23px] border
                  shadow-[0_5px_12px_-8px_rgba(20,40,20,0.5)]
                  transition-all duration-200
                  group-active:scale-95
                  ${
                    index === 0
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary/5 bg-[#eff5ed] text-primary group-hover:bg-primary/15"
                  }
                `}
              >
                <Icon
                  className="size-[27px]"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </span>

              <span
                className={`
                  text-[11px] font-semibold leading-tight
                  ${
                    index === 0
                      ? "text-primary"
                      : "text-foreground/80"
                  }
                `}
              >
                {name}
              </span>

              {index === 0 && (
                <span
                  className="-mt-1 h-1 w-12 rounded-full bg-primary"
                  aria-hidden="true"
                />
              )}
            </Link>
          ))}

        </div>
      </section>

      {/* ==================================================
          HERO BANNER
      ================================================== */}
      <section
        aria-label="Explore land listings"
        className="px-4 py-3 sm:px-6 lg:px-10"
      >
        <div className="relative isolate flex min-h-[245px] w-full min-w-0 overflow-hidden rounded-[25px] bg-[#203d25] text-primary-foreground shadow-[0_14px_30px_-17px_rgba(22,48,24,0.55)] sm:min-h-[300px] sm:rounded-[28px]">

          <Image
            src="/banners/banner-all.webp"
            alt="Open land and countryside"
            fill
            sizes="(max-width: 672px) 100vw, 920px"
            priority
            className="-z-20 object-cover object-center"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#082b17]/95 via-[#123c22]/75 to-[#123c22]/5" />

          <div className="flex max-w-[95%] flex-col items-start justify-center p-5 sm:max-w-[70%] sm:p-8">

            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-sm sm:text-[11px]">
              <Star
                className="size-3.5 shrink-0 fill-amber-300 text-amber-300"
                aria-hidden="true"
              />
              Premium Land Opportunities
            </span>

            <h2 className="mt-3 max-w-[22rem] text-[24px] font-bold leading-[1.13] tracking-[-0.035em] text-white sm:text-[38px]">
              Invest in Land,
              <br />
              Build a Better Future
            </h2>

            <p className="mt-2 max-w-[21rem] text-[12px] leading-[1.55] text-white/90 sm:text-[17px]">
              Explore verified and premium land listings
              across India.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button
                asChild
                size="sm"
                className="min-h-10 rounded-full bg-white px-5 text-[13px] font-bold text-[#145326] shadow-sm hover:bg-[#f1f7ee]"
              >
                <Link href="/properties">
                  Explore Properties
                  <ArrowRight
                    data-icon="inline-end"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          FEATURED PROPERTIES
      ================================================== */}
      <section className="mt-1">
        <MedianPropertyFeed
          title="Featured Properties"
          description="Explore featured land listings."
          href="/properties?featured=true"
          endpoint="/api/properties?limit=4&sort=featured&featured=true"
          emptyMessage="No featured listings are available right now. Browse all land to see current inventory."
          layout="grid"
        />
      </section>

      {/* ==================================================
          POPULAR LOCATIONS
      ================================================== */}
      <section className="mt-1">
        <MedianPopularLocations />
      </section>

      {/* ==================================================
          OUR SERVICES
      ================================================== */}
      <section
        aria-labelledby="app-services-heading"
        className="px-5 py-4 sm:px-6 lg:px-10"
      >
        <div className="mb-3 flex items-center justify-between gap-3">

          <h2
            id="app-services-heading"
            className="border-l-[5px] border-primary pl-3 text-[19px] font-bold tracking-[-0.03em]"
          >
            Our Services
          </h2>

          <Link
            href="/services"
            className="flex min-h-10 shrink-0 items-center gap-1 text-xs font-semibold text-primary"
          >
            Explore More
            <ArrowRight
              className="size-3.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="scrollbar-hide flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2">

          {landServices.map(
            ({ title, description, href, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                aria-label={`${title}: ${description}`}
                className="
                  group flex min-h-[102px]
                  w-[108px] shrink-0 snap-start
                  flex-col items-center justify-center
                  gap-2 rounded-[20px]
                  border border-primary/5
                  bg-[#f0f5ed] p-3
                  text-center
                  shadow-[0_5px_12px_-8px_rgba(25,45,25,0.5)]
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-primary/10
                  focus-visible:outline-none
                  focus-visible:ring-2 focus-visible:ring-ring
                  sm:w-[132px]
                "
              >
                <Icon
                  className="size-7 text-primary"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />

                <span className="text-[11px] font-bold leading-tight text-foreground">
                  {title}
                </span>
              </Link>
            )
          )}

        </div>
      </section>

      {/* Bottom breathing room for floating navigation */}
      <div
        aria-hidden="true"
        className="h-5"
      />

    </main>
  )
}
