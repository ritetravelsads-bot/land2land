import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import AssociateLeadsList from "@/components/associate/leads-list"

export const metadata: Metadata = {
  title: "My Leads | Associate Dashboard",
  description: "View and manage your property leads",
}

export default async function AssociateLeadsPage() {
  const user = await getCurrentUser()
  
  if (!user || (user.user_type !== "associate" && user.user_type !== "admin")) {
    redirect("/auth/login")
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Leads</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage leads assigned to you and enquiries from your properties
          </p>
        </div>

        <AssociateLeadsList />
      </div>
    </div>
  )
}
