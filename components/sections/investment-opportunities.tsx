"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Users, Award } from "lucide-react"

const opportunities = [
  {
    title: "High-ROI Farmland",
    description: "50-acre organic farmland with a proven track record of strong annual returns",
    location: "Punjab",
    type: "Farmland",
    investment: "₹45 Lakhs",
    roi: "18%",
    returns: "₹8.1L/year",
    features: ["Clear Title", "Irrigation", "Road Access"],
    icon: TrendingUp,
    accent: "text-emerald-700",
    accentBg: "bg-emerald-50",
    iconBg: "bg-emerald-100",
  },
  {
    title: "Commercial Plot on Highway",
    description: "High-visibility commercial plot on a fast-growing arterial road with strong rental demand",
    location: "Maharashtra",
    type: "Commercial",
    investment: "₹28 Lakhs",
    roi: "22%",
    returns: "₹6.2L/year",
    features: ["Road Frontage", "Commercial Zoning", "Verified"],
    icon: Award,
    accent: "text-amber-700",
    accentBg: "bg-amber-50",
    iconBg: "bg-amber-100",
  },
  {
    title: "Industrial Land Parcel",
    description: "30-acre industrial land in a notified zone with power load and wide access roads",
    location: "Haryana",
    type: "Industrial",
    investment: "₹36 Lakhs",
    roi: "20%",
    returns: "₹7.2L/year",
    features: ["Industrial Zoning", "Power & Water", "Govt Verified"],
    icon: Users,
    accent: "text-blue-700",
    accentBg: "bg-blue-50",
    iconBg: "bg-blue-100",
  },
  {
    title: "Residential Plot in Gated Layout",
    description: "Ready-to-build residential plots in an approved gated layout near a growth corridor",
    location: "Rajasthan",
    type: "Residential",
    investment: "₹22 Lakhs",
    roi: "19%",
    returns: "₹4.2L/year",
    features: ["Approved Layout", "Utilities", "Corner Options"],
    icon: DollarSign,
    accent: "text-purple-700",
    accentBg: "bg-purple-50",
    iconBg: "bg-purple-100",
  },
]

export default function InvestmentOpportunities() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[#f7f5f2] border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8 md:mb-10">
          <div className="p-2 bg-slate-800 rounded-lg">
            <TrendingUp size={20} className="text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Investment Opportunities</h2>
            <p className="text-sm text-gray-500 font-medium">High-ROI land across agricultural, commercial, industrial and residential categories</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {opportunities.map((opportunity, index) => {
            const IconComponent = opportunity.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-gray-150 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${opportunity.accentBg} ${opportunity.accent}`}>
                        {opportunity.type}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{opportunity.location}</span>
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{opportunity.title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{opportunity.description}</p>
                  </div>
                  <div className={`p-2.5 ${opportunity.iconBg} rounded-lg ml-3 shrink-0`}>
                    <IconComponent size={18} className={opportunity.accent} />
                  </div>
                </div>

                {/* ROI stats */}
                <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-gray-100 mb-4">
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Investment</p>
                    <p className={`text-sm font-bold ${opportunity.accent}`}>{opportunity.investment}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">ROI/Year</p>
                    <p className={`text-sm font-bold ${opportunity.accent}`}>{opportunity.roi}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">Returns</p>
                    <p className={`text-sm font-bold ${opportunity.accent}`}>{opportunity.returns}</p>
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {opportunity.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-1 bg-gray-50 text-gray-600 border border-gray-150 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button asChild variant="outline" className="w-full mt-auto border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Link href="/investments">Learn More</Link>
                </Button>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center pt-8">
          <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white">
            <Link href="/investments">View All Investment Opportunities</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
