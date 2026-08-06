import { generateCsrfToken, setCsrfCookie } from "@/lib/csrf"
import { NextResponse } from "next/server"

/**
 * GET /api/csrf-token
 * Returns a new CSRF token and sets it in an HTTP-only cookie
 * This endpoint should be called before performing any state-changing operations
 */
export async function GET() {
  try {
    // Generate a new token
    const token = generateCsrfToken()

    // Set it in the cookie
    await setCsrfCookie(token)

    // Return the token to the client so it can be sent in the request header
    return NextResponse.json(
      { token },
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error("Error generating CSRF token:", error)
    return NextResponse.json(
      { error: "Failed to generate CSRF token" },
      { status: 500 }
    )
  }
}
