"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type FAQPoint = { label: string; text: string }
type FAQ = {
  id: number
  question: string
  answer: string
  points?: FAQPoint[]
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Can I buy land online?",
    answer:
      "Yes, you can legally discover, evaluate, and purchase verified land completely online by utilizing digital land platforms.",
    points: [
      {
        label: "Discovery & Due Diligence",
        text: "Search verified land listings on platforms like Land2Land, utilizing 3D GIS boundary mapping and digital satellite overlay tools.",
      },
      {
        label: "Title Verification",
        text: "Download digital encumbrance certificates (EC) and historical land ownership deeds directly via official state revenue department portals.",
      },
      {
        label: "Digital Token Booking",
        text: "Secure the plot remotely using encrypted payment gateways to lock the sale agreement prior to registry.",
      },
      {
        label: "e-Registration",
        text: "Execute deed registration through your local state portal (such as e-Registration or Kaveri/Dharani portals) followed by an in-person or biometric verification at the Sub-Registrar Office (SRO).",
      },
    ],
  },
  {
    id: 2,
    question: "How can I sell my land online?",
    answer:
      "You can sell your land online by listing your property on specialized land marketplaces, completing digital ownership verification, and marketing directly to vetted buyers.",
    points: [
      {
        label: "List Your Property",
        text: "Create an online listing uploading exact geo-coordinates, plot dimension boundaries (in acres or sq. ft.), and verified site photos/drone footage.",
      },
      {
        label: "Upload Title Documents",
        text: "Attach key records including the 7/12 extract, Patta/Khata, encumbrance certificate, and approved layout plan for buyer confidence.",
      },
      {
        label: "Filter Verified Buyers",
        text: "Leverage direct buyer query dashboards to screen serious cash or loan-backed buyers without intermediary broker markups.",
      },
      {
        label: "Execute Sale Agreement",
        text: "Draft digital sale agreements online and manage escrow or token transfers safely via registered banking channels.",
      },
    ],
  },
  {
    id: 3,
    question: "What should I check before buying agricultural land?",
    answer:
      "Before buying agricultural land, you must verify clear title deeds, confirm state-specific buyer eligibility laws, ensure zero encumbrances, and inspect soil, water, and road access.",
    points: [
      {
        label: "Title & Encumbrance Check",
        text: "Inspect 30 years of mother deeds and secure a current Encumbrance Certificate (EC) to guarantee clear, unencumbered ownership.",
      },
      {
        label: "State Eligibility Verification",
        text: "Ensure you meet regional statutory rules (e.g., in states like Maharashtra or Karnataka, non-farmers must obtain permission or meet specific income criteria).",
      },
      {
        label: "Revenue Record Audit",
        text: "Cross-verify the 7/12 extract, RTC, or Khata/Patta records to confirm accurate land classification, mutation entries, and exact boundary extent.",
      },
      {
        label: "Physical & Legal Constraints",
        text: "Verify the availability of perennial water sources, soil quality, physical road access, and ensure the land does not fall under ceiling limits or government acquisition zones.",
      },
    ],
  },
  {
    id: 4,
    question: "How do I verify land ownership?",
    answer:
      "You verify land ownership by cross-referencing state digital land record portals (like MeeBhoomi, AnyRoR, or Dharani) and auditing historical title documents at the Sub-Registrar Office.",
    points: [
      {
        label: "Extract Current Land Records",
        text: "Fetch official state revenue documents like the 7/12 extract, Record of Rights (RTC), Patta/Khata, or Khasra-Khateuni using the plot's survey number.",
      },
      {
        label: "Trace Historical Title (30-Year Ownership Chain)",
        text: "Inspect sequential sale deeds, partition deeds, gift deeds, or legal heir inheritance records covering at least the last 30 years to verify continuous title validity.",
      },
      {
        label: "Run an Encumbrance Search",
        text: "Obtain an Encumbrance Certificate (EC) via Form 15 from the local registrar's office to ensure there are no registered mortgages, pending bank claims, or attachments.",
      },
      {
        label: "Cross-Check Spatial Boundaries",
        text: "Order a physical survey through the District Land Survey Department to match ground measurements against the official revenue map (FMB/Tippan).",
      },
    ],
  },
  {
    id: 5,
    question: "How can I confirm that a property's title is clear?",
    answer:
      "Confirm a clear title by systematically auditing encumbrance status, ownership sequence, litigation risk, tax dues, and regulatory clearances.",
    points: [
      {
        label: "Encumbrance Status — Encumbrance Certificate (Form 15)",
        text: "Ensure zero outstanding bank mortgages, liens, or recorded court litigation.",
      },
      {
        label: "Ownership Sequence — 30-Year Mother Deeds",
        text: "Confirm an unbroken legal chain of title transfers between previous buyers and sellers.",
      },
      {
        label: "Litigation Risk — Public Legal Notice",
        text: "Publish a public notice in two local newspapers to surface third-party legal claims before buying.",
      },
      {
        label: "Tax & Local Dues — Tax Receipts & No-Objection Certificates",
        text: "Verify that local property/land revenue taxes, water dues, and utility bills are paid up to date.",
      },
      {
        label: "Regulatory Clearances — Layout Sanction / Zoning Clearance",
        text: "Confirm the land does not fall within restricted forest buffers, eco-sensitive zones, or government land acquisition plans.",
      },
    ],
  },
  {
    id: 6,
    question: "Can anyone buy agricultural land in India?",
    answer:
      "No, not everyone can freely purchase agricultural land in India, as individual state land ceiling acts enforce specific eligibility restrictions based on farming history, income thresholds, or residency status.",
    points: [
      {
        label: "State Farmer Directives",
        text: "In states like Maharashtra, Gujarat, and Himachal Pradesh, only individuals who already hold agricultural status (or inherited farmland) are legally permitted to buy agricultural land.",
      },
      {
        label: "Income & Regional Limits",
        text: "Certain states restrict non-farmers from buying farmland unless their annual non-agricultural income falls below specified legal thresholds or special collector permissions are granted.",
      },
      {
        label: "Unrestricted States",
        text: "Regions such as Tamil Nadu, Andhra Pradesh, and Karnataka allow non-farmers to purchase agricultural land up to statutory land-ceiling acreage limits without prior farming credentials.",
      },
      {
        label: "Government Approval Routes",
        text: "Non-farmers seeking to purchase farmland in restricted states must obtain formal permission from the District Collector or apply for Non-Agricultural (NA) land conversion.",
      },
    ],
  },
  {
    id: 7,
    question: "Can NRIs buy agricultural land in India?",
    answer:
      "FEMA Statutory Alert: Under Reserve Bank of India regulations and the Foreign Exchange Management Act (FEMA), Non-Resident Indians (NRIs) and Overseas Citizens of India (OCIs) are strictly prohibited from purchasing agricultural land, plantation properties, or farmhouses in India.",
    points: [
      {
        label: "Acquisition via Inheritance",
        text: "NRIs can legally inherit agricultural land from resident Indians or deceased owners who held valid legal titles.",
      },
      {
        label: "Acquisition via Gift",
        text: "NRIs may receive farmland as a gift, but only from a resident Indian citizen who is an immediate relative (e.g., parents, spouse, or siblings).",
      },
      {
        label: "Pre-NRI Status Retention",
        text: "Farmland legally purchased while the individual was still a resident Indian citizen can be retained without penalty after changing status to an NRI.",
      },
      {
        label: "Converted NA Land",
        text: "NRIs can legally purchase plots that have been officially converted from agricultural use to Non-Agricultural (NA) residential, commercial, or industrial status.",
      },
    ],
  },
]

