import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Search, TrendingUp, Shield, Building2 } from "lucide-react"

export default function SearchMapPromo() {
  return (
    <section className="w-full py-12 md:py-16 overflow-hidden bg-gradient-to-br from-[#f2efe9] via-white to-[#eef2f7]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/8 text-slate-700 text-xs font-semibold border border-slate-200">
              <MapPin size={14} />
              Pan-India Land Search
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
              Search Any Land Type <span className="text-slate-700">Anywhere</span> in India
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Compare prices across agricultural, residential, commercial, industrial and farmland categories — with verified ownership records and live market data.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <Shield size={12} className="text-emerald-600" />
                Verified Titles
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <TrendingUp size={12} className="text-amber-600" />
                Live Market Prices
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <Building2 size={12} className="text-blue-600" />
                6 Land Categories
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <Search size={12} className="text-gray-500" />
                1 Lakh+ Listings
              </div>
            </div>

            <Button asChild size="lg" className="bg-slate-900 hover:bg-slate-800 text-white h-12 px-6">
              <Link href="/buy">
                <Search size={18} className="mr-2" />
                Explore Land Map
              </Link>
            </Button>
          </div>

          {/* Right Illustration - stylised map/phone mockup */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-[300px] md:w-[380px] h-[280px] md:h-[340px]">
              {/* Background map illustration */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                <div className="w-full h-full bg-gradient-to-b from-slate-100 via-stone-50 to-amber-50/60 relative">
                  {/* Grid lines simulating a map */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                      backgroundSize: "40px 40px"
                    }}
                  />
                  {/* Land parcels — different color blocks to show varied land types */}
                  <div className="absolute top-[30%] left-[8%] w-[22%] h-[30%] bg-emerald-200/70 rounded border border-emerald-300/50" />
                  <div className="absolute top-[28%] left-[32%] w-[18%] h-[26%] bg-amber-200/80 rounded border border-amber-300/50" />
                  <div className="absolute top-[32%] left-[52%] w-[20%] h-[28%] bg-blue-200/70 rounded border border-blue-300/50" />
                  <div className="absolute top-[62%] left-[10%] w-[25%] h-[20%] bg-stone-300/60 rounded border border-stone-400/50" />
                  <div className="absolute top-[60%] left-[38%] w-[28%] h-[22%] bg-orange-200/60 rounded border border-orange-300/50" />
                  {/* Roads */}
                  <div className="absolute top-[58%] left-0 right-0 h-[4px] bg-white/70" />
                  <div className="absolute left-[30%] top-0 bottom-0 w-[4px] bg-white/70" />
                  <div className="absolute left-[50%] top-0 bottom-0 w-[3px] bg-white/50" />

                  {/* Map pins — varied colors for each land type */}
                  <div className="absolute top-[32%] left-[16%] flex flex-col items-center">
                    <div className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                      <MapPin size={13} className="text-white" />
                    </div>
                    <div className="text-[8px] font-bold text-emerald-800 bg-white px-1 rounded shadow mt-0.5 whitespace-nowrap">Farm</div>
                  </div>
                  <div className="absolute top-[28%] left-[37%] flex flex-col items-center">
                    <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                      <MapPin size={13} className="text-white" />
                    </div>
                    <div className="text-[8px] font-bold text-amber-800 bg-white px-1 rounded shadow mt-0.5 whitespace-nowrap">Plot</div>
                  </div>
                  <div className="absolute top-[30%] left-[56%] flex flex-col items-center">
                    <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                      <MapPin size={13} className="text-white" />
                    </div>
                    <div className="text-[8px] font-bold text-blue-800 bg-white px-1 rounded shadow mt-0.5 whitespace-nowrap">Comm.</div>
                  </div>
                  <div className="absolute top-[62%] left-[42%] flex flex-col items-center">
                    <div className="w-6 h-6 bg-slate-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                      <MapPin size={11} className="text-white" />
                    </div>
                    <div className="text-[8px] font-bold text-slate-700 bg-white px-1 rounded shadow mt-0.5 whitespace-nowrap">Indus.</div>
                  </div>
                </div>
              </div>

              {/* Floating price cards - multiple land types */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100 w-48 space-y-1.5">
                <div className="pb-1.5 border-b border-gray-100">
                  <p className="text-[10px] text-gray-400 mb-0.5">Residential Plot, Pune</p>
                  <p className="text-sm font-bold text-blue-700">₹28 Lakh / Gunta</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 mb-0.5">Commercial Land, Mumbai</p>
                  <p className="text-sm font-bold text-amber-700">₹1.2 Cr / Acre</p>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-emerald-700 font-medium">Verified Titles</span>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                <p className="text-[10px] text-gray-500">Active Listings</p>
                <p className="text-xl font-bold text-gray-900">1,00,000+</p>
                <p className="text-[10px] text-gray-400 mt-0.5">6 land categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
