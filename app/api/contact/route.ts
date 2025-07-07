import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const messageData = await request.json()

    // Validate required fields
    const { name, email, subject, message } = messageData
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.from("contact_messages").insert([messageData]).select().single()

    if (error) throw error

    return NextResponse.json({ success: true, message: data })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 })
  }
}