export default function FAQs() {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 text-slate-600 text-xs font-bold tracking-widest uppercase mb-6 rounded-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight text-balance mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Everything you need to know before buying or selling land.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col divide-y divide-gray-100 border border-gray-150 rounded-2xl overflow-hidden shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id} className="bg-white">
                <button
                  onClick={() => toggle(faq.id)}
                  className={cn(
                    "w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-150",
                    isOpen ? "bg-slate-50" : "hover:bg-slate-50/60"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className={cn(
                        "shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5",
                        isOpen
                          ? "bg-slate-800 text-white"
                          : "bg-slate-100 text-slate-600"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "font-semibold text-base leading-snug",
                        isOpen ? "text-slate-800" : "text-gray-900"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-slate-400 transition-transform duration-300 mt-0.5",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[60rem] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 pt-1 pl-[3.75rem]">
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {faq.answer}
                    </p>
                    {faq.points && (
                      <ul className="mt-4 flex flex-col gap-3">
                        {faq.points.map((point) => (
                          <li key={point.label} className="flex gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-800" />
                            <p className="text-muted-foreground leading-relaxed text-[15px]">
                              <span className="font-semibold text-gray-900">
                                {point.label}:
                              </span>{" "}
                              {point.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <p className="text-center text-gray-600 mt-8 text-sm">
          Still have questions?{" "}
          <a
            href="/find-associate"
            className="text-slate-800 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Talk to a land expert
          </a>
        </p>
      </div>
    </section>
  )
}
