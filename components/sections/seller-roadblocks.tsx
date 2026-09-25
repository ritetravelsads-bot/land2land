import Link from "next/link"
import { ArrowRight, Calculator, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SellerRoadblocks() {
  return (
    <section className="border-y border-[var(--land-border)] bg-[var(--land-cream)] px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--land-primary)]">Seller clarity guide</p>
          <h2 className="max-w-2xl text-3xl font-bold leading-tight text-[var(--land-earth)] md:text-4xl">Why Is Your Land Not Selling? Clear the Roadblocks Today.</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--land-earth)]/70">70% of land sales stall due to title ambiguity, regional measurement confusion, or improper pricing. Get the practical tools you need to prepare a stronger listing.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          <Button asChild variant="outline" className="h-auto justify-between gap-4 whitespace-normal border-[var(--land-primary)]/25 bg-white px-5 py-4 text-left text-[var(--land-primary)] hover:bg-white/70">
            <Link href="/services/legal"><span className="flex items-center gap-3"><FileText className="size-5 shrink-0" />Download Free State-Wise Land Sale Legal Checklist</span><ArrowRight className="size-4 shrink-0" /></Link>
          </Button>
          <Button asChild className="h-auto justify-between gap-4 whitespace-normal bg-[var(--land-primary)] px-5 py-4 text-left text-white hover:bg-[var(--land-primary)]/90">
            <Link href="/area-converter"><span className="flex items-center gap-3"><Calculator className="size-5 shrink-0" />Check Regional Price Trends &amp; Fair Valuation</span><ArrowRight className="size-4 shrink-0" /></Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
