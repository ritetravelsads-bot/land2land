"use client"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Copy, RefreshCw } from "lucide-react"

// Conversion factors to square meters
const CONVERSION_FACTORS: Record<string, number> = {
  "sq_m": 1,
  "sq_cm": 0.0001,
  "sq_km": 1000000,
  "sq_ft": 0.092903,
  "sq_yard": 0.836127,
  "acre": 4046.86,
  "hectare": 10000,
  "bigha": 2714.78, // Average Indian bigha
  "katha": 81.41,
  "cent": 40.47,
  "gaj": 0.836127,
  "ground": 1200, // South Indian ground
}

const UNITS = [
  { value: "sq_m", label: "Square Meter (sq m)" },
  { value: "sq_cm", label: "Square Centimeter (sq cm)" },
  { value: "sq_km", label: "Square Kilometer (sq km)" },
  { value: "sq_ft", label: "Square Feet (sq ft)" },
  { value: "sq_yard", label: "Square Yard (sq yd)" },
  { value: "acre", label: "Acre" },
  { value: "hectare", label: "Hectare (ha)" },
  { value: "bigha", label: "Bigha (India)" },
  { value: "katha", label: "Katha (India)" },
  { value: "cent", label: "Cent (India)" },
  { value: "gaj", label: "Gaj (India)" },
  { value: "ground", label: "Ground (South India)" },
]

const CONVERSION_TABLE = [
  { from: "1 Acre", conversions: ["0.4047 Hectare", "0.1521 Bigha", "2.47 sq km"] },
  { from: "1 Bigha", conversions: ["0.67 Acre", "6.57 Katha", "0.27 Hectare"] },
  { from: "1 Hectare", conversions: ["2.47 Acre", "3.7 Bigha", "100 Katha"] },
  { from: "1 Katha", conversions: ["0.0192 Acre", "0.815 Gaj", "81.41 sq m"] },
  { from: "1 Ground", conversions: ["0.3 Acre", "1200 sq m", "0.12 Hectare"] },
]

export default function AreaConverterPage() {
  const [fromValue, setFromValue] = useState("")
  const [fromUnit, setFromUnit] = useState("acre")
  const [toUnit, setToUnit] = useState("sq_m")
  const [result, setResult] = useState<number | null>(null)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleConvert = () => {
    if (!fromValue || isNaN(Number(fromValue))) {
      setResult(null)
      return
    }

    const fromFactorInSqM = CONVERSION_FACTORS[fromUnit]
    const toFactorInSqM = CONVERSION_FACTORS[toUnit]
    
    const valueInSqM = Number(fromValue) * fromFactorInSqM
    const convertedValue = valueInSqM / toFactorInSqM
    
    setResult(parseFloat(convertedValue.toFixed(6)))
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    setResult(null)
    setFromValue("")
  }

  const handleCopy = (index: number) => {
    const conversions = CONVERSION_TABLE[index].conversions
    const text = `${CONVERSION_TABLE[index].from} = ${conversions.join(", ")}`
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleClear = () => {
    setFromValue("")
    setResult(null)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
        <section className="max-w-5xl mx-auto px-4 py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#2d5016] mb-4">Land Area Converter</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Convert between all land area units used in India. Support for Bigha, Acre, Hectare, Katha, and more.
            </p>
          </div>

          {/* Converter Tool */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              {/* From Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From Unit</label>
                <select
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value)
                    setResult(null)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                >
                  {UNITS.map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>

              {/* From Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter value"
                  value={fromValue}
                  onChange={(e) => {
                    setFromValue(e.target.value)
                    setResult(null)
                  }}
                  onBlur={handleConvert}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSwap}
                  className="p-2 rounded-full bg-gray-100 hover:bg-[#2d5016] hover:text-white transition-colors"
                  title="Swap units"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>

              {/* To Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To Unit</label>
                <select
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value)
                    setResult(null)
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                >
                  {UNITS.map((unit) => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>

              {/* Result */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Result</label>
                <div className="w-full px-4 py-2 border-2 border-[#2d5016] rounded-lg bg-green-50 font-bold text-[#2d5016] text-center">
                  {result !== null ? result.toLocaleString("en-IN", { maximumFractionDigits: 6 }) : "—"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={handleConvert}
                className="flex-1 bg-[#2d5016] hover:bg-[#1d3610] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Convert
              </button>
              <button
                onClick={handleClear}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Conversion Table */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Quick Conversion Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONVERSION_TABLE.map((row, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-bold text-[#2d5016]">{row.from}</div>
                    <button
                      onClick={() => handleCopy(idx)}
                      className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    {row.conversions.map((conv, cidx) => (
                      <div key={cidx} className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">=</span>
                        <span>{conv}</span>
                      </div>
                    ))}
                  </div>
                  {copiedIndex === idx && (
                    <div className="mt-2 text-xs text-green-600 font-medium">Copied!</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-[#2d5016] mb-3">Common Units</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>Acre:</strong> International unit, ~4047 sq m</li>
                <li><strong>Hectare:</strong> Metric unit, ~10000 sq m</li>
                <li><strong>Bigha:</strong> Regional Indian unit, ~2715 sq m</li>
                <li><strong>Katha:</strong> Bengali unit, ~81 sq m</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-[#2d5016] mb-3">Regional Units</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li><strong>Cent:</strong> South India, ~40 sq m</li>
                <li><strong>Ground:</strong> South India, ~1200 sq m</li>
                <li><strong>Gaj:</strong> North India, ~0.84 sq m</li>
                <li><strong>Killa:</strong> Varies by region</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-[#2d5016] mb-3">Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Accurate conversions for land measurement</li>
                <li>✓ Support for 12+ regional units</li>
                <li>✓ Easy copy-to-clipboard conversions</li>
                <li>✓ Useful for land buying and selling</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
