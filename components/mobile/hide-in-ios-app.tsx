"use client"

import type { ReactNode } from "react"
import { useAppPlatform } from "@/lib/median"

/**
 * Renders `children` everywhere except inside the Median iOS app,
 * where `fallback` is shown instead (App Store Guideline 3.1.1).
 */
export function HideInIosApp({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const platform = useAppPlatform()
  if (platform === "median-ios") return <>{fallback}</>
  return <>{children}</>
}

/** Hides children inside either Median native app (iOS or Android). */
export function HideInNativeApp({ children }: { children: ReactNode }) {
  const platform = useAppPlatform()
  if (platform === "median-ios" || platform === "median-android") return null
  return <>{children}</>
}
