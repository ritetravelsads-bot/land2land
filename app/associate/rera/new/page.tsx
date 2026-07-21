import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "New RERA Request | Land2Land",
}

export default async function NewReraPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.user_type !== "associate") {
    redirect("/")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Submit New RERA Request</h1>
      <div className="bg-card border border-border rounded-lg p-8">
        <p className="text-muted-foreground">RERA request form coming soon...</p>
      </div>
    </div>
  )
}
