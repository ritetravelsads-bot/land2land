import { Suspense } from "react"
import dynamic from "next/dynamic"
import BannerSlider from "@/components/sections/banner-slider"

// Lazy load AdvancedSearch but keep it visible above fold with SSR
const AdvancedSearch = dynamic(() => import("@/components/sections/advanced-search"), {
  ssr: true,
  loading: () => (
    <div className="relative -mt-10 z-10 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[220px] md:min-h-[200px] animate-pulse">
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gray-200 rounded-lg" />
            <div>
              <div className="h-5 w-48 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-36 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 h-14 bg-gray-100 rounded-xl" />
            <div className="h-14 w-32 bg-primary/20 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  ),
})

// Force dynamic rendering to ensure fresh data on every page load
export const revalidate = 0

// Lazy load below-the-fold components for better LCP
const LandTypesBrowse = dynamic(() => import("@/components/sections/land-types-browse"), {
  ssr: true,
  loading: () => <div className="h-64 bg-white animate-pulse" />,
})

const SearchMapPromo = dynamic(() => import("@/components/sections/search-map-promo"), {
  ssr: true,
  loading: () => <div className="h-64 bg-[#f2efe9] animate-pulse" />,
})

const TrendingLandProperties = dynamic(() => import("@/components/sections/trending-land-properties"), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-50 animate-pulse" />,
})

const VerifiedProperties = dynamic(() => import("@/components/sections/verified-properties"), {
  ssr: true,
  loading: () => <div className="h-96 bg-white animate-pulse" />,
})

const PopularRegions = dynamic(() => import("@/components/sections/popular-regions"), {
  ssr: true,
  loading: () => <div className="h-64 bg-slate-50 animate-pulse" />,
})

const NewProperties = dynamic(() => import("@/components/sections/new-properties"), {
  ssr: true,
  loading: () => <div className="h-80 bg-gray-50 animate-pulse" />,
})

const PopularLocations = dynamic(() => import("@/components/sections/popular-locations"), {
  ssr: true,
  loading: () => <div className="h-40 bg-[#f8faf5] animate-pulse" />,
})

const PopularStates = dynamic(() => import("@/components/sections/popular-states"), {
  ssr: true,
  loading: () => <div className="h-64 bg-white animate-pulse" />,
})

const InvestmentOpportunities = dynamic(() => import("@/components/sections/investment-opportunities"), {
  ssr: true,
  loading: () => <div className="h-96 bg-slate-50 animate-pulse" />,
})

const WhyChooseUs = dynamic(() => import("@/components/sections/why-choose-us"), {
  ssr: true,
  loading: () => <div className="h-64 bg-slate-50 animate-pulse" />,
})

const FarmTestimonials = dynamic(() => import("@/components/sections/farm-testimonials"), {
  ssr: true,
  loading: () => <div className="h-80 bg-slate-50 animate-pulse" />,
})

const FAQs = dynamic(() => import("@/components/sections/faqs"), {
  ssr: true,
  loading: () => <div className="h-96 bg-white animate-pulse" />,
})

const CTA = dynamic(() => import("@/components/sections/cta"), {
  ssr: true,
  loading: () => <div className="h-48 bg-slate-50 animate-pulse" />,
})

export default function Home() {
  return (
    <main>
      {/* Critical above-the-fold content - loads immediately */}
      <BannerSlider />
      <AdvancedSearch />

      {/* Search land anywhere promo band */}
      <Suspense fallback={<div className="h-64 bg-[#eaf5e1] animate-pulse" />}>
        <SearchMapPromo />
      </Suspense>

      {/* Trending Properties */}
      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <TrendingLandProperties />
      </Suspense>

      {/* Verified Properties */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <VerifiedProperties />
      </Suspense>

      {/* Lands For You / Browse by Region */}
      <Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse" />}>
        <PopularRegions />
      </Suspense>

      {/* New Properties */}
      <Suspense fallback={<div className="h-80 bg-gray-50 animate-pulse" />}>
        <NewProperties />
      </Suspense>

      {/* Popular Locations pill strip */}
      <Suspense fallback={<div className="h-40 bg-[#f8faf5] animate-pulse" />}>
        <PopularLocations />
      </Suspense>

      {/* Properties in Popular States */}
      <Suspense fallback={<div className="h-64 bg-white animate-pulse" />}>
        <PopularStates />
      </Suspense>

      {/* Investment Opportunities */}
      <Suspense fallback={<div className="h-96 bg-slate-50 animate-pulse" />}>
        <InvestmentOpportunities />
      </Suspense>

      {/* Why Choose Us */}
      <Suspense fallback={<div className="h-64 bg-slate-50 animate-pulse" />}>
        <WhyChooseUs />
      </Suspense>

      {/* Testimonials */}
      <Suspense fallback={<div className="h-80 bg-slate-50 animate-pulse" />}>
        <FarmTestimonials />
      </Suspense>

      {/* FAQs */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
        <FAQs />
      </Suspense>

      {/* CTA */}
      <Suspense fallback={<div className="h-48 bg-slate-50 animate-pulse" />}>
        <CTA />
      </Suspense>
    </main>
  )
}
