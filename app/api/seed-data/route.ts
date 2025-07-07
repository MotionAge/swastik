import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST() {
  try {
    // Check if data already exists
    const { data: existingPosts } = await supabaseAdmin.from("posts").select("id").limit(1)

    if (existingPosts && existingPosts.length > 0) {
      return NextResponse.json({ message: "Data already seeded" })
    }

    // Sample posts
    const posts = [
      {
        title: "Welcome to ABC Company",
        summary: "We are excited to announce the launch of our new website and services.",
        content:
          "<p>We are thrilled to welcome you to ABC Company. Our team has been working hard to bring you the best services and solutions.</p><p>Stay tuned for more updates and exciting announcements!</p>",
        category: "News",
        author: "Admin",
        slug: "welcome-to-abc-company",
      },
      {
        title: "New Product Launch",
        summary: "Introducing our latest innovation that will revolutionize the industry.",
        content:
          "<p>Today marks a significant milestone for ABC Company as we launch our groundbreaking new product.</p><p>This innovation represents months of research and development, and we believe it will transform how businesses operate.</p>",
        category: "Updates",
        author: "Product Team",
        slug: "new-product-launch",
      },
      {
        title: "Company Expansion",
        summary: "ABC Company is expanding to new markets and locations.",
        content:
          "<p>We are pleased to announce our expansion into three new markets this quarter.</p><p>This growth reflects our commitment to serving more customers and creating new opportunities.</p>",
        category: "Announcements",
        author: "CEO",
        slug: "company-expansion",
      },
    ]

    // Sample gallery images
    const galleryImages = [
      {
        url: "/placeholder.svg?height=400&width=600",
        alt_text: "Modern office building",
        caption: "Our state-of-the-art headquarters",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        alt_text: "Team collaboration",
        caption: "Innovation happens through teamwork",
      },
      {
        url: "/placeholder.svg?height=400&width=600",
        alt_text: "Technology workspace",
        caption: "Cutting-edge technology at work",
      },
    ]

    // Sample jobs
    const jobs = [
      {
        title: "Senior Software Engineer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120,000 - $160,000",
        description:
          "We are looking for a Senior Software Engineer to join our growing engineering team. You will be responsible for designing, developing, and maintaining high-quality software solutions.",
        requirements: [
          "5+ years of software development experience",
          "Proficiency in JavaScript, Python, or Java",
          "Experience with cloud platforms (AWS, GCP, Azure)",
          "Strong problem-solving skills",
          "Bachelor's degree in Computer Science or related field",
        ],
      },
      {
        title: "Product Manager",
        department: "Product",
        location: "New York, NY",
        type: "Full-time",
        salary: "$100,000 - $140,000",
        description:
          "Join our product team to help shape the future of our products. You will work closely with engineering, design, and business teams to deliver exceptional user experiences.",
        requirements: [
          "3+ years of product management experience",
          "Strong analytical and problem-solving skills",
          "Experience with agile development methodologies",
          "Excellent communication and leadership skills",
          "MBA or relevant degree preferred",
        ],
      },
    ]

    // Insert data
    await Promise.all([
      supabaseAdmin.from("posts").insert(posts),
      supabaseAdmin.from("gallery_images").insert(galleryImages),
      supabaseAdmin.from("jobs").insert(jobs),
    ])

    return NextResponse.json({ message: "Sample data seeded successfully" })
  } catch (error) {
    console.error("Error seeding data:", error)
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 })
  }
}
