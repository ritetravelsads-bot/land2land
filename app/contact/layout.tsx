import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Contact", url: "https://land2land.com/contact" }]} />{children}</>
}
