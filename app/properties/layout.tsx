import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Luxury Properties in Gurgaon | 3 BHK, 4 BHK, Villas & Plots | Land2Land",
  description:
    "RERA-verified luxury apartments, villas & plots in Gurgaon. Ready-to-move & new launch across Dwarka Expressway, Golf Course Road & SPR. Zero brokerage.",
  alternates: {
    canonical: "https://land2land.in/properties",
  },
  openGraph: {
    title: "Buy Luxury Properties in Gurgaon | 3 BHK, 4 BHK, Villas & Plots | Land2Land",
    description: "RERA-verified luxury apartments, villas & plots in Gurgaon. Ready-to-move & new launch across Dwarka Expressway, Golf Course Road & SPR. Zero brokerage.",
    url: "https://land2land.in/properties",
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
