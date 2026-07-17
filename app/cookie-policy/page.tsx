import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Cookie Policy | Land2Land",
  description:
    "Learn how Land2Land uses cookies and similar tracking technologies, the types of cookies we use, and how you can manage your cookie preferences.",
  alternates: {
    canonical: "https://land2land.com/cookie-policy",
  },
}

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-12 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Cookie Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: April 04, 2025</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              <p><strong>Website:</strong> https://land2land.com</p>
              <p><strong>Jurisdiction:</strong> Gurugram, Haryana, India</p>
            </div>
          </div>

          <div className="max-w-none text-foreground space-y-6">
            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground">
                This Cookie Policy explains how Land2Land (&quot;Company&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;)
                uses cookies and similar technologies when you visit https://land2land.com. It should be read together with
                our Privacy Policy.
              </p>
              <p className="text-muted-foreground">
                By continuing to use our website, you consent to the use of cookies as described in this Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">2. What Are Cookies?</h2>
              <p className="text-muted-foreground">
                Cookies are small text files placed on your device when you visit a website. They help websites function
                properly, remember your preferences, and provide information to the site owners. Similar technologies such
                as pixels, tags, and local storage may also be used for the same purposes.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground">3. Types of Cookies We Use</h2>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">A. Strictly Necessary Cookies</h3>
                <p className="text-muted-foreground">
                  Required for the website to function, including page navigation, security, and access to secure areas.
                  These cannot be disabled through our system.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">B. Performance &amp; Analytics Cookies</h3>
                <p className="text-muted-foreground">
                  Help us understand how visitors interact with our website by collecting information anonymously, for
                  example through Google Analytics. This enables us to improve site performance and content.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">C. Functional Cookies</h3>
                <p className="text-muted-foreground">
                  Remember choices you make (such as saved preferences or form details) to provide a more personalised
                  experience.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">D. Advertising &amp; Remarketing Cookies</h3>
                <p className="text-muted-foreground">
                  Used by advertising partners such as Google Ads and Meta Ads to deliver relevant advertisements and
                  measure campaign performance, including remarketing pixels.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">4. Third-Party Cookies</h2>
              <p className="text-muted-foreground">
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies,
                and their use is governed by the respective third party&apos;s privacy and cookie policies. These may
                include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Google Analytics &amp; Google Ads</li>
                <li>Meta (Facebook &amp; Instagram) Ads</li>
                <li>Embedded content and social media platforms</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">5. Managing Your Cookie Preferences</h2>
              <p className="text-muted-foreground">
                Most web browsers allow you to control cookies through their settings. You can usually delete existing
                cookies, block future cookies, or receive a warning before a cookie is stored. Please note that disabling
                certain cookies may affect the functionality and performance of our website.
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Adjust cookie settings in your browser preferences.</li>
                <li>Opt out of personalised ads via your Google and Meta ad settings.</li>
                <li>Use browser privacy or incognito modes to limit tracking.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">6. Changes to This Policy</h2>
              <p className="text-muted-foreground">
                We may update this Cookie Policy from time to time to reflect changes in technology, law, or our practices.
                Updates will be posted on this page with a revised &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="space-y-4 border-t pt-6 mt-8">
              <h2 className="text-2xl font-semibold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Cookie Policy, you can contact us:
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
