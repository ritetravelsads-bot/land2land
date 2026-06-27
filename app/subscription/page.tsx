import { Metadata } from "next"

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
      features: [
        "View listings",
        "Basic search filters",
        "5 saved properties",
        "Contact seller",
        "Email support",
      ],
    },
    {
      name: "Professional",
      price: "₹499",
      period: "/month",
      features: [
        "All Starter features",
        "50 saved properties",
        "Advanced filters",
        "Direct messaging",
        "Priority support",
        "Agent connections",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "₹999",
      period: "/month",
      features: [
        "All Professional features",
        "Unlimited saved properties",
        "Custom alerts",
        "Market analytics",
        "Phone support",
        "Dedicated agent",
        "Investment insights",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Subscription Plans
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your land investment needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? "ring-2 ring-[#2d5016] md:scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-[#2d5016] text-white text-center py-2 text-sm font-semibold">
                  MOST POPULAR
                </div>
              )}
              <div className="bg-white p-8">
                <h3 className="text-2xl font-bold text-[#2d5016] mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-[#2d5016]">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>

                <button
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors mb-8 ${
                    plan.popular
                      ? "bg-[#2d5016] hover:bg-[#1d3610] text-white"
                      : "border-2 border-[#2d5016] text-[#2d5016] hover:bg-[#2d5016]/5"
                  }`}
                >
                  Choose Plan
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-gray-700">
                      <span className="text-[#2d5016] font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600">Yes, you can cancel your subscription anytime with no penalties.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Do you offer annual plans?</h3>
              <p className="text-gray-600">Yes, annual plans are available at a discount. Contact our sales team for details.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#2d5016] mb-2">Is there a trial period?</h3>
              <p className="text-gray-600">Yes, start with our free Starter plan and upgrade anytime.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full subscription management will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
