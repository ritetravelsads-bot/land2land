import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Land & Agricultural Property | Land2Land",
  description: "Find and buy agricultural land, farmland, and properties across India. Connect with verified sellers and agents on Land2Land.",
}

export default function BuyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Buy Land & Agricultural Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover verified land properties across India. Browse agricultural land, farmland, and investment opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🌾</div>
            <h3 className="text-xl font-bold text-[#2d5016] mb-2">Agricultural Land</h3>
            <p className="text-gray-600">Find verified agricultural land with clear titles and ownership records.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🚜</div>
            <h3 className="text-xl font-bold text-[#2d5016] mb-2">Farmland</h3>
            <p className="text-gray-600">Browse active farms with infrastructure and irrigation facilities available.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🏞️</div>
            <h3 className="text-xl font-bold text-[#2d5016] mb-2">Plots & Vacant Land</h3>
            <p className="text-gray-600">Explore vacant land and plots perfect for development and investment.</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full buy listing functionality will be available soon.
          </p>
          <button className="bg-[#2d5016] hover:bg-[#1d3610] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Browse Properties
          </button>
        </div>
      </div>
    </main>
  )
}
