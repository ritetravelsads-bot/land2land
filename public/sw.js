/**
 * Land2Land Service Worker
 *
 * Strategy:
 *   - App shell assets (JS/CSS chunks, fonts, icons): Cache-first, network fallback.
 *   - Page navigations: Network-first with a 4-second timeout, then cache, then /offline.
 *   - API routes (/api/…): Network-only. Never cache dynamic data.
 *   - Images (/_next/image, /icons, /banners): Stale-while-revalidate.
 *
 * This gives the app a meaningful offline experience, which is required by
 * both the Apple App Store (guideline 2.1 – App Completeness) and the Play
 * Store (Core App Quality – offline handling).
 */

const CACHE_VERSION = "v1"
const SHELL_CACHE = `land2land-shell-${CACHE_VERSION}`
const PAGE_CACHE = `land2land-pages-${CACHE_VERSION}`
const IMAGE_CACHE = `land2land-images-${CACHE_VERSION}`

const APP_SHELL_URLS = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
]

// ── Install ──────────────────────────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(APP_SHELL_URLS))
      .then(() => self.skipWaiting())
  )
})

// ── Activate ─────────────────────────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter(
              (k) =>
                k !== SHELL_CACHE && k !== PAGE_CACHE && k !== IMAGE_CACHE
            )
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  )
})

// ── Fetch ─────────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Only intercept same-origin or Next.js image-optimisation requests.
  if (url.origin !== self.location.origin) return

  // API routes — never cache, always network.
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request))
    return
  }

  // Next.js build chunks / static assets — cache-first.
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request, SHELL_CACHE))
    return
  }

  // Images — stale-while-revalidate.
  if (
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/banners/") ||
    /\.(png|jpe?g|webp|gif|svg|ico)$/.test(url.pathname)
  ) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE))
    return
  }

  // HTML navigations — network-first with offline fallback.
  if (request.mode === "navigate") {
    event.respondWith(networkFirstWithOfflineFallback(request))
    return
  }
})

// ── Strategies ────────────────────────────────────────────────────────────────

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request)
  if (cached) return cached
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(cacheName)
    cache.put(request, response.clone())
  }
  return response
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cached = await cache.match(request)
  const networkFetch = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone())
    return response
  })
  return cached || networkFetch
}

async function networkFirstWithOfflineFallback(request) {
  const cache = await caches.open(PAGE_CACHE)
  try {
    // Race the network against a 4-second timeout.
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)
    const response = await fetch(request, { signal: controller.signal })
    clearTimeout(timeoutId)
    if (response.ok) cache.put(request, response.clone())
    return response
  } catch {
    // Try the page cache first.
    const cached = await cache.match(request)
    if (cached) return cached
    // Fall back to the cached shell root, then the offline page.
    const root = await caches.match("/")
    if (root) return root
    return caches.match("/offline")
  }
}
