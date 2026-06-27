"use client"

import { useState } from "react"
import { CheckCircle2, Users, Wrench, DollarSign, FileText, Zap, TrendingUp } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

const services = [
  {
    title: "Tenant Management",
    description: "Find and manage reliable tenant farmers for your property",
    icon: Users,
    details: "Vet and select qualified tenant farmers, handle lease agreements, and manage relationships",
  },
  {
    title: "Maintenance & Upkeep",
    description: "Regular maintenance of irrigation, fencing, and infrastructure",
    icon: Wrench,
    details: "Professional upkeep of all farm infrastructure, seasonal repairs, and preventive maintenance",
  },
  {
    title: "Financial Management",
    description: "Handle rent collection, tax filing, and financial reporting",
    icon: DollarSign,
    details: "Rent collection, expense management, tax compliance, and transparent financial reporting",
  },
  {
    title: "Legal Compliance",
    description: "Ensure all documents and registrations are current",
    icon: FileText,
    details: "Keep all land documents, registrations, and compliance permits up to date and verified",
  },
  {
    title: "Crop Management",
    description: "Expert advice on crop planning and seasonal operations",
    icon: Zap,
    details: "Seasonal crop planning, agricultural advisory, and operational coordination",
  },
  {
    title: "Market Analytics",
    description: "Regular reports on land value and market trends",
    icon: TrendingUp,
    details: "Monthly market analysis, valuation reports, and investment performance tracking",
  },
]

const plans = [
  {
    name: "Basic",
    price: "₹500",
    period: "/acre/month",
    features: [
      "Monthly reporting",
      "Tenant coordination",
      "Basic maintenance",
      "Rent collection",
      "Email support",
    ],
    color: "from-blue-600 to-blue-700",
  },
  {
    name: "Premium",
    price: "₹1000",
    period: "/acre/month",
    features: [
      "All Basic features",
      "Crop advisory",
      "Financial management",
      "Market analytics",
      "Priority support",
      "Quarterly reports",
    ],
    color: "from-[#2d5016] to-[#4a7c2e]",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    features: [
      "All Premium features",
      "Dedicated manager",
      "Legal services",
      "24/7 support",
      "Infrastructure development",
      "Insurance coordination",
    ],
    color: "from-purple-600 to-purple-700",
  },
]

const caseStudies = [
  {
    title: "Increased Yield by 35%",
    description: "Through expert crop management and timely guidance, we helped a farmer in Punjab increase yield significantly",
    metrics: "5 acres | 3 years partnership",
  },
  {
    title: "Reduced Operating Costs",
    description: "Optimized maintenance schedules and resource management reduced annual costs by 28% while maintaining productivity",
    metrics: "12 acres | 2 years partnership",
  },
  {
    title: "Seamless Tenant Transitions",
    description: "Handled legal compliance and tenant management smoothly, ensuring zero productivity loss during transitions",
    metrics: "8 acres | Ongoing",
  },
]

export default function PropertyManagementPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    size: "",
    message: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
    alert("Thank you! We'll contact you soon to schedule a consultation.")
    setFormData({ name: "", email: "", location: "", size: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Professional Farm & Land Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Focus on your investments while we handle the day-to-day management of your agricultural land and farm properties
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Icon className="w-6 h-6 text-[#2d5016]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2d5016]">{service.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <p className="text-xs text-gray-500 italic">{service.details}</p>
              </div>
            )
          })}
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-[#2d5016] mb-8">Why Choose Land2Land Management?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">20+ Years Experience</h4>
                    <p className="text-sm text-gray-600">Decades of agricultural property management expertise</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Transparent Reporting</h4>
                    <p className="text-sm text-gray-600">Monthly detailed reports and real-time updates</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Cost Optimization</h4>
                    <p className="text-sm text-gray-600">Maximize returns while minimizing operational costs</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Legal Compliance</h4>
                    <p className="text-sm text-gray-600">All regulations and documents always up to date</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">24/7 Emergency Support</h4>
                    <p className="text-sm text-gray-600">Always available for urgent issues</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.name} className={`bg-gradient-to-br ${plan.color} rounded-lg p-6 text-white ${plan.popular ? "ring-2 ring-offset-2 ring-[#2d5016]" : ""}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.popular && <span className="bg-white text-[#2d5016] px-3 py-1 rounded text-xs font-bold">Popular</span>}
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-white/80 ml-2">{plan.period}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-green-300">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#2d5016] mb-8 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <div key={study.title} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#2d5016]">
                <h3 className="font-bold text-[#2d5016] mb-2 text-lg">{study.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{study.description}</p>
                <p className="text-xs bg-green-100 text-[#2d5016] px-3 py-1 rounded inline-block font-semibold">{study.metrics}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] rounded-lg p-12 text-white mb-16">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Management Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: 1, title: "Assessment", desc: "Evaluate your property and create a management plan" },
              { num: 2, title: "Implementation", desc: "Deploy management team and systems" },
              { num: 3, title: "Operations", desc: "Daily management and regular maintenance" },
              { num: 4, title: "Reporting", desc: "Monthly updates and performance analysis" },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="bg-white text-[#2d5016] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-3">
                  {step.num}
                </div>
                <h4 className="font-bold mb-2">{step.title}</h4>
                <p className="text-green-100 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Form */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-12">
          <h2 className="text-3xl font-bold text-[#2d5016] mb-8 text-center">Request a Free Consultation</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="State, District"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Size (Acres) *</label>
              <input
                type="number"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                placeholder="Enter size"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us about your property and management needs..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <button
              type="submit"
              className="md:col-span-2 bg-gradient-to-r from-[#2d5016] to-[#4a7c2e] hover:shadow-lg text-white px-8 py-3 rounded-lg font-bold transition-all"
            >
              Schedule Free Consultation
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
