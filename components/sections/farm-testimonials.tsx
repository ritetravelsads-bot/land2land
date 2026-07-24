"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    title: "Farmer, Punjab",
    initials: "RK",
    quote: "Found the right investment opportunity much faster than expected. The location filters were exactly what I needed.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    title: "Land Buyer, Bengaluru",
    initials: "PS",
    quote: "I explored multiple locations across different states without visiting each one. It saved weeks of research.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    title: "Investor, Haryana",
    initials: "VS",
    quote: "The platform helped me discover emerging growth corridors that I would have otherwise missed.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    title: "Business Owner, Gujarat",
    initials: "AP",
    quote: "Everything I needed—from location insights to investment options—was available in one place.",
    rating: 5,
  },
]

export default function FarmTestimonials() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-[var(--muted)] border-t border-[var(--land-border)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--land-primary)]/10 text-[var(--land-primary)] text-xs font-semibold uppercase tracking-widest mb-3">
            Real Stories
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--land-earth)] mb-2">
            Join India's Growing Land Community
          </h2>
          <p className="text-[var(--land-earth)]/60 text-sm md:text-base">
            Helping people make smarter land decisions every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--land-border)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-[var(--land-ochre)] text-[var(--land-ochre)]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[var(--land-earth)]/75 text-sm leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--land-border)]">
                <div className="w-10 h-10 rounded-full bg-[var(--land-primary)] flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-[var(--land-earth)] text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[var(--land-earth)]/55">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-[var(--land-border)]">
          {[
            { value: "15,000+", label: "Successful Transactions" },
            { value: "₹2,500+ Cr", label: "Land Traded" },
            { value: "98%", label: "Customer Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-[var(--land-primary)] mb-1">{stat.value}</p>
              <p className="text-[var(--land-earth)]/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
