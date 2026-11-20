"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Phone, Mail, ChevronDown, Send, Instagram, Facebook, Youtube, X, ShieldCheck, MapPin, BadgeCheck } from "lucide-react"
import { toast } from "sonner"
import { getCorrectHref } from "@/lib/link-validator"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [callbackOpen, setCallbackOpen] = useState(false)
  const [portalReady, setPortalReady] = useState(false)

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    if (window.sessionStorage.getItem("land2land-callback-popup-dismissed") === "1") return

    const timer = window.setTimeout(() => setCallbackOpen(true), 8000)
    return () => window.clearTimeout(timer)
  }, [])

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
        window.sessionStorage.setItem("land2land-callback-popup-dismissed", "1")
        setCallbackOpen(false)
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

  const PinterestIcon = ({ size = 18 }: { size?: number }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.599-.299-1.484c0-1.39.806-2.428 1.809-2.428.853 0 1.265.641 1.265 1.408 0 .858-.546 2.14-.828 3.329-.236.995.499 1.807 1.481 1.807 1.777 0 3.144-1.874 3.144-4.579 0-2.394-1.72-4.068-4.177-4.068-2.845 0-4.516 2.134-4.516 4.34 0 .859.331 1.781.744 2.281a.3.3 0 0 1 .069.288c-.076.315-.245.995-.278 1.134-.043.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.472 6.165 5.776 0 3.447-2.173 6.22-5.189 6.22-1.013 0-1.966-.526-2.292-1.148l-.623 2.377c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  )

  const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/_land2land_/", icon: Instagram },
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61591888530826", icon: Facebook },
    { name: "YouTube", href: "https://www.youtube.com/@Land2Land2026", icon: Youtube },
    { name: "Pinterest", href: "https://in.pinterest.com/land2landofficial/", icon: PinterestIcon },
  ]

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Land2Land", href: "/about" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing & Fees", href: "/pricing" },
    { name: "Buy Land", href: "/properties" },
    { name: "Post Property Free", href: "/sell" },
    { name: "Sell Land", href: "/sell" },
    { name: "Land Valuation Calculator", href: "/area-converter" },
    { name: "Farm Blog", href: "/blogs" },
    { name: "Career", href: "/career" },
    { name: "Contact", href: "/contact" },
  ]

  const landCategories = [
    { name: "Agricultural Land", href: "/land/agricultural" },
    { name: "Farmland", href: "/land/farmland" },
    { name: "Farmland & Agro-Forestry", href: "/land/farmland" },
    { name: "Industrial & Logistics Land", href: "/land/industrial" },
    { name: "Commercial Highway Plots", href: "/land/commercial-plot" },
    { name: "Plots & Vacant Land", href: "/land/vacant" },
    { name: "Land with Infrastructure", href: "/land/industrial" },
    { name: "Orchard Land", href: "/land/agricultural" },
    { name: "Irrigation Land", href: "/land/agricultural" },
  ]

  const landTypes = [
    { name: "Buy Land", href: "/properties" },
    { name: "Sell Land", href: "/sell" },
    { name: "Farm Investments", href: "/investments" },
    { name: "Find Associate", href: "/find-associate" },
    { name: "Property Management", href: "/property-management" },
    { name: "Farms", href: "/farms" },
  ]

  const toolsServices = [
    { name: "State Land Unit Converter", href: "/area-converter" },
    { name: "Land Pricing & Rate Trends", href: "/area-converter" },
    { name: "State-Wise Land Purchase Guidelines", href: "/services/legal" },
    { name: "Seller Documentation Checklist", href: "/services/legal" },
    { name: "Land Calculator", href: "/tools/land-calculator" },
    { name: "Farm Advisory", href: "/farm-advisory" },
    { name: "Blogs", href: "/blogs" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-and-conditions" },
    { name: "Grievance Redressal", href: "/grievance-redressal" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Disclaimer", href: "/disclaimer" },
    { name: "Delete Account", href: "/account/delete" },
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
          className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 py-3 md:py-0 text-sm font-semibold text-[#125007] hover:text-[#6ba82b] transition-colors"
        >
          {title}
          <ChevronDown size={16} className={`md:hidden transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        <ul
          className={`space-y-1.5 overflow-hidden transition-all duration-300 md:block ${isExpanded ? "max-h-96" : "max-h-0 md:max-h-96"}`}
        >
          {items.map((item, idx) => {
            const correctHref = getCorrectHref(item.href)
            return (
              <li key={idx} className="pt-2 md:pt-0">
                <Link href={correctHref} className="text-xs text-gray-600 hover:text-[#125007] transition-colors">
                  {item.name}
                </Link>
              </li>
            )
          })}
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
              <h2 className="text-2xl md:text-3xl font-bold text-[#125007] mb-4">About Land2Land</h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                Land2Land is India's trusted marketplace for buying, selling and investing in land. Explore verified agricultural, residential, commercial and industrial properties across India all in one platform.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#125007] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <a href="tel:+919205190063" className="text-sm text-gray-700 hover:text-[#125007] transition-colors">
                  +91-9205190063
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#125007] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <a
                  href="mailto:info@land2land.com"
                  className="text-sm text-gray-700 hover:text-[#125007] transition-colors"
                >
                  info@land2land.com
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#125007] mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow Land2Land on ${social.name}`}
                      className="w-10 h-10 bg-[#125007] hover:bg-[#6ba82b] rounded-lg flex items-center justify-center text-white transition-colors"
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e4e9df] bg-white p-6 shadow-sm sm:p-7">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#6a8d52]">A clearer way to own land</p>
            <h3 className="mb-3 text-xl font-bold leading-snug text-[#173b19]">Confidence at every step.</h3>
            <p className="mb-5 text-sm leading-relaxed text-gray-600">Explore land opportunities with transparent details, expert guidance and a team that puts trust first.</p>
            <div className="space-y-3 text-sm font-medium text-gray-700">
              <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-[#397b32]" aria-hidden="true" /><span>Verified property information</span></div>
              <div className="flex items-center gap-3"><MapPin className="size-5 text-[#397b32]" aria-hidden="true" /><span>Opportunities across India</span></div>
              <div className="flex items-center gap-3"><BadgeCheck className="size-5 text-[#397b32]" aria-hidden="true" /><span>Personal support from our team</span></div>
            </div>
          </div>

          {callbackOpen && portalReady && createPortal(
            <aside role="dialog" aria-label="Get Instant Callback" className="fixed bottom-24 right-4 z-[60] max-h-[min(70vh,26rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto rounded-2xl border border-white/15 bg-gradient-to-br from-[#125007] to-[#4a7c2e] text-white shadow-[0_18px_60px_-18px_rgba(15,40,15,0.55)] sm:bottom-6 sm:right-24 sm:max-h-[min(80vh,34rem)] sm:w-[min(23rem,calc(100vw-2rem))]">
              <div className="p-5 sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-green-200">Land2Land advisory</p>
                    <h2 className="text-xl font-bold text-white">Get Instant Callback</h2>
                    <p className="mt-1 text-sm leading-relaxed text-green-100">Talk with a land expert. We&apos;ll call within 30 minutes.</p>
                  </div>
                  <button type="button" aria-label="Close callback form" onClick={() => { setCallbackOpen(false); window.sessionStorage.setItem("land2land-callback-popup-dismissed", "1") }} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><X size={18} /></button>
                </div>
                {formSubmitted ? (
                  <div className="py-5 text-center"><div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-green-400"><Send size={23} className="text-white" /></div><p className="font-semibold">Thank you!</p><p className="text-sm text-green-100">Our team will contact you soon.</p></div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                    <div><label htmlFor="callback-popup-name" className="mb-1 block text-sm font-medium">Your name</label><input id="callback-popup-name" type="text" autoComplete="name" placeholder="Your name" required value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} className="w-full rounded-lg border border-white/30 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-green-100 focus:outline-none focus:ring-2 focus:ring-white/70" /></div>
                    <div><label htmlFor="callback-popup-phone" className="mb-1 block text-sm font-medium">Phone number</label><input id="callback-popup-phone" type="tel" autoComplete="tel" placeholder="Your phone number" required value={formData.phone} onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))} className="w-full rounded-lg border border-white/30 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-green-100 focus:outline-none focus:ring-2 focus:ring-white/70" /></div>
                    <button type="submit" disabled={formLoading} className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 font-semibold text-[#125007] transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70"><span>{formLoading ? "Submitting..." : "Get Callback"}</span>{!formLoading && <Send size={16} aria-hidden="true" />}</button>
                    {formError && <p role="alert" className="text-center text-xs text-red-100">{formError}</p>}
                  </form>
                )}
              </div>
            </aside>,
            document.body,
          )}
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
              © {currentYear} land2land.com All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href={getCorrectHref("/privacy-policy")} className="text-xs text-gray-600 hover:text-[#125007] transition-colors">
                Privacy Policy
              </Link>
              <Link href={getCorrectHref("/terms-and-conditions")} className="text-xs text-gray-600 hover:text-[#125007] transition-colors">
                Terms & Conditions
              </Link>
              <Link href={getCorrectHref("/site-map")} className="text-xs text-gray-600 hover:text-[#125007] transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
