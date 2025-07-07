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

    // Log file details for debugging
    console.log("File upload attempt:", {
      name: file.name,
      type: file.type,
      size: file.size,
      uploadType: type,
    })

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

    // Validate file type for CVs
    if (type === "cvs") {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]

      const allowedExtensions = [".pdf", ".doc", ".docx"]

      const isValidType =
        allowedTypes.includes(file.type) || allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))

      if (!isValidType) {
        return NextResponse.json(
          {
            error: "Invalid file type for CV. Please upload PDF, DOC, or DOCX files only.",
          },
          { status: 400 },
        )
      }
    }

    // Generate unique filename with type prefix
    const filename = generateUniqueFilename(file.name, type)

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: "public",
    })

    console.log("File uploaded successfully:", {
      url: blob.url,
      filename: filename,
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
