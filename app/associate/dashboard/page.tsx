import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Associate Dashboard | Land2Land",
}

export default async function AssociateDashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.user_type !== "associate") {
    redirect("/")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Associate Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user.username}!</p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Profile</h3>
            <p className="text-sm text-muted-foreground mb-4">View and update your profile information</p>
            <a href="/associate/profile" className="inline-block text-primary hover:underline text-sm font-medium">
              Go to Profile →
            </a>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Leads</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage assigned leads and inquiries</p>
            <a href="/associate/leads" className="inline-block text-primary hover:underline text-sm font-medium">
              View Leads →
            </a>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Your Properties</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your registered properties</p>
            <a href="/associate/properties" className="inline-block text-primary hover:underline text-sm font-medium">
              View Properties →
            </a>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">RERA Requests</h3>
            <p className="text-sm text-muted-foreground mb-4">Submit and track RERA registration requests</p>
            <a href="/associate/rera" className="inline-block text-primary hover:underline text-sm font-medium">
              Manage RERA →
            </a>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-2">Support Tickets</h3>
            <p className="text-sm text-muted-foreground mb-4">Submit and track support tickets</p>
            <a href="/associate/tickets" className="inline-block text-primary hover:underline text-sm font-medium">
              View Tickets →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
