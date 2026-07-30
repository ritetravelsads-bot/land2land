import crypto from "crypto"

/**
 * OTP-based phone verification powered by 2factor.in — delivered as a VOICE CALL.
 *
 * The user receives an automated phone call that reads out a 6-digit code.
 * We generate the 6-digit code ourselves and pass it to 2factor.in, which
 * places the call and returns a SessionId used to verify the user's input.
 *
 * Send  : GET https://2factor.in/API/V1/{apikey}/VOICE/{phone}/{otp}
 * Verify: GET https://2factor.in/API/V1/{apikey}/VOICE/VERIFY/{sessionId}/{otp}
 *
 * No MongoDB needed — session state lives on 2factor.in's side.
 */

const TWOFACTOR_API_KEY = "efda3ceb-8be6-11f1-908b-0200cd936042"
const TWOFACTOR_BASE    = "https://2factor.in/API/V1"

const TOKEN_TTL_MS       = 30 * 60 * 1000  // verified token valid 30 minutes
const RESEND_COOLDOWN_MS = 60 * 1000        // 60 s between sends (client-enforced)

function getSecret(): string {
  return (
    process.env.OTP_SECRET   ||
    process.env.OTP_SECRET_2 ||
    process.env.SMTP_PASS    ||
    "land2land-fallback-otp-secret-change-me"
  )
}

// ---------------------------------------------------------------------------
// Phone helpers
// ---------------------------------------------------------------------------

export function normalizePhone(phone: string): string {
  let digits = (phone || "").replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith("0"))  digits = digits.slice(1)
  return digits
}

export function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhone(phone))
}

// ---------------------------------------------------------------------------
// Signed verification token  (issued after OTP is confirmed with 2factor.in)
// Format: base64url(phone.expiry).hmac
// ---------------------------------------------------------------------------

export function createVerificationToken(phone: string): string {
  const normalized = normalizePhone(phone)
  const expiry     = Date.now() + TOKEN_TTL_MS
  const payload    = `${normalized}.${expiry}`
  const sig        = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
  const encoded    = Buffer.from(payload).toString("base64url")
  return `${encoded}.${sig}`
}

export function verifyVerificationToken(token: string, phone: string): boolean {
  if (!token || typeof token !== "string") return false
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [encoded, sig] = parts

  let payload: string
  try { payload = Buffer.from(encoded, "base64url").toString("utf8") }
  catch { return false }

  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
  const sigBuf   = Buffer.from(sig)
  const expBuf   = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return false

  const dotIdx   = payload.lastIndexOf(".")
  const tokenPhone = payload.slice(0, dotIdx)
  const expiry     = Number(payload.slice(dotIdx + 1))
  if (!expiry || Date.now() > expiry) return false
  return tokenPhone === normalizePhone(phone)
}

// ---------------------------------------------------------------------------
// 2factor.in — send OTP
// ---------------------------------------------------------------------------

export interface SendOtpResult {
  ok: boolean
  error?: string
  cooldownMs?: number
  sessionId?: string   // returned to client so it can verify later
  /** Only populated in dev mode (no API key). */
  devCode?: string
}

export async function sendOtp(rawPhone: string): Promise<SendOtpResult> {
  const phone = normalizePhone(rawPhone)

  if (!isValidIndianMobile(phone)) {
    return { ok: false, error: "Please enter a valid 10-digit Indian mobile number." }
  }

  // Generate our own 6-digit code so it always matches the 6-slot input field.
  const code = String(crypto.randomInt(100000, 1000000))

  // VOICE endpoint places an automated phone call that reads out the code.
  const url = `${TWOFACTOR_BASE}/${TWOFACTOR_API_KEY}/VOICE/${phone}/${code}`

  let data: { Status: string; Details: string }
  try {
    const res = await fetch(url, { cache: "no-store" })
    data = await res.json()
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error"
    console.error("[otp] 2factor.in voice call error:", msg)
    return { ok: false, error: "Could not place the verification call. Please try again." }
  }

  if (data?.Status !== "Success") {
    console.error("[otp] 2factor.in voice call failed:", data?.Details)
    return { ok: false, error: data?.Details || "Failed to place the verification call." }
  }

  // data.Details is the SessionId
  return { ok: true, sessionId: data.Details }
}

// ---------------------------------------------------------------------------
// 2factor.in — verify OTP
// ---------------------------------------------------------------------------

export interface VerifyOtpResult {
  ok: boolean
  error?: string
  token?: string
}

export async function verifyOtp(
  rawPhone: string,
  rawCode: string,
  sessionId: string
): Promise<VerifyOtpResult> {
  const phone = normalizePhone(rawPhone)
  const code  = (rawCode || "").replace(/\D/g, "")

  if (!isValidIndianMobile(phone)) {
    return { ok: false, error: "Invalid phone number." }
  }
  if (code.length !== 6) {
    return { ok: false, error: "Enter the 6-digit code." }
  }
  if (!sessionId || typeof sessionId !== "string") {
    return { ok: false, error: "Session expired. Please request a new code." }
  }

  const url = `${TWOFACTOR_BASE}/${TWOFACTOR_API_KEY}/VOICE/VERIFY/${sessionId}/${code}`

  let data: { Status: string; Details: string }
  try {
    const res = await fetch(url, { cache: "no-store" })
    data = await res.json()
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error"
    console.error("[otp] 2factor.in verify error:", msg)
    return { ok: false, error: "Could not verify the code. Please try again." }
  }

  if (data?.Status !== "Success") {
    const reason = data?.Details || "Incorrect code."
    // 2factor returns "OTP Mismatch" for wrong codes
    const friendly = reason.toLowerCase().includes("mismatch")
      ? "Incorrect code. Please try again."
      : reason
    return { ok: false, error: friendly }
  }

  return { ok: true, token: createVerificationToken(phone) }
}
