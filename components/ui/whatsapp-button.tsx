"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export const WHATSAPP_NUMBER = "919205190063"
const DEFAULT_MESSAGE = "Hi, I'm interested in properties on Land2Land. Please share more details."

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    // Slide in after LCP to not compete for resources
    // Using requestIdleCallback with longer timeout for non-critical UI
    const showButton = () => setIsVisible(true)
    
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(showButton, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    } else {
      const timer = setTimeout(showButton, 2500)
      return () => clearTimeout(timer)
    }
  }, [])

  // Show tooltip briefly after button appears
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowTooltip(true), 3000)
      const hideTimer = setTimeout(() => setShowTooltip(false), 8000)
      return () => {
        clearTimeout(timer)
        clearTimeout(hideTimer)
      }
    }
  }, [isVisible])

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-500",
        "bottom-20 right-4 md:bottom-6 md:right-6",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      )}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative bg-foreground text-background text-sm px-4 py-2.5 rounded-xl shadow-lg whitespace-nowrap flex items-center gap-2">
            Need help finding a property?
            <button
              onClick={(e) => {
                e.preventDefault()
                setShowTooltip(false)
              }}
              className="text-background/60 hover:text-background transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-foreground rotate-45" />
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-center",
          "w-14 h-14 rounded-full",
          "bg-[#25D366] hover:bg-[#20BD5A] text-white",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-300 hover:scale-110",
          "focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        )}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}

interface PropertyWhatsAppLinkProps {
  propertyName: string
  price?: string
  propertyUrl?: string
  /** Show label text next to icon */
  withLabel?: boolean
  /** Use a pill/button shape instead of a circle */
  variant?: "circle" | "pill"
  className?: string
}

export function PropertyWhatsAppLink({
  propertyName,
  price,
  propertyUrl,
  withLabel = false,
  variant = "circle",
  className,
}: PropertyWhatsAppLinkProps) {
  const lines = [
    `Hi, I'm interested in "${propertyName}".`,
    price ? `Price: ${price}` : null,
    propertyUrl ? `Link: ${propertyUrl}` : null,
    "Please share more details.",
  ].filter(Boolean)

  const message = lines.join("\n")
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

  const WhatsAppIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn(withLabel ? "h-4 w-4" : "h-5 w-5")}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )

  if (variant === "pill") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl",
          "bg-[#25D366] hover:bg-[#20BD5A] text-white",
          "shadow-md hover:shadow-lg font-semibold text-sm",
          "transition-all duration-200",
          className
        )}
        aria-label={`WhatsApp enquiry for ${propertyName}`}
      >
        <WhatsAppIcon />
        {withLabel && <span>WhatsApp</span>}
      </a>
    )
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "flex items-center justify-center gap-2",
        // Minimum 44x44px touch target for accessibility
        withLabel
          ? "px-3 py-2 rounded-xl text-sm font-semibold"
          : "w-10 h-10 min-w-[44px] min-h-[44px] rounded-full",
        "bg-[#25D366] hover:bg-[#20BD5A] text-white",
        "shadow-md hover:shadow-lg",
        "transition-all duration-200 hover:scale-110",
        !withLabel && "opacity-0 group-hover:opacity-100",
        className
      )}
      aria-label={`Chat about ${propertyName} on WhatsApp`}
      title="Enquire on WhatsApp"
    >
      <WhatsAppIcon />
      {withLabel && <span>WhatsApp</span>}
    </a>
  )
}

/**
 * Sticky mobile bottom bar for property detail pages.
 * Renders below lg breakpoint only, fixed to the bottom of the viewport.
 */
export function PropertyWhatsAppMobileBar({
  propertyName,
  price,
  phone,
}: {
  propertyName: string
  price?: string
  phone?: string
}) {
  const waNumber = phone ? phone.replace(/[^0-9]/g, "") : WHATSAPP_NUMBER
  const lines = [
    `Hi, I'm interested in "${propertyName}".`,
    price ? `Price: ${price}` : null,
    "Please share more details.",
  ].filter(Boolean)
  const message = lines.join("\n")
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`
  const callUrl = `tel:+${waNumber}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background border-t border-border shadow-lg">
      <div className="flex items-center gap-2 px-4 py-3 safe-area-bottom">
        <a
          href={callUrl}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background text-sm font-semibold transition-colors hover:bg-foreground/90"
          aria-label={`Call about ${propertyName}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z" />
          </svg>
          Call Now
        </a>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold transition-colors"
          aria-label={`WhatsApp enquiry for ${propertyName}`}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}
