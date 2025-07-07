import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("gallery_items")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { url, alt, caption, file_type, file_size, duration } = await request.json()

    const { data, error } = await supabaseAdmin
      .from("gallery_items")
      .insert([
        {
          url,
          alt_text: alt,
          caption,
          file_type: file_type || "image",
          file_size,
          duration,
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding gallery item:", error)
    return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 })
  }
}
