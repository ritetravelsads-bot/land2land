"use client"

import { useEffect, useRef, useState } from "react"
import { RefreshCw } from "lucide-react"

/**
 * PullToRefresh
 *
 * Adds a native-feeling pull-to-refresh gesture, but ONLY when the site is
 * running inside the Median.co native wrapper or an installed PWA
 * (detected via the `.median-app` / `.pwa-standalone` classes that
 * MedianBridge sets on <html>). On the regular website this renders nothing
 * and attaches no listeners, so desktop / mobile-web behaviour is unchanged.
 */

const THRESHOLD = 72 // px the user must pull before a refresh triggers
const MAX_PULL = 120 // clamp so the indicator never travels too far

export default function PullToRefresh() {
  const [enabled, setEnabled] = useState(false)
  const [pull, setPull] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const startY = useRef(0)
  const tracking = useRef(false)

  useEffect(() => {
    const root = document.documentElement
    const isApp = root.classList.contains("median-app") || root.classList.contains("pwa-standalone")
    setEnabled(isApp)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onTouchStart = (e: TouchEvent) => {
      // Only begin tracking when the page is scrolled to the very top.
      if (window.scrollY > 0 || refreshing) {
        tracking.current = false
        return
      }
      tracking.current = true
      startY.current = e.touches[0].clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking.current || refreshing) return
      const delta = e.touches[0].clientY - startY.current
      if (delta <= 0) {
        setPull(0)
        return
      }
      // Apply resistance so the pull feels rubbery and controlled.
      const resisted = Math.min(MAX_PULL, delta * 0.5)
      setPull(resisted)
    }

    const onTouchEnd = () => {
      if (!tracking.current) return
      tracking.current = false
      if (pull >= THRESHOLD && !refreshing) {
        setRefreshing(true)
        setPull(THRESHOLD)
        // Small delay so the spinner is visible before the reload.
        window.setTimeout(() => window.location.reload(), 400)
      } else {
        setPull(0)
      }
    }

    document.addEventListener("touchstart", onTouchStart, { passive: true })
    document.addEventListener("touchmove", onTouchMove, { passive: true })
    document.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      document.removeEventListener("touchstart", onTouchStart)
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("touchend", onTouchEnd)
    }
  }, [enabled, pull, refreshing])

  if (!enabled) return null

  const progress = Math.min(1, pull / THRESHOLD)
  const visible = pull > 0 || refreshing

  return (
    <div
      aria-hidden={!visible}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] flex justify-center md:hidden"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        transform: `translateY(${visible ? pull : 0}px)`,
        opacity: visible ? 1 : 0,
        transition: tracking.current ? "none" : "transform 0.25s ease, opacity 0.25s ease",
      }}
    >
      <div className="mt-2 flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-md">
        <RefreshCw
          size={18}
          className={`text-primary ${refreshing ? "animate-spin" : ""}`}
          style={{ transform: refreshing ? undefined : `rotate(${progress * 270}deg)` }}
        />
      </div>
    </div>
  )
}
