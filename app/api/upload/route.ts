import { NextRequest, NextResponse } from "next/server"
import { uploadToImageKit } from "@/lib/imagekit"

export async function POST(req: NextRequest) {
  try {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
    if (!privateKey) {
      return NextResponse.json(
        { error: "ImageKit is not configured. Please set IMAGEKIT_PRIVATE_KEY." },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const file = formData.get("file") as File | null
    const folder = (formData.get("folder") as string) || "properties"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (10 MB max)
    const MAX_BYTES = 10 * 1024 * 1024
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File exceeds 10 MB limit" }, { status: 400 })
    }

    // Convert File → Buffer for the upload helper
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await uploadToImageKit(buffer, file.name, folder)

    return NextResponse.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      name: result.name,
      thumbnailUrl: result.thumbnailUrl,
      size: result.size,
    })
  } catch (error) {
    console.error("[upload] Error:", error)
    return NextResponse.json(
      { error: "Failed to upload file", details: String(error) },
      { status: 500 }
    )
  }
}
