import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Real Estate News | Land2Land - Latest Property Updates",
  description:
    "Stay updated with the latest real estate news, market trends, and property updates from Gurugram and Delhi NCR.",
  alternates: {
    canonical: "https://land2land.in/news",
  },
  openGraph: {
    title: "Real Estate News | Land2Land",
    description: "Latest real estate news and property market updates from Gurugram.",
    url: "https://land2land.in/news",
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
