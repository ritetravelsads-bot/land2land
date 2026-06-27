import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { CheckCircle2, ArrowRight } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import LandTypeListings from "@/components/land/land-type-listings"
import { LAND_TYPE_LIST, getLandTypeBySlug } from "@/lib/land-types-content"

interface PageProps {
  params: Promise<{ type: string }>
}

export function generateStaticParams() {
  return LAND_TYPE_LIST.map((t) => ({ type: t.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  const content = getLandTypeBySlug(type)
  if (!content) {
    return { title: "Land Type Not Found | Land2Land" }
  }
  return {
    title: `${content.label} for Sale in India | Land2Land`,
    description: content.description,
    keywords: [content.label, "buy land", "sell land", "land for sale", "India land marketplace"],
    openGraph: {
      title: `${content.label} for Sale in India | Land2Land`,
      description: content.description,
      type: "website",
    },
    alternates: { canonical: `/land/${content.slug}` },
  }
}

export default async function LandTypePage({ params }: PageProps) {
  const { type } = await params
  const content = getLandTypeBySlug(type)

  if (!content) {
    notFound()
  }

  const otherTypes = LAND_TYPE_LIST.filter((t) => t.slug !== content.slug)

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-[#2d5016]">
        <div className="absolute inset-0">
          <img
            src={content.heroImage || "/placeholder.svg"}
            alt={content.label}
            className="h-full w-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28">
          <nav className="text-sm text-white/80 mb-4">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{content.label}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">{content.label} for Sale</h1>
          <p className="text-lg text-white/90 max-w-2xl text-pretty">{content.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/properties?property_type=${content.type}`}
              className="inline-flex items-center gap-2 bg-white text-[#2d5016] px-5 py-3 rounded-lg font-semibold hover:bg-white/90 transition"
            >
              Browse all {content.shortLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sell"
              className="inline-flex items-center gap-2 border border-white/60 text-white px-5 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              List Your Land
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + highlights */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-3">About {content.label}</h2>
            <p className="text-muted-foreground leading-relaxed">{content.description}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">What to look for</h3>
            <ul className="space-y-3">
              {content.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-[#2d5016] mt-0.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Listings */}
      <section className="max-w-7xl mx-auto px-4 pb-12 w-full">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Featured {content.label}</h2>
          <Link
            href={`/properties?property_type=${content.type}`}
            className="text-sm font-semibold text-[#2d5016] hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <LandTypeListings landType={content.type} label={content.label} />
      </section>

      {/* FAQ */}
      <section className="bg-muted/40 border-t border-border py-14">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {content.faqs.map((faq) => (
              <div key={faq.question} className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore other types */}
      <section className="max-w-7xl mx-auto px-4 py-12 w-full">
        <h2 className="text-2xl font-bold text-foreground mb-6">Explore other land types</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {otherTypes.map((t) => (
            <Link
              key={t.slug}
              href={`/land/${t.slug}`}
              className="group border border-border rounded-xl p-5 hover:border-[#2d5016] hover:shadow-md transition text-center"
            >
              <span className="block font-semibold text-foreground group-hover:text-[#2d5016] transition-colors text-sm">
                {t.label}
              </span>
              <span className="block text-xs text-muted-foreground mt-1 line-clamp-2">{t.tagline}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
