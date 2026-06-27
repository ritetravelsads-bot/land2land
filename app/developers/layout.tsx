import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Top Real Estate Developers in Gurugram | Land2Land",
  description:
    "Explore trusted real estate developers in Gurugram and Delhi NCR. Find verified builders with premium residential and commercial projects.",
  alternates: {
    canonical: "https://land2land.in/developers",
  },
  openGraph: {
    title: "Real Estate Developers | Land2Land",
    description: "Browse top real estate developers and builders in Gurugram.",
    url: "https://land2land.in/developers",
  },
}

export default function DevelopersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
