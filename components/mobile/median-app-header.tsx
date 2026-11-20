import Image from "next/image"
import Link from "next/link"
import { Bell, ChevronDown, UserRound } from "lucide-react"

export default function MedianAppHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 shadow-[0_3px_14px_-13px_rgba(30,50,30,0.45)] backdrop-blur-md">
        <nav aria-label="App navigation" className="mx-auto flex h-full max-w-5xl items-center justify-between px-5 sm:px-6 lg:px-10">
          <Link href="/" aria-label="Land2Land home" className="flex min-h-11 items-center">
            <Image
              src="/images/logo.png"
              alt="Land2Land"
              width={280}
              height={56}
              priority
              className="h-auto w-[170px] object-contain object-left sm:w-[210px]"
            />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/buyer/messages"
              aria-label="Messages and notifications"
              className="relative flex size-12 items-center justify-center rounded-full border border-border/40 bg-white text-foreground shadow-[0_5px_18px_-13px_rgba(20,30,20,0.6)] transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Bell className="size-[21px]" aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              aria-label="Open profile"
              className="flex h-12 items-center gap-2 rounded-full border border-border/40 bg-white px-2.5 text-foreground shadow-[0_5px_18px_-13px_rgba(20,30,20,0.6)] transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-[#edf3e9] text-primary"><UserRound className="size-5" aria-hidden="true" /></span>
              <ChevronDown className="mr-1 size-4" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>
      <div className="w-full" style={{ height: "64px" }} aria-hidden="true" />
    </>
  )
}
