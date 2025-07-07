import { supabase, supabaseAdmin } from "./supabase"

// Posts
export async function getAllPosts() {
  const { data, error } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getLatestPosts(limit = 3) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data || []
}

export async function getPostBySlug(slug: string) {
  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug).single()

  if (error) return null
  return data
}

export async function createPost(post: any) {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .insert([
      {
        ...post,
        slug: post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

// Jobs
export async function getAllJobs() {
  const { data, error } = await supabase.from("jobs").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

export async function getJobById(id: string) {
  const { data, error } = await supabase.from("jobs").select("*").eq("id", id).single()

  if (error) return null
  return data
}

export async function createJob(job: any) {
  const { data, error } = await supabaseAdmin.from("jobs").insert([job]).select().single()

  if (error) throw error
  return data
}

// Gallery
export async function getGalleryImages() {
  const { data, error } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Contact Messages
export async function createContactMessage(message: any) {
  const { data, error } = await supabaseAdmin.from("contact_messages").insert([message]).select().single()

  if (error) throw error
  return data
}

export async function getContactMessages() {
  const { data, error } = await supabaseAdmin
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// Job Applications
export async function createJobApplication(application: any) {
  const { data, error } = await supabaseAdmin.from("job_applications").insert([application]).select().single()

  if (error) throw error
  return data
}

export async function getJobApplications() {
  const { data, error } = await supabaseAdmin
    .from("job_applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}

// General Applications
export async function createGeneralApplication(application: any) {
  const { data, error } = await supabaseAdmin.from("general_applications").insert([application]).select().single()

  if (error) throw error
  return data
}

export async function getGeneralApplications() {
  const { data, error } = await supabaseAdmin
    .from("general_applications")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw error
  return data || []
}
