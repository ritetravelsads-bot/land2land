import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Land Area Converter | Convert Bigha, Acre, Katha | Land2Land",
  description: "Convert between different land area units: Bigha, Acre, Hectare, Katha, Sq Meter, Sq Yard. Free land area converter tool.",
}

export default function AreaConverterPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2d5016] mb-4">
            Land Area Converter
          </h1>
          <p className="text-lg text-gray-600">
            Convert between different land area units used in India
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Unit</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                <option>Select unit</option>
                <option>Bigha</option>
                <option>Acre</option>
                <option>Hectare</option>
                <option>Katha</option>
                <option>Square Meter</option>
                <option>Square Yard</option>
                <option>Square Feet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Unit</label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]">
                <option>Select unit</option>
                <option>Bigha</option>
                <option>Acre</option>
                <option>Hectare</option>
                <option>Katha</option>
                <option>Square Meter</option>
                <option>Square Yard</option>
                <option>Square Feet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                0.00
              </div>
            </div>
          </div>

          <button className="w-full mt-6 bg-[#2d5016] hover:bg-[#1d3610] text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Convert
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-[#2d5016] mb-2">Common Conversions</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>1 Acre = 0.4047 Hectare</li>
              <li>1 Bigha = 0.67 Acre</li>
              <li>1 Katha = 0.0192 Acre</li>
              <li>1 Hectare = 2.47 Acre</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-[#2d5016] mb-2">Units Supported</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Bigha (India)</li>
              <li>Acre (International)</li>
              <li>Hectare (International)</li>
              <li>Katha (India)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-[#2d5016] mb-2">Quick Reference</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Square Meter (sq m)</li>
              <li>Square Yard (sq yd)</li>
              <li>Square Feet (sq ft)</li>
              <li>Cent (India)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            This is a placeholder page. Interactive area converter will be available soon.
          </p>
        </div>
      </div>
    </main>
  )
}
