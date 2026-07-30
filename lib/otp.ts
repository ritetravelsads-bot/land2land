import crypto from "crypto"
import { getDatabase } from "@/lib/mongodb"

/**
 * OTP-based phone verification using the Fast2SMS "Quick SMS" route.
 *
 * The Quick SMS route (route=q) does NOT require DLT registration, so it works
 * for accounts that only have a Fast2SMS API key. Docs: https://docs.fast2sms.com
 *
 * If FAST2SMS_API_KEY is not configured, the module runs in "dev mode":
 * the generated code is returned from sendOtp() so it can be surfaced to the
 * developer for local testing (never do this in production with real keys).
 */

const OTP_COLLECTION = "otp_verifications"
const OTP_TTL_MS = 10 * 60 * 1000 // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000 // 60 seconds between sends
const MAX_VERIFY_ATTEMPTS = 5
const MAX_SENDS_PER_WINDOW = 5
const SEND_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const TOKEN_TTL_MS = 30 * 60 * 1000 // verified token valid for 30 minutes

const FAST2SMS_ENDPOINT = "https://www.fast2sms.com/dev/bulkV2"

function getSecret(): string {
  return (
    process.env.OTP_SECRET ||
    process.env.OTP_SECRET_2 ||
    process.env.SMTP_PASS ||
    "land2land-fallback-otp-secret-change-me"
  )
}

function getFast2SmsKey(): string | undefined {
  return process.env.FAST2SMS_API_KEY || process.env.FAST2SMS_API_KEY_2
}

export function normalizePhone(phone: string): string {
  // Strip everything except digits and drop a leading 91 country code / 0
  let digits = (phone || "").replace(/\D/g, "")
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1)
  return digits
}

export function isValidIndianMobile(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizePhone(phone))
}

function hashCode(phone: string, code: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(`${phone}:${code}`)
    .digest("hex")
}

/**
 * Create a signed, self-contained verification token.
 * Format: base64(phone.expiryMs).hmac  — no DB lookup needed to verify.
 */
export function createVerificationToken(phone: string): string {
  const normalized = normalizePhone(phone)
  const expiry = Date.now() + TOKEN_TTL_MS
  const payload = `${normalized}.${expiry}`
  const sig = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
  const encoded = Buffer.from(payload).toString("base64url")
  return `${encoded}.${sig}`
}

/**
 * Verify a token issued by createVerificationToken() and confirm it matches
 * the phone number the caller is claiming to have verified.
 */
export function verifyVerificationToken(token: string, phone: string): boolean {
  if (!token || typeof token !== "string") return false
  const parts = token.split(".")
  if (parts.length !== 2) return false
  const [encoded, sig] = parts

  let payload: string
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8")
  } catch {
    return false
  }

  const expected = crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
  // Constant-time comparison
  const sigBuf = Buffer.from(sig)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return false
  }

  const [tokenPhone, expiryStr] = payload.split(".")
  const expiry = Number(expiryStr)
  if (!expiry || Date.now() > expiry) return false
  return tokenPhone === normalizePhone(phone)
}

function generateCode(): string {
  // 6-digit numeric, no leading-zero issues (100000-999999)
  return String(crypto.randomInt(100000, 1000000))
}

async function sendViaFast2SMS(phone: string, code: string): Promise<void> {
  const apiKey = getFast2SmsKey()
  const message = `${code} is your Land2Land verification code. Valid for 10 minutes. Do not share.`

  // POST with JSON body — more reliable than GET with query params for long messages
  const res = await fetch(FAST2SMS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: apiKey as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: "q",
      message,
      numbers: phone,
    }),
    cache: "no-store",
  })

  let data: Record<string, unknown> = {}
  try {
    data = await res.json()
  } catch {
    // non-JSON body means a network-level failure
    throw new Error(`Fast2SMS request failed with HTTP ${res.status}`)
  }

  // Fast2SMS returns HTTP 200 even for errors — check return flag and status_code
  const failed = !res.ok || data?.return === false || (data?.status_code && data.status_code !== 200)
  if (failed) {
    const reason = data?.message ?? `HTTP ${res.status}`
    const msg = Array.isArray(reason) ? (reason as string[]).join(", ") : String(reason)
    throw new Error(msg)
  }
}

