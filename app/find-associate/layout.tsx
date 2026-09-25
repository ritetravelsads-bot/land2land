import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function FindAssociateLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Find Associate", url: "https://land2land.com/find-associate" }]} />{children}</>
}
