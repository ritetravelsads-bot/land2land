import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/auth"
import AdminBuyerMessagesClient from "@/components/admin/buyer-messages-client"

export const metadata: Metadata = {
  title: "Buyer Messages | Land2Land Admin",
  description: "View and reply to buyer messages",
}

export default async function AdminMessagesPage() {
  try {
    await requireAdmin()
  } catch {
    redirect("/auth/login")
  }

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Buyer Messages</h1>
          <p className="text-sm text-muted-foreground">
            View and reply to messages sent by buyers through the portal.
          </p>
        </div>
        <AdminBuyerMessagesClient />
      </div>
    </div>
  )
}
