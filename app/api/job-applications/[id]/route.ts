import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const applicationsFile = join(process.cwd(), "data", "applications.json")

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json()

    if (!existsSync(applicationsFile)) {
      return NextResponse.json({ error: "Applications file not found" }, { status: 404 })
    }

    const data = readFileSync(applicationsFile, "utf8")
    const applications = JSON.parse(data)

    const applicationIndex = applications.findIndex((app: any) => app.id === params.id)
    if (applicationIndex === -1) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    applications[applicationIndex].status = status

    writeFileSync(applicationsFile, JSON.stringify(applications, null, 2))

    return NextResponse.json(applications[applicationIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}
