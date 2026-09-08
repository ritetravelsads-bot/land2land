"use client"

import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    title: "Farmer, Punjab",
    initials: "RK",
    image: "/testimonials/1.png",
    quote: "Found the right investment opportunity much faster than expected. The location filters were exactly what I needed.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    title: "Land Buyer, Bengaluru",
    initials: "PS",
    image: "/testimonials/2.png",
    quote: "I explored multiple locations across different states without visiting each one. It saved weeks of research.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    title: "Investor, Haryana",
    initials: "VS",
    image: "/testimonials/3.png",
    quote: "The platform helped me discover emerging growth corridors that I would have otherwise missed.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    title: "Business Owner, Gujarat",
    initials: "AP",
    image: "/testimonials/4.png",
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
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.title}`}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-semibold text-[var(--land-earth)] text-sm">{testimonial.name}</p>
                  <p className="text-xs text-[var(--land-earth)]/55">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
