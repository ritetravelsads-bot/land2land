"use client"

import { useEffect, useState } from "react"
import { WifiOff, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener("online", update)
    window.addEventListener("offline", update)
    return () => {
      window.removeEventListener("online", update)
      window.removeEventListener("offline", update)
    }
  }, [])

  // Automatically return to the app once the connection is restored.
  useEffect(() => {
    if (online) {
      const t = setTimeout(() => {
        window.location.href = "/"
      }, 800)
      return () => clearTimeout(t)
    }
  }, [online])

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#125007]/10">
        <WifiOff className="h-9 w-9 text-[#125007]" aria-hidden="true" />
      </div>

      <h1 className="mt-6 text-2xl font-semibold text-balance text-gray-900">
        {online ? "You're back online" : "You're offline"}
      </h1>

      <p className="mt-3 max-w-sm text-pretty leading-relaxed text-gray-600">
        {online
          ? "Reconnecting you to Land2Land..."
          : "We can't reach Land2Land right now. Check your internet connection and try again."}
      </p>

      <Button
        onClick={() => window.location.reload()}
        className="mt-8 bg-[#125007] hover:bg-[#1d3610]"
        size="lg"
      >
        <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    </main>
  )
}
