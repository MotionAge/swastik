import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const { firstName, lastName, email, phone, coverLetter, jobId, jobTitle, cvUrl } = applicationData

    if (!firstName || !lastName || !email || !phone || !coverLetter || !jobId || !cvUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .insert([
        {
          job_id: jobId,
          job_title: jobTitle,
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          cover_letter: coverLetter,
          experience: applicationData.experience,
          linkedin_url: applicationData.linkedinUrl,
          portfolio_url: applicationData.portfolioUrl,
          cv_url: cvUrl,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: data.id,
    })
  } catch (error) {
    console.error("Error saving application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
