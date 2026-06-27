import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Find Land Agents | Land2Land",
  description: "Connect with verified land agents and property consultants across India. Find expert guidance for your land investment.",
}

export default function FindAgentPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Find Land Agents
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified land agents and property consultants across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Search Agents</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  placeholder="Enter state or city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                  <option>All Specializations</option>
                  <option>Agricultural Land</option>
                  <option>Farmland</option>
                  <option>Investment Properties</option>
                  <option>Land Development</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                  <option>Any experience</option>
                  <option>1-3 years</option>
                  <option>3-5 years</option>
                  <option>5+ years</option>
                </select>
              </div>
              <button className="w-full bg-[#2d5016] hover:bg-[#1d3610] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Find Agents
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">👤</div>
                <div>
                  <h3 className="font-bold text-[#2d5016] mb-1">Rajesh Kumar</h3>
                  <p className="text-sm text-gray-600 mb-2">Agricultural Land Specialist</p>
                  <p className="text-sm text-gray-700 mb-3">Experience: 8+ years | Location: Uttar Pradesh</p>
                  <button className="text-sm bg-[#2d5016] text-white px-4 py-2 rounded hover:bg-[#1d3610] transition-colors">
                    Connect Now
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">👤</div>
                <div>
                  <h3 className="font-bold text-[#2d5016] mb-1">Priya Singh</h3>
                  <p className="text-sm text-gray-600 mb-2">Farm Investment Advisor</p>
                  <p className="text-sm text-gray-700 mb-3">Experience: 6+ years | Location: Punjab</p>
                  <button className="text-sm bg-[#2d5016] text-white px-4 py-2 rounded hover:bg-[#1d3610] transition-colors">
                    Connect Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-lg font-bold text-[#2d5016] mb-2">Verified Professionals</h3>
            <p className="text-sm text-gray-600">All agents are verified and certified professionals</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-lg font-bold text-[#2d5016] mb-2">Direct Communication</h3>
            <p className="text-sm text-gray-600">Chat directly with agents and get instant responses</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-[#2d5016] mb-2">Market Expertise</h3>
            <p className="text-sm text-gray-600">Expert market knowledge and property analytics</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full agent directory will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
