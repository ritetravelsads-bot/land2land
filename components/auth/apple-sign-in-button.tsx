"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

type AppleLoginResult = {
  idToken?: string
  firstName?: string
  lastName?: string
}

type MedianAppleBridge = {
  socialLogin?: {
    apple?: {
      login?: (options: { callback: (result: AppleLoginResult) => void }) => void
    }
  }
}

declare global {
  interface Window {
    median?: MedianAppleBridge
    gonative?: MedianAppleBridge
  }
}

interface AppleSignInButtonProps {
  mode: "login" | "register"
  userType?: "customer" | "associate"
  onError: (message: string) => void
}

export default function AppleSignInButton({ mode, userType = "customer", onError }: AppleSignInButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleAppleSignIn = () => {
    const bridge = window.median || window.gonative
    const login = bridge?.socialLogin?.apple?.login

    if (typeof login !== "function") {
      onError("Apple sign-in is available in the Median app. Please open this page in the app and try again.")
      return
    }

    setLoading(true)
    try {
      login({
        callback: async (result) => {
          try {
            if (!result?.idToken) throw new Error("Apple did not return an identity token. Please try again.")
            const response = await fetch("/api/auth/apple", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                idToken: result.idToken,
                firstName: result.firstName,
                lastName: result.lastName,
                userType: mode === "register" ? userType : undefined,
              }),
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.error || "Apple sign-in failed")

            const destination = data.user.user_type === "associate"
              ? "/associate/dashboard"
              : data.user.user_type === "admin"
                ? "/admin/dashboard"
                : "/buyer"
            window.location.assign(destination)
          } catch (error) {
            onError(error instanceof Error ? error.message : "Apple sign-in failed")
            setLoading(false)
          }
        },
      })
    } catch (error) {
      onError(error instanceof Error ? error.message : "Could not start Apple sign-in. Please try again.")
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleAppleSignIn}
      disabled={loading}
      className="w-full h-9 text-xs flex items-center justify-center gap-2"
    >
      {loading ? (
        <span>Connecting...</span>
      ) : (
        <>
          <svg aria-hidden="true" className="h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M16.37 12.2c.02 2.2 1.93 2.93 1.95 2.94-.02.05-.3 1.04-1 2.06-.6.88-1.23 1.76-2.21 1.78-.96.02-1.27-.57-2.37-.57s-1.45.55-2.36.59c-.95.04-1.67-.95-2.27-1.82-1.23-1.78-2.17-5.04-.91-7.24.63-1.09 1.76-1.78 2.98-1.8.93-.02 1.8.63 2.37.63.57 0 1.64-.78 2.77-.66.47.02 1.8.19 2.65 1.44-.07.04-1.58.92-1.6 2.65ZM14.55 6.9c.5-.6.84-1.43.75-2.26-.72.03-1.59.48-2.11 1.08-.46.53-.87 1.37-.76 2.18.8.06 1.62-.4 2.12-1Z" />
          </svg>
          <span>{mode === "register" ? "Sign up with Apple" : "Sign in with Apple"}</span>
        </>
      )}
    </Button>
  )
}
