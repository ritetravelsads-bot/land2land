import type { Metadata } from "next"
import Script from "next/script"
import { Building2, Users, Shield, Award, CheckCircle2, Home, Briefcase, MapPin, FileText, Phone, TrendingUp, Heart, Target, Landmark, Building } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { generateWebPageSchema, generateOrganizationSchema } from "@/lib/schema-markup-generator"

export const metadata: Metadata = {
  title: "About Land2Land | Trusted Agricultural Land Marketplace in India",
  description:
    "Land2Land connects farmers, landowners, and investors with verified agricultural land and farmland across India. 100% verified titles, transparent pricing, and expert land advisory.",
  alternates: {
    canonical: "https://land2land.in/about",
  },
  openGraph: {
    title: "About Land2Land | Trusted Agricultural Land Marketplace in India",
    description: "Land2Land connects farmers, landowners, and investors with verified agricultural land and farmland across India. 100% verified titles, transparent pricing, and expert land advisory.",
    url: "https://land2land.in/about",
  },
}

const agriculturalServices = [
  "Agricultural land and farmland",
  "Orchard and plantation land",
  "Irrigated and canal-fed land",
  "Plots and vacant land parcels"
]

const investmentServices = [
  "High-ROI land investment parcels",
  "Land aggregation for bulk buyers",
  "Farmland with lease-back options",
  "Emerging high-growth land corridors"
]

const advisoryServices = [
  "Land title and ownership verification",
  "Soil quality and water-rights analysis",
  "On-site land visit assistance",
  "Transparent price consultation",
  "End-to-end documentation support"
]

const whyChooseUs = [
  "Farmer-first advisory approach",
  "100% verified land titles and ownership records",
  "Coverage across India's key agricultural regions",
  "Transparent pricing and clear documentation",
  "Professional land-visit coordination and guidance",
  "Long-term relationship mindset"
]

const commitments = [
  "Ethical land transactions",
  "Clear and honest communication",
  "Responsible land advisory",
  "Sustainable and productive land use",
  "Delivering value beyond expectations"
]

const values = [
  { icon: Shield, label: "Trust" },
  { icon: Award, label: "Integrity" },
  { icon: CheckCircle2, label: "Transparency" },
  { icon: Heart, label: "Long-term Value" },
]

