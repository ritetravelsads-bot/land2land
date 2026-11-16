import type { Metadata } from "next"
import StatePortalFinder from "@/components/sections/state-portal-finder"

export const metadata: Metadata = {
  title: "State Land Portals & Records Guide | Land2Land",
  description:
    "Find official state land-record portals, common ownership records, and local land measurement units with Land2Land's state land helper.",
  alternates: { canonical: "https://land2land.com/state-land-portals" },
}

export default function StateLandPortalsPage() {
  return (
    <main className="min-h-[60vh] bg-background">
      <section className="border-b border-border bg-gradient-to-br from-primary/10 via-primary/5 to-background px-4 py-12 md:px-6 md:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Official state records</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">State Land Portals</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            A practical starting point for checking public land records and understanding the terminology used across selected Indian states.
          </p>
        </div>
      </section>
      <StatePortalFinder />
    </main>
  )
}
