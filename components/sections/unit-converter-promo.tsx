import Link from "next/link"
import { ArrowRight, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UnitConverterPromo() {
  return (
    <section className="border-b border-[var(--land-border)] bg-white px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl bg-[var(--land-earth)] px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
        <div className="flex items-start gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[var(--land-accent)]">
            <Ruler className="size-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--land-accent)]">Tools &amp; resources</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">Land Unit Converter &amp; Area Calculator</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">Convert acres, bigha, guntha, cents, and regional land units before comparing listings or planning your investment.</p>
          </div>
        </div>
        <Button asChild className="shrink-0 bg-[var(--land-accent)] text-[var(--land-earth)] hover:bg-[var(--land-accent)]/90">
          <Link href="/area-converter">Open Converter <ArrowRight data-icon="inline-end" /></Link>
        </Button>
      </div>
    </section>
  )
}
