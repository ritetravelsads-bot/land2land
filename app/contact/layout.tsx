import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "Farm Blog", url: "https://land2land.com/blogs" }]} />{children}</>
}
