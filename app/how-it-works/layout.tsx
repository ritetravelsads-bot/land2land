import BreadcrumbJsonLd from "@/components/seo/breadcrumb-json-ld"

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <><BreadcrumbJsonLd items={[{ name: "Home", url: "https://land2land.com/" }, { name: "How It Works", url: "https://land2land.com/how-it-works" }]} />{children}</>
}
