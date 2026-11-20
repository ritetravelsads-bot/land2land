
"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search,
  Heart,
  Plus,
  Home,
  User,
} from "lucide-react"

interface CurrentUser {
  id: string
  email: string
  username: string
  user_type: "customer" | "associate" | "admin"
}

export default function BottomNav() {
  const pathname = usePathname()

  const [currentUser, setCurrentUser] =
    useState<CurrentUser | null>(null)

  const [isBuilder, setIsBuilder] = useState(false)

  // Preserve existing authentication detection.
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined
    let idleId: number | undefined

    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
          cache: "no-store",
        })

        if (response.ok) {
          const data = await response.json()

          if (data.user) {
            setCurrentUser(data.user)

            setIsBuilder(
              data.user.user_type === "associate" ||
              data.user.user_type === "admin"
            )
          }
        }
      } catch {
        // Keep navigation available for guest users.
      }
    }

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(checkAuth, {
        timeout: 3000,
      })
    } else {
      timeoutId = setTimeout(checkAuth, 500)
    }

    return () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId)
      }

      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`)

  // Keep bottom navigation hidden in role dashboards.
  if (
    pathname?.includes("/buyer") ||
    pathname?.includes("/builder") ||
    pathname?.includes("/dashboard") ||
    pathname?.includes("/admin") ||
    pathname?.includes("/associate")
  ) {
    return null
  }

  const dashboardLink = isBuilder ? "/builder" : "/buyer"

  const addPropertyLink = isBuilder
    ? "/associate/properties/new"
    : "/auth/login?redirect=/associate/properties/new"

  const profileLink = currentUser
    ? dashboardLink
    : "/auth/login"

  const isProfileActive =
    isActive("/buyer") ||
    isActive("/builder") ||
    isActive("/auth")

  return (
    <>
      {/* Space reserved for the fixed bottom navigation */}
      <div
        aria-hidden="true"
        className="h-[88px] md:hidden"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      />

      {/* Floating Bottom Navigation */}
      <nav
        aria-label="Bottom navigation"
        className="fixed inset-x-0 z-50 px-2 md:hidden"
        style={{
          bottom: "calc(8px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="relative mx-auto w-full max-w-[860px]">

          {/* White Floating Navigation Pill */}
          <div className="relative grid h-[76px] grid-cols-5 items-center rounded-[28px] border border-white/80 bg-white/95 px-1 shadow-[0_8px_35px_rgba(20,35,20,0.13)] backdrop-blur-xl">

            {/* Home */}
            <Link
              href="/"
              aria-current={pathname === "/" ? "page" : undefined}
              className={`group flex h-full flex-col items-center justify-center gap-1 rounded-2xl pt-1 transition-colors ${
                pathname === "/"
                  ? "text-[#086b29]"
                  : "text-[#626970] hover:text-[#086b29]"
              }`}
            >
              <Home
                className={`size-[23px] transition-transform ${
                  pathname === "/" ? "fill-current" : ""
                }`}
                strokeWidth={pathname === "/" ? 2.5 : 2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  pathname === "/" ? "font-bold" : "font-medium"
                }`}
              >
                Home
              </span>

              {pathname === "/" && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] rounded-full bg-[#07852c]" />
              )}
            </Link>

            {/* Explore */}
            <Link
              href="/properties"
              aria-current={isActive("/properties") ? "page" : undefined}
              className={`flex h-full flex-col items-center justify-center gap-1 rounded-2xl pt-1 transition-colors ${
                isActive("/properties")
                  ? "text-[#086b29]"
                  : "text-[#626970] hover:text-[#086b29]"
              }`}
            >
              <Search
                className="size-[23px]"
                strokeWidth={2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  isActive("/properties")
                    ? "font-bold"
                    : "font-medium"
                }`}
              >
                Explore
              </span>

              {isActive("/properties") && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] rounded-full bg-[#07852c]" />
              )}
            </Link>

            {/* Center Add Property Button */}
            <Link
              href={addPropertyLink}
              aria-label="Add or sell property"
              title="Add Property"
              className="relative z-10 mx-auto -mt-[37px] flex size-[90px] items-center justify-center rounded-full border-[5px] border-white bg-gradient-to-b from-[#07952f] to-[#00651f] text-white shadow-[0_7px_20px_rgba(0,90,30,0.28)] transition-all duration-200 hover:scale-105 hover:shadow-[0_10px_24px_rgba(0,90,30,0.35)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#07852c] focus-visible:ring-offset-2"
            >
              <Plus
                className="size-[39px]"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </Link>

            {/* Saved */}
            <Link
              href="/favorites"
              aria-current={isActive("/favorites") ? "page" : undefined}
              className={`flex h-full flex-col items-center justify-center gap-1 rounded-2xl pt-1 transition-colors ${
                isActive("/favorites")
                  ? "text-[#086b29]"
                  : "text-[#626970] hover:text-[#086b29]"
              }`}
            >
              <Heart
                className={`size-[23px] ${
                  isActive("/favorites") ? "fill-current" : ""
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  isActive("/favorites")
                    ? "font-bold"
                    : "font-medium"
                }`}
              >
                Saved
              </span>

              {isActive("/favorites") && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] rounded-full bg-[#07852c]" />
              )}
            </Link>

            {/* Profile */}
            <Link
              href={profileLink}
              aria-current={isProfileActive ? "page" : undefined}
              className={`flex h-full flex-col items-center justify-center gap-1 rounded-2xl pt-1 transition-colors ${
                isProfileActive
                  ? "text-[#086b29]"
                  : "text-[#626970] hover:text-[#086b29]"
              }`}
            >
              <User
                className="size-[23px]"
                strokeWidth={2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  isProfileActive ? "font-bold" : "font-medium"
                }`}
              >
                Profile
              </span>

              {isProfileActive && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] rounded-full bg-[#07852c]" />
              )}
            </Link>

          </div>
        </div>
      </nav>
    </>
  )
}
