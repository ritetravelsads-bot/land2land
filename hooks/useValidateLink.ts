import { useEffect } from "react"
import { validateLink, type LinkValidationResult } from "@/lib/link-validator"

/**
 * Hook to validate links and provide feedback during development
 * Logs warnings in console for broken links to help catch issues early
 *
 * @param href - The URL to validate
 * @returns LinkValidationResult object with validation status
 *
 * @example
 * const validation = useValidateLink("/some-page")
 * if (!validation.isValid) {
 *   console.log(`Link will redirect to: ${validation.redirectTo}`)
 * }
 */
export function useValidateLink(href: string): LinkValidationResult {
  const validation = validateLink(href)

  useEffect(() => {
    // Only log in development mode
    if (process.env.NODE_ENV === "development" && !validation.isValid) {
      console.warn(
        `[Link Validator] Broken link detected: "${href}" will redirect to "${validation.redirectTo}" - ${validation.reason}`
      )
    }
  }, [href, validation])

  return validation
}

/**
 * Hook to validate multiple links at once
 * Useful for validating footer link sections
 *
 * @param links - Array of links with { name, href } structure
 * @returns Object containing validation stats and broken links
 *
 * @example
 * const report = useValidateLinks(footerLinks)
 * console.log(`${report.broken} broken links out of ${report.total}`)
 */
export function useValidateLinks(
  links: Array<{ name: string; href: string }>
): {
  total: number
  valid: number
  broken: number
  redirected: number
  brokenLinks: Array<{ name: string; href: string; redirectTo?: string }>
} {
  const results = links.map((link) => ({
    ...link,
    ...validateLink(link.href),
  }))

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const broken = results.filter((r) => !r.isValid)
      if (broken.length > 0) {
        console.warn(
          `[Link Validator] Found ${broken.length} broken links:`,
          broken.map((b) => ({ name: b.name, href: b.href, redirectsTo: b.redirectTo }))
        )
      }
    }
  }, [results])

  return {
    total: links.length,
    valid: results.filter((r) => r.isValid && !r.redirectTo).length,
    broken: results.filter((r) => !r.isValid).length,
    redirected: results.filter((r) => r.redirectTo).length,
    brokenLinks: results.filter((r) => !r.isValid),
  }
}
