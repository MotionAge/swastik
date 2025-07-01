import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const jobsFile = join(process.cwd(), "data", "jobs.json")

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, department, location, type, salary, description, requirements } = await request.json()

    if (!existsSync(jobsFile)) {
      return NextResponse.json({ error: "Jobs file not found" }, { status: 404 })
    }

    const data = readFileSync(jobsFile, "utf8")
    const jobs = JSON.parse(data)

    const jobIndex = jobs.findIndex((job: any) => job.id === params.id)
    if (jobIndex === -1) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Update job
    jobs[jobIndex] = {
      ...jobs[jobIndex],
      title,
      department,
      location,
      type,
      salary,
      description,
      requirements,
    }

    writeFileSync(jobsFile, JSON.stringify(jobs, null, 2))

    return NextResponse.json(jobs[jobIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!existsSync(jobsFile)) {
      return NextResponse.json({ error: "Jobs file not found" }, { status: 404 })
    }

    const data = readFileSync(jobsFile, "utf8")
    let jobs = JSON.parse(data)

    jobs = jobs.filter((job: any) => job.id !== params.id)

    writeFileSync(jobsFile, JSON.stringify(jobs, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 })
  }
}
