"use client"

import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rajesh Kumar",
    title: "Farmer, Punjab",
    initials: "RK",
    quote: "Land2Land helped me find the perfect agricultural land. The verification process was transparent and the team was very helpful.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    title: "Plot Buyer, Bengaluru",
    initials: "PS",
    quote: "I bought a residential plot in an approved layout through Land2Land. Their title checks and ROI tools gave me complete confidence.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    title: "Investor, Haryana",
    initials: "VS",
    quote: "The area converter saved me hours of calculation. I picked up a commercial plot on the main road well within my budget.",
    rating: 5,
  },
  {
    name: "Anita Patel",
    title: "Business Owner, Gujarat",
    initials: "AP",
    quote: "Connected with verified agents through Land2Land for industrial land. They understood my requirements perfectly. Highly recommended!",
    rating: 5,
  },
]

export default function FarmTestimonials() {
  return (
    <section className="w-full py-12 md:py-16 px-3 md:px-4 bg-white border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trusted by Buyers, Sellers & Investors</h2>
          <p className="text-gray-600 text-sm md:text-base">Join thousands who&apos;ve found their perfect land on Land2Land</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white text-sm font-bold shrink-0">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">15,000+</p>
            <p className="text-gray-600 text-sm">Successful Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">₹2,500+ Cr</p>
            <p className="text-gray-600 text-sm">Land Traded</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">98%</p>
            <p className="text-gray-600 text-sm">Customer Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
