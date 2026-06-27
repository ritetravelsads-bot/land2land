import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sell Land & Agricultural Property | Land2Land",
  description: "List and sell your agricultural land, farmland, or property on Land2Land. Reach qualified buyers across India.",
}

export default function SellPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Sell Your Land & Agricultural Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            List your property for free and connect with serious buyers and investors across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">Free Listing</h3>
                <p className="text-gray-600">List your property for free without any hidden charges.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">Wide Reach</h3>
                <p className="text-gray-600">Connect with thousands of qualified buyers and investors.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">Expert Support</h3>
                <p className="text-gray-600">Get guidance from our land experts throughout the selling process.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-3xl flex-shrink-0">✓</div>
              <div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">Secure Transaction</h3>
                <p className="text-gray-600">Complete your transaction safely with verified buyers.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-[#2d5016] mb-6">List Your Property</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                  <option>Agricultural Land</option>
                  <option>Farmland</option>
                  <option>Plots & Vacant Land</option>
                  <option>Land with Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Size (Acres)</label>
                <input type="number" placeholder="Enter size" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input type="text" placeholder="Enter location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]" />
              </div>
              <button type="button" className="w-full bg-[#2d5016] hover:bg-[#1d3610] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Post Property
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full sell listing functionality will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
