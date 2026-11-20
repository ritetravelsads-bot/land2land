import Image from "next/image"
import Link from "next/link"
import { Bell, UserRound } from "lucide-react"

export default function MedianAppHeader() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 shadow-[0_3px_14px_-13px_rgba(30,50,30,0.45)] backdrop-blur-md">
        <nav aria-label="App navigation" className="mx-auto flex h-full max-w-2xl items-center justify-between px-4">
          <Link href="/" aria-label="Land2Land home" className="flex min-h-11 items-center">
            <Image
              src="/images/logo.png"
              alt="Land2Land"
              width={160}
              height={32}
              priority
              className="h-8 w-40 object-contain object-left"
            />
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/buyer/messages"
              aria-label="Messages and notifications"
              className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Bell className="size-5" aria-hidden="true" />
            </Link>
            <Link
              href="/dashboard"
              aria-label="Profile"
              className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <UserRound className="size-5" aria-hidden="true" />
            </Link>
          </div>
        </nav>
      </header>
      <div className="w-full" style={{ height: "64px" }} aria-hidden="true" />
    </>
  )
}
