import { getImageKitAuthenticationParameters } from "@/lib/imagekit"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    if (!process.env.IMAGEKIT_PRIVATE_KEY) {
      return NextResponse.json(
        { error: "ImageKit is not configured. Please set IMAGEKIT_PRIVATE_KEY." },
        { status: 500 }
      )
    }
    const result = getImageKitAuthenticationParameters()
    return NextResponse.json(result)
  } catch (error) {
    console.error("[imagekit-auth] Error:", error)
    return NextResponse.json(
      { error: "Failed to get ImageKit authentication parameters" },
      { status: 500 }
    )
  }
}
