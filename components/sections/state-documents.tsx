"use client"

import { useState } from "react"
import {
  FileText,
  ScrollText,
  FileCheck2,
  ShieldCheck,
  Landmark,
  ReceiptText,
  Map,
  CheckCircle2,
  Info,
} from "lucide-react"

type DocItem = {
  title: string
  local?: string
  desc: string
  mandatory?: boolean
}

type StateDocs = {
  key: string
  state: string
  tagline: string
  docs: DocItem[]
}

// Common paperwork required across every state for a safe land purchase.
const commonDocs: DocItem[] = [
  { title: "Sale Deed / Title Deed", desc: "Registered document that legally transfers ownership from seller to buyer." },
  { title: "Encumbrance Certificate", desc: "Confirms the land is free of mortgages, liens or legal dues." },
  { title: "Property Tax Receipts", desc: "Latest paid receipts proving no outstanding dues on the land." },
  { title: "Identity & PAN", desc: "KYC and PAN of both buyer and seller for registration." },
]

const stateData: StateDocs[] = [
  {
    key: "haryana",
    state: "Haryana",
    tagline: "Land records maintained under the Haryana Jamabandi system.",
    docs: [
      { title: "Jamabandi", local: "Record of Rights", desc: "Core land record listing owner, area, cultivation and shares.", mandatory: true },
      { title: "Fard Badar", local: "Correction Extract", desc: "Official copy of ownership entries used during registration.", mandatory: true },
      { title: "Intkaal", local: "Mutation", desc: "Proof that ownership was transferred and updated in records.", mandatory: true },
      { title: "Shajra / Naksha", local: "Field Map", desc: "Cadastral map showing exact boundaries of the plot." },
    ],
  },
  {
    key: "punjab",
    state: "Punjab",
    tagline: "Digitised through the PLRS (Punjab Land Records Society).",
    docs: [
      { title: "Jamabandi", local: "Record of Rights", desc: "Revenue record confirming ownership and land classification.", mandatory: true },
      { title: "Fard", local: "Ownership Extract", desc: "Extract of the Jamabandi issued for transactions.", mandatory: true },
      { title: "Intkaal", local: "Mutation", desc: "Records the change of title after sale or inheritance.", mandatory: true },
      { title: "Roznamcha", local: "Daily Register", desc: "Log of revenue events affecting the land parcel." },
    ],
  },
  {
    key: "uttar-pradesh",
    state: "Uttar Pradesh",
    tagline: "Available online via the UP Bhulekh portal.",
    docs: [
      { title: "Khatauni", local: "Record of Rights", desc: "Account of land holdings held by an owner in a village.", mandatory: true },
      { title: "Khasra", local: "Plot Record", desc: "Plot-wise record of area, soil type and cultivation.", mandatory: true },
      { title: "Dakhil Kharij", local: "Mutation", desc: "Updates the Khatauni after ownership changes.", mandatory: true },
      { title: "Bhu Naksha", local: "Land Map", desc: "Digital cadastral map of the surveyed plot." },
    ],
  },
  {
    key: "rajasthan",
    state: "Rajasthan",
    tagline: "Accessible through the Apna Khata / e-Dharti portal.",
    docs: [
      { title: "Jamabandi", local: "Apna Khata", desc: "Record of rights showing ownership and land shares.", mandatory: true },
      { title: "Girdawari", local: "Crop Inspection", desc: "Seasonal record of cultivation and land use.", mandatory: true },
      { title: "Namantaran", local: "Mutation", desc: "Transfer of title recorded after a sale.", mandatory: true },
      { title: "Khasra Map", local: "Plot Map", desc: "Map detailing the plot's dimensions and boundaries." },
    ],
  },
  {
    key: "madhya-pradesh",
    state: "Madhya Pradesh",
    tagline: "Maintained on the MP Bhulekh land-records portal.",
    docs: [
      { title: "Khasra", local: "Plot Record", desc: "Plot-level record with area, owner and land type.", mandatory: true },
      { title: "Khatauni / B-1", local: "Holding Record", desc: "Statement of all holdings of an owner in a village.", mandatory: true },
      { title: "Naamantaran", local: "Mutation", desc: "Updates ownership after transfer in revenue records.", mandatory: true },
      { title: "Bhu-Adhikar Rin Pustika", local: "Rights & Loan Book", desc: "Booklet of land rights and any charges on it." },
    ],
  },
  {
    key: "maharashtra",
    state: "Maharashtra",
    tagline: "Issued via the Mahabhulekh (7/12) portal.",
    docs: [
      { title: "7/12 Extract", local: "Satbara Utara", desc: "Primary record of ownership, area, crops and loans.", mandatory: true },
      { title: "8A Extract", local: "Holding Statement", desc: "Shows total land held by an owner in the village.", mandatory: true },
      { title: "Ferfar", local: "Mutation", desc: "Register of changes to ownership over time.", mandatory: true },
      { title: "Property Card", local: "City Survey", desc: "Ownership record for non-agricultural / urban land." },
    ],
  },
]

