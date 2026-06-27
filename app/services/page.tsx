import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Search,
  FileCheck,
  Users,
  TrendingUp,
  Shield,
  Home,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Phone,
  Clock,
  Award
} from "lucide-react"

export const metadata: Metadata = {
  title: "Land Services in India | Land2Land",
  description:
    "Comprehensive agricultural land services including land advisory, investment consulting, title verification, ROI analysis, field operations, and property management across India.",
  alternates: {
    canonical: "https://land2land.in/services",
  },
  openGraph: {
    title: "Land Services | Land2Land",
    description: "Expert land advisory and agricultural marketplace services across India.",
    url: "https://land2land.in/services",
  },
}

const services = [
  {
    id: "advisory",
    title: "Land Advisory",
    description: "Expert guidance for buying, selling, and investing in agricultural land with personalized recommendations.",
    icon: Search,
    href: "/services/advisory",
    features: [
      "Personalized land recommendations",
      "Regional market analysis",
      "Price negotiation support",
      "End-to-end transaction assistance",
    ],
    color: "bg-green-600",
  },
  {
    id: "investment",
    title: "Investment Consulting",
    description: "Strategic advice for maximizing returns on land investments with data-driven insights.",
    icon: TrendingUp,
    href: "/services/investment",
    features: [
      "ROI analysis and projections",
      "Portfolio diversification strategies",
      "High-growth corridor identification",
      "Farming vs investment guidance",
    ],
    color: "bg-emerald-500",
  },
  {
    id: "verification",
    title: "Title & Ownership Verification",
    description: "Comprehensive legal and title verification ensuring complete peace of mind for land transactions.",
    icon: FileCheck,
    href: "/services/verification",
    features: [
      "Title deed verification",
      "Ownership document checks",
      "Land record clearance",
      "Survey and boundary verification",
    ],
    color: "bg-amber-600",
  },
  {
    id: "soil-water",
    title: "Soil & Water Analysis",
    description: "Professional assessment of soil quality, water rights, and irrigation availability.",
    icon: Home,
    href: "/services/soil-water",
    features: [
      "Soil quality testing",
      "Water access assessment",
      "Irrigation infrastructure check",
      "Productivity potential analysis",
    ],
    color: "bg-blue-600",
  },
  {
    id: "field-operations",
    title: "Field Verification & Operations",
    description: "On-ground site visits and verification by our certified field team across India.",
    icon: Users,
    href: "/services/field-operations",
    features: [
      "Professional site inspections",
      "Photo and video documentation",
      "Boundary verification",
      "Neighbor and local enquiries",
    ],
    color: "bg-violet-600",
  },
  {
    id: "lease-management",
    title: "Lease & Management Services",
    description: "Complete management of leased land and agricultural operations for passive income.",
    icon: Briefcase,
    href: "/services/lease-management",
    features: [
      "Lease-back arrangements",
      "Tenant management",
      "Crop management support",
      "Income maximization strategies",
    ],
    color: "bg-cyan-600",
  },
  {
    id: "area-conversion",
    title: "Area Converter Tool",
    description: "Free tool to convert between all land measurement units used across Indian states.",
    icon: Building2,
    href: "/area-converter",
    features: [
      "Bigha to Acre conversion",
      "Sq Yard, Sq Ft, Hectare support",
      "Regional unit compatibility",
      "Real-time calculation",
    ],
    color: "bg-orange-600",
  },
  {
    id: "documentation",
    title: "Documentation Support",
    description: "End-to-end assistance with all land transaction documentation and legal compliance.",
    icon: Shield,
    href: "/services/documentation",
    features: [
      "Agreement drafting",
      "Document registration support",
      "Tax and compliance guidance",
      "Post-transaction formalities",
    ],
    color: "bg-teal-600",
  },
]

const stats = [
  { value: "15,000+", label: "Land Listings" },
  { value: "12+", label: "States Covered" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Expert Advisors" },
]

const processSteps = [
  {
    step: "01",
    title: "Free Consultation",
    desc: "Share your land requirements and investment goals with our experts",
    icon: Phone
  },
  {
    step: "02",
    title: "Verified Listings",
    desc: "We curate verified land parcels matching your exact criteria",
    icon: Search
  },
  {
    step: "03",
    title: "Field Visit & Verification",
    desc: "Professional site inspection and complete due diligence by our team",
    icon: Building2
  },
  {
    step: "04",
    title: "Transaction Support",
    desc: "Assist with negotiation, documentation, and title registration",
    icon: FileCheck
  },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-28 px-4 bg-gradient-to-br from-[#2d5016] via-[#003080] to-[#1d3610] text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center space-y-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <Award className="w-4 h-4" />
                Trusted with 15,000+ Land Transactions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                Comprehensive Land & Agricultural Services
              </h1>
              <p className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto text-pretty">
                From land search to post-purchase support, we provide end-to-end solutions tailored to your unique land and farm investment needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-[#2d5016] hover:bg-white/90 h-12 px-8 font-semibold">
                  <Link href="/contact">Get Free Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 h-12 px-8">
                  <Link href="tel:+919876543210">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/20">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                  <div className="text-sm text-blue-200 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="w-full py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose from our comprehensive range of land services designed to make your land transaction and investment journey seamless.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    {/* Icon */}
                    <div className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                      <service.icon className="w-7 h-7" />
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 pt-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-primary font-medium pt-2 group-hover:gap-3 transition-all">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="w-full py-16 md:py-24 px-4 bg-muted/30 border-y border-border">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">How We Work</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our streamlined 4-step process ensures a smooth and hassle-free land transaction experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Connector Line */}
                  {idx < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
                  )}

                  <div className="relative bg-card border border-border rounded-xl p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg relative z-10">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="w-full py-16 md:py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Why Choose Land2Land?
                </h2>
                <p className="text-muted-foreground text-lg">
                  With over 15 years of experience in India&apos;s agricultural land market, we bring unmatched expertise and dedication to every client relationship.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Award, title: "Expert Team", desc: "50+ experienced land and agriculture professionals" },
                    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance for all queries" },
                    { icon: Shield, title: "Verified Titles", desc: "100% legally verified land titles and ownership" },
                    { icon: TrendingUp, title: "Best Deals", desc: "Exclusive deals and transparent pricing" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-[#2d5016] to-[#4a7c2e] rounded-2xl p-8 text-white space-y-6">
                <h3 className="text-2xl font-bold">Ready to Get Started?</h3>
                <p className="text-green-100">
                  Connect with our expert team for a free consultation and personalized land recommendations.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-green-200">Call Us</div>
                      <a href="tel:+919873702365" className="font-semibold hover:underline">+91 98737-02365</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-green-200">Working Hours</div>
                      <div className="font-semibold">Mon - Sat: 9:00 AM - 7:00 PM</div>
                    </div>
                  </div>
                </div>

                <Button asChild size="lg" className="w-full bg-white text-[#2d5016] hover:bg-white/90 h-12 font-semibold">
                  <Link href="/contact">Schedule Free Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-16 px-4 bg-muted/30 border-t border-border">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Have Questions About Our Services?
            </h2>
            <p className="text-muted-foreground">
              Our team is here to help you navigate your land investment journey. Get in touch for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link href="/buy">Browse Land Listings</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
