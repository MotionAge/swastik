import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const messagesFile = join(process.cwd(), "data", "messages.json")

// Ensure data directory exists
import { mkdirSync } from "fs"
const dataDir = join(process.cwd(), "data")
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Read existing messages
    let messages = []
    if (existsSync(messagesFile)) {
      const data = readFileSync(messagesFile, "utf8")
      messages = JSON.parse(data)
    }

    // Add new message
    const newMessage = {
      id: Date.now().toString(),
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      read: false,
    }

    messages.unshift(newMessage)

    // Save messages
    writeFileSync(messagesFile, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
