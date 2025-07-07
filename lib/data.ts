import { supabase } from "./supabase"

export async function getAllPosts() {
  try {
    const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export async function getLatestPosts(limit = 3) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error reading posts:", error)
    return []
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single()

    if (error) return null
    return data
  } catch (error) {
    console.error("Error reading post:", error)
    return null
  }
}

export async function getNotices() {
  try {
    const { data, error } = await supabase.from("notices").select("*").order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error reading notices:", error)
    return []
  }
}

export async function getGalleryImages() {
  try {
    const { data, error } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })

    if (error) throw error

    // Transform data to match expected format
    return (
      data?.map((img) => ({
        id: img.id,
        url: img.url,
        alt: img.alt_text,
        caption: img.caption,
      })) || []
    )
  } catch (error) {
    console.error("Error reading gallery:", error)
    return [
      {
        id: "1",
        url: "/placeholder.svg?height=400&width=600",
        alt: "Company building",
        caption: "Our modern headquarters",
      },
      {
        id: "2",
        url: "/placeholder.svg?height=400&width=600",
        alt: "Team meeting",
        caption: "Collaborative workspace",
      },
      {
        id: "3",
        url: "/placeholder.svg?height=400&width=600",
        alt: "Office interior",
        caption: "Innovation center",
      },
    ]
  }
}

export async function getJobListings() {
  try {
    const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

    if (error) throw error

    // Transform data to match expected format
    return (
      data?.map((job) => ({
        ...job,
        posted: job.created_at,
      })) || []
    )
  } catch (error) {
    console.error("Error reading jobs:", error)
    return []
  }
}

export async function getAllJobs() {
  return await getJobListings()
}

export async function getJobById(id: string) {
  try {
    const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

    if (error) return null

    // Transform data to match expected format
    return {
      ...data,
      posted: data.created_at,
    }
  } catch (error) {
    console.error("Error reading job:", error)
    return null
  }
}
