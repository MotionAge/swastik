import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, department, location, type, salary, description, requirements } = await request.json()

    const { data, error } = await supabaseAdmin
      .from("jobs")
      .update({
        title,
        department,
        location,
        type,
        salary,
        description,
        requirements,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error updating job:", error)
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("Attempting to delete job with ID:", params.id)

    // Update applications to mark the job as deleted but keep the applications
    const { error: applicationsError } = await supabaseAdmin
      .from("job_applications")
      .update({ 
        job_title: `${await getJobTitle(params.id)} (Job Deleted)`,
        job_id: null // Remove the foreign key reference
      })
      .eq("job_id", params.id)

    if (applicationsError) {
      console.error("Error updating job applications:", applicationsError)
      // Continue with job deletion even if applications update fails
    }

    // Delete the job
    const { error: jobError } = await supabaseAdmin.from("jobs").delete().eq("id", params.id)

    if (jobError) {
      console.error("Error deleting job:", jobError)
      throw jobError
    }

    console.log("Job deleted successfully:", params.id)
    return NextResponse.json({ 
      success: true, 
      message: "Job deleted successfully. Applications have been preserved and marked as 'Job Deleted'." 
    })
  } catch (error) {
    console.error("Error deleting job:", error)
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}

// Helper function to get job title before deletion
async function getJobTitle(jobId: string): Promise<string> {
  try {
    const { data, error } = await supabaseAdmin
      .from("jobs")
      .select("title")
      .eq("id", jobId)
      .single()
    
    if (error || !data) return "Unknown Job"
    return data.title
  } catch (error) {
    return "Unknown Job"
  }
}
