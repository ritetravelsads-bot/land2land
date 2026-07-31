/**
 * Blog SEO Auto-Link
 *
 * Scans a published blog post's HTML and injects internal links to matching
 * property listings. Matching is done against property_name, city, state, and
 * property_type keywords that appear as whole words in the post body.
 *
 * Rules:
 *  - Max 5 property links per post (avoids over-optimisation penalties)
 *  - Each property is linked at most once (first occurrence)
 *  - Never links inside an existing <a>, <h1-h6>, or <script>/<style> tag
 *  - Links open on the same tab (internal navigation)
 */

import { MongoClient } from "mongodb"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PropertyCandidate {
  slug: string
  property_name: string
  property_type: string
  city?: string
  state?: string
}

export interface AutoLinkResult {
  html: string
  linkedCount: number
  linkedProperties: { name: string; slug: string; url: string }[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PROPERTY_TYPE_MAP: Record<string, string[]> = {
  residential: ["apartment", "villa", "house", "flat", "penthouse", "duplex", "studio", "independent", "row house", "bungalow", "farmhouse"],
  commercial: ["office", "shop", "commercial", "showroom", "warehouse", "retail", "sco", "scf", "multiplex"],
  plots: ["plot", "land", "agricultural", "industrial land"],
}

function getPropertyTypeSlug(propertyType: string): string {
  if (!propertyType) return "residential"
  const lowerType = propertyType.toLowerCase()
  for (const [slug, types] of Object.entries(PROPERTY_TYPE_MAP)) {
    if (types.some((t) => lowerType.includes(t))) return slug
  }
  return "residential"
}

function buildPropertyUrl(p: PropertyCandidate): string {
  const typeSlug = getPropertyTypeSlug(p.property_type)
  const propSlug = p.slug || ""
  return `/properties/${typeSlug}/${propSlug}`
}

/**
 * Build a sorted list of candidate phrases for a property.
 * Longer phrases are tried first so "Sector 62 Noida" matches before "Noida".
 */
function buildPhrases(p: PropertyCandidate): string[] {
  const raw = [
    p.property_name,
    p.city,
    p.state,
  ].filter((v): v is string => typeof v === "string" && v.trim().length > 2)

  // Deduplicate, sort longest first
  return Array.from(new Set(raw)).sort((a, b) => b.length - a.length)
}

/**
 * Returns true if the character at `index` inside `html` sits inside a tag
 * that must not receive auto-links: <a …>, <h1-h6 …>, <script …>, <style …>.
 *
 * We do this with a simple linear scan from the start — adequate for blog-post
 * sized HTML (a few tens of KB max).
 */
function isInsideProtectedTag(html: string, index: number): boolean {
  // Walk backwards to find the enclosing open tag
  const OPEN_TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)/g
  const tagStack: string[] = []
  let m: RegExpExecArray | null

  OPEN_TAG_RE.lastIndex = 0
  while ((m = OPEN_TAG_RE.exec(html)) !== null) {
    if (m.index >= index) break
    const isClose = m[1] === "/"
    const name = m[2].toLowerCase()
    if (isClose) {
      // pop matching tag
      const idx = tagStack.lastIndexOf(name)
      if (idx !== -1) tagStack.splice(idx, 1)
    } else {
      // self-closing tags don't push
      tagStack.push(name)
    }
  }

  return tagStack.some((t) => /^(a|h[1-6]|script|style)$/.test(t))
}

// ─── Core function ────────────────────────────────────────────────────────────

/**
 * Inject internal property links into a blog post's HTML.
 *
 * @param html     - Raw HTML content of the blog post
 * @param listings - Property candidates fetched from MongoDB
 * @param maxLinks - Maximum number of property links to inject (default 5)
 */
export function injectPropertyLinks(
  html: string,
  listings: PropertyCandidate[],
  maxLinks = 5,
): AutoLinkResult {
  if (!html || listings.length === 0) {
    return { html, linkedCount: 0, linkedProperties: [] }
  }

  let result = html
  let linkedCount = 0
  const linkedProperties: { name: string; slug: string; url: string }[] = []

  for (const listing of listings) {
    if (linkedCount >= maxLinks) break

    const url = buildPropertyUrl(listing)
    const phrases = buildPhrases(listing)

    let injected = false

    for (const phrase of phrases) {
      if (injected || linkedCount >= maxLinks) break

      // Whole-word, case-insensitive match — outside of any HTML tag itself
      const pattern = new RegExp(
        `(?<![>\\w])(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![\\w<])`,
        "i",
      )

      const match = pattern.exec(result)
      if (!match) continue

      const matchIndex = match.index

      // Skip matches that are inside a tag attribute (between < and >)
      const before = result.slice(0, matchIndex)
      const lastOpen = before.lastIndexOf("<")
      const lastClose = before.lastIndexOf(">")
      if (lastOpen > lastClose) continue // inside a tag

      // Skip if inside a protected element (a, h1-h6, script, style)
      if (isInsideProtectedTag(result, matchIndex)) continue

      const matched = match[1]
      const link = `<a href="${url}" class="blog-property-link" title="View ${listing.property_name} listing">${matched}</a>`

      result = result.slice(0, matchIndex) + link + result.slice(matchIndex + matched.length)
      injected = true
      linkedCount++
      linkedProperties.push({ name: listing.property_name, slug: listing.slug, url })
    }
  }

  return { html: result, linkedCount, linkedProperties }
}

// ─── DB helper ────────────────────────────────────────────────────────────────

/**
 * Fetch active property candidates from MongoDB for auto-linking.
 * Projects only the fields needed for phrase matching and URL construction.
 */
export async function fetchPropertyCandidates(
  mongoUrl: string,
): Promise<PropertyCandidate[]> {
  const client = new MongoClient(mongoUrl)
  try {
    await client.connect()
    const db = client.db("land2land")
    const docs = await db
      .collection("listings")
      .find({
        $or: [
          { status: "active" },
          { status: "available" },
          { status: { $exists: false } },
        ],
      })
      .project({
        slug: 1,
        property_name: 1,
        property_type: 1,
        city: 1,
        state: 1,
      })
      .limit(200) // cap to avoid massive payloads
      .toArray()

    return docs.map((d) => ({
      slug: d.slug || "",
      property_name: d.property_name || "",
      property_type: d.property_type || "",
      city: d.city,
      state: d.state,
    }))
  } finally {
    await client.close()
  }
}
