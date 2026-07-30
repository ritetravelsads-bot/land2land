import { type NextRequest, NextResponse } from "next/server"
import { sendOtp } from "@/lib/otp"

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json()

    if (!phone || typeof phone !== "string") {
      return NextResponse.json({ error: "Phone number is required." }, { status: 400 })
    }

    const result = await sendOtp(phone)

    if (!result.ok) {
      const status = result.cooldownMs ? 429 : 400
      return NextResponse.json(
        { error: result.error, cooldownMs: result.cooldownMs ?? null },
        { status }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Verification code sent.",
      sessionId: result.sessionId,
    })
  } catch (error) {
    console.error("[otp/send] Error:", error)
    return NextResponse.json({ error: "Failed to send verification code." }, { status: 500 })
  }
}
