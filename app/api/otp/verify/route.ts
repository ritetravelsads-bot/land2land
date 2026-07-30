import { type NextRequest, NextResponse } from "next/server"
import { verifyOtp } from "@/lib/otp"

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json()

    if (!phone || !code) {
      return NextResponse.json({ error: "Phone and code are required." }, { status: 400 })
    }

    const result = await verifyOtp(phone, code)

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      verified: true,
      token: result.token,
    })
  } catch (error) {
    console.error("[v0][otp/verify] Error:", error)
    return NextResponse.json({ error: "Failed to verify code." }, { status: 500 })
  }
}
