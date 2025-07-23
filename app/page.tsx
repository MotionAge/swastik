import { Suspense } from "react"
import Hero from "@/components/Hero"
import Gallery from "@/components/Gallery"
import LatestPosts from "@/components/LatestPosts"
import NoticeModal from "@/components/NoticeModal"
import { getLatestPosts, getNotices, getGalleryImages } from "@/lib/data"

export default async function HomePage() {
  const [latestPosts, notices, galleryImages] = await Promise.all([getLatestPosts(3), getNotices(), getGalleryImages()])

  const latestNotice = notices[0]

  return (
    <div className="min-h-screen">
      <Hero />
      <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200" />}>
        <Gallery images={galleryImages} />
      </Suspense>

      <Suspense fallback={<div className="animate-pulse h-64 bg-gray-200" />}>
        <LatestPosts posts={latestPosts} />
      </Suspense>

      {latestNotice && <NoticeModal notice={latestNotice} />}
    </div>
  )
}
