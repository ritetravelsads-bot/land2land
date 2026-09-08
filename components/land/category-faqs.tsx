"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import type { CategoryFAQ } from "@/lib/category-faqs"

export default function CategoryFAQs({ faqs }: { faqs: CategoryFAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <article key={faq.question} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`land-faq-answer-${index}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
            >
              <span className="font-semibold text-foreground">{faq.question}</span>
              <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <div id={`land-faq-answer-${index}`} hidden={!isOpen}>
              <div className="border-t border-border px-5 pb-5 pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {faq.points.map((point) => (
                    <li key={point.label} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#125007]" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold text-foreground">{point.label}:</strong> {point.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
