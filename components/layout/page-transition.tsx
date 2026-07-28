"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * PageTransition wraps page content and applies a native-feeling slide animation
 * whenever the route changes. On mobile:
 *   - Forward navigation (Link clicks): slides in from the right
 *   - Back navigation (browser back / iOS/Android swipe-back): slides in from the left
 * On desktop (md+) the CSS animations are disabled so this is a no-op.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  // Key increments on every pathname change to force React to remount the div
  // and re-trigger the CSS animation
  const [animKey, setAnimKey] = useState(0)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  // Track whether the current navigation was triggered by a popstate (back/forward)
  const isPopState = useRef(false)

  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    // Determine direction from navigation type
    if (isPopState.current) {
      setDirection("back")
    } else {
      setDirection("forward")
    }
    // Reset the popstate flag immediately after consuming it
    isPopState.current = false
    // Increment key to force remount of the animated div
    setAnimKey((k) => k + 1)
  }, [pathname])

  const animClass =
    direction === "back" ? "page-slide-back" : "page-slide-forward"

  return (
    <div
      key={animKey}
      className={`page-transition-wrapper ${animClass}`}
    >
      {children}
    </div>
  )
}
