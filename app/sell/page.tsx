"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft, Home, FileCheck, Zap, Users, CheckCircle, AlertCircle } from "lucide-react"

type FormData = {
  propertyType: string
  size: string
  sizeUnit: string
  location: string
  state: string
  price: string
  facilities: string[]
  description: string
  ownerName: string
  ownerPhone: string
  ownerEmail: string
}

const INITIAL_FORM: FormData = {
  propertyType: "",
  size: "",
  sizeUnit: "acres",
  location: "",
  state: "",
  price: "",
  facilities: [],
  description: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
}

const PROPERTY_TYPES = [
  { value: "agricultural", label: "Agricultural Land" },
  { value: "farmland", label: "Farmland" },
  { value: "residential_plot", label: "Residential Plot" },
  { value: "commercial_plot", label: "Commercial Plot" },
  { value: "orchard", label: "Orchard Land" },
  { value: "irrigated", label: "Irrigated Land" },
]

const SIZE_UNITS = ["Acres", "Bigha", "Hectares", "Sq Ft", "Sq Yd", "Marla", "Kanal"]

const STATES = [
  "Andhra Pradesh", "Bihar", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh",
  "Uttarakhand", "West Bengal",
]

const FACILITIES = [
  "Electricity", "Water Access", "Well / Bore", "Road Access",
  "Irrigation System", "Fencing", "Cattle Shed", "Storage",
]

const STEPS = ["Property Details", "Location & Price", "Features", "Your Info"]

export default function SellPage() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const set = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const toggleFacility = (f: string) =>
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(f)
        ? prev.facilities.filter((x) => x !== f)
        : [...prev.facilities, f],
    }))

  const canAdvance = () => {
    if (step === 0) return form.propertyType !== "" && form.size !== ""
    if (step === 1) return form.location !== "" && form.state !== "" && form.price !== ""
    if (step === 2) return true
    if (step === 3) return form.ownerName !== "" && form.ownerPhone.replace(/\D/g, "").length >= 10
    return false
  }

  const handleSubmit = async () => {
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/sell-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
      } else {
        setSubmitted(true)
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#125007] bg-white"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5"

  if (submitted) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="w-8 h-8 text-[#125007]" />
          </div>
          <h2 className="text-2xl font-bold text-[#125007] mb-2">Listing Submitted!</h2>
          <p className="text-gray-600 mb-2 text-sm leading-relaxed">
            Your property details have been sent to our team at{" "}
            <strong>info@land2land.com</strong>. We will contact you within 24 hours.
          </p>
          {form.ownerEmail && (
            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to <strong>{form.ownerEmail}</strong>.
            </p>
          )}
          <Button
            onClick={() => { setSubmitted(false); setForm(INITIAL_FORM); setStep(0) }}
            className="bg-[#125007] hover:bg-[#1a6b0a] w-full"
          >
            Submit Another Listing
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-lg mx-auto px-4 pt-8 pb-16">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#125007] text-balance">List Your Land on Land2Land</h1>
          <p className="text-sm text-gray-500 mt-1 text-pretty">
            Free listing — connect with serious buyers across India
          </p>
        </div>

        {/* Step progress */}
        <div className="flex items-center mb-6">
          {STEPS.map((label, idx) => (
            <div key={idx} className="flex items-center flex-1">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    idx < step
                      ? "bg-[#125007] text-white"
                      : idx === step
                      ? "bg-[#125007] text-white ring-2 ring-[#125007] ring-offset-2"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {idx < step ? "✓" : idx + 1}
                </div>
                <span className={`text-[9px] mt-1 font-medium ${idx === step ? "text-[#125007]" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-1 mb-4 rounded ${idx < step ? "bg-[#125007]" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">

          {/* Step 0 — Property Details */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Property Details</h2>
              <div>
                <label className={labelClass}>Property Type <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-2">
                  {PROPERTY_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => set("propertyType", t.value)}
                      className={`p-2.5 border-2 rounded-lg text-xs font-medium text-left transition-all ${
                        form.propertyType === t.value
                          ? "border-[#125007] bg-green-50 text-[#125007]"
                          : "border-gray-200 text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className={labelClass}>Size <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    placeholder="e.g. 5"
                    value={form.size}
                    onChange={(e) => set("size", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="w-28">
                  <label className={labelClass}>Unit</label>
                  <select value={form.sizeUnit} onChange={(e) => set("sizeUnit", e.target.value)} className={inputClass}>
                    {SIZE_UNITS.map((u) => (
                      <option key={u} value={u.toLowerCase()}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 1 — Location & Price */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Location & Price</h2>
              <div>
                <label className={labelClass}>State <span className="text-red-500">*</span></label>
                <select value={form.state} onChange={(e) => set("state", e.target.value)} className={inputClass}>
                  <option value="">Select state</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Village / Area <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Karnal, Sonipat"
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Expected Price (₹) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  placeholder="e.g. 5000000"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Step 2 — Features */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Features & Description</h2>
              <div>
                <label className={labelClass}>Available Facilities</label>
                <div className="grid grid-cols-2 gap-2">
                  {FACILITIES.map((f) => (
                    <label
                      key={f}
                      className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer text-xs transition-colors ${
                        form.facilities.includes(f)
                          ? "border-[#125007] bg-green-50 text-[#125007]"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.facilities.includes(f)}
                        onChange={() => toggleFacility(f)}
                        className="accent-[#125007] w-3.5 h-3.5 shrink-0"
                      />
                      {f}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe soil type, water source, crops grown, access road condition…"
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* Step 3 — Owner Info */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Your Information</h2>
              <div>
                <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.ownerName}
                  onChange={(e) => set("ownerName", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.ownerPhone}
                  onChange={(e) => set("ownerPhone", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email Address <span className="text-gray-400 font-normal">(optional)</span></label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.ownerEmail}
                  onChange={(e) => set("ownerEmail", e.target.value)}
                  className={inputClass}
                />
                <p className="text-xs text-gray-400 mt-1">A confirmation copy will be sent if provided.</p>
              </div>

              {/* Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-gray-700 space-y-1">
                <p className="font-semibold text-[#125007] mb-1">Listing Summary</p>
                <p><span className="text-gray-500">Type:</span> {PROPERTY_TYPES.find(t => t.value === form.propertyType)?.label}</p>
                <p><span className="text-gray-500">Size:</span> {form.size} {form.sizeUnit}</p>
                <p><span className="text-gray-500">Location:</span> {form.location}{form.state ? `, ${form.state}` : ""}</p>
                <p><span className="text-gray-500">Price:</span> ₹{Number(form.price).toLocaleString("en-IN")}</p>
              </div>

              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="flex-1 h-10 text-sm"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                disabled={!canAdvance()}
                onClick={() => setStep(step + 1)}
                className="flex-1 h-10 text-sm bg-[#125007] hover:bg-[#1a6b0a] disabled:opacity-40"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                disabled={!canAdvance() || submitting}
                onClick={handleSubmit}
                className="flex-1 h-10 text-sm bg-[#125007] hover:bg-[#1a6b0a] disabled:opacity-40"
              >
                {submitting ? "Submitting…" : "Submit Listing"}
              </Button>
            )}
          </div>
        </div>

        {/* Why choose */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Zap, title: "Free to List", desc: "No listing charges or hidden fees" },
            { icon: Users, title: "Reach Buyers", desc: "Thousands of verified buyers" },
            { icon: FileCheck, title: "Expert Help", desc: "Guidance from land experts" },
            { icon: Home, title: "Safe Process", desc: "Verified & secure transactions" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-100 p-3 flex items-start gap-2.5">
              <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#125007]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#125007]">{title}</p>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
