import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { Handshake, Sparkles, Check, ShieldCheck, ArrowRight, Phone } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { generateWebPageSchema } from "@/lib/schema-markup-generator"

export const metadata: Metadata = {
  title: "Pricing & Fees | Land2Land's Transparent Brokerage Model",
  description:
    "See exactly what Land2Land charges — a straightforward 2% seller + 2% buyer brokerage on successful deal closure, and optional premium listing plans starting from ₹999. No hidden fees.",
  alternates: {
    canonical: "https://land2land.com/pricing",
  },
  openGraph: {
    title: "Pricing & Fees | Land2Land's Transparent Brokerage Model",
    description:
      "A straightforward 2% seller + 2% buyer brokerage on successful deal closure, and optional premium listing plans starting from ₹999.",
    url: "https://land2land.com/pricing",
  },
}

export default function PricingPage() {
  const pageSchema = generateWebPageSchema({
    title: "Pricing & Fees | Land2Land's Transparent Brokerage Model",
    description:
      "A straightforward 2% seller + 2% buyer brokerage on successful deal closure, and optional premium listing plans starting from ₹999.",
    url: "https://land2land.com/pricing",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "Pricing & Fees", url: "/pricing" },
    ],
  })

  return (
    <>
      {Array.isArray(pageSchema) &&
        pageSchema.map((schema, index) => (
          <Script
            key={`pricing-schema-${index}`}
            id={`pricing-schema-${index}`}
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
            <p className="text-primary font-semibold text-sm tracking-wider uppercase">Pricing &amp; Fees</p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground text-balance">
              Transparent, No Hidden Fees
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We publish our brokerage model openly — you always know what you&apos;re paying and when. Fees are
              only charged when a deal actually closes.
            </p>
          </div>
        </section>

        {/* Brokerage model */}
        <section className="w-full py-16 md:py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                Brokerage — Only on Successful Closure
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Land2Land charges brokerage as a small percentage of the deal value, collected from both sides only
                once the transaction is complete and registered.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-1">2%</p>
                <p className="text-sm font-semibold text-foreground mb-2">Seller Brokerage</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Charged on the final deal value upon successful sale and registry.
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-1">2%</p>
                <p className="text-sm font-semibold text-foreground mb-2">Buyer Brokerage</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Charged on the final deal value, collected upon deal closure and registry.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 max-w-3xl mx-auto">
              <ShieldCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground/90 leading-relaxed">
                No brokerage is charged upfront. You only pay once your deal is verified, agreed, and successfully
                closed at the registry.
              </p>
            </div>
          </div>
        </section>

        {/* Seller listing plans */}
        <section className="w-full py-16 md:py-20 px-4 bg-muted/30 border-t border-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                Listing Plans for Sellers
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Publish your land for free, or choose a premium plan for faster verification and greater visibility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Standard listing */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Standard Listing
                </p>
                <p className="text-3xl font-bold text-foreground mb-4">Free</p>
                <ul className="space-y-2.5">
                  {[
                    "List your land on Land2Land.com",
                    "Standard verification process",
                    "Visible to all buyers on the platform",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium listing */}
              <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 relative">
                <span className="absolute -top-3 left-6 bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  Premium
                </span>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Premium &amp; Subscription Plans
                </p>
                <p className="text-3xl font-bold text-foreground mb-1">
                  Starting ₹999<span className="text-base font-medium text-muted-foreground">+</span>
                </p>
                <p className="text-xs text-muted-foreground mb-4">Choose the plan that fits your needs</p>
                <ul className="space-y-2.5">
                  {[
                    "Priority verification & listing service",
                    "Premium placement for greater visibility",
                    "Plans available for multiple / bulk listings",
                    "Flexible options for personal or business sellers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              Contact our team for full plan details and pricing tailored to your listing volume.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-16 px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Questions about pricing?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Talk to our team about which plan fits your listing, or start selling with a free standard listing
              today.
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
