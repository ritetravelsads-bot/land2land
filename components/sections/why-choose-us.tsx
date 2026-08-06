import { Map, Sparkles, MapPin, LineChart, Briefcase, Network } from "lucide-react"

const features = [
  {
    icon: Map,
    title: "Nationwide Land Coverage",
    description: "Explore properties across cities, districts, industrial corridors and emerging investment zones.",
  },
  {
    icon: Sparkles,
    title: "Curated Investment Opportunities",
    description: "Discover handpicked land with strong growth potential and future appreciation.",
  },
  {
    icon: MapPin,
    title: "Location-Based Discovery",
    description: "Search properties by state, city, district or nearby landmarks with ease.",
  },
  {
    icon: LineChart,
    title: "Market Intelligence",
    description: "Stay informed with land trends, pricing insights and investment hotspots.",
  },
  {
    icon: Briefcase,
    title: "Land for Every Purpose",
    description: "From farming and housing to industries and commercial projects—find land that matches your goals.",
  },
  {
    icon: Network,
    title: "A Growing Real Estate Ecosystem",
    description: "Connect with developers, brokers, landowners and investors through one trusted platform.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-[var(--land-primary)] relative overflow-hidden">
      {/* Subtle field-texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 38px,#fff 38px,#fff 40px), repeating-linear-gradient(90deg,transparent,transparent 38px,#fff 38px,#fff 40px)",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[var(--land-ochre)] text-xs font-semibold uppercase tracking-widest mb-3">
            Why Choose Land2Land?
          </span>
          <h2 className="text-white mb-4 text-3xl md:text-4xl font-bold text-balance">
            Everything You Need to Find the Right Land
          </h2>
          <p className="text-white/65 text-base max-w-2xl mx-auto leading-relaxed">
            One platform. Smarter decisions. Better opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const iconStyles = [
              "bg-[#7a9e5c]/30 text-[#b8d98b]",
              "bg-[var(--land-ochre)]/20 text-[var(--land-ochre)]",
              "bg-sky-900/40 text-sky-300",
              "bg-emerald-900/40 text-emerald-300",
              "bg-amber-900/30 text-amber-300",
              "bg-teal-900/40 text-teal-300",
            ]
            return (
              <div
                key={feature.title}
                className="bg-white/8 rounded-2xl p-6 hover:bg-white/12 transition-all duration-300 border border-white/10 group"
              >
                <div className={`w-11 h-11 rounded-xl ${iconStyles[index]} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
