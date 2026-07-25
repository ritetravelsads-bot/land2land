/**
 * Link Validator Tests
 * 
 * To run these tests, you can use:
 * npx jest lib/link-validator.test.ts
 * 
 * Or test manually in browser console:
 * import { validateLink, getCorrectHref, getLinksReport } from "@/lib/link-validator"
 */

import {
  validateLink,
  getCorrectHref,
  validateFooterLinks,
  getBrokenLinks,
  getLinksReport,
  type FooterLink,
} from "./link-validator"

describe("Link Validator", () => {
  describe("validateLink", () => {
    it("should validate valid routes", () => {
      const result = validateLink("/")
      expect(result.isValid).toBe(true)
    })

    it("should validate external links", () => {
      const result = validateLink("https://www.example.com")
      expect(result.isValid).toBe(true)
    })

    it("should validate anchor links", () => {
      const result = validateLink("#section")
      expect(result.isValid).toBe(true)
    })

    it("should detect broken links", () => {
      const result = validateLink("/nonexistent-page")
      expect(result.isValid).toBe(false)
      expect(result.redirectTo).toBe("/")
    })

    it("should redirect mapped links", () => {
      const result = validateLink("/career")
      expect(result.isValid).toBe(true)
      expect(result.redirectTo).toBe("/")
    })

    it("should redirect land calculator to area converter", () => {
      const result = validateLink("/tools/land-calculator")
      expect(result.isValid).toBe(true)
      expect(result.redirectTo).toBe("/area-converter")
    })
  })

  describe("getCorrectHref", () => {
    it("should return the correct href for broken links", () => {
      const href = getCorrectHref("/career")
      expect(href).toBe("/")
    })

    it("should return original href for valid links", () => {
      const href = getCorrectHref("/")
      expect(href).toBe("/")
    })

    it("should return redirect target", () => {
      const href = getCorrectHref("/tools/land-calculator")
      expect(href).toBe("/area-converter")
    })
  })

  describe("validateFooterLinks", () => {
    it("should validate multiple links", () => {
      const links: FooterLink[] = [
        { name: "Home", href: "/" },
        { name: "Career", href: "/career" },
        { name: "Properties", href: "/properties" },
      ]

      const results = validateFooterLinks(links)
      expect(results).toHaveLength(3)
      expect(results[0].isValid).toBe(true)
      expect(results[1].isValid).toBe(true)
      expect(results[2].isValid).toBe(true)
    })
  })

  describe("getBrokenLinks", () => {
    it("should identify broken links", () => {
      const links: FooterLink[] = [
        { name: "Home", href: "/" },
        { name: "Broken Link", href: "/broken" },
        { name: "Another Broken", href: "/another-broken" },
      ]

      const broken = getBrokenLinks(links)
      expect(broken).toHaveLength(2)
      expect(broken[0].href).toBe("/broken")
      expect(broken[1].href).toBe("/another-broken")
    })
  })

  describe("getLinksReport", () => {
    it("should generate a complete report", () => {
      const links: FooterLink[] = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Career", href: "/career" },
        { name: "Broken", href: "/nonexistent" },
      ]

      const report = getLinksReport(links)
      expect(report.total).toBe(4)
      expect(report.valid).toBe(2) // Home, About (valid, not redirected)
      expect(report.redirected).toBe(1) // Career
      expect(report.broken).toBe(1) // Nonexistent
    })
  })
})

/**
 * Manual Testing Guide
 * 
 * 1. Open your browser console
 * 
 * 2. Test validateLink:
 *    import { validateLink } from "@/lib/link-validator"
 *    validateLink("/career")
 *    // Should show: { isValid: true, originalHref: "/career", redirectTo: "/", reason: "..." }
 * 
 * 3. Test getCorrectHref:
 *    import { getCorrectHref } from "@/lib/link-validator"
 *    getCorrectHref("/career")
 *    // Should return: "/"
 * 
 * 4. Test footer links report:
 *    import { getLinksReport } from "@/lib/link-validator"
 *    const footerLinks = [
 *      { name: "Career", href: "/career" },
 *      { name: "Home", href: "/" },
 *      { name: "Broken", href: "/nonexistent" }
 *    ]
 *    getLinksReport(footerLinks)
 *    // Shows summary with valid, broken, and redirected counts
 */
