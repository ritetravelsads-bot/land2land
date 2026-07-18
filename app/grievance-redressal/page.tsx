import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Grievance Redressal Policy | Land2Land",
  description:
    "Land2Land grievance redressal mechanism in compliance with the Information Technology Rules, 2021. Learn how to raise complaints and contact our Grievance Officer.",
  alternates: {
    canonical: "https://land2land.com/grievance-redressal",
  },
}

export default function GrievanceRedressalPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-12 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Grievance Redressal Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: April 04, 2025</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              <p><strong>Website:</strong> https://land2land.com</p>
              <p><strong>Jurisdiction:</strong> Gurugram, Haryana, India</p>
            </div>
          </div>

          <div className="max-w-none text-foreground space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Purpose</h2>
              <p className="text-muted-foreground">
                Land2Land (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;) is committed to providing a
                transparent and effective mechanism for the timely resolution of complaints and grievances from users,
                buyers, sellers, and visitors. This Policy is published in accordance with the Information Technology
                (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021 and the Consumer Protection Act, 2019.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. Scope of Grievances</h2>
              <p className="text-muted-foreground">You may raise a grievance regarding, but not limited to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Inaccurate, misleading, or unauthorized land or property listings.</li>
                <li>Misuse of your personal data or privacy-related concerns.</li>
                <li>Content that is unlawful, offensive, or infringes intellectual property rights.</li>
                <li>Conduct of agents, developers, or other users on the platform.</li>
                <li>Quality or delivery of advisory and consultation services.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">3. How to File a Grievance</h2>
              <p className="text-muted-foreground">
                To register a complaint, please email us with the following details so that we can investigate effectively:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Your full name and registered contact details.</li>
                <li>A clear description of the grievance.</li>
                <li>The URL of the listing or page concerned (if applicable).</li>
                <li>Supporting documents, screenshots, or evidence.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Grievance Officer</h2>
              <p className="text-muted-foreground">
                In compliance with the Information Technology Act, 2000 and rules made thereunder, the name and contact
                details of the Grievance Officer are provided below:
              </p>
              <div className="p-4 bg-card border border-border rounded-lg space-y-1">
                <p className="text-muted-foreground"><strong>Grievance Officer:</strong> Grievance Redressal Team</p>
                <p className="text-muted-foreground"><strong>Email:</strong> grievance@land2land.com</p>
                <p className="text-muted-foreground"><strong>Phone:</strong> +91-9205190063</p>
                <p className="text-muted-foreground"><strong>Address:</strong> IRIS Tech Park, Unit No. 407, Gurugram, Haryana, India</p>
                <p className="text-muted-foreground"><strong>Working Hours:</strong> Monday to Saturday, 9:00 AM – 6:00 PM IST</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Resolution Timelines</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  We will acknowledge every grievance within <strong>24 hours</strong> of receipt.
                </li>
                <li>
                  Grievances will be resolved within <strong>15 days</strong> from the date of receipt, in line with
                  applicable law.
                </li>
                <li>
                  Requests to remove unlawful or privacy-infringing content will be addressed on a priority basis, within
                  the timelines prescribed under the IT Rules, 2021.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Escalation</h2>
              <p className="text-muted-foreground">
                If you are not satisfied with the resolution provided, or if the grievance is not resolved within the
                stipulated time, you may escalate the matter to our senior management by writing to
                info@land2land.com with the original complaint reference. We will conduct a further review and respond
                accordingly.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">7. Abuse of the Mechanism</h2>
              <p className="text-muted-foreground">
                Frivolous, false, or malicious complaints intended to harass other users or the Company may be dismissed.
                Land2Land reserves the right to take appropriate action against any misuse of this grievance redressal
                mechanism.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">8. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify this Grievance Redressal Policy at any time. Updates will be posted on this
                page with a revised &quot;Last updated&quot; date. Continued use of our services constitutes acceptance of
                the updated Policy.
              </p>
            </section>

            <section className="space-y-4 border-t pt-6 mt-8">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                For any questions about this Grievance Redressal Policy, you can reach us:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>By email:</strong> grievance@land2land.com</li>
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
