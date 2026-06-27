import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Farms & Agricultural Properties | Land2Land",
  description: "Browse verified farm properties and agricultural land across India. Find farmland with irrigation, livestock facilities, and more.",
}

export default function FarmsPage() {
  const farmTypes = [
    {
      name: "Active Farms",
      description: "Fully operational farms with crops, livestock, and infrastructure",
      icon: "🚜",
    },
    {
      name: "Dairy Farms",
      description: "Specialized dairy farming properties with facilities",
      icon: "🐄",
    },
    {
      name: "Organic Farms",
      description: "Certified organic farming land and properties",
      icon: "🌱",
    },
    {
      name: "Irrigation Farms",
      description: "Land with reliable irrigation systems and water access",
      icon: "💧",
    },
    {
      name: "Plantation Land",
      description: "Orchard and plantation properties with crops",
      icon: "🍊",
    },
    {
      name: "Hobby Farms",
      description: "Smaller farm properties for hobby farming and agritourism",
      icon: "🐓",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Farms & Agricultural Properties
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover verified farms and agricultural properties across India
          </p>
        </div>

        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Type</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                <option>All Types</option>
                <option>Active Farms</option>
                <option>Dairy Farms</option>
                <option>Organic Farms</option>
                <option>Irrigation Farms</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                <option>All States</option>
                <option>Punjab</option>
                <option>Haryana</option>
                <option>Uttar Pradesh</option>
                <option>Karnataka</option>
                <option>Andhra Pradesh</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {farmTypes.map((farm) => (
            <div
              key={farm.name}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-5xl mb-4">{farm.icon}</div>
              <h3 className="text-xl font-bold text-[#2d5016] mb-2">{farm.name}</h3>
              <p className="text-gray-600 mb-6">{farm.description}</p>
              <button className="text-[#2d5016] font-semibold hover:text-[#1d3610] transition-colors">
                Browse →
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Featured Farms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#2d5016] mb-2">20 Acre Organic Farm - Punjab</h3>
              <p className="text-sm text-gray-600 mb-4">Certified organic property with irrigation facilities</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2d5016]">₹45 Lakhs</span>
                <button className="text-sm bg-[#2d5016] text-white px-4 py-2 rounded hover:bg-[#1d3610] transition-colors">
                  View Details
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#2d5016] mb-2">Dairy Farm - Haryana</h3>
              <p className="text-sm text-gray-600 mb-4">Active dairy operation with modern facilities</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#2d5016]">₹75 Lakhs</span>
                <button className="text-sm bg-[#2d5016] text-white px-4 py-2 rounded hover:bg-[#1d3610] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full farm listing and details will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
