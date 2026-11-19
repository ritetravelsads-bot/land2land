import { createPublicKey, verify as verifySignature } from "node:crypto"
import { cookies } from "next/headers"
import { MongoClient } from "mongodb"
import { createSessionToken } from "@/lib/session-token"

const mongoUrl = process.env.MONGODB_URI || ""
const appleKeysUrl = "https://appleid.apple.com/auth/keys"
const appleIssuer = "https://appleid.apple.com"

type AppleKey = { kid: string; n: string; e: string; kty: string; alg?: string }
type AppleClaims = {
  iss?: string
  aud?: string | string[]
  exp?: number
  sub?: string
  email?: string
  email_verified?: boolean | string
}

async function verifyAppleIdentityToken(token: string): Promise<AppleClaims> {
  const parts = token.split(".")
  if (parts.length !== 3) throw new Error("Invalid Apple identity token")

  const header = JSON.parse(Buffer.from(parts[0], "base64url").toString()) as { alg?: string; kid?: string }
  if (header.alg !== "RS256" || !header.kid) throw new Error("Invalid Apple identity token")

  const response = await fetch(appleKeysUrl, { next: { revalidate: 3600 } })
  if (!response.ok) throw new Error("Unable to verify Apple identity")
  const { keys } = (await response.json()) as { keys: AppleKey[] }
  const jwk = keys.find((key) => key.kid === header.kid && key.kty === "RSA")
  if (!jwk) throw new Error("Unable to verify Apple identity")

  const key = createPublicKey({ key: jwk, format: "jwk" })
  const signedContent = `${parts[0]}.${parts[1]}`
  const valid = verifySignature("RSA-SHA256", Buffer.from(signedContent), key, Buffer.from(parts[2], "base64url"))
  if (!valid) throw new Error("Invalid Apple identity token")

  const claims = JSON.parse(Buffer.from(parts[1], "base64url").toString()) as AppleClaims
  const allowedAudiences = (process.env.APPLE_CLIENT_ID || "").split(",").map((value) => value.trim()).filter(Boolean)
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud]

  if (!allowedAudiences.length) throw new Error("Apple sign-in is not configured on the server")
  if (claims.iss !== appleIssuer || !claims.sub || !claims.exp || claims.exp <= Date.now() / 1000) {
    throw new Error("Invalid or expired Apple identity token")
  }
  if (!audiences.some((audience) => audience && allowedAudiences.includes(audience))) {
    throw new Error("Apple identity token audience does not match this app")
  }

  return claims
}

export async function POST(request: Request) {
  try {
    if (!mongoUrl) throw new Error("MongoDB URI not configured")
    const body = (await request.json()) as {
      idToken?: string
      firstName?: string
      lastName?: string
      userType?: "customer" | "associate"
    }
    if (!body.idToken) {
      return Response.json({ error: "Missing Apple identity token" }, { status: 400 })
    }

    const claims = await verifyAppleIdentityToken(body.idToken)
    const email = claims.email?.toLowerCase()
    const isVerifiedEmail = claims.email_verified === true || claims.email_verified === "true"
    const client = new MongoClient(mongoUrl)

    try {
      await client.connect()
      const collection = client.db("land2land").collection("users")
      let user = await collection.findOne({ apple_sub: claims.sub })

      if (!user && email && isVerifiedEmail) {
        user = await collection.findOne({ email })
      }

      if (user) {
        await collection.updateOne(
          { _id: user._id },
          { $set: { apple_sub: claims.sub, auth_provider: user.auth_provider || "apple", last_login: new Date() } },
        )
        user = await collection.findOne({ _id: user._id })
      } else {
        if (!email || !isVerifiedEmail) {
          return Response.json(
            { error: "Apple did not provide a verified email. Sign in to your existing account first, or try Apple sign-in again." },
            { status: 400 },
          )
        }

        const fullName = [body.firstName, body.lastName].filter(Boolean).join(" ").trim()
        const baseUsername = fullName ? fullName.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "") : "apple_user"
        const newUser = {
          username: `${baseUsername}_${Date.now().toString(36)}`,
          email,
          password: null,
          phone_number: null,
          user_type: body.userType === "associate" ? "associate" : "customer",
          profile_picture: null,
          date_joined: new Date(),
          last_login: new Date(),
          apple_sub: claims.sub,
          auth_provider: "apple",
          is_verified: true,
        }
        const result = await collection.insertOne(newUser)
        user = { ...newUser, _id: result.insertedId }
      }

      if (!user) throw new Error("Unable to create or locate your account")
      const token = createSessionToken({ userId: user._id, email: user.email })
      const cookieStore = await cookies()
      cookieStore.set("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      })

      return Response.json({
        success: true,
        user: { id: user._id, email: user.email, username: user.username, user_type: user.user_type, profile_picture: user.profile_picture },
      })
    } finally {
      await client.close()
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Apple sign-in failed"
    const status = message.includes("not configured") ? 503 : 401
    return Response.json({ error: message }, { status })
  }
}
