import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} - ABC Company`,
    description: post.summary,
  }
}

type Attachment = {
  name: string
  url: string
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // ✅ Use image_url instead of image
  const imageUrl = post.image_url
    ? post.image_url.startsWith("http") || post.image_url.startsWith("/")
      ? post.image_url
      : `/${post.image_url}`
    : "/placeholder.svg"

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/media" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Media
      </Link>

      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(post.created_at)}
            </div>
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              {post.category}
            </div>
          </div>

          {imageUrl && (
            <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}
        </header>

        <div className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.attachments && post.attachments.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Attachments</h3>
            <div className="space-y-2">
              {post.attachments.map((attachment: Attachment, index: number) => (
                <a
                  key={index}
                  href={attachment.url}
                  download
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  📎 {attachment.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
