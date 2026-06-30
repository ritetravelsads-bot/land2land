"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogOut, User, ChevronDown, Map, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import HeaderSearch from "./header-search"
import { LAND_TYPE_LIST } from "@/lib/land-types-content"

interface CurrentUser {
  id: string
  email: string
  username: string
  user_type: "customer" | "agent" | "admin"
}

const landTypes = LAND_TYPE_LIST.map((t) => ({ name: t.label, href: `/land/${t.slug}` }))

export default function MegaMenuHeader() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)


  useEffect(() => {
    setMounted(true)

    // Defer auth check to not block initial render
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/me", { 
          credentials: "include",
          // IMPORTANT: Never cache auth responses - each user must get their own session
          cache: "no-store",
        })
        if (response.ok) {
          const data = await response.json()
          // API returns user: null for unauthenticated users
          if (data.user) {
            setCurrentUser(data.user)
          }
        }
      } catch {
        // Network error - user not logged in
      }
    }

    // Use requestIdleCallback to not block main thread
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(checkAuth)
    } else {
      setTimeout(checkAuth, 100)
    }
  }, [])



  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" })
    setCurrentUser(null)
    window.location.href = "/"
  }

  const getDashboardLink = () => {
    if (!currentUser) return "/dashboard"
    if (currentUser.user_type === "agent") return "/builder/dashboard"
    if (currentUser.user_type === "admin") return "/admin/dashboard"
    return "/buyer"
  }

  const getDashboardLabel = () => {
    if (!currentUser) return "My Dashboard"
    if (currentUser.user_type === "agent") return "Seller Dashboard"
    if (currentUser.user_type === "admin") return "Admin Dashboard"
    return "Buyer Dashboard"
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <nav className="flex items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Land2Land Logo"
              width={200}
              height={50}
              priority
              fetchPriority="high"
              className="h-10 w-auto md:h-12"
              style={{ width: "auto", height: "auto", maxHeight: "48px" }}
            />
          </Link>

          {/* Desktop Mega Menu Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors"
            >
              Home
            </Link>

            <Link
              href="/buy"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors"
            >
              Buy
            </Link>

            <Link
              href="/sell"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors"
            >
              Sell
            </Link>

            <Link
              href="/find-agent"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors"
            >
              Find Agent
            </Link>

            {/* Land Types Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors flex items-center gap-1">
                  <Map className="h-4 w-4" />
                  Land Types
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {landTypes.map((type) => (
                  <DropdownMenuItem key={type.name} asChild>
                    <Link href={type.href} className="w-full">
                      {type.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/investments"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] transition-colors flex items-center gap-1"
            >
              <TrendingUp className="h-4 w-4" />
              Investments
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:block relative">
            <HeaderSearch />
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-2">
            {mounted ? (
              currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-sm h-9 border-[#2d5016] text-[#2d5016] bg-transparent"
                    >
                      <User size={16} className="mr-2" />
                      {currentUser.username}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={getDashboardLink()}>{getDashboardLabel()}</Link>
                    </DropdownMenuItem>
                    {currentUser.user_type === "admin" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin/dashboard">Admin Settings</Link>
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-sm h-9 border-[#2d5016] text-[#2d5016] bg-transparent hover:bg-[#2d5016]/5"
                  >
                    <Link href="/auth/login">List Land</Link>
                  </Button>
                  <Button asChild size="sm" className="text-sm h-9 bg-[#2d5016] hover:bg-[#1d3610]">
                    <Link href="/auth/register">Sign Up</Link>
                  </Button>
                </>
              )
            ) : null}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#2d5016] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white fixed top-16 left-0 right-0 bottom-0 z-40 overflow-y-auto">
          <div className="flex flex-col gap-1 px-4 py-3">
            {/* Mobile Search Bar */}
            <div className="mb-3">
              <HeaderSearch />
            </div>

            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] hover:bg-gray-50 rounded transition-colors"
            >
              Home
            </Link>

            <Link
              href="/buy"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] hover:bg-gray-50 rounded transition-colors"
            >
              Buy
            </Link>

            <Link
              href="/sell"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] hover:bg-gray-50 rounded transition-colors"
            >
              Sell
            </Link>

            <Link
              href="/find-agent"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] hover:bg-gray-50 rounded transition-colors"
            >
              Find Agent
            </Link>

            <div className="border-t border-gray-100 my-2" />
            <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase">Land Types</p>
            {landTypes.map((type) => (
              <Link
                key={type.name}
                href={type.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-[#2d5016] hover:bg-gray-50 rounded transition-colors"
              >
                {type.name}
              </Link>
            ))}

            <Link
              href="/investments"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#2d5016] hover:bg-gray-50 rounded transition-colors"
            >
              Investments
            </Link>

            <div className="border-t border-gray-100 my-2" />
            {mounted && (
              <div className="flex gap-2 mt-3">
                {currentUser ? (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs h-9 flex-1 border-[#2d5016] text-[#2d5016] bg-transparent"
                    >
                      <Link href={getDashboardLink()}>{getDashboardLabel()}</Link>
                    </Button>
                    <Button
                      onClick={handleLogout}
                      size="sm"
                      className="text-xs h-9 flex-1 bg-[#2d5016] hover:bg-[#1d3610]"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs h-9 flex-1 border-[#2d5016] text-[#2d5016] bg-transparent"
                    >
                      <Link href="/auth/login">List Land</Link>
                    </Button>
                    <Button asChild size="sm" className="text-xs h-9 flex-1 bg-[#2d5016] hover:bg-[#1d3610]">
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
