import type { Metadata } from "next"
import { AgreementLayout } from "@/components/agreements/agreement-layout"
import Header from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Channel Partner Agreement | Land2Land",
  description: "Master Channel Partner Agreement for associates and brokers working with Land2Land platform.",
  robots: "noindex,nofollow",
}

const COMPANY_NAME = "Land2Land PVT. LTD."
const COMPANY_ADDRESS = "Mumbai, Maharashtra, India"
const COMPANY_PAN = "AAACT1234A"
const CURRENT_DATE = new Date().toLocaleDateString("en-IN", {
  year: "numeric",
  month: "long",
  day: "numeric",
})

export default function ChannelPartnerAgreementPage() {
  return (
    <>
      <Header />
      <AgreementLayout
        title="Channel Partner Agreement"
        effectiveDate="January 1, 2024"
        lastUpdated={CURRENT_DATE}
        documentId="channel-partner-agreement"
      >
        <div className="space-y-6">
          {/* Title & Date */}
          <div className="text-center space-y-2 pb-6 border-b border-border">
            <h2 className="text-xl font-bold text-primary">CHANNEL PARTNER AGREEMENT</h2>
            <p className="text-sm text-muted-foreground">Master Channel Partner Agreement</p>
            <p className="text-xs text-muted-foreground">
              Made on this {CURRENT_DATE}
            </p>
          </div>

          {/* Parties */}
          <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-foreground">AGREEMENT BETWEEN</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-semibold text-primary">{COMPANY_NAME}</p>
                <p className="text-muted-foreground">Having registered office at {COMPANY_ADDRESS}</p>
                <p className="text-muted-foreground">PAN: {COMPANY_PAN}</p>
                <p className="font-semibold text-foreground mt-1">(hereinafter referred to as the "Company")</p>
              </div>

              <div className="flex items-center justify-center py-2">
                <span className="text-muted-foreground">AND</span>
              </div>

              <div>
                <p className="font-semibold text-foreground">[Associate/Broker Name]</p>
                <p className="text-muted-foreground">Residing at [Full Address]</p>
                <p className="text-muted-foreground">PAN: [PAN Number] | GSTIN: [GSTIN if applicable]</p>
                <p className="font-semibold text-foreground mt-1">(hereinafter referred to as the "Associate Broker")</p>
              </div>
            </div>
          </div>

          {/* Recitals */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">WHEREAS</h3>
            <div className="space-y-3 text-sm text-foreground">
              <div className="pl-4 border-l-4 border-primary">
                <p>
                  <strong>A.</strong> The Company operates a tech platform aggregating clean, title-verified land
                  transactions and guarantees dispute-free land titles to buyers.
                </p>
              </div>
              <div className="pl-4 border-l-4 border-primary">
                <p>
                  <strong>B.</strong> The Associate Broker agrees to act as a field associate to source land
                  listings, facilitate site visits, and coordinate with property owners and buyers.
                </p>
              </div>
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
                Scope of Work
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  The Associate Broker shall upload genuine land details, survey/Khasra numbers, and owner contact
                  details onto the Company portal.
                </li>
                <li>
                  The Associate Broker shall coordinate physical site inspections for buyers referred by the
                  Company.
                </li>
                <li>The Associate Broker shall maintain confidentiality of all proprietary information.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  2
                </span>
                Commercial Terms & Commission Split
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>The Company collects 1% from the Seller and 1% from the Buyer (+ 18% GST).</li>
                <li>
                  Upon successful execution and legal registration of the Sale Deed, the Company shall pay the
                  Associate Broker a Commission of <strong>1% of the total land deal value</strong>.
                </li>
                <li>
                  Tax Deductions: The Company shall deduct 5% TDS under Section 194H of the Income Tax Act before
                  releasing the net payment to the Associate Broker.
                </li>
                <li>If the Associate Broker is GST-registered, payment will be made against a valid GST invoice.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  3
                </span>
                Non-Circumvention & Lead Protection
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  The Associate Broker shall <strong>not directly or indirectly deal</strong> with any Buyer or
                  Seller introduced through the Company platform outside of this Agreement.
                </li>
                <li>
                  Any attempt to bypass the Company shall result in <strong>immediate termination</strong>,
                  forfeiture of pending payouts, and legal recovery of damages.
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  4
                </span>
                Representation & Verification
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  The Associate Broker warrants that preliminary information provided about any land parcel is true
                  to the best of their knowledge.
                </li>
                <li>
                  The final legal title verification and dispute guarantee shall be conducted exclusively by the
                  Company.
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  5
                </span>
                Term & Termination
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>This Agreement shall commence from the date of execution and continue for 12 months.</li>
                <li>Either party may terminate this Agreement with 30 days written notice.</li>
                <li>
                  The Company reserves the right to terminate immediately if the Associate Broker violates any terms
                  of this Agreement.
                </li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                  6
                </span>
                Liability & Indemnification
              </h4>
              <ul className="space-y-2 text-sm text-foreground ml-8 list-disc">
                <li>
                  The Associate Broker shall indemnify and hold the Company harmless from any claims arising from
                  incorrect information provided by the Associate Broker.
                </li>
                <li>
                  The Company shall not be liable for any disputes arising from information provided by the Associate
                  Broker.
                </li>
              </ul>
            </div>
          </div>

          {/* Signature Box */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="font-semibold text-foreground mb-8">IN WITNESS WHEREOF, the parties have signed this Agreement:</p>

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
                  <p className="font-semibold text-foreground">Associate Broker Signature</p>
                  <p className="text-xs text-muted-foreground">(Name & Contact)</p>
                  <p className="text-xs text-muted-foreground">Date: _______________</p>
                </div>
              </div>
            </div>
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
