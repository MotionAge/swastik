import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const messagesFile = join(process.cwd(), "data", "messages.json")

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { read } = await request.json()

    if (!existsSync(messagesFile)) {
      return NextResponse.json({ error: "Messages file not found" }, { status: 404 })
    }

    const data = readFileSync(messagesFile, "utf8")
    const messages = JSON.parse(data)

    const messageIndex = messages.findIndex((msg: any) => msg.id === params.id)
    if (messageIndex === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 })
    }

    messages[messageIndex].read = read

    writeFileSync(messagesFile, JSON.stringify(messages, null, 2))

    return NextResponse.json(messages[messageIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!existsSync(messagesFile)) {
      return NextResponse.json({ error: "Messages file not found" }, { status: 404 })
    }

    const data = readFileSync(messagesFile, "utf8")
    let messages = JSON.parse(data)

    messages = messages.filter((msg: any) => msg.id !== params.id)

    writeFileSync(messagesFile, JSON.stringify(messages, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 })
  }
}
