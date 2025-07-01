import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

const postsFile = join(process.cwd(), "data", "posts.json")

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { title, summary, content, image, category, author } = await request.json()

    if (!existsSync(postsFile)) {
      return NextResponse.json({ error: "Posts file not found" }, { status: 404 })
    }

    const data = readFileSync(postsFile, "utf8")
    const posts = JSON.parse(data)

    const postIndex = posts.findIndex((post: any) => post.id === params.id)
    if (postIndex === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    // Update post
    posts[postIndex] = {
      ...posts[postIndex],
      title,
      summary,
      content,
      image,
      category,
      author,
      slug: title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }

    writeFileSync(postsFile, JSON.stringify(posts, null, 2))

    return NextResponse.json(posts[postIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!existsSync(postsFile)) {
      return NextResponse.json({ error: "Posts file not found" }, { status: 404 })
    }

    const data = readFileSync(postsFile, "utf8")
    let posts = JSON.parse(data)

    posts = posts.filter((post: any) => post.id !== params.id)

    writeFileSync(postsFile, JSON.stringify(posts, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}
