"use client"

import { useSyncExternalStore } from "react"

export type AppPlatform = "web" | "median-ios" | "median-android"

export function detectPlatform(): AppPlatform {
  if (typeof navigator === "undefined") return "web"
  const ua = navigator.userAgent.toLowerCase()
  const isMedian = ua.includes("median") || ua.includes("gonative")
  if (!isMedian) return "web"
  return /iphone|ipad|ipod/.test(ua) ? "median-ios" : "median-android"
}

const noopSubscribe = () => () => {}

/** Returns null during SSR/hydration, then the detected platform. */
export function useAppPlatform(): AppPlatform | null {
  return useSyncExternalStore<AppPlatform | null>(noopSubscribe, detectPlatform, () => null)
}

type MedianSocialResponse = {
  idToken?: string
  error?: string
  type?: string
  firstName?: string
  lastName?: string
  email?: string
}

type MedianWindow = Window & {
  median?: {
    socialLogin?: {
      google?: { login: (opts: { callback: (r: MedianSocialResponse) => void }) => void }
      apple?: { login: (opts: { callback: (r: MedianSocialResponse) => void; scope?: string }) => void }
    }
  }
}

export function hasMedianSocialLogin(provider: "google" | "apple"): boolean {
  if (typeof window === "undefined") return false
  return typeof (window as MedianWindow).median?.socialLogin?.[provider]?.login === "function"
}

export function medianSocialLogin(provider: "google" | "apple"): Promise<MedianSocialResponse> {
  return new Promise((resolve, reject) => {
    const plugin = (window as MedianWindow).median?.socialLogin?.[provider]
    if (!plugin) {
      reject(new Error("Native sign-in is not available in this app version"))
      return
    }
    const callback = (response: MedianSocialResponse) => {
      if (!response || response.error || !response.idToken) {
        reject(new Error(response?.error || "Sign-in was cancelled"))
        return
      }
      resolve(response)
    }
    if (provider === "apple") {
      ;(plugin as NonNullable<NonNullable<MedianWindow["median"]>["socialLogin"]>["apple"])!.login({
        callback,
        scope: "full_name email",
      })
    } else {
      plugin.login({ callback })
    }
  })
}
