"use client"

import { useEffect, useState } from "react"
import { Download, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.land2land.app"
const DISMISSED_KEY = "land2land:android-app-prompt-dismissed"

function isInstalledApp() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const isMedianApp = Boolean(window.median || window.gonative) || /median|gonative/.test(userAgent)
  const isStandaloneApp =
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true ||
    document.documentElement.classList.contains("pwa-standalone")

  return isMedianApp || isStandaloneApp
}

export default function AndroidAppDownloadPrompt() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const userAgent = window.navigator.userAgent
    if (!/android/i.test(userAgent) || isInstalledApp()) return

    try {
      if (window.sessionStorage.getItem(DISMISSED_KEY) === "true") return
    } catch {
      // Continue without dismissal persistence when browser storage is unavailable.
    }

    const timer = window.setTimeout(() => setOpen(true), 2200)
    return () => window.clearTimeout(timer)
  }, [])

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(DISMISSED_KEY, "true")
    } catch {
      // The dialog can still close when browser storage is unavailable.
    }
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) setOpen(true)
        else dismiss()
      }}
    >
      <DialogContent className="overflow-hidden p-0 sm:max-w-md" showCloseButton={false}>
        <div className="relative bg-primary px-6 py-7 text-primary-foreground sm:px-8">
          <DialogClose asChild>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Not now"
              className="absolute right-4 top-4 rounded-full p-2 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground"
            >
              <span className="sr-only">Close</span>
              <span aria-hidden="true" className="text-xl leading-none">×</span>
            </button>
          </DialogClose>
          <DialogHeader className="items-start gap-3 pr-8 text-left">
            <span className="flex size-12 items-center justify-center rounded-xl bg-primary-foreground/15">
              <Smartphone className="size-6" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/75">Land2Land for Android</p>
            <DialogTitle className="text-2xl font-bold leading-tight text-primary-foreground sm:text-3xl">
              Find your next piece of land on the app
            </DialogTitle>
          </DialogHeader>
        </div>
        <div className="flex flex-col gap-5 px-6 py-6 sm:px-8">
          <DialogDescription className="text-sm leading-relaxed">
            Browse land listings and keep your search close, wherever you go.
          </DialogDescription>
          <Button asChild size="lg" className="w-full">
            <a href={GOOGLE_PLAY_URL} onClick={dismiss}>
              Download on Google Play
              <Download data-icon="inline-end" />
            </a>
          </Button>
          <button
            type="button"
            onClick={dismiss}
            className="min-h-10 self-center rounded-md px-3 text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
