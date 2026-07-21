import type { Metadata } from "next"
import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"
export const revalidate = 0

export const metadata: Metadata = {
  title: "RERA Requests | Land2Land",
}

export default async function AssociateReraPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.user_type !== "associate") {
    redirect("/")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">RERA Requests</h1>
          <p className="text-muted-foreground mt-2">Manage your RERA registration requests</p>
        </div>
        <Link href="/associate/rera/new">
          <Button>New RERA Request</Button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <p className="text-muted-foreground">No RERA requests found. Submit your first request to get started.</p>
      </div>
    </div>
  )
}
