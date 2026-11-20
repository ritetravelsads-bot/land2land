
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

  // Check authentication without blocking the navigation.
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
        // Navigation remains available to guest users.
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
      if (
        idleId !== undefined &&
        "cancelIdleCallback" in window
      ) {
        window.cancelIdleCallback(idleId)
      }

      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`)

  // Hide public bottom navigation inside role dashboards.
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

  const isHomeActive = pathname === "/"
  const isExploreActive = isActive("/properties")
  const isSavedActive = isActive("/favorites")

  const isProfileActive =
    isActive("/buyer") ||
    isActive("/builder") ||
    isActive("/auth")

  return (
    <>
      {/* Reserve space below page content for the fixed navigation. */}
      <div
        aria-hidden="true"
        className="h-[88px] md:hidden"
        style={{
          height:
            "calc(88px + env(safe-area-inset-bottom, 0px))",
        }}
      />

      {/* Floating Bottom Navigation */}
      <nav
        aria-label="Bottom navigation"
        className="l2l-bottom-nav fixed inset-x-0 z-50 px-2 md:hidden"
        style={{
          bottom:
            "calc(8px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="relative mx-auto w-full max-w-[860px]">

          {/* Navigation Pill */}
          <div
            className="
              l2l-bottom-nav-pill
              relative grid h-[76px] w-full
              grid-cols-5 items-center
              rounded-[28px]
              border border-white/80
              bg-white/95
              px-1
              shadow-[0_8px_35px_rgba(20,35,20,0.13)]
              backdrop-blur-xl
            "
          >

            {/* HOME */}
            <Link
              href="/"
              aria-label="Home"
              aria-current={isHomeActive ? "page" : undefined}
              className={`
                relative flex h-full min-w-0 w-full
                flex-col items-center justify-center
                gap-1 rounded-2xl pt-1
                transition-colors
                ${
                  isHomeActive
                    ? "text-[#086b29]"
                    : "text-[#626970] hover:text-[#086b29]"
                }
              `}
            >
              <Home
                className={`size-[23px] shrink-0 ${
                  isHomeActive ? "fill-current" : ""
                }`}
                strokeWidth={isHomeActive ? 2.5 : 2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  isHomeActive ? "font-bold" : "font-medium"
                }`}
              >
                Home
              </span>

              {isHomeActive && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] max-w-[80%] rounded-full bg-[#07852c]" />
              )}
            </Link>

            {/* EXPLORE */}
            <Link
              href="/properties"
              aria-label="Explore properties"
              aria-current={isExploreActive ? "page" : undefined}
              className={`
                relative flex h-full min-w-0 w-full
                flex-col items-center justify-center
                gap-1 rounded-2xl pt-1
                transition-colors
                ${
                  isExploreActive
                    ? "text-[#086b29]"
                    : "text-[#626970] hover:text-[#086b29]"
                }
              `}
            >
              <Search
                className="size-[23px] shrink-0"
                strokeWidth={2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  isExploreActive ? "font-bold" : "font-medium"
                }`}
              >
                Explore
              </span>

              {isExploreActive && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] max-w-[80%] rounded-full bg-[#07852c]" />
              )}
            </Link>

            {/* CENTER ADD PROPERTY BUTTON */}
            <Link
              href={addPropertyLink}
              aria-label="Add or sell property"
              title="Add Property"
              className="
                l2l-bottom-nav-add
                relative z-10 mx-auto
                -mt-[28px]
                flex items-center justify-center
                rounded-full
                border-[4px] border-white
                bg-gradient-to-b
                from-[#07952f] to-[#00651f]
                text-white
                shadow-[0_7px_20px_rgba(0,90,30,0.28)]
                transition-all duration-200
                hover:scale-105
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#07852c]
                focus-visible:ring-offset-2
              "
            >
              <Plus
                className="size-[30px]"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </Link>

            {/* SAVED */}
            <Link
              href="/favorites"
              aria-label="Saved properties"
              aria-current={isSavedActive ? "page" : undefined}
              className={`
                relative flex h-full min-w-0 w-full
                flex-col items-center justify-center
                gap-1 rounded-2xl pt-1
                transition-colors
                ${
                  isSavedActive
                    ? "text-[#086b29]"
                    : "text-[#626970] hover:text-[#086b29]"
                }
              `}
            >
              <Heart
                className={`size-[23px] shrink-0 ${
                  isSavedActive ? "fill-current" : ""
                }`}
                strokeWidth={2}
                aria-hidden="true"
              />

              <span
                className={`text-[11px] leading-none ${
                  isSavedActive ? "font-bold" : "font-medium"
                }`}
              >
                Saved
              </span>

              {isSavedActive && (
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] max-w-[80%] rounded-full bg-[#07852c]" />
              )}
            </Link>

            {/* PROFILE */}
            <Link
              href={profileLink}
              aria-label="Profile"
              aria-current={isProfileActive ? "page" : undefined}
              className={`
                relative flex h-full min-w-0 w-full
                flex-col items-center justify-center
                gap-1 rounded-2xl pt-1
                transition-colors
                ${
                  isProfileActive
                    ? "text-[#086b29]"
                    : "text-[#626970] hover:text-[#086b29]"
                }
              `}
            >
              <User
                className="size-[23px] shrink-0"
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
                <span className="absolute bottom-[-1px] h-[4px] w-[48px] max-w-[80%] rounded-full bg-[#07852c]" />
              )}
            </Link>

          </div>
        </div>
      </nav>
    </>
  )
}
