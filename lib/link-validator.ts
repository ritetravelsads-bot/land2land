/**
 * Link Validator Utility
 * Handles validation and redirection of footer links to prevent 404s
 */

export interface FooterLink {
  name: string
  href: string
}

export interface LinkValidationResult {
  isValid: boolean
  originalHref: string
  redirectTo?: string
  reason?: string
}

/**
 * Map of broken/redirected links to their correct destinations
 * Update this as needed when pages are created or removed
 */
const LINK_REDIRECTS: Record<string, string> = {
  "/career": "/",
  "/sell": "/",
  "/investments": "/",
  "/find-associate": "/",
  "/property-management": "/",
  "/farms": "/",
  "/tools/land-calculator": "/area-converter",
  "/farm-advisory": "/",
  "/site-map": "/",
  "/grievance-redressal": "/",
  "/cookie-policy": "/",
  "/disclaimer": "/",
}

/**
 * List of valid public pages (routes that exist)
 */
const VALID_ROUTES = [
  "/",
  "/about",
  "/properties",
  "/blogs",
  "/contact",
  "/agricultural-land",
  "/farmland",
  "/plots-vacant",
  "/land-with-infrastructure",
  "/orchard-land",
  "/irrigation-land",
  "/privacy-policy",
  "/terms-and-conditions",
  "/account/delete",
  "/area-converter",
  "/how-it-works",
  "/pricing",
]

/**
 * Validates a link and returns where it should redirect to
 * @param href - The link URL to validate
 * @returns LinkValidationResult object with validation status and redirect info
 */
export function validateLink(href: string): LinkValidationResult {
  // Allow external links (starting with http/https)
  if (href.startsWith("http://") || href.startsWith("https://")) {
    return {
      isValid: true,
      originalHref: href,
    }
  }

  // Allow anchor links
  if (href.startsWith("#")) {
    return {
      isValid: true,
      originalHref: href,
    }
  }

  // Check if link has a redirect mapping
  if (LINK_REDIRECTS[href]) {
    return {
      isValid: true,
      originalHref: href,
      redirectTo: LINK_REDIRECTS[href],
      reason: "Link redirected to available page",
    }
  }

  // Check if link exists in valid routes
  if (VALID_ROUTES.includes(href)) {
    return {
      isValid: true,
      originalHref: href,
    }
  }

  // Link is broken - redirect to home
  return {
    isValid: false,
    originalHref: href,
    redirectTo: "/",
    reason: "Page does not exist, redirecting to home",
  }
}

/**
 * Gets the correct href for a link (handles redirects)
 * @param href - The original link URL
 * @returns The URL to navigate to (may be a redirect)
 */
export function getCorrectHref(href: string): string {
  const validation = validateLink(href)
  return validation.redirectTo || validation.originalHref
}

/**
 * Validates an array of footer links
 * @param links - Array of footer links to validate
 * @returns Array of validation results
 */
export function validateFooterLinks(links: FooterLink[]): LinkValidationResult[] {
  return links.map((link) => validateLink(link.href))
}

/**
 * Filters broken links and returns them
 * @param links - Array of footer links to check
 * @returns Array of broken links with details
 */
export function getBrokenLinks(links: FooterLink[]): Array<FooterLink & LinkValidationResult> {
  return links
    .map((link) => ({
      ...link,
      ...validateLink(link.href),
    }))
    .filter((link) => !link.isValid)
}

/**
 * Reports link validation status
 * @param links - Array of footer links
 * @returns Summary of validation results
 */
export function getLinksReport(
  links: FooterLink[]
): {
  total: number
  valid: number
  broken: number
  redirected: number
  brokenLinks: Array<FooterLink & LinkValidationResult>
} {
  const results = links.map((link) => ({
    ...link,
    ...validateLink(link.href),
  }))

  return {
    total: links.length,
    valid: results.filter((r) => r.isValid && !r.redirectTo).length,
    broken: results.filter((r) => !r.isValid).length,
    redirected: results.filter((r) => r.redirectTo).length,
    brokenLinks: results.filter((r) => !r.isValid),
  }
}
