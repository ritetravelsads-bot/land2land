"use client"

import { useState, useEffect, useCallback, memo, startTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "/banners/banner-all.png",
    tag: "All Land Types — One Platform",
    title: "Every Type of Land, One Marketplace",
    subtitle: "1 lakh+ verified listings across India with clear titles and live pricing.",
    cta: { label: "Browse All Land", href: "/properties" },
  },
  {
    id: 2,
    image: "/banners/banner-residential.png",
    tag: "Residential Land & NA Plots",
    title: "Ready-to-Build Residential Land",
    subtitle: "Demarcated plots in approved layouts with paved roads and legal clearances.",
    cta: { label: "Explore Residential Land", href: "/land/residential-plot" },
  },
  {
    id: 3,
    image: "/banners/banner-commercial.png",
    tag: "Commercial Land",
    title: "Prime Commercial Land on Key Corridors",
    subtitle: "Highway-facing land with verified zoning and government approvals.",
    cta: { label: "View Commercial Land", href: "/land/commercial-plot" },
  },
  {
    id: 4,
    image: "/banners/banner-industrial.png",
    tag: "Industrial Land",
    title: "Industrial & Logistics Land Parcels",
    subtitle: "Industrial-zone plots with wide access roads and power availability.",
    cta: { label: "View Industrial Land", href: "/land/industrial-plot" },
  },
  {
    id: 5,
    image: "/banners/banner-agricultural.png",
    tag: "Agricultural Land",
    title: "Fertile Agricultural Land",
    subtitle: "Irrigated crop land with verified water rights and clear titles.",
    cta: { label: "Browse Agricultural Land", href: "/land/agricultural-land" },
  },
  {
    id: 6,
    image: "/banners/banner-farmland.png",
    tag: "Farmland & Orchards",
    title: "Invest in Managed Farmland",
    subtitle: "Managed orchards and mixed-crop farms — a green, appreciating asset.",
    cta: { label: "Browse Farmland", href: "/land/agricultural-land" },
  },
]

// Static first slide rendered immediately without JS - critical for LCP
function FirstSlideStatic() {
  const slide = slides[0]
  return (
    <div className="absolute inset-0 z-10">
      <div className="absolute inset-0">
        <Image
          src="/banners/banner-all.png"
          alt="Land2Land — Buy, Sell and Invest in Every Type of Land Across India"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </div>
      {/* Very light dark overlay to reduce brightness */}
      <div className="absolute inset-0 bg-black/25" />
      <SlideContent slide={slide} active />
      {/* SEO H1 - Visually hidden but accessible to search engines */}
      <h1 className="sr-only">Land2Land — Buy, Sell & Invest in All Types of Land in India</h1>
    </div>
  )
}

function SlideContent({ slide, active }: { slide: (typeof slides)[0]; active: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <span
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs md:text-sm font-semibold transition-all duration-700",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <MapPin className="h-3.5 w-3.5" />
            {slide.tag}
          </span>
          <h2
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight transition-all duration-700 delay-100 [text-shadow:0_2px_12px_rgba(0,0,0,0.35)]",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            {slide.title}
          </h2>
          <p
            className={cn(
              "text-base md:text-xl text-white max-w-xl text-pretty transition-all duration-700 delay-200 [text-shadow:0_1px_8px_rgba(0,0,0,0.35)]",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            {slide.subtitle}
          </p>
          <div
            className={cn(
              "transition-all duration-700 delay-300",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <Button asChild size="lg" className="bg-[var(--land-ochre)] hover:bg-[var(--land-ochre)]/85 text-[var(--land-earth)] font-bold h-12 px-7 text-base shadow-lg">
              <Link href={slide.cta.href}>
                {slide.cta.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SlideImage = memo(function SlideImage({
  slide,
  index,
  isActive,
}: {
  slide: (typeof slides)[0]
  index: number
  isActive: boolean
}) {
  // Skip first slide as it's rendered statically
  if (index === 0) return null

  return (
    <>
      <Image
        src={slide.image || "/placeholder.svg"}
        alt={slide.title || "Banner"}
        fill
        loading="lazy"
        sizes="100vw"
        quality={78}
        fetchPriority="low"
        decoding="async"
        className={cn("object-cover", !isActive && "opacity-0")}
      />
      {/* Very light dark overlay to reduce brightness */}
      <div className={cn("absolute inset-0 bg-black/25", !isActive && "opacity-0")} />
    </>
  )
})

function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  const nextSlide = useCallback(() => {
    startTransition(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    })
  }, [])

  useEffect(() => {
    const markHydrated = () => {
      startTransition(() => {
        setIsHydrated(true)
      })
    }

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(markHydrated, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    } else {
      const timeout = setTimeout(markHydrated, 100)
      return () => clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return

    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [isHydrated, nextSlide])

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 aspect-[4/5] sm:aspect-[16/9] md:aspect-[16/6]">
      {/* Static first slide - always visible initially for instant LCP */}
      <FirstSlideStatic />

      {/* Dynamic slides - only rendered after hydration */}
      {isHydrated &&
        slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0",
            )}
          >
            <div className="absolute inset-0">
              <SlideImage slide={slide} index={index} isActive={index === currentSlide} />
            </div>
            {index !== 0 && <SlideContent slide={slide} active={index === currentSlide} />}
          </div>
        ))}

      {/* Slide indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => startTransition(() => setCurrentSlide(index))}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default memo(BannerSlider)
