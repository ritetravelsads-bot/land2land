import type { Metadata } from "next"
import { AgreementLayout } from "@/components/agreements/agreement-layout"
import Header from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Buyer Advisory & Clean-Title Guarantee Agreement | Land2Land",
  description: "Comprehensive buyer protection agreement with clean-title verification guarantee.",
  robots: "noindex,nofollow",
}

const COMPANY_NAME = "Land2Land PVT. LTD."
const CURRENT_DATE = new Date().toLocaleDateString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function BuyerAdvisoryAgreementPage() {
  return (
    <>
      <Header />
      <AgreementLayout
        title="Buyer Advisory & Clean-Title Guarantee Agreement"
        effectiveDate="January 1, 2024"
        lastUpdated={CURRENT_DATE}
        documentId="buyer-advisory-agreement"
      >
        <div className="space-y-6">
          {/* Title & Date */}
          <div className="text-center space-y-2 pb-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">BUYER ADVISORY & CLEAN-TITLE GUARANTEE AGREEMENT</h2>
            <p className="text-sm text-muted-foreground">Title Guarantee & Service Agreement for Purchasers</p>
            <p className="text-xs text-muted-foreground">
              Made on this {CURRENT_DATE}
            </p>
          </div>

          {/* Parties */}
          <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-foreground">AGREEMENT BETWEEN</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-primary">{COMPANY_NAME}</p>
                <p className="text-muted-foreground">Having registered office at Mumbai, Maharashtra, India</p>
                <p className="text-muted-foreground">PAN: AAACT1234A</p>
                <p className="font-semibold text-foreground mt-1">(hereinafter referred to as the "Company")</p>
              </div>

              <div className="flex items-center justify-center py-2">
                <span className="text-muted-foreground">AND</span>
              </div>

              <div>
                <p className="font-semibold text-foreground">[Purchaser/Buyer Name]</p>
                <p className="text-muted-foreground">S/o, D/o [Parent/Guardian Name]</p>
                <p className="text-muted-foreground">Residing at [Full Address]</p>
                <p className="text-muted-foreground">PAN: [PAN Number] | Aadhar: [Aadhar Number]</p>
                <p className="font-semibold text-foreground mt-1">(hereinafter referred to as the "Purchaser")</p>
              </div>
            </div>
          </div>

          {/* Recitals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">WHEREAS</h3>
            <div className="pl-4 border-l-4 border-primary space-y-2 text-sm text-foreground">
              <p>
                The Purchaser desires to acquire land through the Company&apos;s platform, relying on the Company&apos;s
                legal title inspection and dispute-free guarantee.
              </p>
              <p>
                The Company is committed to providing a transparent, secure, and legally verified land transaction
                experience.
              </p>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg text-foreground">NOW IT IS AGREED AS FOLLOWS:</h3>

            {/* Section 1 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  1
                </span>
                Scope of Service
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <p>
                  The Company shall conduct a comprehensive <strong>30-Year SRO Title Search</strong>, verify revenue
                  survey maps/boundaries, inspect encumbrances, and issue an official{" "}
                  <strong>&quot;Clean Title Verification Certificate&quot;</strong> for Survey/Khasra No.
                  ______________.
                </p>
                <p>
                  This includes verification of ownership history, encumbrance searches, mutation records, and
                  government acquisition status.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  2
                </span>
                Clean Title & Dispute Guarantee
              </h4>
              <div className="ml-8 space-y-3 text-sm text-foreground">
                <div className="bg-red-50 dark:bg-red-950 p-3 rounded border border-red-200 dark:border-red-800">
                  <p className="font-semibold mb-1">Guarantee Promise:</p>
                  <p>
                    The Company <strong>guarantees</strong> to the Purchaser that the land provided through its
                    platform has been verified as procedurally clean, unencumbered, and free of title defects at the
                    time of registration.
                  </p>
                </div>
                <ul className="list-disc ml-4 space-y-1">
                  <li>
                    In the event of a title defect arising from procedural oversight by the legal team, the Company
                    agrees to provide legal support and remediation.
                  </li>
                  <li>The Company will cover legal costs for defending the Purchaser in case of title disputes.</li>
                  <li>
                    The Purchaser may claim compensation as defined in the platform&apos;s Guarantee Policy
                    document.
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
                Service Fee / Brokerage Structure
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  The Purchaser agrees to pay the Company a <strong>service/brokerage fee of 1% (One Percent)</strong>{" "}
                  of the total purchase price plus <strong>18% GST</strong>.
                </li>
                <li>
                  The payment shall be made at the time of token agreement/deed registration directly into the
                  Company&apos;s bank account.
                </li>
                <li>
                  The Company shall provide a <strong>Tax Invoice</strong> and <strong>GST Certificate</strong> for the
                  fee paid.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  4
                </span>
                Non-Circumvention
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  The Purchaser agrees <strong>not to negotiate or execute any transaction</strong> directly with the
                  Seller or Associate Broker introduced by the Company without involving the Company.
                </li>
                <li>
                  Violation of this clause may result in forfeiture of the guarantee protection and legal action by
                  the Company.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  5
                </span>
                Purchaser Responsibilities
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>The Purchaser shall provide accurate identification and financial information as requested.</li>
                <li>
                  The Purchaser shall cooperate with the Company's title verification team and provide all necessary
                  documents.
                </li>
                <li>The Purchaser shall conduct independent due diligence in addition to the Company's verification.</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  6
                </span>
                Limitation of Liability
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>The Company&apos;s liability is limited to the service fee paid by the Purchaser.</li>
                <li>
                  The Company shall not be liable for delays in registration, market fluctuations, or third-party
                  claims.
                </li>
                <li>
                  The guarantee does not cover disputes arising from the Purchaser&apos;s own negligence or violation
                  of this Agreement.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  7
                </span>
                Dispute Resolution
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>Any disputes shall be resolved through arbitration in accordance with the Arbitration Act, 1996.</li>
                <li>The venue shall be the Principal Seat of Arbitration at Mumbai.</li>
                <li>
                  The Purchaser may also approach the Real Estate Regulatory Authority (RERA) for grievance redressal.
                </li>
              </ul>
            </div>
          </div>

          {/* Signature Box */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-semibold text-foreground mb-8">
              IN WITNESS WHEREOF, the parties have signed this Agreement:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div className="space-y-1 text-sm">
                  <p className="h-12 border-b border-foreground"></p>
                  <p className="font-semibold text-foreground">Company Authorized Signatory</p>
                  <p className="text-xs text-muted-foreground">(Name & Designation)</p>
                  <p className="text-xs text-muted-foreground">Date: _______________</p>
                </div>
              </div>

              <div className="space-y-12">
                <div className="space-y-1 text-sm">
                  <p className="h-12 border-b border-foreground"></p>
                  <p className="font-semibold text-foreground">Purchaser Signature</p>
                  <p className="text-xs text-muted-foreground">(Name & Contact)</p>
                  <p className="text-xs text-muted-foreground">Date: _______________</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buyer Protection Summary */}
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg text-sm space-y-3">
            <h4 className="font-semibold text-foreground">Your Protection</h4>
            <ul className="space-y-2 text-foreground list-disc ml-5">
              <li>30-Year comprehensive title search and verification</li>
              <li>Clean-Title Guarantee protecting your investment</li>
              <li>Legal support and remediation in case of disputes</li>
              <li>RERA-compliant agreement with legal recourse</li>
              <li>Access to transparent transaction records</li>
            </ul>
          </div>

          {/* Legal Info */}
          <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg text-xs text-foreground space-y-3">
            <h4 className="font-semibold">Legal Basis</h4>
            <p>
              This Agreement is made under the provisions of the Indian Contract Act, 1872; Real Estate (Regulation
              and Development) Act (RERA), 2016; Transfer of Property Act, 1882; and Income Tax Act, 1961.
            </p>
          </div>
        </div>
      </AgreementLayout>
    </>
  )
}
