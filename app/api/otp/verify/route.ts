import { type NextRequest, NextResponse } from "next/server"
import { verifyOtp } from "@/lib/otp"

export async function POST(req: NextRequest) {  const user = await requireAuthWithCsrf(request)

  try {
    const { phone, code, sessionId }} = await req.json()

    if (!phone || !code || !sessionId) {
      return NextResponse.json(
        { error: "Phone, code and sessionId are required." },
        { status: 400 }
      )
    }

    const result = await verifyOtp(phone, code, sessionId)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      verified: true,
      token: result.token,
    })
  } catch (error) {
    console.error("[otp/verify] Error:", error)
    return NextResponse.json({ error: "Failed to verify code." }, { status: 500 })
  }
}
