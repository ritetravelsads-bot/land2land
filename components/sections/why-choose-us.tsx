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
    <section className="w-full py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-green-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-green-700 mb-4 text-3xl md:text-4xl font-bold">Why Choose Land2Land</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            India's Most Trusted Marketplace for All Types of Land
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-green-100"
              >
                <div className="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-4 hover:bg-green-600 hover:scale-110 transition-all">
                  <Icon className="text-green-700 hover:text-white transition-colors" size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
