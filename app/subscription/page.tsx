import { Metadata } from "next"
import { Check, X } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Subscription Plans | Land2Land",
  description: "Choose from flexible subscription plans to buy, sell, and invest in agricultural land and farmland.",
}

export default function SubscriptionPage() {
  const plans = [
    {
      name: "Starter",
      price: "₹0",
      period: "Free",
      description: "Perfect for exploring the platform",
      features: [
        { name: "View all listings", included: true },
        { name: "Basic search filters", included: true },
        { name: "5 saved properties", included: true },
        { name: "Contact seller", included: true },
        { name: "Email support", included: true },
        { name: "Advanced filters", included: false },
        { name: "Direct messaging", included: false },
        { name: "Agent connections", included: false },
      ],
      cta: "Get Started Free",
    },
    {
      name: "Professional",
      price: "₹499",
      period: "/month",
      description: "For active land buyers and investors",
      features: [
        { name: "All Starter features", included: true },
        { name: "50 saved properties", included: true },
        { name: "Advanced filters", included: true },
        { name: "Direct messaging", included: true },
        { name: "Priority email support", included: true },
        { name: "Agent connections", included: true },
        { name: "Custom price alerts", included: true },
        { name: "Market insights", included: false },
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Premium",
      price: "₹999",
      period: "/month",
      description: "For serious investors and landowners",
      features: [
        { name: "All Professional features", included: true },
        { name: "Unlimited saved properties", included: true },
        { name: "Custom price alerts", included: true },
        { name: "Advanced market analytics", included: true },
        { name: "24/7 phone support", included: true },
        { name: "Dedicated land agent", included: true },
        { name: "Investment insights", included: true },
        { name: "Priority listing boost", included: true },
      ],
      cta: "Start Free Trial",
    },
  ]

  const comparisonFeatures = [
    "Listings",
    "Search Filters",
    "Saved Properties",
    "Direct Messaging",
    "Support",
    "Agent Network",
    "Analytics",
    "Custom Alerts",
  ]

  const testimonials = [
    {
      name: "Amit Verma",
      role: "Land Investor",
      content: "Land2Land's Professional plan made it easy to find the right farm investment. The agent connections were invaluable.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Farmland Owner",
      content: "Great platform! The Premium plan helped me list my property with maximum visibility and get qualified buyers quickly.",
      rating: 5,
    },
    {
      name: "Rajesh Singh",
      role: "Real Estate Consultant",
      content: "The market analytics and dedicated support in Premium have helped me make better recommendations to my clients.",
      rating: 5,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your land investment and agricultural needs. No hidden fees, cancel anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl overflow-hidden transition-all transform hover:scale-105 ${
                plan.popular
                  ? "ring-2 ring-[#2d5016] md:scale-105 bg-white shadow-xl"
                  : "bg-white shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] text-white text-center py-3 text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#2d5016] mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-[#2d5016]">{plan.price}</span>
                  <span className="text-gray-600 ml-2 text-lg">{plan.period}</span>
                </div>

                <button
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-all mb-8 ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] hover:shadow-lg text-white"
                      : "border-2 border-[#2d5016] text-[#2d5016] hover:bg-green-50"
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature.name} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "text-gray-800" : "text-gray-400"}>{feature.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16 overflow-x-auto">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Detailed Feature Comparison</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-bold text-gray-800">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800">Starter</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800">Professional</th>
                <th className="text-center py-4 px-4 font-bold text-gray-800">Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Browse Listings</td>
                <td className="text-center py-4 px-4"><span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-bold">Unlimited</span></td>
                <td className="text-center py-4 px-4"><span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-bold">Unlimited</span></td>
                <td className="text-center py-4 px-4"><span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded text-xs font-bold">Unlimited</span></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Saved Properties</td>
                <td className="text-center py-4 px-4 text-gray-600">5</td>
                <td className="text-center py-4 px-4 text-gray-600">50</td>
                <td className="text-center py-4 px-4 text-gray-600">Unlimited</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Search Filters</td>
                <td className="text-center py-4 px-4 text-gray-600">Basic</td>
                <td className="text-center py-4 px-4 text-gray-600">Advanced</td>
                <td className="text-center py-4 px-4 text-gray-600">Advanced+</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Direct Messaging</td>
                <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Support</td>
                <td className="text-center py-4 px-4 text-gray-600">Email</td>
                <td className="text-center py-4 px-4 text-gray-600">Priority</td>
                <td className="text-center py-4 px-4 text-gray-600">24/7 Phone</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Agent Network</td>
                <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Market Analytics</td>
                <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
              </tr>
              <tr className="hover:bg-green-50">
                <td className="py-4 px-4 text-gray-800 font-medium">Price Alerts</td>
                <td className="text-center py-4 px-4"><X className="w-5 h-5 text-gray-300 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                <td className="text-center py-4 px-4"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-8 text-center">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-[#2d5016]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription anytime without any penalties or additional charges.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Do you offer annual plans?</h3>
              <p className="text-gray-600">Yes! Annual plans get 2 months free. Contact our sales team for enterprise pricing.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Is there a trial period?</h3>
              <p className="text-gray-600">Yes, start with our free Starter plan and upgrade anytime. Premium plans include a 7-day free trial.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">We accept all major credit/debit cards, UPI, and net banking. Invoicing available for annual plans.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Can I upgrade or downgrade?</h3>
              <p className="text-gray-600">Yes, upgrade or downgrade anytime. Changes take effect immediately with prorated billing.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Is my data secure?</h3>
              <p className="text-gray-600">Yes, we use industry-standard encryption and comply with all data protection regulations.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Land Investment Journey?</h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, investors, and landowners using Land2Land to buy, sell, and invest in agricultural land.
          </p>
          <button className="bg-white text-[#2d5016] px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors">
            Get Started Free Today
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
