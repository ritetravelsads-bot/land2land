import type { Metadata } from "next"
import SubscriptionPlanManagementPage from "@/components/admin/subscription-plan-management-page"

export const metadata: Metadata = {
  title: "Subscription Plans | Land2Land Admin",
  description: "Configure agent publishing plans, pricing, validity, and benefits.",
}

export default function AdminSubscriptionPlansPage() {
  return <SubscriptionPlanManagementPage />
}
