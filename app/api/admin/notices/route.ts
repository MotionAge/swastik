import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const noticesFile = join(process.cwd(), "data", "notices.json")

export async function GET() {
  try {
    if (!existsSync(noticesFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(noticesFile, "utf8")
    const notices = JSON.parse(data)
    return NextResponse.json(notices)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, type, url } = await request.json()

    // Read existing notices
    let notices = []
    if (existsSync(noticesFile)) {
      const data = readFileSync(noticesFile, "utf8")
      notices = JSON.parse(data)
    }

    // Create new notice
    const newNotice = {
      id: Date.now().toString(),
      title,
      type,
      url,
      date: new Date().toISOString(),
    }

    notices.unshift(newNotice)

    // Save notices
    writeFileSync(noticesFile, JSON.stringify(notices, null, 2))

    return NextResponse.json(newNotice)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 })
  }
}
