"use client"

import { getLinksReport, type FooterLink } from "@/lib/link-validator"
import { useEffect, useState } from "react"

interface LinkValidatorDebugProps {
  links: FooterLink[]
  showInProduction?: boolean
}

/**
 * Debug component to display footer link validation status
 * Only shows in development mode by default
 * Helps identify broken links during development
 *
 * @example
 * <LinkValidatorDebug links={footerLinks} />
 */
export function LinkValidatorDebug({ links, showInProduction = false }: LinkValidatorDebugProps) {
  const [mounted, setMounted] = useState(false)
  const isDev = process.env.NODE_ENV === "development"

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || (!isDev && !showInProduction)) {
    return null
  }

  const report = getLinksReport(links)

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border-2 border-gray-300 rounded-lg shadow-lg p-4 max-w-sm text-xs">
      <div className="font-bold text-gray-800 mb-2">🔗 Link Validator Debug</div>

      <div className="space-y-1 text-gray-700 mb-3 pb-3 border-b border-gray-200">
        <div>
          <span className="font-semibold">Total Links:</span> {report.total}
        </div>
        <div>
          <span className="font-semibold text-green-600">Valid:</span> {report.valid}
        </div>
        <div>
          <span className="font-semibold text-yellow-600">Redirected:</span> {report.redirected}
        </div>
        <div>
          <span className="font-semibold text-red-600">Broken:</span> {report.broken}
        </div>
      </div>

      {report.brokenLinks.length > 0 && (
        <div className="space-y-2 bg-red-50 p-2 rounded border border-red-200">
          <div className="font-bold text-red-700">Broken Links:</div>
          {report.brokenLinks.map((link, idx) => (
            <div key={idx} className="text-red-600">
              <div>
                <strong>{link.name}:</strong>
              </div>
              <div className="ml-2 text-xs">
                {link.href} → {link.redirectTo || "MISSING"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
