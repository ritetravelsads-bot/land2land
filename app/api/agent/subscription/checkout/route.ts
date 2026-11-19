import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function POST() {
  const user = await getCurrentUser()
  if (!user || user.user_type !== "associate") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // No payment provider is configured in this project. Never create a paid
  // entitlement or mark a plan active until a provider callback is verified.
  return NextResponse.json(
    {
      code: "PAYMENT_PROVIDER_NOT_CONFIGURED",
      error: "Online plan purchases are not available yet. Contact the administrator for a manual plan assignment.",
    },
    { status: 503 },
  )
}
