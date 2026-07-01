import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const states = [
  {
    name: "Maharashtra",
    label: "Localities in Maharashtra",
    count: "1,120+",
    href: "/buy?region=maharashtra",
    bg: "from-orange-400 to-red-500",
  },
  {
    name: "Gujarat",
    label: "Localities in Gujarat",
    count: "870+",
    href: "/buy?region=gujarat",
    bg: "from-blue-400 to-indigo-500",
  },
  {
    name: "Rajasthan",
    label: "Localities in Rajasthan",
    count: "980+",
    href: "/buy?region=rajasthan",
    bg: "from-yellow-400 to-orange-500",
  },
  {
    name: "Haryana",
    label: "Localities in Haryana",
    count: "760+",
    href: "/buy?region=haryana",
    bg: "from-slate-500 to-slate-700",
  },
  {
    name: "Madhya Pradesh",
    label: "Localities in Madhya Pradesh",
    count: "1,050+",
    href: "/buy?region=madhya-pradesh",
    bg: "from-purple-400 to-pink-500",
  },
]

export default function PopularStates() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={20} className="text-slate-500" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Properties in Popular States</h2>
            </div>
            <p className="text-sm text-gray-400">Land available across agricultural, residential and commercial categories</p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex border-slate-300 text-slate-700 hover:bg-slate-50">
            <Link href="/buy">Explore More States</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {states.map((state) => (
            <Link
              key={state.name}
              href={state.href}
              className="group relative rounded-xl overflow-hidden h-40 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${state.bg}`} />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-4 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-white/80 mb-0.5">{state.label}</p>
                  <p className="text-sm font-bold">{state.count} listings</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-6 md:hidden">
          <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
            <Link href="/buy">Explore More States</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
