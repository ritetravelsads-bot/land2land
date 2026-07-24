// Agreement documents mapping by user type
export type UserType = "customer" | "associate" | "seller" | "buyer"

export interface AgreementDocument {
  id: string
  title: string
  description: string
  userTypes: UserType[]
}

export const AGREEMENT_DOCUMENTS: AgreementDocument[] = [
  {
    id: "buyer-agreement",
    title: "Buyer Advisory & Clean-Title Guarantee Agreement",
    description: "Read and agree to the terms as a buyer/customer purchasing land through our platform",
    userTypes: ["customer", "buyer"],
  },
  {
    id: "enquiry-form-agreement",
    title: "Property Enquiry Form Terms & Conditions",
    description: "I understand and agree to the terms for submitting property enquiries through this platform",
    userTypes: ["customer", "buyer"],
  },
  {
    id: "associate-agreement",
    title: "Channel Partner Agreement",
    description: "Read and agree to the terms as an associate/broker working with our platform",
    userTypes: ["associate"],
  },
  {
    id: "seller-agreement",
    title: "Exclusive Land Listing & Title Verification Mandate",
    description: "Read and agree to the terms as a seller listing land on our platform",
    userTypes: ["seller"],
  },
]

// Get agreements for specific user type
export function getAgreementsForUserType(userType: UserType): AgreementDocument[] {
  return AGREEMENT_DOCUMENTS.filter((doc) => doc.userTypes.includes(userType))
}

// Get agreement download URL
export function getAgreementUrl(agreementId: string): string {
  const agreementUrls: Record<string, string> = {
    "buyer-agreement": "/agreements/buyer-advisory",
    "enquiry-form-agreement": "/agreements/enquiry-form-terms",
    "associate-agreement": "/agreements/channel-partner",
    "seller-agreement": "/agreements/seller-mandate",
  }

  return agreementUrls[agreementId] || "#"
}

// Get agreement display name
export function getAgreementName(agreementId: string): string {
  const names: Record<string, string> = {
    "buyer-agreement": "Buyer Agreement",
    "enquiry-form-agreement": "Enquiry Form Agreement",
    "associate-agreement": "Associate Agreement",
    "seller-agreement": "Seller Agreement",
  }

  return names[agreementId] || "Agreement"
}
