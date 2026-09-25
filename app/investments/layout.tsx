import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function InvestmentsLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Investments", url: "https://land2land.com/investments" }]} />{children}</>
}
