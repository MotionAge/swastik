import { readFileSync, existsSync } from "fs"
import { join } from "path"

const dataDir = join(process.cwd(), "data")

export async function getAllPosts() {
  const postsFile = join(dataDir, "posts.json")

  if (!existsSync(postsFile)) {
    return []
  }

  try {
    const data = readFileSync(postsFile, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export async function getLatestPosts(limit = 3) {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}

export async function getPostBySlug(slug: string) {
  const posts = await getAllPosts()
  return posts.find((post: any) => post.slug === slug)
}

export async function getNotices() {
  const noticesFile = join(dataDir, "notices.json")

  if (!existsSync(noticesFile)) {
    return []
  }

  try {
    const data = readFileSync(noticesFile, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading notices:", error)
    return []
  }
}

export async function getGalleryImages() {
  const galleryFile = join(dataDir, "gallery.json")

  if (!existsSync(galleryFile)) {
    return [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop",
        alt: "Company building",
        caption: "Our modern headquarters",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=800&h=400&fit=crop",
        alt: "Team meeting",
        caption: "Collaborative workspace",
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&h=400&fit=crop",
        alt: "Office interior",
        caption: "Innovation center",
      },
    ]
  }

  try {
    const data = readFileSync(galleryFile, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading gallery:", error)
    return []
  }
}

export async function getJobListings() {
  const jobsFile = join(dataDir, "jobs.json")

  if (!existsSync(jobsFile)) {
    return []
  }

  try {
    const data = readFileSync(jobsFile, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading jobs:", error)
    return []
  }
}
