import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const galleryFile = join(process.cwd(), "data", "gallery.json")

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!existsSync(galleryFile)) {
      return NextResponse.json({ error: "Gallery file not found" }, { status: 404 })
    }

    const data = readFileSync(galleryFile, "utf8")
    let images = JSON.parse(data)

    images = images.filter((image: any) => image.id !== params.id)

    writeFileSync(galleryFile, JSON.stringify(images, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 })
  }
}
