"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { TrendingUp, BarChart3, PieChart, DollarSign } from "lucide-react"

interface InvestmentOption {
  title: string
  minYield: number
  maxYield: number
  description: string
  icon: string
  highlights: string[]
}

const INVESTMENT_OPTIONS: InvestmentOption[] = [
  {
    title: "Agricultural Land Investment",
    minYield: 8,
    maxYield: 12,
    description: "Invest in high-yield agricultural properties with proven returns",
    icon: "📈",
    highlights: ["Conservative", "Steady growth", "Active management", "Premium land"]
  },
  {
    title: "Farm Development",
    minYield: 10,
    maxYield: 15,
    description: "Support farm infrastructure projects with solid growth potential",
    icon: "🏗️",
    highlights: ["Infrastructure focus", "Modernization", "Productivity gains", "Market access"]
  },
  {
    title: "Organic Farming",
    minYield: 12,
    maxYield: 18,
    description: "Emerging opportunities in certified organic farming ventures",
    icon: "🌾",
    highlights: ["Premium pricing", "Export markets", "Certification support", "Sustainability"]
  },
  {
    title: "Irrigation Projects",
    minYield: 9,
    maxYield: 14,
    description: "Invest in land development with modern irrigation systems",
    icon: "💧",
    highlights: ["Water security", "Year-round crops", "Higher yields", "Reliability"]
  },
  {
    title: "Land Banking",
    minYield: 6,
    maxYield: 10,
    description: "Long-term appreciation potential in growth corridor areas",
    icon: "🏦",
    highlights: ["Long-term play", "Urban expansion", "Infrastructure", "Capital growth"]
  },
  {
    title: "Agritourism",
    minYield: 15,
    maxYield: 20,
    description: "Combine farming with tourism for premium returns",
    icon: "🏨",
    highlights: ["Experiential revenue", "Multiple income streams", "Premium pricing", "Passive income"]
  },
]

export default function InvestmentsPage() {
  const [investment, setInvestment] = useState(100000)
  const [selectedYield, setSelectedYield] = useState(10)
  const [years, setYears] = useState(5)
  const [selectedOption, setSelectedOption] = useState(0)

  // ROI Calculation
  const finalAmount = investment * Math.pow(1 + selectedYield / 100, years)
  const profit = finalAmount - investment
  const totalReturn = (profit / investment) * 100

  // Yearly breakdown
  const yearlyData = Array.from({ length: years }, (_, i) => ({
    year: i + 1,
    amount: investment * Math.pow(1 + selectedYield / 100, i + 1)
  }))

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Land Investment Opportunities</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Explore profitable investment opportunities in agricultural land and farm properties across India
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* Investment Options Grid */}
          <h2 className="text-3xl font-bold text-[#2d5016] mb-8">Investment Types & Expected Returns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {INVESTMENT_OPTIONS.map((option, idx) => (
              <div
                key={option.title}
                onClick={() => {
                  setSelectedOption(idx)
                  setSelectedYield((option.minYield + option.maxYield) / 2)
                }}
                className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedOption === idx
                    ? "border-[#2d5016] bg-green-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-[#2d5016]"
                }`}
              >
                <div className="text-4xl mb-3">{option.icon}</div>
                <h3 className="text-lg font-bold text-[#2d5016] mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                <div className="mb-4 p-3 bg-gray-50 rounded">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Expected Yield</p>
                  <p className="text-2xl font-bold text-[#2d5016]">{option.minYield}-{option.maxYield}%</p>
                </div>
                <div className="space-y-1">
                  {option.highlights.map((highlight) => (
                    <p key={highlight} className="text-xs text-gray-600 flex items-center gap-1">
                      <span className="text-[#2d5016]">•</span> {highlight}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ROI Calculator */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-8">ROI Calculator</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calculator Input */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="100000"
                    value={investment}
                    onChange={(e) => setInvestment(Number(e.target.value))}
                    className="w-full accent-[#2d5016]"
                  />
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-[#2d5016]">
                      ₹{(investment / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Annual Yield (%)</label>
                  <input
                    type="range"
                    min={INVESTMENT_OPTIONS[selectedOption].minYield}
                    max={INVESTMENT_OPTIONS[selectedOption].maxYield}
                    step="0.5"
                    value={selectedYield}
                    onChange={(e) => setSelectedYield(Number(e.target.value))}
                    className="w-full accent-[#2d5016]"
                  />
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-[#2d5016]">{selectedYield.toFixed(1)}%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Investment Period (Years)</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 3, 5, 7, 10, 15].map((y) => (
                      <button
                        key={y}
                        onClick={() => setYears(y)}
                        className={`py-2 rounded font-semibold transition-all ${
                          years === y
                            ? "bg-[#2d5016] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {y}Y
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Display */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Initial Investment */}
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <p className="text-xs text-gray-700 mb-1">Initial Investment</p>
                    <p className="text-3xl font-bold text-blue-700">
                      ₹{(investment / 100000).toFixed(2)}L
                    </p>
                  </div>

                  {/* Final Amount */}
                  <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <p className="text-xs text-gray-700 mb-1">Final Amount</p>
                    <p className="text-3xl font-bold text-green-700">
                      ₹{(finalAmount / 100000).toFixed(2)}L
                    </p>
                  </div>

                  {/* Profit */}
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                    <p className="text-xs text-gray-700 mb-1">Total Profit</p>
                    <p className="text-3xl font-bold text-emerald-700">
                      ₹{(profit / 100000).toFixed(2)}L
                    </p>
                  </div>

                  {/* Return % */}
                  <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                    <p className="text-xs text-gray-700 mb-1">Total Return</p>
                    <p className="text-3xl font-bold text-amber-700">
                      {totalReturn.toFixed(1)}%
                    </p>
                  </div>
                </div>

                {/* Yearly Breakdown Table */}
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-3">Year-by-Year Growth</h3>
                  <div className="overflow-auto max-h-48 border border-gray-200 rounded-lg">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100 sticky top-0">
                        <tr>
                          <th className="px-4 py-2 text-left text-gray-700 font-semibold">Year</th>
                          <th className="px-4 py-2 text-right text-gray-700 font-semibold">Amount</th>
                          <th className="px-4 py-2 text-right text-gray-700 font-semibold">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearlyData.map((data) => (
                          <tr key={data.year} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-2 text-gray-700 font-medium">Year {data.year}</td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              ₹{(data.amount / 100000).toFixed(2)}L
                            </td>
                            <td className="px-4 py-2 text-right text-green-700 font-semibold">
                              +{(((data.amount - investment) / investment) * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Invest */}
          <div className="bg-white rounded-lg shadow p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-8">Why Invest in Agricultural Land?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Steady Appreciation",
                  desc: "Land value appreciates 8-12% annually, historically outpacing inflation"
                },
                {
                  title: "Tangible Asset",
                  desc: "Real, physical asset you can see and touch, with intrinsic value"
                },
                {
                  title: "Passive Income",
                  desc: "Generate seasonal or year-round income through agricultural production"
                },
                {
                  title: "Inflation Hedge",
                  desc: "Protects your wealth against inflation and currency devaluation"
                },
                {
                  title: "Government Support",
                  desc: "Access to agricultural loans, subsidies, and support schemes"
                },
                {
                  title: "Legacy Building",
                  desc: "Create a valuable asset to pass down to future generations"
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#2d5016] text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2d5016] mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/buy"
              className="inline-flex items-center gap-2 bg-[#2d5016] hover:bg-[#1d3610] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Browse Investment Opportunities
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
