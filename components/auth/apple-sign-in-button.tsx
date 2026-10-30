"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { isFirebaseConfigured } from "@/lib/firebase"
import { useAppPlatform } from "@/lib/median"
import { dashboardPathFor, socialSignIn } from "@/lib/social-auth"
import { Button } from "@/components/ui/button"

interface AppleSignInButtonProps {
  mode?: "login" | "register"
  userType?: "customer" | "associate"
  onSuccess?: () => void
  onError?: (error: string) => void
}

const showOnWeb = process.env.NEXT_PUBLIC_ENABLE_APPLE_SIGNIN === "true"

export default function AppleSignInButton({
  mode = "login",
  userType = "customer",
  onSuccess,
  onError,
}: AppleSignInButtonProps) {
  const router = useRouter()
  const platform = useAppPlatform()
  const [loading, setLoading] = useState(false)

  // Required in the iOS app (App Store Guideline 4.8); optional elsewhere.
  const visible = platform === "median-ios" || (platform === "web" && showOnWeb)
  if (!isFirebaseConfigured || !visible) return null

  const handleAppleSignIn = async () => {
    setLoading(true)
    try {
      const user = await socialSignIn("apple", mode === "register" ? userType : undefined)
      onSuccess?.()
      router.push(dashboardPathFor(user?.user_type))
    } catch (error) {
      console.error("Apple sign-in error:", error)
      onError?.(error instanceof Error ? error.message : "Apple sign-in failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      onClick={handleAppleSignIn}
      disabled={loading}
      className="w-full h-9 text-xs flex items-center justify-center gap-2 bg-foreground text-background hover:bg-foreground/90"
    >
      {loading ? (
        <span>Connecting...</span>
      ) : (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M16.37 1.43c0 1.14-.42 2.2-1.25 3.09-.9.96-1.98 1.52-3.16 1.42-.02-.11-.03-.23-.03-.36 0-1.09.48-2.26 1.32-3.18.42-.47.96-.86 1.6-1.17.64-.3 1.25-.47 1.82-.5.02.23.03.47.03.7zm4.33 15.88c-.36.83-.78 1.6-1.27 2.3-.67.96-1.22 1.62-1.64 1.99-.66.6-1.36.91-2.12.93-.54 0-1.2-.15-1.96-.47-.77-.31-1.47-.47-2.12-.47-.68 0-1.4.16-2.17.47-.78.32-1.4.48-1.88.5-.73.03-1.45-.29-2.17-.96-.46-.4-1.04-1.08-1.73-2.06-.74-1.04-1.35-2.25-1.83-3.62C1.3 14.45 1.04 13 1.04 11.6c0-1.6.35-2.98 1.04-4.14.54-.93 1.27-1.66 2.17-2.2.91-.53 1.89-.8 2.95-.82.58 0 1.34.18 2.28.53.94.35 1.54.53 1.8.53.2 0 .87-.21 2.02-.62 1.08-.39 2-.55 2.75-.49 2.03.16 3.56.97 4.57 2.42-1.82 1.1-2.72 2.65-2.7 4.63.02 1.55.58 2.83 1.68 3.85.5.47 1.05.84 1.67 1.1-.13.39-.28.76-.43 1.13z" />
          </svg>
          <span>{mode === "register" ? "Sign up with Apple" : "Sign in with Apple"}</span>
        </>
      )}
    </Button>
  )
}
