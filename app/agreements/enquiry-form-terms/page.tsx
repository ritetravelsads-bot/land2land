import type { Metadata } from "next"
import { AgreementLayout } from "@/components/agreements/agreement-layout"
import Header from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Property Enquiry Form Terms & Conditions | Land2Land",
  description: "Terms and conditions for property enquiry submissions on Land2Land platform.",
  robots: "noindex,nofollow",
}

const CURRENT_DATE = new Date().toLocaleDateString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function EnquiryFormTermsPage() {
  return (
    <>
      <Header />
      <AgreementLayout
        title="Property Enquiry Form Terms & Conditions"
        effectiveDate="January 1, 2024"
        lastUpdated={CURRENT_DATE}
        documentId="enquiry-form-terms"
      >
        <div className="space-y-6">
          {/* Title & Date */}
          <div className="text-center space-y-2 pb-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">PROPERTY ENQUIRY FORM</h2>
            <p className="text-sm text-muted-foreground">Terms & Conditions for Enquiry Submissions</p>
            <p className="text-xs text-muted-foreground">
              Effective from {CURRENT_DATE}
            </p>
          </div>

          {/* Introduction */}
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg text-sm text-foreground space-y-3">
            <p>
              By submitting a property enquiry through Land2Land platform, you acknowledge and agree to the following
              terms and conditions. Please read carefully before proceeding.
            </p>
            <p className="font-semibold">
              This enquiry grants Land2Land permission to contact you regarding your request for property information
              and services.
            </p>
          </div>

          {/* Main Terms */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">TERMS & CONDITIONS:</h3>

            {/* Section 1 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  1
                </span>
                Purpose of Enquiry
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    You are submitting this enquiry to express interest in a specific property listed on the Land2Land
                    platform.
                  </li>
                  <li>
                    The enquiry is a non-binding expression of interest and does not constitute an offer to purchase
                    or commit to any transaction.
                  </li>
                  <li>
                    The information provided will be used by Land2Land to facilitate communication with property owners
                    and agents.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  2
                </span>
                Data Privacy & Usage
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <p className="font-semibold mb-2">You consent to the following:</p>
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    Your contact information (name, phone, email) will be shared with the property seller/owner and
                    their authorized agents.
                  </li>
                  <li>Land2Land may contact you for follow-up communication regarding your enquiry.</li>
                  <li>
                    You may receive promotional messages about similar properties and services that match your
                    interests.
                  </li>
                  <li>
                    Your enquiry details will be securely stored in compliance with the Privacy Policy and DPDP Act,
                    2023.
                  </li>
                  <li>
                    You may opt-out of promotional communications by clicking &quot;Unsubscribe&quot; or by contacting
                    support@land2land.com
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  3
                </span>
                Accuracy of Information
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <p className="font-semibold mb-2">You declare that:</p>
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    All information provided in the enquiry form (name, contact details, requirements) is accurate,
                    truthful, and complete.
                  </li>
                  <li>
                    You have the authority to provide the personal information and agree to be contacted on the
                    provided details.
                  </li>
                  <li>
                    You are 18 years of age or older and legally capable of entering into a real estate transaction.
                  </li>
                  <li>
                    Any false, misleading, or fraudulent information may result in suspension of your account and
                    legal action.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  4
                </span>
                Land2Land Communication
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    Land2Land will make reasonable efforts to forward your enquiry to the property owner/agent within
                    24-48 hours.
                  </li>
                  <li>
                    Response time from the seller/agent depends on their availability and may vary (typically 2-5
                    business days).
                  </li>
                  <li>
                    Land2Land acts as an intermediary and does not guarantee a response from the seller or their agent.
                  </li>
                  <li>
                    Multiple enquiries on the same property may result in contact from different agents representing
                    the property.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  5
                </span>
                Direct Communication & Non-Circumvention
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <div className="bg-red-50 dark:bg-red-950 p-3 rounded border border-red-200 dark:border-red-800 mb-2">
                  <p className="font-semibold">Important Notice:</p>
                  <p className="mt-1">
                    Once connected with a seller or agent through this platform, you agree not to bypass Land2Land in
                    future transactions involving the same property or agent without involving the platform.
                  </p>
                </div>
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    Circumventing the platform may result in account suspension and legal action as per the terms of
                    service.
                  </li>
                  <li>All transactions facilitated through platform connections should include Land2Land services.</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  6
                </span>
                Due Diligence & Responsibility
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    <strong>You are solely responsible</strong> for conducting independent due diligence on any
                    property.
                  </li>
                  <li>
                    Land2Land recommends obtaining legal advice, title verification, and physical site inspection
                    before committing to any transaction.
                  </li>
                  <li>
                    Land2Land will facilitate title verification through its professional legal team for registered
                    properties on the platform.
                  </li>
                  <li>
                    Never make advance payments without proper legal documentation and Land2Land's involvement.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  7
                </span>
                Limitation of Liability
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    Land2Land is not responsible for the conduct or representations of sellers, agents, or third
                    parties.
                  </li>
                  <li>
                    <strong>All property information and photos</strong> are provided by the listing agent/owner and
                    may not be current.
                  </li>
                  <li>
                    Land2Land does not guarantee property availability, pricing accuracy, or transaction completion.
                  </li>
                  <li>
                    Any disputes between you and the seller/agent will be resolved directly between parties or through
                    legal channels.
                  </li>
                  <li>
                    Land2Land&apos;s liability is limited to the service fee paid (if any) for title verification or
                    other services.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 8 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  8
                </span>
                Anti-Fraud & Verification
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    You agree to verify the identity and legitimacy of all parties before making any payments.
                  </li>
                  <li>
                    Land2Land recommends video verification, physical site visits, and bank transfers only through
                    verified channels.
                  </li>
                  <li>
                    Report any suspicious activity, fake listings, or fraudulent communications to support@land2land.com
                    immediately.
                  </li>
                  <li>
                    Land2Land has a fraud prevention team and works with law enforcement to combat scams on the
                    platform.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 9 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  9
                </span>
                Changes & Modifications
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  Land2Land reserves the right to modify these terms and conditions at any time without prior notice.
                </li>
                <li>Changes will be effective immediately upon posting to the website.</li>
                <li>Continued use of the platform constitutes acceptance of modified terms.</li>
              </ul>
            </div>

            {/* Section 10 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  10
                </span>
                Dispute Resolution
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  Any disputes arising from this enquiry shall be governed by Indian laws and subject to the
                  jurisdiction of Mumbai courts.
                </li>
                <li>
                  You may file a complaint with the Real Estate Regulatory Authority (RERA) if applicable to your
                  state.
                </li>
                <li>For grievances, contact: grievance@land2land.com | Support: +91-9205190063</li>
              </ul>
            </div>
          </div>

          {/* Acknowledgement */}
          <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg text-sm space-y-3">
            <h4 className="font-semibold text-foreground">By submitting this enquiry, you acknowledge:</h4>
            <ul className="space-y-2 text-foreground list-disc ml-5">
              <li>You have read and understood these terms and conditions</li>
              <li>You consent to share your information with sellers and agents</li>
              <li>You will conduct proper due diligence before making any commitments</li>
              <li>You understand this is a non-binding expression of interest</li>
              <li>You agree to conduct transactions through Land2Land when applicable</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg text-sm space-y-3">
            <h4 className="font-semibold text-foreground">Need Help?</h4>
            <div className="space-y-2 text-foreground">
              <p>
                <strong>General Support:</strong> support@land2land.com | +91-9205190063 (Mon-Sat, 9AM-6PM)
              </p>
              <p>
                <strong>Grievance Redressal:</strong> grievance@land2land.com
              </p>
              <p>
                <strong>Fraud Report:</strong> report@land2land.com (24/7)
              </p>
            </div>
          </div>

          {/* Legal Footer */}
          <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg text-xs text-foreground space-y-3">
            <h4 className="font-semibold">Legal Compliance</h4>
            <p>
              These terms are governed by the Information Technology Act, 2000; Consumer Protection Act, 2019; and
              Real Estate (Regulation and Development) Act (RERA), 2016, where applicable.
            </p>
            <p>
              For detailed information about data handling, please refer to our Privacy Policy at land2land.com/privacy-policy
            </p>
          </div>
        </div>
      </AgreementLayout>
    </>
  )
}
