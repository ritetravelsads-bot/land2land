import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Land2Land",
  description:
    "Land2Land refund and cancellation policy for advisory, consultation, and service fees. Understand eligibility, timelines, and how to request a refund.",
  alternates: {
    canonical: "https://land2land.com/refund-policy",
  },
}

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-12 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Refund &amp; Cancellation Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: April 04, 2025</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              <p><strong>Website:</strong> https://land2land.com</p>
              <p><strong>Jurisdiction:</strong> Gurugram, Haryana, India</p>
            </div>
          </div>

          <div className="max-w-none text-foreground space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Overview</h2>
              <p className="text-muted-foreground">
                Land2Land (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;) operates as an independent land advisory
                and marketing platform. This Refund &amp; Cancellation Policy explains the terms under which fees paid for
                our advisory, consultation, or subscription services may be cancelled or refunded.
              </p>
              <p className="text-muted-foreground">
                By purchasing or availing any paid service from Land2Land, you agree to the terms outlined in this Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Nature of Our Services</h2>
              <p className="text-muted-foreground">
                Land2Land primarily provides advisory, consultation, listing, and marketing services. We do not sell land
                directly, and property transactions are concluded between buyers, sellers, and developers. Advisory and
                consultation fees are charged for the professional time, effort, and resources we invest.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. Cancellation of Services</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Requests to cancel a paid service must be submitted in writing to info@land2land.com.</li>
                <li>
                  Cancellations requested within <strong>48 hours</strong> of payment, and before any advisory session or
                  service has commenced, are eligible for a full refund.
                </li>
                <li>
                  Once a consultation, site visit, or service has been initiated or delivered, the service is considered
                  used and is non-cancellable.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Refund Eligibility</h2>
              <p className="text-muted-foreground">Refunds may be considered in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Duplicate payment or an amount charged in error.</li>
                <li>Service was paid for but not delivered due to reasons attributable to Land2Land.</li>
                <li>Cancellation made within the eligible window described in Section 3.</li>
              </ul>
              <p className="text-muted-foreground mt-3">Refunds will <strong>not</strong> be provided for:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Services already rendered or consultations already attended.</li>
                <li>Change of mind after a service has commenced.</li>
                <li>Decisions taken by third-party developers, sellers, or regulatory authorities.</li>
                <li>Non-attendance or no-show for a scheduled consultation or site visit.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Refund Process &amp; Timeline</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Approved refunds are processed to the original payment method used at the time of purchase.</li>
                <li>
                  Refunds are typically processed within <strong>7 to 10 business days</strong> of approval, subject to
                  banking and payment-gateway timelines.
                </li>
                <li>
                  Any transaction charges or payment-gateway fees levied by third parties may be deducted from the
                  refundable amount.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. How to Request a Refund</h2>
              <p className="text-muted-foreground">
                To request a refund, email us with your name, registered phone number, payment reference/transaction ID,
                and the reason for the request. Our team will review and respond within a reasonable period.
              </p>
              <div className="p-4 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground"><strong>Email:</strong> info@land2land.com</p>
                <p className="text-muted-foreground"><strong>Phone:</strong> +91-9205190063</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify this Refund &amp; Cancellation Policy at any time. Updates will be posted on
                this page with a revised &quot;Last updated&quot; date. Continued use of our services constitutes acceptance
                of the updated Policy.
              </p>
            </section>

            <section className="space-y-4 border-t pt-6 mt-8">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Refund &amp; Cancellation Policy, you can contact us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>By email:</strong> info@land2land.com</li>
                <li><strong>By phone:</strong> +91-9205190063</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
