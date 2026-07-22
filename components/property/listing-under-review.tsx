import Link from "next/link"
import { Clock, ArrowLeft } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function ListingUnderReview() {
  return (
    <>
      <Header />
      <main className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground text-balance">This listing is under review</h1>
          <p className="mt-3 text-muted-foreground text-pretty">
            This land is being verified by our team and is not publicly available yet. Please check back soon, or
            browse other verified listings in the meantime.
          </p>
          <div className="mt-6">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ArrowLeft className="h-4 w-4" />
              Browse verified listings
            </Link>
          </div>
        </div>
      </main>

    </>
  )
}
