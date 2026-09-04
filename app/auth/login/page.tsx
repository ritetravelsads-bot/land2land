import type { Metadata } from "next"
import LoginForm from "@/components/forms/login-form"
import ListLandPromo from "@/components/auth/list-land-promo"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Login | Land2Land",
  description: "Login to your Land2Land account to manage land properties, find investments, or connect with associates.",
}

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full median-auth-page lg:grid lg:grid-cols-[65fr_35fr]">
      {/* Left: List Your Land promo (65%) — hidden on small screens */}
      <section className="relative hidden lg:block" aria-label="List your land on Land2Land">
        <ListLandPromo />
      </section>

      {/* Right: Login form (35%) */}
      <section className="flex items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-sm">
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
              <p className="text-sm text-muted-foreground">Sign in to your Land2Land account</p>
            </div>

            <LoginForm />

            <div className="space-y-2 text-center text-sm">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  Create one
                </Link>
              </p>
              <Link href="#" className="text-primary hover:underline block">
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
