"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Users, Award } from "lucide-react"

const opportunities = [
  {
    title: "High-ROI Farm Investment",
    description: "50-acre organic farmland with 25-year track record of 18% annual returns",
    location: "Punjab",
    investment: "₹45 Lakhs",
    roi: "18%",
    returns: "₹8.1L/year",
    features: ["Certified Organic", "Irrigation", "Road Access"],
    icon: TrendingUp,
  },
  {
    title: "Commercial Horticulture",
    description: "20-acre mango orchard in high-demand region with established buyer network",
    location: "Maharashtra",
    investment: "₹28 Lakhs",
    roi: "22%",
    returns: "₹6.2L/year",
    features: ["Mature Trees", "Market Ready", "Certified"],
    icon: Award,
  },
  {
    title: "Irrigation Land Bundle",
    description: "30-acre agriculture land with water rights and canal connectivity",
    location: "Haryana",
    investment: "₹36 Lakhs",
    roi: "20%",
    returns: "₹7.2L/year",
    features: ["Water Rights", "Canal Fed", "Govt Verified"],
    icon: Users,
  },
  {
    title: "Agri-Tech Partnership Land",
    description: "15-acre premium farmland with precision farming setup and tech support",
    location: "Rajasthan",
    investment: "₹22 Lakhs",
    roi: "19%",
    returns: "₹4.2L/year",
    features: ["Tech Enabled", "Training", "Support"],
    icon: DollarSign,
  },
]

export default function InvestmentOpportunities() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-2 mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-600 rounded-lg">
              <TrendingUp size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Investment Opportunities</h2>
              <p className="text-sm text-gray-600 font-medium">High-ROI land investments with verified returns</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opportunity, index) => {
            const IconComponent = opportunity.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{opportunity.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{opportunity.description}</p>
                    <div className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      {opportunity.location}
                    </div>
                  </div>
                  <div className="p-2.5 bg-green-100 rounded-lg">
                    <IconComponent size={20} className="text-green-700" />
                  </div>
                </div>

                {/* ROI Highlight */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-gray-200 mb-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-0.5">Investment</p>
                    <p className="font-bold text-green-700">{opportunity.investment}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-0.5">ROI/Year</p>
                    <p className="font-bold text-green-700">{opportunity.roi}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-0.5">Returns</p>
                    <p className="font-bold text-green-700">{opportunity.returns}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {opportunity.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                    >
                      ✓ {feature}
                    </span>
                  ))}
                </div>

                <Button asChild className="w-full mt-auto bg-green-600 hover:bg-green-700 text-white">
                  <Link href="/investments">Learn More</Link>
                </Button>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Link href="/investments">View All Investment Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
