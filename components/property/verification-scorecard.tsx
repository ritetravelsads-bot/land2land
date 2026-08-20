"use client"

import { MapPin, Route, Droplets, Signal, FileCheck, Landmark, ScrollText, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationArea {
  icon: typeof MapPin
  title: string
  description: string
  checks: string[]
}

const VERIFICATION_AREAS: VerificationArea[] = [
  {
    icon: MapPin,
    title: "Location",
    description: "GPS mapping & boundary demarcation",
    checks: ["GPS coordinates mapped", "Boundary demarcation confirmed"],
  },
  {
    icon: Route,
    title: "Rasta / Access",
    description: "Road type & legal access rights",
    checks: ["Road type verified", "Legal access rights confirmed"],
  },
  {
    icon: Droplets,
    title: "Water",
    description: "Groundwater depth & irrigation sources",
    checks: ["Groundwater depth checked", "Irrigation source identified"],
  },
  {
    icon: Signal,
    title: "Connectivity",
    description: "Highway proximity & market access",
    checks: ["Highway proximity assessed", "Market access evaluated"],
  },
]

const DOCUMENT_LAYERS = [
  { icon: ScrollText, label: "Tehsil Records" },
  { icon: FileCheck, label: "Patwari Records" },
  { icon: Landmark, label: "Revenue Dept. Confirmation" },
]

interface VerificationScorecardProps {
  className?: string
}

export function VerificationScorecard({ className }: VerificationScorecardProps) {
  return (
    <section className={cn("", className)}>
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Verification Scorecard</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            How Land2Land verifies this listing before it goes live
          </p>
        </div>
      </div>

      {/* 4 Key Verification Areas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {VERIFICATION_AREAS.map((area) => (
          <div
            key={area.title}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <area.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{area.title}</p>
                <p className="text-xs text-muted-foreground">{area.description}</p>
              </div>
            </div>
            <ul className="space-y-1.5">
              {area.checks.map((check) => (
                <li key={check} className="flex items-center gap-2 text-xs text-foreground/90">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {check}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Document & Land History Verification */}
      <div className="mt-5 bg-primary/5 border border-primary/20 rounded-xl p-4">
        <p className="text-sm font-semibold text-foreground mb-3">Document &amp; Land History Verification</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {DOCUMENT_LAYERS.map((layer) => (
            <div
              key={layer.label}
              className="flex items-center gap-2.5 px-3 py-2.5 bg-card border border-border rounded-lg"
            >
              <layer.icon className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-xs font-medium text-foreground">{layer.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground mt-3">
        Every land listing on Land2Land passes through these checks before publishing — reducing disputes and
        protecting both buyers and sellers.
      </p>
    </section>
  )
}
