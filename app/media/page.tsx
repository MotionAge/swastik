import { Suspense } from "react"
import PostGrid from "@/components/PostGrid"
import SearchFilter from "@/components/SearchFilter"
import { getAllPosts } from "@/lib/data"

export const metadata = {
  title: "News & Media - Swastik",
  description: "Stay updated with the latest news and updates from Swastik",
}

export default async function MediaPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string }
}) {
  const posts = await getAllPosts()

  // Filter posts based on search params
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !searchParams.search ||
      post.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchParams.search.toLowerCase())

    const matchesCategory = !searchParams.category || post.category === searchParams.category

    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mt-20 mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Media</h1>
        <p className="text-lg text-gray-600">
          Stay updated with the latest news, updates, and insights from Swastik.
        </p>
      </div>

      <SearchFilter />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 rounded mb-2"></div>
                <div className="bg-gray-300 h-3 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        }
      >
        <PostGrid posts={filteredPosts} />
      </Suspense>
    </div>
  )
}
