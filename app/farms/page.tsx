"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { MapPin, Tractor, DollarSign, TrendingUp, Award } from "lucide-react"

interface Farm {
  id: string
  name: string
  type: string
  location: string
  state: string
  size: number
  sizeUnit: string
  price: number
  facilities: string[]
  crops: string[]
  icon: string
  yield: string
}

const FARM_TYPES = [
  {
    name: "Active Farms",
    description: "Fully operational farms with crops, livestock, and established infrastructure ready for immediate operation",
    icon: "🚜",
    benefits: ["Immediate cash flow", "Established markets", "Existing infrastructure", "Trained labor"],
  },
  {
    name: "Dairy Farms",
    description: "Specialized dairy farming properties with livestock facilities, milk collection centers, and proven profit margins",
    icon: "🐄",
    benefits: ["Steady monthly income", "Government support", "Cooperative tie-ups", "Export opportunities"],
  },
  {
    name: "Organic Farms",
    description: "Certified organic farming land with premium market pricing and sustainable practices",
    icon: "🌱",
    benefits: ["Premium pricing", "Organic certification", "Eco-tourism potential", "Export markets"],
  },
  {
    name: "Irrigation Farms",
    description: "Land with reliable irrigation systems, water access, and guaranteed yield potential",
    icon: "💧",
    benefits: ["Year-round cropping", "Higher yields", "Crop diversity", "Lower risk"],
  },
  {
    name: "Plantation Land",
    description: "Orchard and plantation properties with fruit trees, spices, or cash crops generating passive income",
    icon: "🍊",
    benefits: ["Passive income", "Long-term appreciation", "Agri-tourism", "Low maintenance"],
  },
  {
    name: "Hobby Farms",
    description: "Smaller farm properties perfect for hobby farming, weekend getaways, and light agritourism",
    icon: "🐓",
    benefits: ["Personal use", "Agritourism income", "Lifestyle upgrade", "Investment potential"],
  },
]

const FEATURED_FARMS: Farm[] = [
  {
    id: "1",
    name: "Premium Dairy Farm Complex",
    type: "Dairy Farms",
    location: "Sonipat",
    state: "Haryana",
    size: 50,
    sizeUnit: "acres",
    price: 2500000,
    facilities: ["Cattle Shed", "Milk Collection Center", "Electricity", "Water Access", "Irrigation"],
    crops: ["Dairy", "Fodder"],
    icon: "🐄",
    yield: "₹5L/month",
  },
  {
    id: "2",
    name: "Organic Vegetable Farm",
    type: "Organic Farms",
    location: "Dehradun",
    state: "Uttarakhand",
    size: 25,
    sizeUnit: "acres",
    price: 1800000,
    facilities: ["Organic Certification", "Irrigation", "Road Access", "Storage"],
    crops: ["Organic Vegetables", "Pulses"],
    icon: "🌱",
    yield: "₹2.5L/season",
  },
  {
    id: "3",
    name: "Mango Plantation Estate",
    type: "Plantation Land",
    location: "Lucknow",
    state: "Uttar Pradesh",
    size: 35,
    sizeUnit: "acres",
    price: 1500000,
    facilities: ["Irrigation", "Well", "Road Access", "Electricity"],
    crops: ["Mango", "Guava"],
    icon: "🍊",
    yield: "₹8L/year",
  },
]

export default function FarmsPage() {
  const [farmType, setFarmType] = useState("")
  const [state, setState] = useState("")

  const filteredFarms = FEATURED_FARMS.filter(farm => {
    if (farmType && farm.type !== farmType) return false
    if (state && farm.state !== state) return false
    return true
  })

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-4">Farms & Agricultural Properties</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Discover verified farms across India. From active operations to investment opportunities, find the right farm for your goals.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          {/* Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-12">
            <h2 className="text-xl font-bold text-[#2d5016] mb-6">Filter Farms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Farm Type</label>
                <select
                  value={farmType}
                  onChange={(e) => setFarmType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                >
                  <option value="">All Types</option>
                  {FARM_TYPES.map((type) => (
                    <option key={type.name} value={type.name}>{type.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                >
                  <option value="">All States</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
            </div>
          </div>

          {/* Farm Types Grid */}
          <h2 className="text-3xl font-bold text-[#2d5016] mb-8">Types of Farms Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {FARM_TYPES.map((farm) => (
              <div key={farm.name} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-l-4 border-[#2d5016]">
                <div className="text-5xl mb-4">{farm.icon}</div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">{farm.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{farm.description}</p>
                <div className="space-y-1 mb-4">
                  <p className="text-xs font-semibold text-gray-700">Benefits:</p>
                  {farm.benefits.map((benefit) => (
                    <p key={benefit} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="text-[#2d5016]">✓</span> {benefit}
                    </p>
                  ))}
                </div>
                <Link
                  href={`/properties?category=farmland&farm_type=${farm.name.toLowerCase().replace(" ", "_")}`}
                  className="text-[#2d5016] font-semibold hover:text-[#1d3610] transition-colors inline-flex items-center gap-1"
                >
                  Browse → 
                </Link>
              </div>
            ))}
          </div>

          {/* Featured Farms */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#2d5016] mb-8">Featured Farms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFarms.map((farm) => (
                <div key={farm.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Header Card */}
                  <div className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] text-white p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-4xl">{farm.icon}</div>
                      <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">{farm.type}</div>
                    </div>
                    <h3 className="text-lg font-bold">{farm.name}</h3>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-[#2d5016]" />
                      <span className="text-sm">{farm.location}, {farm.state}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Size</p>
                        <p className="text-lg font-bold text-[#2d5016]">{farm.size} {farm.sizeUnit}</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Yield</p>
                        <p className="text-lg font-bold text-[#2d5016]">{farm.yield}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">Facilities:</p>
                      <div className="flex flex-wrap gap-1">
                        {farm.facilities.slice(0, 3).map((facility) => (
                          <span key={facility} className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-3">Expected Price</p>
                      <p className="text-2xl font-bold text-[#2d5016]">₹{(farm.price / 100000).toFixed(1)}L</p>
                    </div>

                    <button className="w-full bg-[#2d5016] hover:bg-[#1d3610] text-white font-semibold py-2 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {filteredFarms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No farms found matching your criteria. Try adjusting filters.</p>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-lg shadow p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Why Invest in Farms?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <TrendingUp className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">Capital Appreciation</h3>
                <p className="text-sm text-gray-600">Land values grow 8-12% annually in agricultural belts</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <DollarSign className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">Regular Income</h3>
                <p className="text-sm text-gray-600">Seasonal or year-round income from crops and livestock</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Tractor className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">Sustainable</h3>
                <p className="text-sm text-gray-600">Build a legacy with productive agricultural assets</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Award className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="font-bold text-[#2d5016] mb-2">Government Support</h3>
                <p className="text-sm text-gray-600">Access to subsidies, loans, and agricultural schemes</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#2d5016] hover:bg-[#1d3610] text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              Find Your Farm Today
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
