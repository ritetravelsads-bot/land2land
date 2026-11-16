import { CheckCircle2, Map, Ruler, Users, FileCheck2, MapPin } from "lucide-react"

const features = [
  {
    icon: CheckCircle2,
    title: "Pre-Screened Land Parameters",
    description: "Every listing highlights verified essentials before you visit—exact approach road width, HT power line clearances, water table availability, and clear boundary status.",
  },
  {
    icon: Map,
    title: "Multi-Category Specialization",
    description: "Whether you need irrigated agricultural fields, MIDC/HSIIDC industrial plots, NA residential layouts, or village Abadi land—search under frameworks built specifically for land.",
  },
  {
    icon: Ruler,
    title: "State-Wise Local Unit Transparency",
    description: "No metric confusion. Convert and compare land measurements instantly across regional standards—from Bigha and Kanal to Guntha, Cents, and Acres.",
  },
  {
    icon: Users,
    title: "Direct Connect, Zero Hidden Opacity",
    description: "Connect directly with verified landowners, authorized brokers, and master builders without navigating through opaque multi-layer broker networks.",
  },
  {
    icon: FileCheck2,
    title: "Portal & Legal Document Alignment",
    description: "Cross-check listings using our step-by-step state portal lookup guides (Jamabandi, Bhulekh, Dharani, AnyRoR) to verify records directly on government portals.",
  },
  {
    icon: MapPin,
    title: "True Micro-Market Search",
    description: "Filter land parcels by exact proximity to key expressways, industrial corridors, village boundaries, or major infrastructure developments.",
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
            WHY LAND2LAND

          </span>
          <h2 className="text-white mb-4 text-3xl md:text-4xl font-bold text-balance">
            Built to Eliminate Risk in Land Buying &amp; Selling
          </h2>
          <p className="text-white/65 text-base max-w-2xl mx-auto leading-relaxed">
            Unfiltered land listings, state-specific compliance clarity, and zero hidden land parameters.
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
