import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const galleryFile = join(process.cwd(), "data", "gallery.json")

export async function GET() {
  try {
    if (!existsSync(galleryFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(galleryFile, "utf8")
    const images = JSON.parse(data)
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, alt, caption } = await request.json()

    // Read existing images
    let images = []
    if (existsSync(galleryFile)) {
      const data = readFileSync(galleryFile, "utf8")
      images = JSON.parse(data)
    }

    // Create new image
    const newImage = {
      id: Date.now().toString(),
      url,
      alt,
      caption,
    }

    images.unshift(newImage)

    // Save images
    writeFileSync(galleryFile, JSON.stringify(images, null, 2))

    return NextResponse.json(newImage)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 })
  }
}
