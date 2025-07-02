import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { ArrowRight, Calendar, User, Tag } from "lucide-react"

interface Post {
  id: string
  title: string
  summary: string
  image?: string
  date: string
  slug: string
  category: string
  author?: string
}

interface LatestPostsProps {
  posts: Post[]
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  if (!posts.length) return null

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Latest News</h2>
            <p className="text-xl text-gray-600">Stay updated with our latest insights and announcements</p>
          </div>
          <Link
            href="/media"
            className="group hidden md:inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100 ${
                index === 0 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {post.image && (
                <div className="relative h-48 lg:h-56 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                </div>

                <h3 className="text-xl lg:text-2xl font-bold mb-4 line-clamp-2 group-hover:text-emerald-600 transition-colors duration-300">
                  {post.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post.summary}</p>

                <div className="flex items-center justify-between">
                  {post.author && (
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                  )}
                  <Link
                    href={`/media/${post.slug}`}
                    className="group/link inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold transition-colors duration-300"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link
            href="/media"
            className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
