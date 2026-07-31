/**
 * POST /api/admin/blog/auto-link
 *
 * Preview-only endpoint: accepts raw blog HTML and returns the enriched HTML
 * with injected property links, plus a count and list of linked properties.
 * Nothing is persisted — use this from the editor to preview auto-link results.
 *
 * Body: { html: string; maxLinks?: number }
 * Response: { html: string; linkedCount: number; linkedProperties: [...] }
 */

import { requireAdmin } from "@/lib/auth"
import { fetchPropertyCandidates, injectPropertyLinks } from "@/lib/blog-auto-link"

const mongoUrl = process.env.MONGODB_URI || ""

export async function POST(request: Request) {
  try {
    await requireAdmin()

    if (!mongoUrl) {
      return Response.json({ error: "Database not configured" }, { status: 500 })
    }

    const body = await request.json()
    const html: string = body.html ?? ""
    const maxLinks: number = typeof body.maxLinks === "number" ? body.maxLinks : 5

    if (!html.trim()) {
      return Response.json({ error: "html is required" }, { status: 400 })
    }

    const candidates = await fetchPropertyCandidates(mongoUrl)
    const result = injectPropertyLinks(html, candidates, maxLinks)

    return Response.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal error"
    const status = message === "Unauthorized" ? 401 : 500
    return Response.json({ error: message }, { status })
  }
}
