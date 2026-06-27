import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import QuoteForm from "@/components/forms/quote-form"

export const metadata: Metadata = {
  title: "Get a Free Quote | Land2Land",
  description: "Request a free property quote from Land2Land. Fast, accurate estimates with no obligation.",
  alternates: {
    canonical: "https://land2land.in/quote",
  },
  openGraph: {
    title: "Get a Free Quote | Land2Land",
    description: "Get a free property quote from our expert team.",
    url: "https://land2land.in/quote",
  },
}

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="w-full py-12 md:py-16 px-4 bg-primary/5 border-b border-border">
          <div className="max-w-4xl mx-auto space-y-3">
            <h1 className="text-primary">Get Your Free Quote</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Tell us about your roofing project and we'll provide an accurate, no-obligation quote within 24 hours.
            </p>
          </div>
        </section>

        {/* Quote Form */}
        <section className="w-full py-12 md:py-16 px-4">
          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </section>
      </main>
    </>
  )
}
