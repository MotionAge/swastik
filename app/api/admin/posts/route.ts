import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const postsFile = join(process.cwd(), "data", "posts.json")

export async function GET() {
  try {
    if (!existsSync(postsFile)) {
      return NextResponse.json([])
    }

    const data = readFileSync(postsFile, "utf8")
    const posts = JSON.parse(data)
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, summary, content, image, category, author } = await request.json()

    // Read existing posts
    let posts = []
    if (existsSync(postsFile)) {
      const data = readFileSync(postsFile, "utf8")
      posts = JSON.parse(data)
    }

    // Create new post
    const newPost = {
      id: Date.now().toString(),
      title,
      summary,
      content,
      image,
      category,
      author,
      date: new Date().toISOString(),
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }

    posts.unshift(newPost)

    // Save posts
    writeFileSync(postsFile, JSON.stringify(posts, null, 2))

    return NextResponse.json(newPost)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
