import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

const generalApplicationsFile = join(process.cwd(), "data", "general-applications.json")

// Ensure data directory exists
const dataDir = join(process.cwd(), "data")
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const { firstName, lastName, email, phone, cvUrl } = applicationData

    if (!firstName || !lastName || !email || !phone || !cvUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Read existing applications
    let applications = []
    if (existsSync(generalApplicationsFile)) {
      const data = readFileSync(generalApplicationsFile, "utf8")
      applications = JSON.parse(data)
    }

    // Create new application
    const newApplication = {
      id: Date.now().toString(),
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: "pending", // pending, reviewed, contacted, archived
      type: "general", // to distinguish from job-specific applications
    }

    applications.unshift(newApplication)

    // Save applications
    writeFileSync(generalApplicationsFile, JSON.stringify(applications, null, 2))

    return NextResponse.json({
      success: true,
      message: "Resume submitted successfully",
      applicationId: newApplication.id,
    })
  } catch (error) {
    console.error("Error saving general application:", error)
    return NextResponse.json({ error: "Failed to submit resume" }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!existsSync(generalApplicationsFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(generalApplicationsFile, "utf8")
    const applications = JSON.parse(data)
    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
