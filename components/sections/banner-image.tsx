import Link from "next/link"

const bannerImage =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Serene%20Golden-Hour%20Urban%20Development-UsqHfb6lYtBFUTNFXgDnIUiCGob0y9.png"

export default function BannerImage() {
  return (
    <section
      aria-labelledby="home-banner-title"
      className="home-banner-container relative isolate flex w-full items-center overflow-hidden bg-[#24372f] bg-cover bg-center"
      style={{ backgroundImage: `url("${bannerImage}")` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/15"
      />
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f5d68b] sm:text-sm">
            India’s verified land marketplace
          </p>
          <h1
            id="home-banner-title"
            className="text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]"
          >
            Land for Sale in India
          </h1>
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-white/95 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] sm:text-base md:text-lg">
            Browse title-verified agricultural land, residential plots, and commercial properties across India—or list your land directly to connect with genuine buyers.
          </p>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <Link
              href="/properties"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#e5bd68] px-6 py-3 text-sm font-bold text-[#26351f] shadow-lg transition-colors hover:bg-[#f0d28c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#26351f] sm:text-base"
            >
              Buy Land
            </Link>
            <Link
              href="/sell"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/80 bg-black/15 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#26351f] sm:text-base"
            >
              List Your Land Free
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
