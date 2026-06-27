"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Phone, Mail, ChevronDown, Send } from "lucide-react"
import { toast } from "sonner"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState("")

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError("")

    try {
      const res = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message || "Callback request from footer form",
          source: "footer_callback",
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to submit")
      }

      setFormSubmitted(true)
      toast.success("Callback request submitted!", {
        description: "Our team will contact you within 30 minutes.",
      })
      setTimeout(() => {
        setFormData({ name: "", phone: "", message: "" })
        setFormSubmitted(false)
      }, 3000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setFormError(errorMessage)
      toast.error("Failed to submit request", {
        description: errorMessage,
      })
    } finally {
      setFormLoading(false)
    }
  }

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Land2Land", href: "/about" },
    { name: "Buy Land", href: "/buy" },
    { name: "Sell Land", href: "/sell" },
    { name: "Farm Blog", href: "/blogs" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ]

  const landCategories = [
    { name: "Agricultural Land", href: "/agricultural-land" },
    { name: "Farmland", href: "/farmland" },
    { name: "Plots & Vacant Land", href: "/plots-vacant" },
    { name: "Land with Infrastructure", href: "/land-with-infrastructure" },
    { name: "Orchard Land", href: "/orchard-land" },
    { name: "Irrigation Land", href: "/irrigation-land" },
  ]

  const landTypes = [
    { name: "Buy Land", href: "/buy" },
    { name: "Sell Land", href: "/sell" },
    { name: "Farm Investments", href: "/investments" },
    { name: "Find Agent", href: "/find-agent" },
    { name: "Property Management", href: "/property-management" },
    { name: "Area Converter", href: "/area-converter" },
  ]

  const toolsServices = [
    { name: "Area Converter", href: "/area-converter" },
    { name: "Land Calculator", href: "/tools/land-calculator" },
    { name: "Farm Advisory", href: "/farm-advisory" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Disclaimer", href: "/disclaimer" },
  ]

  const FooterSection = ({
    title,
    items,
    sectionKey,
  }: { title: string; items: { name: string; href: string }[]; sectionKey: string }) => {
    const isExpanded = expandedSections[sectionKey]

    return (
      <div className="border-b border-gray-200 md:border-b-0">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 py-3 md:py-0 text-sm font-semibold text-[#2d5016] hover:text-[#6ba82b] transition-colors"
        >
          {title}
          <ChevronDown size={16} className={`md:hidden transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        <ul
          className={`space-y-1.5 overflow-hidden transition-all duration-300 md:block ${isExpanded ? "max-h-96" : "max-h-0 md:max-h-96"}`}
        >
          {items.map((item, idx) => (
            <li key={idx} className="pt-2 md:pt-0">
              <Link href={item.href} className="text-xs text-gray-600 hover:text-[#2d5016] transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <footer
      className="w-full bg-gradient-to-b from-gray-50 to-white border-t border-gray-200"
      style={{
        contain: "layout style",
        minHeight: "600px",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 600px"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">

        {/* Top Section: Contact & Unique Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-12 border-b border-gray-200">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2d5016] mb-4">About Land2Land</h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                India&apos;s trusted agricultural land and farm property marketplace. We connect landowners, farmers, and investors with verified land opportunities across India. Our platform provides transparent pricing, expert advisory, and secure transactions for agricultural land, farmland, and land investments. Empowering rural India through digital real estate.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2d5016] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <a href="tel:+919873702365" className="text-sm text-gray-700 hover:text-[#2d5016] transition-colors">
                  +91 98737-02365
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2d5016] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <a
                  href="mailto:info@land2land.in"
                  className="text-sm text-gray-700 hover:text-[#2d5016] transition-colors"
                >
                  info@land2land.in
                </a>
              </div>
            </div>
          </div>

          {/* Unique Enquiry Form */}
          <div className="bg-gradient-to-br from-[#2d5016] to-[#4a7c2e] rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-2">Get Instant Callback</h3>
            <p className="text-sm text-green-100 mb-6">
              Get expert advice on your land investment. Our team will contact you within 30 minutes.
            </p>

            {formSubmitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mb-4">
                  <Send size={28} className="text-white" />
                </div>
                <p className="text-lg font-semibold mb-1">Thank you!</p>
                <p className="text-sm text-blue-100">We'll contact you soon</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-100 text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-100 text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full bg-white hover:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed text-[#2d5016] font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  <span>{formLoading ? "Submitting..." : "Get Callback"}</span>
                  {!formLoading && <Send size={16} aria-hidden="true" />}
                </button>
                {formError && (
                  <p className="text-xs text-red-300 text-center">{formError}</p>
                )}
                <p className="text-xs text-green-100 text-center">Get expert advice on your land investment.</p>
              </form>
            )}
          </div>
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <div>
            <FooterSection title="Quick Links" items={quickLinks} sectionKey="quickLinks" />
          </div>

          {/* Land Categories */}
          <div>
            <FooterSection title="Land Categories" items={landCategories} sectionKey="landCategories" />
          </div>

          {/* Land Types & Features */}
          <div>
            <FooterSection title="Buy & Sell" items={landTypes} sectionKey="landTypes" />
          </div>

          {/* Tools & Services */}
          <div>
            <FooterSection title="Tools & Services" items={toolsServices} sectionKey="toolsServices" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600 text-center md:text-left">
              © {currentYear} land2land.in All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-xs text-gray-600 hover:text-[#2d5016] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-xs text-gray-600 hover:text-[#2d5016] transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/site-map" className="text-xs text-gray-600 hover:text-[#2d5016] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
