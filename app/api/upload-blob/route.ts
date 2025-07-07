import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { generateUniqueFilename } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = (formData.get("type") as string) || "general"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (50MB max for videos, 10MB for others)
    const maxSize = file.type.startsWith("video/") ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`,
        },
        { status: 400 },
      )
    }

    // Generate unique filename with type prefix
    const filename = generateUniqueFilename(file.name, type)

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    return NextResponse.json({
      url: blob.url,
      filename: filename,
      size: file.size,
      type: file.type,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
