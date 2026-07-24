"use client"

import React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { ExternalLink } from "lucide-react"
import { getAgreementsForUserType, getAgreementUrl, type UserType } from "@/lib/agreement-links"

interface AgreementCheckboxProps {
  userType: UserType
  agreementAccepted: Record<string, boolean>
  onAgreementChange: (agreementId: string, accepted: boolean) => void
}

export function AgreementCheckbox({
  userType,
  agreementAccepted,
  onAgreementChange,
}: AgreementCheckboxProps) {
  const agreements = getAgreementsForUserType(userType)

  if (agreements.length === 0) {
    return null
  }

  return (
    <div className="space-y-3 border-t border-border pt-3">
      <p className="text-xs font-medium text-foreground">Agreements & Terms</p>

      {agreements.map((agreement) => {
        const isChecked = agreementAccepted[agreement.id] || false

        return (
          <div key={agreement.id} className="flex items-start space-x-2.5">
            <Checkbox
              id={agreement.id}
              checked={isChecked}
              onCheckedChange={(checked) => onAgreementChange(agreement.id, checked as boolean)}
              className="mt-0.5"
            />
            <div className="flex-1 space-y-1">
              <label
                htmlFor={agreement.id}
                className="text-xs text-foreground cursor-pointer font-medium flex items-center gap-1"
              >
                I agree to the{" "}
                <a
                  href={getAgreementUrl(agreement.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  {agreement.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </label>
              <p className="text-xs text-muted-foreground">{agreement.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
