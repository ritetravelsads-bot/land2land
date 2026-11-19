import type { Metadata } from "next"
import AgentDetailPage from "@/components/admin/agent-detail-page"

export const metadata: Metadata = {
  title: "Agent Details | Land2Land Admin",
  description: "Manage an agent account, subscription, credits, and activity.",
}

export default async function AdminAgentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <AgentDetailPage agentId={id} />
}
