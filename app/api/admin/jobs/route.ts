import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const jobsFile = join(process.cwd(), "data", "jobs.json")

export async function GET() {
  try {
    if (!existsSync(jobsFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(jobsFile, "utf8")
    const jobs = JSON.parse(data)
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, department, location, type, salary, description, requirements } = await request.json()

    // Read existing jobs
    let jobs = []
    if (existsSync(jobsFile)) {
      const data = readFileSync(jobsFile, "utf8")
      jobs = JSON.parse(data)
    }

    // Create new job
    const newJob = {
      id: Date.now().toString(),
      title,
      department,
      location,
      type,
      salary,
      description,
      requirements,
      posted: new Date().toISOString(),
    }

    jobs.unshift(newJob)

    // Save jobs
    writeFileSync(jobsFile, JSON.stringify(jobs, null, 2))

    return NextResponse.json(newJob)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}
