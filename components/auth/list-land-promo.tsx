import Link from "next/link"
import { UserPlus, MapPin, FileCheck, ArrowRight, ShieldCheck } from "lucide-react"

const steps = [
  {
    title: "Create a Free Account",
    description: "Sign up with your mobile number to unlock the seller dashboard.",
    icon: UserPlus,
  },
  {
    title: "Enter Property Details",
    description: "Pinpoint your land on the map and add area, zoning, and price.",
    icon: MapPin,
  },
  {
    title: "Upload Documents & Publish",
    description: "Add photos and title papers for verification, then go live.",
    icon: FileCheck,
  },
]

const stats = [
  { value: "15,000+", label: "Verified Buyers" },
  { value: "3 Steps", label: "To Go Live" },
  { value: "Zero", label: "Listing Fee" },
]

export default function ListLandPromo() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Background image */}
      <img
        src="/land-plot-aerial-view.jpg"
        alt="Aerial view of open land plots ready to list"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Green wash overlay for brand cohesion + legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--land-primary)]/95 via-[var(--land-primary)]/85 to-[var(--land-earth)]/90" />
      {/* Subtle top-to-bottom darkening for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-8 lg:p-12 xl:p-16 text-white">
        {/* Top: badge + headline */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm ring-1 ring-white/25">
            <ShieldCheck size={16} className="text-[var(--land-ochre)]" />
            <span className="text-xs font-semibold uppercase tracking-widest">Seller Guide</span>
          </div>
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-balance">
              List Your Land. Reach Thousands of Verified Buyers.
            </h2>
            <p className="text-white/80 text-base lg:text-lg leading-relaxed">
              Sign in to manage your listings, or create an account and get your property in front of serious investors in three simple steps.
            </p>
          </div>
        </div>

        {/* Middle: steps timeline */}
        <div className="my-10 space-y-6 max-w-xl">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
                  <Icon size={20} strokeWidth={2.5} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white leading-snug">
                    <span className="text-[var(--land-ochre)] mr-1.5">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/75 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom: stats + CTA */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-x-10 gap-y-4 border-t border-white/20 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
          <Link
            href="/list-property"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--land-ochre)] px-6 py-3 text-sm font-bold text-[var(--land-earth)] shadow-lg transition-colors hover:bg-[var(--land-ochre)]/90"
          >
            Start Your Listing
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  )
}
