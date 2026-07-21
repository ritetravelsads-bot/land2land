import type { Metadata } from "next"
import AgentLoginForm from "@/components/forms/agent-login-form"

export const metadata: Metadata = {
  title: "Associate Login | Land2Land",
  description: "Login to your Associate account on Land2Land",
}

export default function AssociateLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f8f0] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">Associate Portal</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Manage leads, properties, and your RERA requests
          </p>
        </div>
        <AgentLoginForm />
      </div>
    </div>
  )
}
