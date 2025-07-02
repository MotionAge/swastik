import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads")
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true })
    }

    // Create type-specific directory
    const typeDir = join(uploadsDir, type)
    if (!existsSync(typeDir)) {
      mkdirSync(typeDir, { recursive: true })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}_${originalName}`
    const filepath = join(typeDir, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    writeFileSync(filepath, buffer)

    // Return the public URL
    const publicUrl = `/uploads/${type}/${filename}`

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: filename,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
