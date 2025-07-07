import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin.from("notices").select("*").order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching notices:", error)
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, type, url } = await request.json()

    const { data, error } = await supabaseAdmin.from("notices").insert([{ title, type, url }]).select().single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error creating notice:", error)
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 })
  }
}
