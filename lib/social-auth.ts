"use client"

import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
  signInWithPopup,
  updateProfile,
  type User,
} from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { detectPlatform, hasMedianSocialLogin, medianSocialLogin } from "@/lib/median"

export type SocialProvider = "google" | "apple"

async function firebaseSignIn(provider: SocialProvider): Promise<User> {
  if (!auth) throw new Error("Sign-in is not configured")
  const inApp = detectPlatform() !== "web"

  if (inApp) {
    // Google and Apple block OAuth popups inside embedded WebViews,
    // so in the Median app we use the native SDKs and hand the token to Firebase.
    if (!hasMedianSocialLogin(provider)) {
      throw new Error(
        `${provider === "apple" ? "Apple" : "Google"} sign-in is not available in this app version. Please sign in with email.`,
      )
    }
    const native = await medianSocialLogin(provider)
    const credential =
      provider === "google"
        ? GoogleAuthProvider.credential(native.idToken)
        : new OAuthProvider("apple.com").credential({ idToken: native.idToken })
    const result = await signInWithCredential(auth, credential)

    const fullName = [native.firstName, native.lastName].filter(Boolean).join(" ")
    if (provider === "apple" && fullName && !result.user.displayName) {
      await updateProfile(result.user, { displayName: fullName }).catch(() => {})
    }
    return result.user
  }

  if (provider === "google") {
    if (!googleProvider) throw new Error("Google sign-in is not configured")
    return (await signInWithPopup(auth, googleProvider)).user
  }

  const appleProvider = new OAuthProvider("apple.com")
  appleProvider.addScope("email")
  appleProvider.addScope("name")
  return (await signInWithPopup(auth, appleProvider)).user
}

export async function socialSignIn(
  provider: SocialProvider,
  userType?: "customer" | "associate",
): Promise<{ user_type: string }> {
  const user = await firebaseSignIn(provider)
  const idToken = await user.getIdToken()

  const response = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      idToken,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      userType,
      provider,
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || "Sign-in failed")
  return data.user
}

export function dashboardPathFor(userType?: string) {
  if (userType === "associate") return "/associate/dashboard"
  if (userType === "admin") return "/admin/dashboard"
  return "/dashboard"
}