const docIcons = [ScrollText, FileCheck2, Landmark, Map]

export default function StateDocuments() {
  const [active, setActive] = useState(stateData[0].key)
  const current = stateData.find((s) => s.key === active) ?? stateData[0]

  return (
    <section className="w-full py-14 md:py-20 px-3 md:px-4 bg-white border-t border-[var(--land-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--land-primary)]/8 px-3 py-1 text-xs font-semibold text-[var(--land-primary)] mb-3">
            <FileText size={13} /> Buyer&apos;s Document Guide
          </span>
          <h2 className="text-2xl md:text-4xl font-bold text-[var(--land-earth)] text-balance">
            Documents You Need, State by State
          </h2>
          <p className="mt-3 text-sm md:text-base text-[var(--land-earth)]/60 leading-relaxed">
            Land records differ across India. Select a state to see the exact revenue documents to verify before you
            buy — alongside the paperwork required everywhere.
          </p>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8">
          {/* Tab rail */}
          <div
            role="tablist"
            aria-label="Select a state"
            className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide -mx-3 px-3 lg:mx-0 lg:px-0"
          >
            {stateData.map((s) => {
              const isActive = s.key === active
              return (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(s.key)}
                  className={`group flex items-center gap-3 whitespace-nowrap rounded-xl border px-4 py-3 text-left transition-all duration-200 lg:w-full ${
                    isActive
                      ? "border-[var(--land-primary)] bg-[var(--land-primary)] text-white shadow-md"
                      : "border-[var(--land-border)] bg-[var(--land-cream)] text-[var(--land-earth)] hover:border-[var(--land-sage)] hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-white/15" : "bg-white border border-[var(--land-border)]"
                    }`}
                  >
                    <Landmark size={15} className={isActive ? "text-white" : "text-[var(--land-sage)]"} />
                  </span>
                  <span className="text-sm font-semibold">{s.state}</span>
                </button>
              )
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            className="rounded-2xl border border-[var(--land-border)] bg-[var(--land-cream)] p-5 md:p-7"
          >
            <div className="flex items-start gap-2 mb-6 pb-5 border-b border-[var(--land-border)]">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[var(--land-primary)]" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--land-earth)]">
                  {current.state} land documents
                </h3>
                <p className="text-xs md:text-sm text-[var(--land-earth)]/60">{current.tagline}</p>
              </div>
            </div>

            {/* State-specific docs */}
            <div className="grid sm:grid-cols-2 gap-4">
              {current.docs.map((doc, i) => {
                const Icon = docIcons[i % docIcons.length]
                return (
                  <div
                    key={doc.title}
                    className="relative flex gap-3 rounded-xl bg-white border border-[var(--land-border)] p-4 hover:shadow-md transition-shadow"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--land-sage)]/12">
                      <Icon size={17} className="text-[var(--land-primary)]" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h4 className="text-sm font-bold text-[var(--land-earth)]">{doc.title}</h4>
                        {doc.mandatory && (
                          <span className="rounded-full bg-[var(--land-primary)]/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--land-primary)]">
                            Required
                          </span>
                        )}
                      </div>
                      {doc.local && (
                        <p className="text-[11px] font-medium text-[var(--land-ochre)] mb-1">a.k.a. {doc.local}</p>
                      )}
                      <p className="text-xs text-[var(--land-earth)]/60 leading-relaxed">{doc.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Common docs */}
            <div className="mt-6 rounded-xl border border-dashed border-[var(--land-sage)]/50 bg-white/60 p-4 md:p-5">
              <div className="flex items-center gap-2 mb-3">
                <ReceiptText size={16} className="text-[var(--land-sage)]" />
                <h4 className="text-sm font-bold text-[var(--land-earth)]">Required in every state</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {commonDocs.map((doc) => (
                  <div key={doc.title} className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--land-primary)]" />
                    <div>
                      <span className="text-sm font-semibold text-[var(--land-earth)]">{doc.title}</span>
                      <span className="text-xs text-[var(--land-earth)]/55"> — {doc.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-5 flex items-start gap-2 text-[11px] text-[var(--land-earth)]/50 leading-relaxed">
              <Info size={13} className="mt-0.5 shrink-0" />
              This is a general guide. Requirements can vary by district and land type (agricultural, residential,
              commercial). Always consult a local revenue expert before purchase.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
