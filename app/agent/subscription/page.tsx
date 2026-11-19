import type { Metadata } from "next"
import AgentSubscriptionPage from "@/components/associate/agent-subscription-page"

export const metadata: Metadata = {
  title: "My Plan | Land2Land",
  description: "View your publishing allowance, subscription, and credit history.",
}

export default function AgentSubscriptionAliasPage() {
  return <AgentSubscriptionPage />
}
