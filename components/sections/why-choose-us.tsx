import { Shield, Award, Users, TrendingUp, Clock, HeadphonesIcon } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "100% Verified Land Titles",
    description: "Every property has verified ownership documents and legal clearance.",
  },
  {
    icon: Award,
    title: "Expert Land Advisory",
    description: "Personalized guidance from land specialists and market experts across every land type.",
  },
  {
    icon: Users,
    title: "Direct Seller & Buyer Network",
    description: "Connect directly with verified sellers, agents, buyers, and investors.",
  },
  {
    icon: TrendingUp,
    title: "Investment ROI Tracking",
    description: "Real-time analytics and historical ROI data for informed investment decisions.",
  },
  {
    icon: Clock,
    title: "Fast Land Transactions",
    description: "Streamlined process with legal verification and documentation support.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Customer Support",
    description: "Round-the-clock assistance for all your buying and selling queries.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-3">Why Land2Land</p>
          <h2 className="text-white mb-4 text-3xl md:text-4xl font-bold">India&apos;s Most Trusted Land Marketplace</h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Buy, sell and invest in agricultural, residential, commercial and industrial land with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const iconColors = [
              "bg-green-900/60 text-green-400",
              "bg-amber-900/60 text-amber-400",
              "bg-blue-900/60 text-blue-400",
              "bg-purple-900/60 text-purple-400",
              "bg-orange-900/60 text-orange-400",
              "bg-teal-900/60 text-teal-400",
            ]
            return (
              <div
                key={feature.title}
                className="bg-slate-800/60 rounded-xl p-6 hover:bg-slate-800 transition-all duration-300 border border-slate-700/50"
              >
                <div className={`w-12 h-12 rounded-lg ${iconColors[index]} flex items-center justify-center mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
