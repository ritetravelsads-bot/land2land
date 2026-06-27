"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Home, FileCheck, Zap, Users, Upload } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function SellPage() {
  const [formStep, setFormStep] = useState(0)
  const [formData, setFormData] = useState({
    propertyType: "",
    size: "",
    sizeUnit: "acres",
    location: "",
    state: "",
    price: "",
    facilities: [] as string[],
    description: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  })

  const states = [
    "Punjab", "Haryana", "Uttar Pradesh", "Rajasthan", "Madhya Pradesh", 
    "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana"
  ]

  const propertyTypes = [
    { value: "agricultural", label: "Agricultural Land" },
    { value: "farmland", label: "Farmland with Infrastructure" },
    { value: "plot", label: "Plots & Vacant Land" },
    { value: "orchard", label: "Orchard Land" },
    { value: "irrigated", label: "Irrigated Land" },
  ]

  const facilitiesOptions = [
    "Electricity", "Water Access", "Well/Bore", "Road Access", 
    "Irrigation System", "Fencing", "Cattle Shed", "Storage"
  ]

  const handleFacilityToggle = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }))
  }

  const handleNext = () => {
    if (formStep < 3) setFormStep(formStep + 1)
  }

  const handleBack = () => {
    if (formStep > 0) setFormStep(formStep - 1)
  }

  const handleSubmit = () => {
    // Log or send data to API
    console.log("Form submitted:", formData)
    alert("Thank you! Your property listing has been submitted. Our team will contact you soon.")
    setFormStep(0)
    setFormData({
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
    })
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-green-50 to-white">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#2d5016] mb-4">
              Sell Your Land on Land2Land
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              List your agricultural land or farmland free and connect with serious buyers and investors across India in minutes.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {["Property Details", "Location & Price", "Facilities & Description", "Owner Info"].map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                  idx <= formStep ? "bg-[#2d5016] text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {idx + 1}
                </div>
                {idx < 3 && <div className={`flex-1 h-1 mx-2 ${idx < formStep ? "bg-[#2d5016]" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {/* Step 1: Property Details */}
            {formStep === 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2d5016]">Property Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What type of property?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setFormData({ ...formData, propertyType: type.value })}
                        className={`p-3 border-2 rounded-lg text-sm font-medium transition-all ${
                          formData.propertyType === type.value
                            ? "border-[#2d5016] bg-green-50 text-[#2d5016]"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <input
                      type="number"
                      placeholder="Enter size"
                      value={formData.size}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select
                      value={formData.sizeUnit}
                      onChange={(e) => setFormData({ ...formData, sizeUnit: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                    >
                      <option value="acres">Acres</option>
                      <option value="bigha">Bigha</option>
                      <option value="hectares">Hectares</option>
                      <option value="sqft">Sq Ft</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Price */}
            {formStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2d5016]">Location & Price</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village/Area</label>
                  <input
                    type="text"
                    placeholder="Enter village or area name"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Facilities & Description */}
            {formStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2d5016]">Facilities & Description</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Available Facilities</label>
                  <div className="grid grid-cols-2 gap-3">
                    {facilitiesOptions.map((facility) => (
                      <label key={facility} className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={formData.facilities.includes(facility)}
                          onChange={() => handleFacilityToggle(facility)}
                          className="w-4 h-4 rounded accent-[#2d5016]"
                        />
                        <span className="text-sm text-gray-700">{facility}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your property, including soil type, water access, crops grown, etc."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Owner Info */}
            {formStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2d5016]">Your Information</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={formData.ownerPhone}
                    onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={formData.ownerEmail}
                    onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
              {formStep > 0 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              {formStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 bg-[#2d5016] hover:bg-[#1d3610]"
                >
                  Next <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#2d5016] hover:bg-[#1d3610]"
                >
                  Submit Listing
                </Button>
              )}
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-3">
                <Zap className="h-6 w-6 text-[#2d5016]" />
              </div>
              <h3 className="font-bold text-[#2d5016] mb-2">Free to List</h3>
              <p className="text-sm text-gray-600">No listing charges, no hidden fees</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-3">
                <Users className="h-6 w-6 text-[#2d5016]" />
              </div>
              <h3 className="font-bold text-[#2d5016] mb-2">Reach Buyers</h3>
              <p className="text-sm text-gray-600">Connect with thousands of serious buyers</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-3">
                <FileCheck className="h-6 w-6 text-[#2d5016]" />
              </div>
              <h3 className="font-bold text-[#2d5016] mb-2">Expert Guidance</h3>
              <p className="text-sm text-gray-600">Get help from land experts throughout</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-100 mb-3">
                <Home className="h-6 w-6 text-[#2d5016]" />
              </div>
              <h3 className="font-bold text-[#2d5016] mb-2">Safe Transaction</h3>
              <p className="text-sm text-gray-600">Secure transaction process with verification</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
