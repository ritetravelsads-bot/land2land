import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Property Management Services | Land2Land",
  description: "Professional property management services for agricultural land and farms. Maintenance, tenant management, and more.",
}

export default function PropertyManagementPage() {
  const services = [
    {
      title: "Tenant Management",
      description: "Find and manage reliable tenant farmers for your property",
      icon: "👥",
    },
    {
      title: "Maintenance & Upkeep",
      description: "Regular maintenance of irrigation, fencing, and infrastructure",
      icon: "🔧",
    },
    {
      title: "Financial Management",
      description: "Handle rent collection, tax filing, and financial reporting",
      icon: "💰",
    },
    {
      title: "Legal Compliance",
      description: "Ensure all documents and registrations are current",
      icon: "📋",
    },
    {
      title: "Crop Management",
      description: "Expert advice on crop planning and seasonal operations",
      icon: "🌾",
    },
    {
      title: "Market Analytics",
      description: "Regular reports on land value and market trends",
      icon: "📊",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Property Management Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional management of your agricultural land and farm properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold text-[#2d5016] mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Why Choose Our Management?</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-[#2d5016] mb-2">Experienced Team</h4>
                <p className="text-sm text-gray-600">20+ years of agricultural property management expertise</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2d5016] mb-2">Transparent Reporting</h4>
                <p className="text-sm text-gray-600">Monthly reports and real-time property updates</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2d5016] mb-2">Cost Optimization</h4>
                <p className="text-sm text-gray-600">Maximize returns by minimizing operational costs</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2d5016] mb-2">Legal Compliance</h4>
                <p className="text-sm text-gray-600">All regulations and permissions always up to date</p>
              </div>
              <div>
                <h4 className="font-bold text-[#2d5016] mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Emergency assistance available round the clock</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#2d5016]">
              <h4 className="font-bold text-[#2d5016] mb-2 text-lg">Basic Plan</h4>
              <p className="text-2xl font-bold text-[#2d5016] mb-4">₹500/acre/month</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Monthly reporting</li>
                <li>✓ Tenant coordination</li>
                <li>✓ Basic maintenance</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#2d5016] bg-green-50">
              <h4 className="font-bold text-[#2d5016] mb-2 text-lg">Premium Plan</h4>
              <p className="text-2xl font-bold text-[#2d5016] mb-4">₹1000/acre/month</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ All Basic features</li>
                <li>✓ Crop advisory</li>
                <li>✓ Financial management</li>
                <li>✓ Market analytics</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#2d5016]">
              <h4 className="font-bold text-[#2d5016] mb-2 text-lg">Enterprise Plan</h4>
              <p className="text-2xl font-bold text-[#2d5016] mb-4">Custom Pricing</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ All Premium features</li>
                <li>✓ Dedicated manager</li>
                <li>✓ Legal services</li>
                <li>✓ Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Request a Consultation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Location</label>
              <input
                type="text"
                placeholder="Enter location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Size (Acres)</label>
              <input
                type="number"
                placeholder="Enter size"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Tell us about your property..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
            <button className="md:col-span-2 bg-[#2d5016] hover:bg-[#1d3610] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Full property management system will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
