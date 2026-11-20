
import Image from "next/image"
import Link from "next/link"
import { Bell, ChevronDown, UserRound } from "lucide-react"

export default function MedianAppHeader() {
  return (
    <>
      <header
        className="median-app-header fixed inset-x-0 top-0 z-50 border-b border-[#e9eee7] bg-white/95 shadow-[0_3px_18px_-13px_rgba(30,50,30,0.35)] backdrop-blur-xl"
        style={{
          height: "calc(72px + env(safe-area-inset-top, 0px))",
        }}
      >
        <nav
          aria-label="App navigation"
          className="mx-auto flex h-full w-full max-w-5xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-10"
          style={{
            paddingTop: "env(safe-area-inset-top, 0px)",
            paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
            paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
          }}
        >
          {/* Brand logo */}
          <Link
            href="/"
            aria-label="Land2Land home"
            className="flex min-w-0 flex-1 items-center"
          >
            <Image
              src="/images/logo.png"
              alt="Land2Land"
              width={280}
              height={56}
              priority
              sizes="(max-width: 380px) 132px, (max-width: 640px) 155px, 210px"
              className="h-auto w-[132px] max-w-full object-contain object-left min-[381px]:w-[155px] sm:w-[190px] lg:w-[210px]"
            />
          </Link>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Messages / Notifications */}
            <Link
              href="/buyer/messages"
              aria-label="Messages and notifications"
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-[#e8eee5] bg-white text-[#26352b] shadow-[0_3px_12px_-8px_rgba(20,50,20,0.35)] transition-all duration-200 hover:border-primary/30 hover:bg-[#f4f8f1] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Bell
                className="size-[19px] sm:size-5"
                strokeWidth={1.9}
                aria-hidden="true"
              />

              {/* Notification indicator */}
              <span
                className="absolute right-[9px] top-[9px] size-[7px] rounded-full border-[1.5px] border-white bg-[#16a34a]"
                aria-hidden="true"
              />
            </Link>

            {/* Profile */}
            <Link
              href="/dashboard"
              aria-label="Open profile dashboard"
              className="flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-[#e8eee5] bg-white px-2 shadow-[0_3px_12px_-8px_rgba(20,50,20,0.35)] transition-all duration-200 hover:border-primary/30 hover:bg-[#f4f8f1] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:gap-2 sm:px-2.5"
            >
              <span className="flex size-[33px] items-center justify-center rounded-full bg-[#edf4e9] text-[#17652f] sm:size-9">
                <UserRound
                  className="size-[18px] sm:size-5"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </span>

              <ChevronDown
                className="mr-0.5 size-3.5 text-[#68766b] sm:size-4"
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* Header spacer prevents page content from going underneath the fixed header */}
      <div
        className="w-full shrink-0"
        style={{
          height: "calc(72px + env(safe-area-inset-top, 0px))",
        }}
        aria-hidden="true"
      />
    </>
  )
}
