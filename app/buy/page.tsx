"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, MapPin, DollarSign, Zap, CheckCircle2 } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function BuyPage() {
  const [searchState, setSearchState] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    landType: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchState.location) params.append("location", searchState.location)
    if (searchState.minPrice) params.append("minPrice", searchState.minPrice)
    if (searchState.maxPrice) params.append("maxPrice", searchState.maxPrice)
    if (searchState.landType) params.append("category", searchState.landType)
    window.location.href = `/properties?${params.toString()}`
  }

  const landCategories = [
    { name: "Agricultural Land", description: "Verified agricultural land with clear titles", href: "/properties?category=agricultural_land", icon: "🌾" },
    { name: "Farmland", description: "Active farms with irrigation and infrastructure", href: "/properties?category=farmland", icon: "🚜" },
    { name: "Plots & Land", description: "Vacant plots and land parcels for development", href: "/properties?category=plot", icon: "🏞️" },
    { name: "Orchard Land", description: "Fruit and vegetable farming land", href: "/properties?category=orchard", icon: "🍊" },
    { name: "Irrigation Land", description: "Land with water access and irrigation rights", href: "/properties?category=irrigation_land", icon: "💧" },
    { name: "Investment Land", description: "High-ROI land in growth corridors", href: "/properties?category=investment_land", icon: "📈" },
  ]

  const states = [
    "Punjab", "Haryana", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh", 
    "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana"
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-[#2d5016] mb-6">
              Find Your Perfect Land
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore verified agricultural land, farmland, and investment opportunities across India. Transparent pricing, verified titles, expert guidance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location / State</label>
                <select
                  value={searchState.location}
                  onChange={(e) => setSearchState({ ...searchState, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Land Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Land Type</label>
                <select
                  value={searchState.landType}
                  onChange={(e) => setSearchState({ ...searchState, landType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                >
                  <option value="">All Types</option>
                  <option value="agricultural_land">Agricultural Land</option>
                  <option value="farmland">Farmland</option>
                  <option value="plot">Plots</option>
                  <option value="orchard">Orchard</option>
                  <option value="irrigation_land">Irrigation Land</option>
                </select>
              </div>

              {/* Min Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                <input
                  type="number"
                  placeholder="₹100000"
                  value={searchState.minPrice}
                  onChange={(e) => setSearchState({ ...searchState, minPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                />
              </div>

              {/* Max Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                <input
                  type="number"
                  placeholder="₹5000000"
                  value={searchState.maxPrice}
                  onChange={(e) => setSearchState({ ...searchState, maxPrice: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                />
              </div>
            </div>

            <Button
              onClick={handleSearch}
              className="w-full bg-[#2d5016] hover:bg-[#1d3610] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              Search Land
            </Button>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {landCategories.slice(0, 3).map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className="text-5xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c2e] transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {landCategories.slice(3).map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 text-center"
              >
                <div className="text-5xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold text-[#2d5016] mb-2 group-hover:text-[#4a7c2e] transition-colors">{cat.name}</h3>
                <p className="text-sm text-gray-600">{cat.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white border-t border-gray-200 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#2d5016] text-center mb-12">Why Buy on Land2Land</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">100% Verified Titles</h3>
                <p className="text-gray-600">Every land listing is thoroughly verified for ownership and legal clearance.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <Zap className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">Fast Transactions</h3>
                <p className="text-gray-600">Streamlined process with dedicated support for quick land closure.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <MapPin className="h-8 w-8 text-[#2d5016]" />
                </div>
                <h3 className="text-xl font-bold text-[#2d5016] mb-2">Pan-India Coverage</h3>
                <p className="text-gray-600">Access to verified land across 12+ states with regional expertise.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