export interface SendOtpResult {
  ok: boolean
  error?: string
  cooldownMs?: number
  /** Only populated in dev mode when no SMS provider is configured. */
  devCode?: string
}

export async function sendOtp(rawPhone: string): Promise<SendOtpResult> {
  const phone = normalizePhone(rawPhone)
  if (!isValidIndianMobile(phone)) {
    return { ok: false, error: "Please enter a valid 10-digit mobile number." }
  }

  const db = await getDatabase()
  const col = db.collection(OTP_COLLECTION)
  const now = Date.now()

  const existing = await col.findOne({ phone })

  // Resend cooldown
  if (existing?.last_sent_at) {
    const elapsed = now - new Date(existing.last_sent_at).getTime()
    if (elapsed < RESEND_COOLDOWN_MS) {
      return {
        ok: false,
        error: "Please wait before requesting another code.",
        cooldownMs: RESEND_COOLDOWN_MS - elapsed,
      }
    }
  }

  // Hourly send throttle
  if (existing?.window_start && existing?.sends_in_window != null) {
    const windowElapsed = now - new Date(existing.window_start).getTime()
    if (windowElapsed < SEND_WINDOW_MS && existing.sends_in_window >= MAX_SENDS_PER_WINDOW) {
      return { ok: false, error: "Too many attempts. Please try again later." }
    }
  }

  const code = generateCode()
  const codeHash = hashCode(phone, code)
  const expiresAt = new Date(now + OTP_TTL_MS)

  const windowExpired =
    !existing?.window_start ||
    now - new Date(existing.window_start).getTime() >= SEND_WINDOW_MS

  await col.updateOne(
    { phone },
    {
      $set: {
        phone,
        code_hash: codeHash,
        expires_at: expiresAt,
        attempts: 0,
        verified: false,
        last_sent_at: new Date(now),
        window_start: windowExpired ? new Date(now) : existing!.window_start,
      },
      $inc: { sends_in_window: windowExpired ? -(existing?.sends_in_window || 0) + 1 : 1 },
    },
    { upsert: true }
  )

  const apiKey = getFast2SmsKey()
  if (!apiKey) {
    // Dev mode: no provider configured. Surface the code for local testing.
    console.log(`[v0][otp] DEV MODE - code for ${phone}: ${code}`)
    return { ok: true, devCode: code }
  }

  try {
    await sendViaFast2SMS(phone, code)
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not send the code right now."
    console.error("[otp] Fast2SMS error:", message)
    return { ok: false, error: message }
  }
}

export interface VerifyOtpResult {
  ok: boolean
  error?: string
  token?: string
}

export async function verifyOtp(rawPhone: string, rawCode: string): Promise<VerifyOtpResult> {
  const phone = normalizePhone(rawPhone)
  const code = (rawCode || "").replace(/\D/g, "")

  if (!isValidIndianMobile(phone)) {
    return { ok: false, error: "Invalid phone number." }
  }
  if (code.length !== 6) {
    return { ok: false, error: "Enter the 6-digit code." }
  }

  const db = await getDatabase()
  const col = db.collection(OTP_COLLECTION)
  const record = await col.findOne({ phone })

  if (!record) {
    return { ok: false, error: "Please request a code first." }
  }
  if (record.verified) {
    // Already verified — reissue a token
    return { ok: true, token: createVerificationToken(phone) }
  }
  if (!record.expires_at || Date.now() > new Date(record.expires_at).getTime()) {
    return { ok: false, error: "Code expired. Please request a new one." }
  }
  if ((record.attempts || 0) >= MAX_VERIFY_ATTEMPTS) {
    return { ok: false, error: "Too many incorrect attempts. Please request a new code." }
  }

  const candidate = hashCode(phone, code)
  const match =
    candidate.length === record.code_hash?.length &&
    crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(record.code_hash))

  if (!match) {
    await col.updateOne({ phone }, { $inc: { attempts: 1 } })
    return { ok: false, error: "Incorrect code. Please try again." }
  }

  await col.updateOne(
    { phone },
    { $set: { verified: true, verified_at: new Date() } }
  )

  return { ok: true, token: createVerificationToken(phone) }
}
