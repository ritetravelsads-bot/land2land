import ImageKit from "imagekit"
import crypto from "crypto"

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || ""
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || ""
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/countryroofdata"

// Keep SDK instance for auth parameter generation (pure HMAC, no HTTP)
const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
})

export function getImageKitAuthenticationParameters() {
  if (!privateKey) {
    console.warn("[imagekit] IMAGEKIT_PRIVATE_KEY is not set. Upload auth will be unavailable.")
    return { token: "", expire: 0, signature: "" }
  }
  const token = crypto.randomUUID()
  const expire = Math.floor(Date.now() / 1000) + 3600
  const signature = crypto
    .createHmac("sha1", privateKey)
    .update(token + expire)
    .digest("hex")
  return { token, expire, signature }
}

/**
 * Upload a file buffer directly to ImageKit using their REST API.
 * Uses native fetch instead of the SDK to avoid axios/form-data issues in Next.js App Router.
 */
export async function uploadToImageKit(
  file: Buffer | string,
  fileName: string,
  folder = "countryroof"
): Promise<{ url: string; fileId: string; name: string; thumbnailUrl?: string; size?: number }> {
  if (!privateKey) {
    throw new Error("IMAGEKIT_PRIVATE_KEY is not configured")
  }

  const formData = new FormData()

  if (Buffer.isBuffer(file)) {
    const blob = new Blob([file])
    formData.append("file", blob, fileName)
  } else {
    // base64 or URL string
    formData.append("file", file)
  }

  formData.append("fileName", fileName)
  formData.append("folder", folder)

  // ImageKit upload API uses HTTP Basic Auth: privateKey as username, empty password
  const credentials = Buffer.from(`${privateKey}:`).toString("base64")

  const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`ImageKit upload failed (${response.status}): ${errorText}`)
  }

  const data = await response.json()
  return {
    url: data.url,
    fileId: data.fileId,
    name: data.name,
    thumbnailUrl: data.thumbnailUrl,
    size: data.size,
  }
}

export { imagekit }
