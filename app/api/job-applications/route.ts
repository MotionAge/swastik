import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync, mkdirSync } from "fs"
import { join } from "path"

const applicationsFile = join(process.cwd(), "data", "applications.json")

// Ensure data directory exists
const dataDir = join(process.cwd(), "data")
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const applicationData = await request.json()

    // Validate required fields
    const { firstName, lastName, email, phone, coverLetter, jobId, jobTitle, cvUrl } = applicationData

    if (!firstName || !lastName || !email || !phone || !coverLetter || !jobId || !cvUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Read existing applications
    let applications = []
    if (existsSync(applicationsFile)) {
      const data = readFileSync(applicationsFile, "utf8")
      applications = JSON.parse(data)
    }

    // Create new application
    const newApplication = {
      id: Date.now().toString(),
      ...applicationData,
      submittedAt: new Date().toISOString(),
      status: "pending", // pending, reviewed, shortlisted, rejected, hired
    }

    applications.unshift(newApplication)

    // Save applications
    writeFileSync(applicationsFile, JSON.stringify(applications, null, 2))

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: newApplication.id,
    })
  } catch (error) {
    console.error("Error saving application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}

export async function GET() {
  try {
    if (!existsSync(applicationsFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(applicationsFile, "utf8")
    const applications = JSON.parse(data)
    return NextResponse.json(applications)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}
