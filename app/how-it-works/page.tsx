import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import {
  UserCheck,
  MapPinned,
  FileSearch,
  Handshake,
  FileSignature,
  ArrowRight,
  ShieldCheck,
  Phone,
} from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { generateWebPageSchema } from "@/lib/schema-markup-generator"

export const metadata: Metadata = {
  title: "How It Works | Land2Land's Verified Land Transaction Process",
  description:
    "See exactly how Land2Land takes a land deal from seller verification to registry closure — a 5-stage, hands-on process built to prevent disputes and protect both buyers and sellers.",
  alternates: {
    canonical: "https://land2land.com/how-it-works",
  },
  openGraph: {
    title: "How It Works | Land2Land's Verified Land Transaction Process",
    description:
      "A 5-stage, hands-on process built to prevent disputes and protect both buyers and sellers.",
    url: "https://land2land.com/how-it-works",
  },
}

const stages = [
  {
    number: "01",
    icon: UserCheck,
    title: "Seller Registration & Verification Agreement",
    description:
      "The seller registers the land with Land2Land and signs a verification agreement, authorizing our team to confirm ownership and begin the verification process on their behalf.",
  },
  {
    number: "02",
    icon: MapPinned,
    title: "Site Visit & Ground Verification",
    description:
      "A Land2Land associate personally visits the site to verify location, boundaries, road access, water availability, and connectivity — the same 4 pillars shown on every listing's Verification Scorecard.",
  },
  {
    number: "03",
    icon: FileSearch,
    title: "Document & Land History Checks",
    description:
      "We cross-check ownership and land history against Tehsil records, Patwari records, and Revenue Department confirmation to rule out disputes, encumbrances, or title issues before a buyer ever sees the listing.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Buyer-Seller Direct Meeting",
    description:
      "Once verified, we arrange a direct meeting between the buyer and seller — no hidden middlemen — so both sides can negotiate terms transparently with our associate present to facilitate.",
  },
  {
    number: "05",
    icon: FileSignature,
    title: "Agreement, Payment & Registry Closure",
    description:
      "We support the deal all the way through token payment, final agreement drafting, and registry closure — staying involved until the transaction is fully and legally complete.",
  },
]

export default function HowItWorksPage() {
  const pageSchema = generateWebPageSchema({
    title: "How It Works | Land2Land's Verified Land Transaction Process",
    description:
      "A 5-stage, hands-on process built to prevent disputes and protect both buyers and sellers.",
    url: "https://land2land.com/how-it-works",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "How It Works", url: "/how-it-works" },
    ],
  })

  return (
    <>
      {Array.isArray(pageSchema) &&
        pageSchema.map((schema, index) => (
          <Script
            key={`how-it-works-schema-${index}`}
            id={`how-it-works-schema-${index}`}
            type="application/ld+json"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative w-full py-16 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-4">
            <p className="text-primary font-semibold text-sm tracking-wider uppercase">Our Process</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              How Land2Land Works
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Land2Land isn&apos;t just a listings site — we&apos;re hands-on through every stage of the deal, from
              seller verification to the final registry closure. Here&apos;s exactly how it works.
            </p>
          </div>
        </section>

        {/* Stat strip */}
        <section className="w-full py-8 px-4 border-b border-border bg-muted/30">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">5</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Verified stages, start to close</p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">3</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">
                Document layers checked (Tehsil, Patwari, Revenue)
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Support through to registry closure</p>
            </div>
          </div>
        </section>

        {/* 5-stage timeline */}
        <section className="w-full py-16 md:py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-border ml-5 space-y-14">
              {stages.map((stage) => {
                const Icon = stage.icon
                return (
                  <div key={stage.number} className="relative pl-12">
                    <div className="absolute -left-[25px] top-0 bg-background p-1 rounded-full">
                      <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary tracking-widest uppercase mb-1">
                        Stage {stage.number}
                      </p>
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 text-balance">
                        {stage.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed">{stage.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Closing trust note */}
        <section className="w-full py-12 md:py-16 px-4 bg-primary/5 border-t border-border">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              We stay with the deal until it&apos;s done
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Most land deals fall apart over disputed titles or unclear documentation. Our 5-stage process exists to
              catch those issues early — so your token payment, agreement, and registry closure go through without
              surprises.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/sell">
                  List Your Land
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 bg-transparent">
                <a href="tel:+919205190063">
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to Our Team
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
