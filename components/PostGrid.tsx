import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface Post {
  id: string
  title: string
  summary: string
  image_url?: string
  created_at: string
  slug: string
  category: string
  author: string
}

interface PostGridProps {
  posts: Post[]
}

export default function PostGrid({ posts }: PostGridProps) {
  if (!posts.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          {post.image_url && (
            <div className="relative h-48">
              <Image src={post.image_url || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">{post.category}</span>
              <span>{formatDate(post.created_at)}</span>
            </div>

            <h3 className="text-xl font-semibold mb-3 line-clamp-2">
              <Link href={`/media/${post.slug}`} className="hover:text-blue-600 transition-colors">
                {post.title}
              </Link>
            </h3>

            <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">By {post.author}</span>
              <Link href={`/media/${post.slug}`} className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                Read More →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
