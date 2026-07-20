"use client"

import { useState } from "react"
import useSWR from "swr"
import { Phone, ShieldCheck, MessageSquare, BarChart2, Calendar, Search, Loader2, MessageCircle } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { UserAvatar } from "@/components/ui/user-avatar"

interface Associate {
  id: string
  name: string
  phone: string | null
  profile_picture: string | null
  verified: boolean
  joined: string | null
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

function formatJoined(date: string | null) {
  if (!date) return null
  try {
    return new Date(date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
  } catch {
    return null
  }
}

function digitsOnly(phone: string) {
  return phone.replace(/\D/g, "")
}

export default function FindAgentPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const { data, isLoading } = useSWR<{ success: boolean; agents: Associate[] }>("/api/agents", fetcher)
  const agents = data?.agents ?? []

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesVerified = !verifiedOnly || agent.verified
    return matchesSearch && matchesVerified
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#125007] mb-4 text-balance">Find Expert Land Agents</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto text-pretty">
            Connect with verified land agents and consultants across India. Get expert guidance for your land investment.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Associate Name</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by associate name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#125007]"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 md:pb-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#125007] focus:ring-[#125007]"
              />
              Verified only
            </label>

            <button
              onClick={() => {
                setSearchQuery("")
                setVerifiedOnly(false)
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              Clear
            </button>
          </div>

          {!isLoading && (
            <div className="text-sm text-gray-600 mt-4">
              Found {filteredAgents.length} {filteredAgents.length === 1 ? "agent" : "agents"}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#125007] mb-3" />
            <p>Loading agents...</p>
          </div>
        )}

        {/* Agents Grid */}
        {!isLoading && filteredAgents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredAgents.map((agent) => {
              const joined = formatJoined(agent.joined)
              return (
                <div
                  key={agent.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  <div className="bg-gradient-to-r from-[#125007] to-[#4a7c2e] p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <UserAvatar
                        name={agent.name}
                        src={agent.profile_picture}
                        className="w-16 h-16 border-2 border-white/40 bg-white/20 text-white"
                        textClassName="text-xl"
                      />
                      {agent.verified && (
                        <div className="bg-white text-[#125007] px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-1 capitalize">{agent.name}</h3>
                    <p className="text-green-100 text-sm">Land Agent</p>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="space-y-3 mb-6">
                      {joined && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          Member since {joined}
                        </div>
                      )}
                      {agent.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {agent.phone}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto space-y-3">
                      {agent.phone ? (
                        <div className="grid grid-cols-2 gap-3">
                          <a
                            href={`tel:${agent.phone}`}
                            className="flex items-center justify-center gap-2 bg-[#125007] hover:bg-[#1d3610] text-white px-4 py-2.5 rounded-lg font-semibold transition-colors"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`https://wa.me/${digitsOnly(agent.phone).length === 10 ? "91" + digitsOnly(agent.phone) : digitsOnly(agent.phone)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 border-2 border-[#125007] text-[#125007] hover:bg-green-50 px-4 py-2.5 rounded-lg font-semibold transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Chat
                          </a>
                        </div>
                      ) : (
                        <div className="text-center text-sm text-gray-500 py-2.5 border border-dashed border-gray-300 rounded-lg">
                          Contact details not available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredAgents.length === 0 && (
          <div className="text-center py-16 mb-12">
            <p className="text-gray-600 text-lg mb-4">
              {agents.length === 0 ? "No agents have registered yet." : "No agents found matching your search."}
            </p>
            {agents.length > 0 && (
              <button
                onClick={() => {
                  setSearchQuery("")
                  setVerifiedOnly(false)
                }}
                className="text-[#125007] font-semibold hover:underline"
              >
                Clear search and try again
              </button>
            )}
          </div>
        )}

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-[#125007] to-[#4a7c2e] rounded-lg p-8 text-white mb-12">
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
