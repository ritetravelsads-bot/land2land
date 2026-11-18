"use client"

import type React from "react"
import { Suspense, lazy } from "react"
import { usePathname } from "next/navigation"
import MegaMenuHeader from "./mega-menu-header"
import MedianAppHeader from "@/components/mobile/median-app-header"
import NavigationProgress from "./navigation-progress"
import RoutePrefetcher from "./route-prefetcher"
import MedianBridge from "@/components/mobile/median-bridge"
import AndroidAppDownloadPrompt from "@/components/mobile/android-app-download-prompt"
import PullToRefresh from "@/components/mobile/pull-to-refresh"
import PageTransition from "./page-transition"
import { Toaster } from "@/components/ui/sonner"

// Lazy load non-critical below-fold components
const Footer = lazy(() => import("./footer"))
const BottomNav = lazy(() => import("./bottom-nav"))
const WhatsAppButton = lazy(() => import("@/components/ui/whatsapp-button"))

export default function FrontendLayout({ children, isMedianApp }: { children: React.ReactNode; isMedianApp: boolean }) {
  const pathname = usePathname()
  
  // Check if we're on a dashboard page
  const isDashboardPage = pathname?.startsWith("/admin") || 
                         pathname?.startsWith("/builder") || 
                         pathname?.startsWith("/buyer") || 
                         pathname?.startsWith("/dashboard") ||
                         pathname?.startsWith("/associate")
  
  const isAuthPage = pathname?.startsWith("/auth")

  // Don't render the mega menu header and footer for dashboard pages
  if (isDashboardPage) {
    return (
      <>
        <MedianBridge />
        <PullToRefresh />
        {children}
      </>
    )
  }
  
  return (
    <>
      {isMedianApp ? <MedianAppHeader /> : <MegaMenuHeader />}
      <MedianBridge />
      <PullToRefresh />
      <Suspense fallback={null}>
        <NavigationProgress />
      </Suspense>
      <RoutePrefetcher />
      <PageTransition>{children}</PageTransition>
      {!isAuthPage && !isMedianApp && <AndroidAppDownloadPrompt />}
      {!isAuthPage && !isMedianApp && (
        <Suspense fallback={<div className="min-h-[600px] bg-gradient-to-b from-gray-50 to-white" />}>
          <Footer />
        </Suspense>
      )}
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
      <Toaster position="top-center" richColors closeButton />
    </>
  )
}
