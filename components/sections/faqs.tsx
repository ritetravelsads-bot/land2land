"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    id: 1,
    question: "What types of land can I buy on Land2Land?",
    answer:
      "Land2Land offers agricultural land, residential plots, commercial land, industrial land, farm land, development land, warehouses and investment properties across India.",
  },
  {
    id: 2,
    question: "How do I find land for sale in my city or state?",
    answer:
      "Search by state, city, district, village, property type or budget to discover verified land listings across India.",
  },
  {
    id: 3,
    question: "Can I invest in land through Land2Land?",
    answer:
      "Yes. Explore high-growth land investment opportunities, commercial land, industrial plots, farmland and residential developments in prime locations.",
  },
  {
    id: 4,
    question: "How do I contact a property owner?",
    answer:
      "Open any property listing and submit an enquiry to connect directly with the property owner, seller or authorised representative.",
  },
  {
    id: 5,
    question: "Which states have the most land listings?",
    answer:
      "Browse thousands of land listings in Uttar Pradesh, Maharashtra, Gujarat, Rajasthan, Haryana, Madhya Pradesh, Punjab and many other states.",
  },
  {
    id: 6,
    question: "Why choose Land2Land?",
    answer:
      "Land2Land makes it easy to buy, sell and invest in land with powerful search tools, location-based discovery and thousands of property opportunities across India.",
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
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="px-6 pb-5 pt-1 pl-[3.75rem] text-muted-foreground leading-relaxed text-base">
                    {faq.answer}
                  </p>
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
