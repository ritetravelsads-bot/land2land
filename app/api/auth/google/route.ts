import { createPublicKey, verify as verifySignature } from "node:crypto"
import { MongoClient } from "mongodb"
import { cookies } from "next/headers"
import { createSessionToken } from "@/lib/session-token"

const mongoUrl = process.env.MONGODB_URI || ""

interface GoogleAuthPayload {
  email: string
  displayName: string
  photoURL: string | null
  uid: string
  userType?: "customer" | "associate"
}

type FirebaseKey = { kid: string; n: string; e: string; kty: string }

class GoogleAuthError extends Error {
  constructor(message: string, readonly status: number = 401) {
    super(message)
  }
}

type FirebaseClaims = {
  aud?: string | string[]
  iss?: string
  sub?: string
  exp?: number
  iat?: number
  email?: string
  email_verified?: boolean | string
  name?: string
  picture?: string
}

const firebaseKeysUrl = "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"

function decodeFirebaseTokenPart<T>(part: string): T {
  try {
    return JSON.parse(Buffer.from(part, "base64url").toString()) as T
  } catch {
    throw new GoogleAuthError("Invalid Google identity token")
  }
}

async function verifyFirebaseIdToken(token: string): Promise<GoogleAuthPayload> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  if (!projectId) throw new GoogleAuthError("Google sign-in is not configured on the server", 503)
  const parts = token.split(".")
  if (parts.length !== 3) throw new GoogleAuthError("Invalid Google identity token")

  const header = decodeFirebaseTokenPart<{ alg?: string; kid?: string }>(parts[0])
  if (header.alg !== "RS256" || !header.kid) throw new GoogleAuthError("Invalid Google identity token")
  const response = await fetch(firebaseKeysUrl, { next: { revalidate: 3600 } })
  if (!response.ok) throw new GoogleAuthError("Unable to verify Google identity", 503)
  const { keys } = await response.json() as { keys: FirebaseKey[] }
  const jwk = keys.find((key) => key.kid === header.kid && key.kty === "RSA")
  if (!jwk) throw new GoogleAuthError("Unable to verify Google identity", 503)

  const key = createPublicKey({ key: jwk, format: "jwk" })
  const valid = verifySignature(
    "RSA-SHA256",
    Buffer.from(`${parts[0]}.${parts[1]}`),
    key,
    Buffer.from(parts[2], "base64url"),
  )
  if (!valid) throw new GoogleAuthError("Invalid Google identity token")

  const claims = decodeFirebaseTokenPart<FirebaseClaims>(parts[1])
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud]
  const emailVerified = claims.email_verified === true || claims.email_verified === "true"
  const now = Date.now() / 1000
  if (
    claims.iss !== `https://securetoken.google.com/${projectId}` ||
    !audiences.includes(projectId) ||
    !claims.sub ||
    !claims.exp ||
    claims.exp <= now ||
    !claims.iat ||
    claims.iat > now + 60 ||
    !claims.email ||
    !emailVerified
  ) {
    throw new GoogleAuthError("Google identity token is invalid, expired, or unverified")
  }

  return {
    uid: claims.sub,
    email: claims.email.toLowerCase(),
    displayName: claims.name || "",
    photoURL: claims.picture || null,
  }
}

async function handleGoogleAuth(payload: GoogleAuthPayload) {
  if (!mongoUrl) {
    throw new Error("MongoDB URI not configured")
  }

  const client = new MongoClient(mongoUrl)

  try {
    await client.connect()
    const db = client.db("land2land")
    const collection = db.collection("users")

    // Check if user already exists by email or firebase UID
    let user = await collection.findOne({
      $or: [
        { email: payload.email.toLowerCase() },
        { firebase_uid: payload.uid }
      ]
    })

    if (user) {
      // User exists - update their info and last login
      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            last_login: new Date(),
            firebase_uid: payload.uid,
            // Update profile picture if not set or if it's from Google
            ...((!user.profile_picture || user.profile_picture.includes("googleusercontent.com")) && payload.photoURL
              ? { profile_picture: payload.photoURL }
              : {}),
            // Update display name if username was generated
            ...(user.username?.startsWith("google_") && payload.displayName
              ? { username: payload.displayName.toLowerCase().replace(/\s+/g, "_") }
              : {}),
          },
        }
      )
      
      // Refresh user data after update
      user = await collection.findOne({ _id: user._id })
    } else {
      // New user - create account
      const username = payload.displayName
        ? payload.displayName.toLowerCase().replace(/\s+/g, "_") + "_" + Date.now().toString(36)
        : "google_" + payload.uid.substring(0, 8)

      const newUser = {
        username,
        email: payload.email.toLowerCase(),
        password: null, // No password for Google auth users
        phone_number: null,
        user_type: payload.userType || "customer",
        profile_picture: payload.photoURL,
        date_joined: new Date(),
        last_login: new Date(),
        firebase_uid: payload.uid,
        auth_provider: "google",
        is_verified: true, // Google accounts are pre-verified
      }

      const result = await collection.insertOne(newUser)
      user = { ...newUser, _id: result.insertedId }
    }

    // Create session token - user is guaranteed to be non-null here
    const currentUser = user!
    const token = createSessionToken({ userId: currentUser._id, email: currentUser.email })

    return {
      id: currentUser._id,
      email: currentUser.email,
      username: currentUser.username,
      user_type: currentUser.user_type,
      profile_picture: currentUser.profile_picture,
      token,
      isNewUser: !currentUser.last_login || (Date.now() - new Date(currentUser.date_joined).getTime() < 5000),
    }
  } finally {
    await client.close()
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { idToken, userType } = body

    if (userType !== undefined && userType !== "customer" && userType !== "associate") {
      return new Response(JSON.stringify({ error: "This account type must be created by an administrator" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }
    if (typeof idToken !== "string" || !idToken) {
      return new Response(JSON.stringify({ error: "Missing Google identity token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const verifiedIdentity = await verifyFirebaseIdToken(idToken)
    const user = await handleGoogleAuth({ ...verifiedIdentity, userType })

    // Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set("auth_token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: user.isNewUser
          ? "Account created successfully"
          : "Logged in successfully",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          user_type: user.user_type,
          profile_picture: user.profile_picture,
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error("Google auth error:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Google authentication failed"

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: error instanceof GoogleAuthError ? error.status : 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
