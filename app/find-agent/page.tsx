"use client"

import { useState } from "react"
import { Star, MapPin, Phone, Calendar, ShieldCheck, MessageSquare, BarChart2 } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const agents = [
  {
    id: 1,
    name: "Rajesh Kumar",
    initials: "RK",
    title: "Agricultural Land Specialist",
    location: "Uttar Pradesh",
    experience: "8+ years",
    specialization: "Agricultural Land",
    rating: 4.8,
    reviews: 145,
    about: "Expert in high-yield agricultural land deals across North India",
    phone: "+91 98765-43210",
    responseTime: "< 2 hours",
    deals: "250+",
    verified: true,
  },
  {
    id: 2,
    name: "Priya Singh",
    initials: "PS",
    title: "Farm Investment Advisor",
    location: "Punjab",
    experience: "6+ years",
    specialization: "Farmland",
    rating: 4.7,
    reviews: 128,
    about: "Specializes in organic farm investments and lease-back models",
    phone: "+91 98765-43211",
    responseTime: "< 3 hours",
    deals: "180+",
    verified: true,
  },
  {
    id: 3,
    name: "Amit Patel",
    initials: "AP",
    title: "Investment Land Consultant",
    location: "Gujarat",
    experience: "10+ years",
    specialization: "Investment Properties",
    rating: 4.9,
    reviews: 267,
    about: "Focuses on high-ROI land corridors and infrastructure development zones",
    phone: "+91 98765-43212",
    responseTime: "< 1 hour",
    deals: "380+",
    verified: true,
  },
  {
    id: 4,
    name: "Neha Desai",
    initials: "ND",
    title: "Land Development Expert",
    location: "Maharashtra",
    experience: "7+ years",
    specialization: "Land Development",
    rating: 4.6,
    reviews: 92,
    about: "Assists in land development projects and regulatory clearances",
    phone: "+91 98765-43213",
    responseTime: "< 4 hours",
    deals: "140+",
    verified: true,
  },
  {
    id: 5,
    name: "Vikram Sharma",
    initials: "VS",
    title: "Orchard & Plantation Specialist",
    location: "Himachal Pradesh",
    experience: "9+ years",
    specialization: "Farmland",
    rating: 4.8,
    reviews: 156,
    about: "Expert in orchard land and plantation investments",
    phone: "+91 98765-43214",
    responseTime: "< 2 hours",
    deals: "195+",
    verified: true,
  },
  {
    id: 6,
    name: "Divya Nair",
    initials: "DN",
    title: "Irrigation & Water Rights Specialist",
    location: "Madhya Pradesh",
    experience: "8+ years",
    specialization: "Agricultural Land",
    rating: 4.7,
    reviews: 118,
    about: "Specializes in canal-fed and irrigation-backed land deals",
    phone: "+91 98765-43215",
    responseTime: "< 3 hours",
    deals: "165+",
    verified: true,
  },
]

export default function FindAgentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [selectedSpecialization, setSelectedSpecialization] = useState("All")
  const [selectedExperience, setSelectedExperience] = useState("Any")

  const locations = ["All", "Uttar Pradesh", "Punjab", "Gujarat", "Maharashtra", "Himachal Pradesh", "Madhya Pradesh"]
  const specializations = ["All Specializations", "Agricultural Land", "Farmland", "Investment Properties", "Land Development"]
  const experiences = ["Any experience", "5+ years", "7+ years", "10+ years"]

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         agent.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "All" || agent.location === selectedLocation
    const matchesSpecialization = selectedSpecialization === "All Specializations" || agent.specialization === selectedSpecialization
    const matchesExperience = selectedExperience === "Any experience" || parseInt(agent.experience) >= parseInt(selectedExperience)
    
    return matchesSearch && matchesLocation && matchesSpecialization && matchesExperience
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">Find Expert Land Agents</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified land agents and consultants across India. Get expert guidance for your land investment.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Agent Name</label>
              <input
                type="text"
                placeholder="Search by name or specialty"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              >
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              >
                {experiences.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedLocation("All")
                  setSelectedSpecialization("All Specializations")
                  setSelectedExperience("Any experience")
                }}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Found {filteredAgents.length} {filteredAgents.length === 1 ? "agent" : "agents"}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {agent.initials}
                  </div>
                  {agent.verified && (
                    <div className="bg-white text-[#2d5016] px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <span className="text-[#2d5016]">&#10003;</span> Verified
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
                <p className="text-green-100 text-sm mb-2">{agent.title}</p>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {agent.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {agent.experience} experience
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(agent.rating) ? "fill-current" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{agent.rating}</span>
                    <span className="text-xs text-gray-500">({agent.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{agent.about}"</p>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#2d5016]">{agent.deals}</div>
                    <div className="text-xs text-gray-600">Deals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#2d5016]">{agent.responseTime}</div>
                    <div className="text-xs text-gray-600">Response</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#2d5016]">{agent.specialization}</div>
                    <div className="text-xs text-gray-600">Specialty</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-[#2d5016] hover:bg-[#1d3610] text-white px-4 py-2.5 rounded-lg font-semibold transition-colors">
                    Connect Now
                  </button>
                  <button className="w-full border-2 border-[#2d5016] text-[#2d5016] hover:bg-green-50 px-4 py-2.5 rounded-lg font-semibold transition-colors">
                    View Profile
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-3 text-xs text-gray-600 pt-4 border-t border-gray-200">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{agent.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No agents found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedLocation("All")
                setSelectedSpecialization("All Specializations")
                setSelectedExperience("Any experience")
              }}
              className="text-[#2d5016] font-semibold hover:underline"
            >
              Clear filters and try again
            </button>
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] rounded-lg p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-8">Why Choose Land2Land Agents?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Verified & Certified</h3>
              <p className="text-green-100 text-sm">All agents are verified professionals with proven track records</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Quick Response</h3>
              <p className="text-green-100 text-sm">Average response time under 3 hours for all inquiries</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold mb-2">Market Expertise</h3>
              <p className="text-green-100 text-sm">Deep knowledge of regional markets and property values</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
