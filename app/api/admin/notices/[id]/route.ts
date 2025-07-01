import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const noticesFile = join(process.cwd(), "data", "notices.json")

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!existsSync(noticesFile)) {
      return NextResponse.json({ error: "Notices file not found" }, { status: 404 })
    }

    const data = readFileSync(noticesFile, "utf8")
    let notices = JSON.parse(data)

    notices = notices.filter((notice: any) => notice.id !== params.id)

    writeFileSync(noticesFile, JSON.stringify(notices, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 })
  }
}
