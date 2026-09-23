import Link from "next/link"
import { ArrowRight, Calculator } from "lucide-react"

export default function UnitConverterPromo() {
  return (
    <section className="bg-white px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl bg-[var(--land-primary)] px-6 py-8 text-white md:flex-row md:items-center md:justify-between md:px-10 md:py-10">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--land-ochre)]"><Calculator className="size-4" /> Land measurement tool</div>
          <h2 className="text-2xl font-bold md:text-3xl">Instant Regional Land Unit Converter</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">Convert plot dimensions instantly across local units—Bigha, Guntha, Kanal, Biswa, and Acres.</p>
        </div>
        <Link href="/area-converter" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--land-ochre)] px-5 py-3 text-sm font-bold text-[var(--land-earth)] transition hover:brightness-95">Open converter <ArrowRight className="size-4" /></Link>
      </div>
    </section>
  )
}
