import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Pricing & Fees", url: "https://land2land.com/pricing" }]} />{children}</>
}
