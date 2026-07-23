"use client"

import { useEffect, useState, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"

/**
 * Slim top-of-screen loading bar that fires on every internal navigation.
 * - 3 px tall, primary brand color
 * - Smooth eased fill: 0 → 85 % while loading, then snaps to 100 % and fades
 * - z-[200] so it sits above the sticky header (z-50)
 * - Works in both the regular website and the Median app wrapper
 */
export default function NavigationProgress() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isFirstRender = useRef(true)

  // Complete bar when route finishes loading
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Route changed — complete the bar
    if (intervalRef.current) clearInterval(intervalRef.current)
    setProgress(100)

    const hide = setTimeout(() => {
      setVisible(false)
      setProgress(0)
    }, 350)

    return () => clearTimeout(hide)
  }, [pathname, searchParams])

  // Detect link clicks to start the bar
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")
      if (
        link &&
        link.href &&
        !link.href.startsWith("#") &&
        !link.target &&
        link.origin === window.location.origin &&
        link.pathname !== window.location.pathname
      ) {
        startProgress()
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  function startProgress() {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setVisible(true)
    setProgress(0)

    // Tick forward quickly at first, then slow down as it approaches 85 %
    let current = 0
    intervalRef.current = setInterval(() => {
      current += current < 30 ? 8 : current < 60 ? 4 : current < 80 ? 1.5 : 0.3
      if (current >= 85) {
        current = 85
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
      setProgress(current)
    }, 80)
  }

  if (!visible && progress === 0) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[200] pointer-events-none"
      style={{ height: "3px" }}
    >
      <div
        className="h-full bg-primary"
        style={{
          width: `${progress}%`,
          transition:
            progress === 100
              ? "width 0.15s ease-out, opacity 0.2s ease 0.15s"
              : "width 0.08s linear",
          opacity: progress === 100 ? 0 : 1,
          boxShadow: "0 0 8px 1px color-mix(in oklab, var(--primary) 70%, transparent)",
        }}
      />
    </div>
  )
}