export default function AboutPage() {
  // Generate schema markup for SEO
  const pageSchemas = generateWebPageSchema({
    title: "About Land2Land | Agricultural Land Marketplace",
    description: "Land2Land - Connecting Land. Empowering Growth. Building the Future. An India-wide agricultural land marketplace committed to verified listings, transparency, and long-term value.",
    url: "https://land2land.in/about",
    breadcrumbs: [
      { name: "Home", url: "/" },
      { name: "About", url: "/about" }
    ]
  })
  
  const orgSchema = generateOrganizationSchema()
  
  return (
    <>
      {/* Schema Markup for SEO */}
      {Array.isArray(pageSchemas) && pageSchemas.map((schema, index) => (
        <Script
          key={`about-schema-${index}`}
          id={`about-schema-${index}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Script
        id="org-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full py-16 md:py-24 px-4 bg-gradient-to-br from-primary/10 via-primary/5 to-background overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="space-y-4 text-center">
              <p className="text-primary font-semibold text-sm tracking-wider uppercase">About</p>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground">Land2Land</h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
                Connecting Land. Empowering Growth. Building the Future.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-16 px-4 border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  Pan-India Coverage
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Agricultural Land Marketplace & Advisory</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Land2Land is an India-wide agricultural land marketplace committed to delivering clarity, credibility, and long-term value in land transactions. We connect farmers, landowners, and investors with thoughtfully verified agricultural land, farmland, and investment-grade parcels across the country.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  In a market where land information can often feel opaque, we focus on transparency, research-backed guidance, and responsible advisory practices. Every parcel we list is evaluated on key factors such as title clarity, soil quality, water access, connectivity, and long-term appreciation potential.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  Our goal is simple — to make land decisions informed, secure, and rewarding.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { stat: "15K+", label: "Verified Listings" },
                  { stat: "12+", label: "States Covered" },
                  { stat: "100%", label: "Title Verified" },
                  { stat: "India", label: "Coverage" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-card border border-border rounded-lg text-center hover:border-primary/30 transition-colors">
                    <p className="text-2xl md:text-3xl font-bold text-primary">{item.stat}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="w-full py-12 md:py-16 px-4 bg-muted/30 border-b border-border">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Founder */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] border border-[#d4af37]/30 shadow-xl overflow-hidden">
                    {/* Auto shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent animate-luxury-shine" />
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/50 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/50 rounded-br-2xl" />
                    {/* Content */}
                    <div className="relative z-10 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">Founder</p>
                      <h2 className="text-xl md:text-2xl font-bold text-white">DP Chaudhary</h2>
                      <p className="text-xs text-gray-400">Chairman Dharampal Chaudhary</p>
                      {/* Decorative line */}
                      <div className="w-12 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent mt-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  With over 15 years of experience in land and agriculture, Dharampal Chaudhary (DP Sir) has been the guiding force behind Land2Land's growth and vision.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Since 2008, he has been actively involved in land aggregation, farmland development, and agricultural advisory. His deep understanding of land cycles, regional potential, and ethical business practices has shaped multiple successful land ventures across India.
                </p>
                <div className="p-4 bg-card border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground italic">
                    "Land is more than soil — it represents security, livelihood, and a future for generations."
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Under his leadership, Land2Land continues to prioritize integrity, transparency, and long-term value creation.
                </p>
              </div>
            </div>

            {/* CEO */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] border border-[#d4af37]/30 shadow-xl overflow-hidden">
                    {/* Auto shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/15 to-transparent animate-luxury-shine [animation-delay:1.5s]" />
                    {/* Gold corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/50 rounded-tl-2xl" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/50 rounded-br-2xl" />
                    {/* Content */}
                    <div className="relative z-10 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">CEO</p>
                      <h2 className="text-xl md:text-2xl font-bold text-white">Vinod Kumar</h2>
                      <p className="text-xs text-gray-400">Chief Executive Officer</p>
                      {/* Decorative line */}
                      <div className="w-12 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent mt-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  As the CEO of Land2Land, Vinod Sir leads operations with a strong focus on customer satisfaction, strategic growth, and professional excellence.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  He plays a vital role in building partnerships, streamlining advisory processes, and ensuring every client interaction reflects the company's commitment to clarity and trust. His leadership approach combines market insight with practical decision-making, helping farmers and investors navigate land transactions confidently.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Together, the leadership team brings experience, discipline, and a forward-thinking mindset to every project and client relationship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Land2Land */}
        <section className="w-full py-12 md:py-16 px-4 border-b border-border">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Why Choose Land2Land</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Choosing the right land partner makes all the difference. At Land2Land, we stand apart because of our commitment to your success.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {whyChooseUs.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-colors">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="p-5 bg-muted/50 border border-border rounded-lg text-center">
              <p className="text-sm text-muted-foreground">
                We do not believe in high-pressure sales. Instead, we believe in providing accurate information and allowing clients to make confident decisions.
              </p>
            </div>

            {/* Values */}
            <div className="flex flex-wrap justify-center gap-3">
              {values.map((value, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full">
                  <value.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{value.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-16 px-4 bg-muted/30 border-b border-border">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">What Does Land2Land Offer?</h2>
              <p className="text-sm text-muted-foreground">Comprehensive land guidance across multiple segments</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Agricultural Land */}
              <div className="p-5 bg-card border border-border rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">Agricultural Land</h3>
                </div>
                <ul className="space-y-2">
                  {agriculturalServices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Investment */}
              <div className="p-5 bg-card border border-border rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">Land Investment</h3>
                </div>
                <ul className="space-y-2">
                  {investmentServices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advisory */}
              <div className="p-5 bg-card border border-border rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold">End-to-End Advisory</h3>
                </div>
                <ul className="space-y-2">
                  {advisoryServices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
              Every recommendation is aligned with farming goals, investment objectives, and long-term growth potential.
            </p>
          </div>
        </section>

        {/* Our Commitment Section */}
        <section className="w-full py-12 md:py-16 px-4 border-b border-border">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-bold">Our Commitment</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                We believe real estate is not just about transactions — it is about trust, security, and building a stronger future.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {commitments.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full hover:border-primary/30 transition-colors">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">Building Trust, Not Just Transactions</h2>
            <p className="text-sm text-muted-foreground">
              As India's agricultural land market continues to grow, Land2Land aims to contribute responsibly to rural development by connecting people with land that truly matches their aspirations.
            </p>
            <p className="text-xs text-muted-foreground italic">
              With experience, transparency, and a commitment to long-term relationships, we continue to build not just portfolios — but trust.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <a href="/buy" className="inline-flex items-center justify-center px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Browse Land Listings
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-5 py-2.5 bg-transparent border border-border text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
