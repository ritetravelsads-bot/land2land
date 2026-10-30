import crypto from "crypto"

// Format: base64url(JSON payload).hmacSha256
// Falls back to MONGODB_URI (server-only, always set) so login keeps working
// until a dedicated AUTH_SECRET is added; set AUTH_SECRET in production.
function getSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.MONGODB_URI
  if (!secret) throw new Error("AUTH_SECRET is not configured")
  return secret
}

type SessionPayload = { userId: string; email?: string | null }

export function createSessionToken(payload: { userId: unknown; email?: string | null }): string {
  const body: SessionPayload = { userId: String(payload.userId), email: payload.email ?? null }
  const encoded = Buffer.from(JSON.stringify(body)).toString("base64url")
  const sig = crypto.createHmac("sha256", getSecret()).update(encoded).digest("base64url")
  return `${encoded}.${sig}`
}

export function verifySessionToken(token: string | undefined | null): SessionPayload | null {
  if (!token || typeof token !== "string") return null
  const [encoded, sig, extra] = token.split(".")
  if (!encoded || !sig || extra !== undefined) return null

  const expected = crypto.createHmac("sha256", getSecret()).update(encoded).digest("base64url")
  const sigBuf = Buffer.from(sig)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"))
    return typeof payload?.userId === "string" ? payload : null
  } catch {
    return null
  }
}
