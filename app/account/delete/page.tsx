import type { Metadata } from "next"
import Link from "next/link"
import { Trash2, Mail, ShieldCheck, ListChecks } from "lucide-react"

export const metadata: Metadata = {
  title: "Delete Your Account | Land2Land",
  description:
    "Learn how to permanently delete your Land2Land account and the personal data associated with it, either from within the app or by request.",
}

const SUPPORT_EMAIL = "info@land2land.com"

export default function DeleteAccountInfoPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10">
          <Trash2 className="h-5 w-5 text-destructive" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">Delete Your Account</h1>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        This page explains how to request deletion of your Land2Land account and the personal data associated
        with it. You can delete your account at any time using either method below.
      </p>

      {/* Method 1: in-app */}
      <section className="mt-8 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">Option 1: Delete from within the app</h2>
        </div>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Sign in to your Land2Land account.</li>
          <li>Open your dashboard and go to your Profile page.</li>
          <li>
            Scroll to the <span className="font-medium text-foreground">Delete Account</span> section.
          </li>
          <li>
            Select <span className="font-medium text-foreground">Delete My Account</span>, type{" "}
            <span className="font-medium text-foreground">DELETE</span> to confirm, and submit.
          </li>
        </ol>
        <div className="mt-4">
          <Link
            href="/auth/login"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Sign in to delete my account
          </Link>
        </div>
      </section>

      {/* Method 2: by request */}
      <section className="mt-6 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">Option 2: Request deletion by email</h2>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          If you are unable to sign in, email us from the address associated with your account and we will
          process your deletion request.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=Account%20Deletion%20Request`}
          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          {SUPPORT_EMAIL}
        </a>
      </section>

      {/* What is deleted */}
      <section className="mt-6 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">What data is deleted</h2>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          When your account is deleted, we permanently remove the following personal data:
        </p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
          <li>Your account profile (name, email, and phone number)</li>
          <li>Property listings you created</li>
          <li>Support tickets and requests you submitted</li>
          <li>Your login credentials and session data</li>
        </ul>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Deletion is permanent and cannot be undone. Requests submitted by email are typically processed
          within 30 days. Certain records may be retained where required by law (for example, transaction or
          tax records), as described in our{" "}
          <Link href="/privacy-policy" className="font-medium text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
