import type { Metadata } from "next"
import AgentManagementPage from "@/components/admin/agent-management-page"

export const metadata: Metadata = {
  title: "Agent Management | Land2Land Admin",
  description: "Review agent accounts, subscriptions, listings, and publishing quota.",
}

export default function AdminAgentsPage() {
  return <AgentManagementPage />
}
