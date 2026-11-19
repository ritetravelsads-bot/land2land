import crypto from "crypto"

// Format: base64url(JSON payload).hmacSha256
// Prefer a dedicated server-side secret; the MongoDB URI remains a private fallback for existing deployments.
function getSecret(): string {
  const secret = process.env.AUTH_SECRET || process.env.MONGODB_URI
  if (!secret) throw new Error("AUTH_SECRET is not configured")
  return secret
}

type SessionPayload = { userId: string; email?: string | null; exp: number }

const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60

export function createSessionToken(payload: { userId: unknown; email?: string | null }): string {
  const body: SessionPayload = {
    userId: String(payload.userId),
    email: payload.email ?? null,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
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
    if (typeof payload?.userId !== "string" || !Number.isFinite(payload?.exp) || payload.exp <= Date.now() / 1000) return null
    return payload as SessionPayload
  } catch {
    return null
  }
}
