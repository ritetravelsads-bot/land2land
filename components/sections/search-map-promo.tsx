import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Search, TrendingUp, Shield } from "lucide-react"

export default function SearchMapPromo() {
  return (
    <section className="w-full py-12 md:py-16 overflow-hidden bg-gradient-to-br from-[#eaf5e1] via-white to-[#eaf5e1]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2d5016]/10 text-[#2d5016] text-xs font-semibold">
              <MapPin size={14} />
              Pan-India Land Search
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-balance">
              Search Land <span className="text-[#2d5016]">Anywhere</span> in India
            </h2>
            <p className="text-gray-600 leading-relaxed max-w-md">
              Explore current land prices, promising investment opportunities, verified ownership records, and valuable property insights to make confident real estate decisions.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <Shield size={12} className="text-[#2d5016]" />
                Verified Titles
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <TrendingUp size={12} className="text-[#2d5016]" />
                Live Market Prices
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-700 shadow-sm">
                <Search size={12} className="text-[#2d5016]" />
                1 Lakh+ Listings
              </div>
            </div>

            <Button asChild size="lg" className="bg-[#2d5016] hover:bg-[#1d3610] text-white h-12 px-6">
              <Link href="/buy">
                <Search size={18} className="mr-2" />
                Explore Land Map
              </Link>
            </Button>
          </div>

          {/* Right Illustration - stylised map/phone mockup */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative w-[300px] md:w-[380px] h-[280px] md:h-[340px]">
              {/* Background landscape illustration */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-b from-sky-200 via-sky-100 to-[#c8e6a0] relative">
                  {/* Sky */}
                  <div className="absolute top-4 left-6 w-16 h-6 bg-white/60 rounded-full" />
                  <div className="absolute top-6 left-16 w-10 h-4 bg-white/40 rounded-full" />
                  <div className="absolute top-3 right-8 w-12 h-5 bg-white/50 rounded-full" />

                  {/* Hills */}
                  <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#5a9e2f] to-[#7abf3f] rounded-t-[60%]" />
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-t from-[#4a8b25] to-[#6aaf35] rounded-tl-[80%]" />
                  <div className="absolute bottom-0 left-0 w-2/5 h-2/5 bg-gradient-to-t from-[#3a7b1a] to-[#5a9f2a] rounded-tr-[70%]" />

                  {/* Map pins */}
                  <div className="absolute top-[35%] left-[30%] flex flex-col items-center">
                    <div className="w-7 h-7 bg-[#2d5016] rounded-full flex items-center justify-center shadow-lg">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <div className="w-2 h-2 bg-[#2d5016] rotate-45 -mt-1 shadow" />
                  </div>
                  <div className="absolute top-[25%] right-[25%] flex flex-col items-center">
                    <div className="w-6 h-6 bg-[#6ba82b] rounded-full flex items-center justify-center shadow-lg">
                      <MapPin size={12} className="text-white" />
                    </div>
                    <div className="w-1.5 h-1.5 bg-[#6ba82b] rotate-45 -mt-0.5 shadow" />
                  </div>
                  <div className="absolute top-[45%] right-[40%] flex flex-col items-center">
                    <div className="w-6 h-6 bg-[#2d5016] rounded-full flex items-center justify-center shadow-lg opacity-80">
                      <MapPin size={12} className="text-white" />
                    </div>
                    <div className="w-1.5 h-1.5 bg-[#2d5016] rotate-45 -mt-0.5 shadow" />
                  </div>
                </div>
              </div>

              {/* Floating price card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100 w-44">
                <p className="text-[10px] text-gray-500 mb-0.5">Agricultural Land, Punjab</p>
                <p className="text-base font-bold text-[#2d5016]">₹12 Lakh / Bigha</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-[10px] text-green-600 font-medium">Verified Title</span>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-xl p-3 border border-gray-100">
                <p className="text-[10px] text-gray-500">Active Listings</p>
                <p className="text-xl font-bold text-gray-900">1,00,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
