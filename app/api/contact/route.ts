import { type NextRequest, NextResponse } from "next/server"
import { createContactMessage } from "@/lib/data-supabase"

export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json()

    // Validate required fields
    const { name, email, subject, message } = messageData
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const newMessage = await createContactMessage(messageData)
    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
