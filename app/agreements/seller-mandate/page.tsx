import type { Metadata } from "next"
import { AgreementLayout } from "@/components/agreements/agreement-layout"
import Header from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Exclusive Land Listing & Title Verification Mandate | Land2Land",
  description: "Seller agreement for exclusive land listing and title verification services.",
  robots: "noindex,nofollow",
}

const COMPANY_NAME = "Land2Land PVT. LTD."
const CURRENT_DATE = new Date().toLocaleDateString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function SellerMandateAgreementPage() {
  return (
    <>
      <Header />
      <AgreementLayout
        title="Exclusive Land Listing & Title Verification Mandate"
        effectiveDate="January 1, 2024"
        lastUpdated={CURRENT_DATE}
        documentId="seller-mandate-agreement"
      >
        <div className="space-y-6">
          {/* Title & Date */}
          <div className="text-center space-y-2 pb-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">EXCLUSIVE LAND LISTING & TITLE VERIFICATION MANDATE</h2>
            <p className="text-sm text-muted-foreground">Land Mandate & Verification Agreement</p>
            <p className="text-xs text-muted-foreground">
              Made on this {CURRENT_DATE}
            </p>
          </div>

          {/* Parties */}
          <div className="bg-purple-50 dark:bg-purple-950 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-foreground">AGREEMENT BETWEEN</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-primary">{COMPANY_NAME}</p>
                <p className="text-muted-foreground">RERA Reg. No.: [RERA Registration Number]</p>
                <p className="text-muted-foreground">Having registered office at Mumbai, Maharashtra, India</p>
                <p className="font-semibold text-foreground mt-1">(hereinafter referred to as the "Company")</p>
              </div>

              <div className="flex items-center justify-center py-2">
                <span className="text-muted-foreground">AND</span>
              </div>

              <div>
                <p className="font-semibold text-foreground">[Seller Name]</p>
                <p className="text-muted-foreground">S/o, D/o [Parent/Guardian Name]</p>
                <p className="text-muted-foreground">Residing at [Full Address]</p>
                <p className="text-muted-foreground">PAN: [PAN Number] | Aadhar: [Aadhar Number]</p>
                <p className="font-semibold text-foreground mt-1">(hereinafter referred to as the "Seller")</p>
              </div>
            </div>
          </div>

          {/* Recitals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">WHEREAS</h3>
            <div className="pl-4 border-l-4 border-primary space-y-3 text-sm text-foreground">
              <p>
                The Seller is the <strong>absolute owner</strong> of the land parcel measuring{" "}
                <strong>______ Acres/Sq. Ft.</strong>, bearing Survey/Khasra No. <strong>__________</strong>, located
                at <strong>________________________</strong> (hereinafter referred to as the &quot;Property&quot;).
              </p>
              <p>
                The Seller desires to list and sell the Property through the Company&apos;s platform with complete
                title verification and marketing support.
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
                Appointment & Authority
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    The Seller appoints the Company as their <strong>authorized platform/agent</strong> to market,
                    verify, and facilitate the sale of the Property under RERA guidelines.
                  </li>
                  <li>This is an <strong>exclusive mandate</strong> for a period of [Duration] from the date hereof.</li>
                  <li>
                    The Seller agrees to list the Property exclusively on the Company&apos;s platform and shall not
                    list on competing platforms during the mandate period.
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
                Title Inspection & Cooperation
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <p>The Seller agrees to furnish the following documents to the Company for verification:</p>
                <ul className="list-disc space-y-1 ml-4">
                  <li>Original title deeds and ownership records</li>
                  <li>Revenue extracts (7/12, Khatauni, Jamabandi)</li>
                  <li>Encumbrance certificates from the local Sub-Registrar</li>
                  <li>Partition deeds (if applicable)</li>
                  <li>Possession certificate and utilization records</li>
                  <li>Copy of Khata, Kranti, and Crop details</li>
                  <li>DGPS coordinates or survey boundaries</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  3
                </span>
                Brokerage Fee & GST
              </h4>
              <div className="ml-8 space-y-3 text-sm text-foreground">
                <div className="bg-yellow-50 dark:bg-yellow-950 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                  <p className="font-semibold mb-2">Service Fee Structure:</p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>
                      The Seller agrees to pay the Company a service/brokerage fee of <strong>1% (One Percent)</strong>{" "}
                      of the total agreed sale price plus <strong>18% GST</strong>.
                    </li>
                    <li>
                      The fee shall become due and payable upon the signing of the Agreement to Sell or execution of
                      the registered Sale Deed, whichever is agreed upon in writing.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  4
                </span>
                Indemnity by Seller
              </h4>
              <div className="ml-8 space-y-2 text-sm text-foreground">
                <p className="font-semibold mb-2">The Seller warrants and represents that:</p>
                <ul className="list-disc space-y-1 ml-4">
                  <li>
                    The Property is <strong>free from undisclosed mortgages, liens, or encumbrances</strong>
                  </li>
                  <li>There are <strong>no family litigation or succession disputes</strong> pending</li>
                  <li>
                    There are <strong>no boundary disputes or government acquisition notices</strong> on the Property
                  </li>
                  <li>The Seller is the <strong>sole beneficial owner</strong> with clear authority to sell</li>
                  <li>
                    All previous transactions and transfers have been <strong>properly registered</strong>
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
                Company's Responsibilities
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>Conduct comprehensive title verification and 30-year SRO search</li>
                <li>Issue Clean Title Verification Certificate upon successful verification</li>
                <li>Market the Property on the platform and through associates</li>
                <li>Coordinate with prospective buyers and facilitate site visits</li>
                <li>Provide legal documentation support for the transaction</li>
                <li>
                  Maintain confidentiality of all proprietary information shared by the Seller
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  6
                </span>
                Term & Renewal
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>This Agreement shall be valid for [12 months / custom period] from the date of execution.</li>
                <li>
                  The Agreement may be renewed by mutual written consent of both parties for further periods.
                </li>
                <li>
                  Either party may terminate the Agreement with 30 days written notice if the Property remains
                  unsold.
                </li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  7
                </span>
                Payment & Commission Distribution
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>Upon successful sale and registration of the Sale Deed, the Company shall deduct 1% commission.</li>
                <li>
                  The balance sale amount shall be paid to the Seller within [5-7 business days] of registration.
                </li>
                <li>Tax Deduction at Source (TDS) and GST shall be deducted as per applicable law.</li>
                <li>A detailed payment statement and tax invoices shall be provided to the Seller.</li>
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
                  <p className="font-semibold text-foreground">Seller Signature</p>
                  <p className="text-xs text-muted-foreground">(Name & Contact)</p>
                  <p className="text-xs text-muted-foreground">Date: _______________</p>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Benefits */}
          <div className="bg-green-50 dark:bg-green-950 p-6 rounded-lg text-sm space-y-3">
            <h4 className="font-semibold text-foreground">Why List with Land2Land?</h4>
            <ul className="space-y-2 text-foreground list-disc ml-5">
              <li>Exclusive verified buyer access across the platform</li>
              <li>Complete title verification and legal documentation support</li>
              <li>No hidden charges - transparent 1% fee structure</li>
              <li>Professional marketing and property visibility</li>
              <li>Secure transaction with certified funds management</li>
              <li>RERA-compliant process with legal protection</li>
            </ul>
          </div>

          {/* Legal Info */}
          <div className="bg-amber-50 dark:bg-amber-950 p-6 rounded-lg text-xs text-foreground space-y-3">
            <h4 className="font-semibold">Legal Basis</h4>
            <p>
              This Agreement is made under the provisions of the Indian Contract Act, 1872; Real Estate (Regulation
              and Development) Act (RERA), 2016; Transfer of Property Act, 1882; and Income Tax Act, 1961.
            </p>
            <p>
              For digital execution, this agreement can be signed using e-Sign or Aadhar OTP integration under the
              Information Technology Act, 2000.
            </p>
          </div>
        </div>
      </AgreementLayout>
    </>
  )
}
