"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Heart,
  Plus,
  User,
  LayoutDashboard,
  List,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react"

type UserRole = "admin" | "associate" | "builder" | "buyer" | "customer"

interface DashboardBottomNavProps {
  userRole: UserRole
}

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  /** If true, this slot uses the FAB (center action button) style */
  isFab?: boolean
}

function getNavItems(userRole: UserRole): NavItem[] {
  switch (userRole) {
    case "buyer":
    case "customer":
      return [
        { label: "Home", href: "/buyer", icon: Home },
        { label: "Favorites", href: "/buyer/favorites", icon: Heart },
        { label: "Browse", href: "/properties", icon: Plus, isFab: true },
        { label: "Messages", href: "/buyer/messages", icon: MessageSquare },
        { label: "Profile", href: "/buyer/profile", icon: User },
      ]

    case "associate":
      return [
        { label: "Dashboard", href: "/associate/dashboard", icon: LayoutDashboard },
        { label: "Listings", href: "/associate/properties", icon: List },
        { label: "Add", href: "/associate/properties/new", icon: Plus, isFab: true },
        { label: "Leads", href: "/associate/leads", icon: Users },
        { label: "Profile", href: "/associate/profile", icon: User },
      ]

    case "builder":
      return [
        { label: "Dashboard", href: "/builder", icon: LayoutDashboard },
        { label: "Listings", href: "/builder/properties", icon: List },
        { label: "Add", href: "/builder/properties/new", icon: Plus, isFab: true },
        { label: "Leads", href: "/builder/leads", icon: Users },
        { label: "Profile", href: "/builder/profile", icon: User },
      ]

    case "admin":
      return [
        { label: "Dashboard", href: "/admin/dashboard", icon: BarChart3 },
        { label: "Properties", href: "/admin/properties", icon: List },
        { label: "Add", href: "/admin/properties/new", icon: Plus, isFab: true },
        { label: "Users", href: "/admin/users", icon: Users },
        { label: "Settings", href: "/admin/seo", icon: Settings },
      ]

    default:
      return []
  }
}

export default function DashboardBottomNav({ userRole }: DashboardBottomNavProps) {
  const pathname = usePathname()
  const navItems = getNavItems(userRole)

  if (!navItems.length) return null

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"))

  return (
    <>
      {/* Safe-area-aware spacer so content does not hide behind the nav */}
      <div
        className="md:hidden"
        style={{ height: "calc(4.5rem + env(safe-area-inset-bottom, 0px))" }}
        aria-hidden="true"
      />

      <nav
        aria-label="Dashboard navigation"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card border-t border-border"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="flex items-center justify-around px-1 pt-1.5 pb-1 relative">
          {navItems.map((item) => {
            const active = isActive(item.href)
            const Icon = item.icon

            if (item.isFab) {
              return (
                <div key={item.href} className="flex-1 flex items-center justify-center relative">
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className="fab"
                  >
                    <Icon size={24} />
                  </Link>
                </div>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={`bottom-nav-item${active ? " active" : ""}`}
              >
                <Icon size={22} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
