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
    image: "/banners/land-banner-1.png",
    tag: "Agricultural Land",
    title: "Find & Invest in Land Anywhere",
    subtitle: "Explore verified agricultural land, current prices, and ownership records to make confident investment decisions across India.",
    cta: { label: "Browse Land", href: "/buy" },
  },
  {
    id: 2,
    image: "/banners/land-banner-2.png",
    tag: "Verified Farmland",
    title: "Own Productive Farmland",
    subtitle: "Discover fertile farmland with irrigation and water rights, vetted for legal clearance and ready for cultivation.",
    cta: { label: "Explore Farms", href: "/farms" },
  },
  {
    id: 3,
    image: "/banners/land-banner-3.png",
    tag: "Land Investment",
    title: "Grow Your Wealth with Land",
    subtitle: "High-ROI land opportunities across India's fastest-growing agricultural corridors with transparent pricing.",
    cta: { label: "View Investments", href: "/investments" },
  },
  {
    id: 4,
    image: "/banners/land-banner-4.png",
    tag: "Sell Your Land",
    title: "List Your Land for Free",
    subtitle: "Reach thousands of verified buyers and investors. Post your agricultural land or farm plot in minutes.",
    cta: { label: "Sell Land", href: "/sell" },
  },
]

// Static first slide rendered immediately without JS - critical for LCP
function FirstSlideStatic() {
  const slide = slides[0]
  return (
    <div className="absolute inset-0 z-10">
      <div className="absolute inset-0">
        <Image
          src="/banners/land-banner-1.png"
          alt="Land2Land - Agricultural Land and Farm Property Marketplace in India"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={80}
          className="object-cover"
        />
      </div>
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <SlideContent slide={slide} active />
      {/* SEO H1 - Visually hidden but accessible to search engines */}
      <h1 className="sr-only">Land2Land — Buy, Sell & Invest in Agricultural Land and Farmland</h1>
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
              "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6ba82b] text-white text-xs md:text-sm font-semibold transition-all duration-700",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <MapPin className="h-3.5 w-3.5" />
            {slide.tag}
          </span>
          <h2
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-bold text-white text-balance leading-tight transition-all duration-700 delay-100",
              active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            {slide.title}
          </h2>
          <p
            className={cn(
              "text-base md:text-xl text-white/90 max-w-xl text-pretty transition-all duration-700 delay-200",
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
            <Button asChild size="lg" className="bg-[#2d5016] hover:bg-[#1d3610] text-white h-12 px-7 text-base">
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
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
