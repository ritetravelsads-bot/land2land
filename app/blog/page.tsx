import type { Metadata } from "next"
import BlogGrid from "@/components/blog/blog-grid"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export const metadata: Metadata = {
  title: "Blog | Land2Land",
  description:
    "Expert insights on agricultural land, real estate investment, RERA compliance, and land buying guides across India from the Land2Land team.",
  alternates: {
    canonical: "https://land2land.com/blog",
  },
  openGraph: {
    type: "website",
    title: "Blog | Land2Land",
    description: "Expert land and real estate insights from the Land2Land team.",
    url: "https://land2land.com/blog",
    siteName: "Land2Land",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Land2Land Blog" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Land2Land",
    description: "Expert land and real estate insights from the Land2Land team.",
    images: ["/og-image.png"],
  },
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero */}
        <section className="w-full py-12 md:py-16 px-4 bg-primary/5 border-b border-border">
          <div className="max-w-4xl mx-auto space-y-3">
            <h1 className="text-primary">Roofing Blog</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              Expert tips, maintenance guides, and industry insights from Land2Land professionals.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="w-full py-12 md:py-16 px-4">
          <div className="">
            <BlogGrid />
          </div>
        </section>
      </main>
    </>
  )
}
