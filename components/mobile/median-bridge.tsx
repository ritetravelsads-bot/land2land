"use client"

import { useEffect } from "react"

/**
 * MedianBridge
 *
 * Detects when the site is running inside the Median.co native app wrapper
 * (iOS / Android) or as an installed PWA, and:
 *   1. Tags <html> with classes so we can adapt the UI for standalone mode
 *      (`median-app`, `median-ios`, `median-android`, `pwa-standalone`).
 *   2. Registers the device for push notifications through Median's JavaScript
 *      Bridge (OneSignal). All calls are guarded so nothing runs on the
 *      regular website and no errors are ever thrown there.
 *
 * Median injects a global `window.median` (and legacy `window.gonative`)
 * object only inside the native wrapper. On the web these are undefined, so
 * every native call below is a no-op.
 */

// Minimal typing for the parts of the Median bridge we touch.
type MedianBridge = {
  onesignal?: {
    register?: () => void
    userId?: () => Promise<unknown>
  }
  share?: { downloadFile?: (opts: unknown) => void }
}

declare global {
  interface Window {
    median?: MedianBridge
    gonative?: MedianBridge
    // Median resolves this promise once the bridge is ready.
    _median_ready?: boolean
  }
}

function detectAppContext(): {
  isMedian: boolean
  isIOS: boolean
  isAndroid: boolean
  isStandalone: boolean
} {
  if (typeof window === "undefined") {
    return { isMedian: false, isIOS: false, isAndroid: false, isStandalone: false }
  }

  const ua = window.navigator.userAgent || ""
  const hasBridge = typeof window.median !== "undefined" || typeof window.gonative !== "undefined"
  // Median / GoNative user-associate markers + the app suffix Median appends.
  const uaMedian = /median|gonative/i.test(ua)
  const isMedian = hasBridge || uaMedian

  const isIOS = /iphone|ipad|ipod/i.test(ua)
  const isAndroid = /android/i.test(ua)

  // PWA installed / launched from home screen.
  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    // iOS Safari specific flag
    (window.navigator as unknown as { standalone?: boolean }).standalone === true

  return { isMedian, isIOS, isAndroid, isStandalone: isStandalone || isMedian }
}

export default function MedianBridge() {
  useEffect(() => {
    const { isMedian, isIOS, isAndroid, isStandalone } = detectAppContext()
    const root = document.documentElement

    if (isMedian) root.classList.add("median-app")
    if (isMedian && isIOS) root.classList.add("median-ios")
    if (isMedian && isAndroid) root.classList.add("median-android")
    if (isStandalone) root.classList.add("pwa-standalone")

    if (!isMedian) return

    // Register for push notifications via Median's OneSignal bridge.
    // The bridge may attach slightly after load, so we retry briefly.
    let attempts = 0
    const maxAttempts = 20
    const timer = window.setInterval(() => {
      attempts += 1
      const bridge = window.median || window.gonative
      const register = bridge?.onesignal?.register
      if (typeof register === "function") {
        try {
          register()
        } catch {
          // Never surface bridge errors to the user.
        }
        window.clearInterval(timer)
      } else if (attempts >= maxAttempts) {
        window.clearInterval(timer)
      }
    }, 500)

    return () => window.clearInterval(timer)
  }, [])

  return null
}
