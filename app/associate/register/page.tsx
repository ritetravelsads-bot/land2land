import type { Metadata } from "next"
import AgentRegisterForm from "@/components/forms/agent-register-form"

export const metadata: Metadata = {
  title: "Associate Registration | Land2Land",
  description: "Register as a land associate on Land2Land",
}

export default function AssociateRegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f8f0] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Become a Land Associate</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Join our network and start managing leads and properties
          </p>
        </div>
        <AgentRegisterForm />
      </div>
    </div>
  )
}
