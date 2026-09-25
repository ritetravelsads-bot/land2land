import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "About Land2Land", url: "https://land2land.com/about" }]} />{children}</>
}
