import crypto from "crypto"
import { cookies } from "next/headers"

const CSRF_TOKEN_LENGTH = 32
const CSRF_COOKIE_NAME = "__Host-csrf-token"
const CSRF_HEADER_NAME = "x-csrf-token"

/**
 * Generate a secure CSRF token using crypto
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString("hex")
}

/**
 * Set CSRF token in HTTP-only, secure cookie
 */
export async function setCsrfCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  })
}

/**
 * Get CSRF token from cookie
 */
export async function getCsrfCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(CSRF_COOKIE_NAME)
  return token?.value ?? null
}

/**
 * Validate CSRF token from request header against cookie
 * Returns true if valid, false otherwise
 */
export async function validateCsrfToken(tokenFromHeader: string | null): Promise<boolean> {
  if (!tokenFromHeader) {
    return false
  }

  const cookieToken = await getCsrfCookie()
  if (!cookieToken) {
    return false
  }

  // Use constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(tokenFromHeader),
    Buffer.from(cookieToken)
  )
}

/**
 * Middleware-style CSRF validation for API routes
 * Throws error if token is invalid
 */
export async function requireValidCsrfToken(
  request: Request
): Promise<void> {
  const token = request.headers.get(CSRF_HEADER_NAME)
  const isValid = await validateCsrfToken(token)

  if (!isValid) {
    throw new Error("CSRF token validation failed")
  }
}
