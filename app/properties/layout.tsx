import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export const metadata: Metadata = {
  title: "Buy Luxury Properties in Gurgaon | 3 BHK, 4 BHK, Villas & Plots | Land2Land",
  description:
    "RERA-verified luxury apartments, villas & plots in Gurgaon. Ready-to-move & new launch across Dwarka Expressway, Golf Course Road & SPR. Zero brokerage.",
  alternates: {
    canonical: "https://land2land.com/properties",
  },
  openGraph: {
    title: "Buy Luxury Properties in Gurgaon | 3 BHK, 4 BHK, Villas & Plots | Land2Land",
    description: "RERA-verified luxury apartments, villas & plots in Gurgaon. Ready-to-move & new launch across Dwarka Expressway, Golf Course Road & SPR. Zero brokerage.",
    url: "https://land2land.com/properties",
  },
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Buy Land", url: "https://land2land.com/properties" }]} />{children}</>
}
