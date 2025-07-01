import { NextResponse } from "next/server"
import { readFileSync, existsSync } from "fs"
import { join } from "path"

const messagesFile = join(process.cwd(), "data", "messages.json")

export async function GET() {
  try {
    if (!existsSync(messagesFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(messagesFile, "utf8")
    const messages = JSON.parse(data)
    return NextResponse.json(messages)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 })
  }
}
