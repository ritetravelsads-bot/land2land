import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"

export default function CTA() {
  return (
    <section className="relative w-full py-20 md:py-28 px-4 md:px-6 lg:px-8 overflow-hidden">
      {/* Village aerial background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/village-cta-bg.png"
          alt="Indian village fields at dusk"
          className="w-full h-full object-cover"
        />
        {/* Warm forest-green overlay — village at dusk mood */}
        <div className="absolute inset-0 bg-[var(--land-primary)]/88" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/30" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        {/* Decorative crop-line motif */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="h-px w-12 bg-[var(--land-ochre)]/60" />
          <span className="text-[var(--land-ochre)] text-xs font-semibold uppercase tracking-widest">
            Begin Your Journey
          </span>
          <div className="h-px w-12 bg-[var(--land-ochre)]/60" />
        </div>

        <h2 className="text-white text-balance text-3xl md:text-4xl font-bold">
          Start Your Land Investment Journey Today
        </h2>
        <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Join 15,000+ buyers, sellers and investors who trust Land2Land for transparent, verified land of every type across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <Button
            asChild
            size="lg"
            className="bg-[var(--land-ochre)] text-[var(--land-earth)] hover:bg-[var(--land-ochre)]/85 h-13 px-8 text-base font-bold shadow-lg"
          >
            <Link href="/properties">
              Browse Land Listings
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white h-13 px-8 text-base font-semibold"
          >
            <Link href="/find-associate">
              <Phone className="mr-2" size={20} />
              Connect with a Land Expert
            </Link>
          </Button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
          {["100% Verified Titles", "Transparent Pricing", "Expert Advisory"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-[var(--land-ochre)] rounded-full" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
