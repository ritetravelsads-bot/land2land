import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Sell Land", url: "https://land2land.com/sell" }]} />{children}</>
}
