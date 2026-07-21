import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import AgentLeadsList from "@/components/agent/leads-list"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "Your Leads | Land2Land",
}

export default async function AssociateLeadsPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.user_type !== "associate") {
    redirect("/")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Your Leads</h1>
        <p className="text-muted-foreground mt-2">Manage and track assigned leads</p>
      </div>
      <AgentLeadsList />
    </div>
  )
}
