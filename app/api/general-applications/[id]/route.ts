import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()

    const { data, error } = await supabaseAdmin
      .from("general_applications")
      .update({ status })
      .eq("id", params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating general application:", error)
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("Attempting to delete general application with ID:", params.id)

    const { error } = await supabaseAdmin.from("general_applications").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting general application:", error)
      throw error
    }

    console.log("General application deleted successfully:", params.id)
    return NextResponse.json({ success: true, message: "Resume submission deleted successfully" })
  } catch (error) {
    console.error("Error deleting general application:", error)
    return NextResponse.json({ error: "Failed to delete resume submission" }, { status: 500 })
  }
}
