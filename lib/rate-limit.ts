/**
 * In-memory rate limiter for API routes
 * Uses sliding window algorithm with IP and email-based tracking
 */

interface RateLimitEntry {
  count: number
  windowStart: number
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Cleanup old entries every 5 minutes
    if (typeof window === 'undefined') {
      this.cleanupInterval = setInterval(() => this.cleanup(), 5 * 60 * 1000)
    }
  }

  /**
   * Check if a request should be rate limited
   * @param key Unique identifier (IP + route or email)
   * @param limit Maximum requests allowed
   * @param windowMs Time window in milliseconds
   * @returns { allowed: boolean, remaining: number, retryAfter: number }
   */
  checkLimit(key: string, limit: number, windowMs: number) {
    const now = Date.now()
    const entry = this.limits.get(key)

    // New entry or window expired
    if (!entry || now - entry.windowStart > windowMs) {
      this.limits.set(key, { count: 1, windowStart: now })
      return { allowed: true, remaining: limit - 1, retryAfter: 0 }
    }

    // Within window - increment counter
    const timeRemaining = windowMs - (now - entry.windowStart)
    if (entry.count < limit) {
      entry.count++
      return { allowed: true, remaining: limit - entry.count, retryAfter: 0 }
    }

    // Limit exceeded
    const retryAfterMs = Math.ceil(timeRemaining / 1000)
    return { allowed: false, remaining: 0, retryAfter: retryAfterMs }
  }

  /**
   * Reset rate limit for a specific key
   */
  reset(key: string) {
    this.limits.delete(key)
  }

  /**
   * Clean up expired entries
   */
  private cleanup() {
    const now = Date.now()
    const keysToDelete: string[] = []

    this.limits.forEach((entry, key) => {
      // Delete entries older than 1 hour
      if (now - entry.windowStart > 60 * 60 * 1000) {
        keysToDelete.push(key)
      }
    })

    keysToDelete.forEach(key => this.limits.delete(key))
  }

  /**
   * Destroy the limiter and cleanup
   */
  destroy() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    this.limits.clear()
  }
}

// Global limiter instance
const limiter = new RateLimiter()

/**
 * Get client IP from request
 */
export function getClientIp(request: Request): string {
  // Try common headers in order
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback - try to get from request object (varies by runtime)
  const ip = (request as any).ip || (request as any).socket?.remoteAddress
  return ip || 'unknown'
}

/**
 * Rate limit by IP address
 * @param request Next.js request object
 * @param limit Number of requests allowed
 * @param windowMs Time window in milliseconds
 */
export function rateLimitByIp(request: Request, limit: number, windowMs: number) {
  const ip = getClientIp(request)
  const key = `ip:${ip}`
  return limiter.checkLimit(key, limit, windowMs)
}

/**
 * Rate limit by email address
 * @param email User email
 * @param limit Number of requests allowed
 * @param windowMs Time window in milliseconds
 */
export function rateLimitByEmail(email: string, limit: number, windowMs: number) {
  const key = `email:${email.toLowerCase()}`
  return limiter.checkLimit(key, limit, windowMs)
}

/**
 * Rate limit by IP + email (most restrictive)
 * @param request Next.js request object
 * @param email User email
 * @param limit Number of requests allowed
 * @param windowMs Time window in milliseconds
 */
export function rateLimitByIpAndEmail(request: Request, email: string, limit: number, windowMs: number) {
  const ip = getClientIp(request)
  const key = `combined:${ip}:${email.toLowerCase()}`
  return limiter.checkLimit(key, limit, windowMs)
}

/**
 * Create a rate limit error response
 */
export function createRateLimitResponse(retryAfter: number) {
  const retryAfterSeconds = Math.max(1, retryAfter)
  return new Response(
    JSON.stringify({
      error: 'Too many requests',
      message: 'Please try again later',
      retryAfter: retryAfterSeconds,
    }),
    {
      status: 429,
      headers: {
        'Retry-After': retryAfterSeconds.toString(),
        'X-RateLimit-Remaining': '0',
      },
    }
  )
}
