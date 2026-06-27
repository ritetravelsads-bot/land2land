"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    id: 1,
    question: "What types of land does Land2Land specialise in?",
    answer:
      "Land2Land covers every kind of land — agricultural and farmland, residential plots, commercial and industrial land, and investment-grade parcels across India. We feature verified listings from Punjab, Haryana, Uttar Pradesh, Rajasthan, Madhya Pradesh, Maharashtra, Karnataka, and many other states. Every listing is thoroughly verified for ownership and legal clearance.",
  },
  {
    id: 2,
    question: "How do I know if the land is legally verified?",
    answer:
      "Every property on Land2Land undergoes rigorous verification including title check, legal clearance, encumbrance checks, and zoning or land-use confirmation. We provide detailed verification reports and connect you with certified legal advisors to ensure complete transparency.",
  },
  {
    id: 3,
    question: "Can I invest in land remotely without visiting in person?",
    answer:
      "Yes, absolutely. We provide high-resolution photos, 360° tours, location maps, ROI projections, and verified agent consultations. Our land specialists can guide your decisions remotely, and we handle all documentation and transfer processes with legal support.",
  },
  {
    id: 4,
    question: "What is the average ROI on land investments?",
    answer:
      "Based on verified transactions on Land2Land, land typically delivers 12-25% annual returns depending on type and location — agricultural land through appreciation and yield, and residential, commercial or industrial plots through appreciation and rental potential. We provide historical ROI data and connect you with experts who can help maximize returns.",
  },
  {
    id: 5,
    question: "How does the Area Converter tool help?",
    answer:
      "Our free Area Converter instantly converts between Bigha, Acre, Katha, Sq Yard, Sq Foot, and Hectare — eliminating confusion when comparing land sizes across regions. It's especially useful when investing across different Indian states with varying land measurement units.",
  },
  {
    id: 6,
    question: "Are there subscription plans for serious investors?",
    answer:
      "Yes. Our Premium subscription gives you exclusive access to investment opportunities before public listing, priority expert consultations, ROI tracking dashboards, and market reports. We also offer custom land advisory and partnership programs for bulk land purchases.",
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase mb-6 rounded-sm">
            <HelpCircle className="w-3.5 h-3.5" />
            FAQs
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-green-700 tracking-tight text-balance mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-xl mx-auto">
            Everything you need to know before buying or selling land.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col divide-y divide-green-100 border border-green-100 rounded-2xl overflow-hidden shadow-sm">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id} className="bg-white">
                <button
                  onClick={() => toggle(faq.id)}
                  className={cn(
                    "w-full flex items-start justify-between gap-4 px-6 py-5 text-left transition-colors duration-150",
                    isOpen ? "bg-green-50/50" : "hover:bg-green-50/30"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className={cn(
                        "shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5",
                        isOpen
                          ? "bg-green-600 text-white"
                          : "bg-green-100 text-green-700"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={cn(
                        "font-semibold text-base leading-snug",
                        isOpen ? "text-green-700" : "text-gray-900"
                      )}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-green-600 transition-transform duration-300 mt-0.5",
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
            href="/find-agent"
            className="text-green-700 font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            Talk to a land expert
          </a>
        </p>
      </div>
    </section>
  )
}
