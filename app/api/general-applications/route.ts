import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const { firstName, lastName, email, phone, cvUrl } = applicationData

    if (!firstName || !lastName || !email || !phone || !cvUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from("general_applications")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          current_role: applicationData.currentRole,
          experience: applicationData.experience,
          interested_roles: applicationData.interestedRoles,
          availability_date: applicationData.availabilityDate,
          linkedin_url: applicationData.linkedinUrl,
          portfolio_url: applicationData.portfolioUrl,
          additional_info: applicationData.additionalInfo,
          cv_url: cvUrl,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      message: "Resume submitted successfully",
      applicationId: data.id,
    })
  } catch (error) {
    console.error("Error saving general application:", error)
    return NextResponse.json({ error: "Failed to submit resume" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("general_applications")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
