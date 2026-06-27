import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Land Investment Opportunities | Land2Land",
  description: "Discover profitable land and farm investment opportunities across India. High-yield agricultural investments for smart investors.",
}

export default function InvestmentsPage() {
  const investmentTypes = [
    {
      title: "Agricultural Land Investment",
      yield: "8-12% annually",
      description: "Invest in high-yield agricultural properties with proven returns",
      icon: "📈",
    },
    {
      title: "Farm Development",
      yield: "10-15% annually",
      description: "Support farm infrastructure projects with solid growth potential",
      icon: "🏗️",
    },
    {
      title: "Organic Farming",
      yield: "12-18% annually",
      description: "Emerging opportunities in certified organic farming ventures",
      icon: "🌾",
    },
    {
      title: "Irrigation Projects",
      yield: "9-14% annually",
      description: "Invest in land development with modern irrigation systems",
      icon: "💧",
    },
    {
      title: "Land Banking",
      yield: "6-10% annually",
      description: "Long-term appreciation potential in growth corridor areas",
      icon: "🏦",
    },
    {
      title: "Agritourism",
      yield: "15-20% annually",
      description: "Combine farming with tourism for premium returns",
      icon: "🏨",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Land Investment Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore profitable investment opportunities in agricultural land and farm properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {investmentTypes.map((investment) => (
            <div
              key={investment.title}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{investment.icon}</div>
              <h3 className="text-lg font-bold text-[#2d5016] mb-2">{investment.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{investment.description}</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-[#2d5016]">
                  Expected Yield: <span className="text-lg">{investment.yield}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Why Invest in Land?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-bold text-[#2d5016] mb-1">Steady Appreciation</h4>
                  <p className="text-sm text-gray-600">Land value appreciates consistently over time</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-bold text-[#2d5016] mb-1">Tangible Asset</h4>
                  <p className="text-sm text-gray-600">Real, physical asset with intrinsic value</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-bold text-[#2d5016] mb-1">Inflation Hedge</h4>
                  <p className="text-sm text-gray-600">Protects wealth against inflation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-2xl">✓</span>
                <div>
                  <h4 className="font-bold text-[#2d5016] mb-1">Tax Benefits</h4>
                  <p className="text-sm text-gray-600">Multiple tax advantages available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#2d5016] to-[#4a7c2e] rounded-lg shadow-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Get Investment Guide</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-100 focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-100 focus:outline-none focus:border-white/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Investment Budget</label>
                <select className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-white/40">
                  <option value="" className="text-gray-800">Select budget range</option>
                  <option value="5l" className="text-gray-800">Up to 5 Lakhs</option>
                  <option value="10l" className="text-gray-800">5 - 10 Lakhs</option>
                  <option value="25l" className="text-gray-800">10 - 25 Lakhs</option>
                  <option value="50l" className="text-gray-800">25 - 50 Lakhs</option>
                  <option value="1cr" className="text-gray-800">50 Lakhs - 1 Cr</option>
                  <option value="more" className="text-gray-800">1 Cr+</option>
                </select>
              </div>
              <button
                type="button"
                className="w-full bg-white hover:bg-gray-100 text-[#2d5016] font-semibold py-3 rounded-lg transition-colors"
              >
                Download Guide
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full investment analysis and opportunities will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
