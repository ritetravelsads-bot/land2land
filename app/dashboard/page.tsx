import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  if (user.user_type === "admin") {
    redirect("/admin/dashboard")
  }

  if (user.user_type === "associate") {
    redirect("/associate/dashboard")
  }

  // customer / quick-registered buyers
  redirect("/buyer")
}
