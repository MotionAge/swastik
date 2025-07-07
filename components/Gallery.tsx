"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react"

interface GalleryItem {
  id: string
  url: string
  alt_text: string
  caption?: string
  file_type: "image" | "video"
  file_size?: number
  duration?: number
}

interface GalleryProps {
  items?: GalleryItem[]
}

export default function Gallery({ items: propItems }: GalleryProps) {
  const [items, setItems] = useState<GalleryItem[]>(propItems || [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (!propItems) {
      fetchItems()
    }
  }, [propItems])

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Error fetching gallery items:", error)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
    setIsPlaying(false)
  }

  const togglePlay = () => {
    const video = document.querySelector(".gallery-video") as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    const video = document.querySelector(".gallery-video") as HTMLVideoElement
    if (video) {
      video.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  if (!items.length) return null

  const currentItem = items[currentIndex]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a glimpse into our world of innovation, collaboration, and success
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-2xl group min-h-[400px] flex items-center justify-center">
            {currentItem?.file_type === "video" ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <video
                  src={currentItem.url}
                  className="gallery-video max-w-full max-h-[500px] object-contain"
                  controls
                  muted={isMuted}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={currentItem?.url || "/placeholder.svg"}
                  alt={currentItem?.alt_text || "Gallery image"}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[500px] object-contain"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 duration-300"
            >
              <Maximize2 className="h-5 w-5" />
            </button>

            {/* Media Type Indicator */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 duration-300">
              {currentItem?.file_type === "video" ? "🎥 Video" : "🖼️ Image"}
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Caption */}
            {currentItem?.caption && (
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/50 backdrop-blur-sm text-white p-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-lg font-medium">{currentItem.caption}</p>
                </div>
              </div>
            )}
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Thumbnail Navigation */}
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mt-8">
            {items.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsPlaying(false)
                }}
                className={`relative h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-4 ring-blue-600 scale-105"
                    : "hover:scale-105 opacity-70 hover:opacity-100"
                }`}
              >
                {item.file_type === "video" ? (
                  <div className="relative w-full h-full bg-black flex items-center justify-center">
                    <video src={item.url} className="w-full h-full object-cover" muted />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                ) : (
                  <Image src={item.url || "/placeholder.svg"} alt={item.alt_text} fill className="object-cover" />
                )}

                {/* Type indicator */}
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {item.file_type === "video" ? "🎥" : "🖼️"}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button onClick={() => setIsFullscreen(false)} className="absolute top-4 right-4 text-white text-2xl z-10">
            ✕
          </button>

          {currentItem?.file_type === "video" ? (
            <video src={currentItem.url} className="max-w-full max-h-full object-contain" controls autoPlay />
          ) : (
            <Image
              src={currentItem?.url || "/placeholder.svg"}
              alt={currentItem?.alt_text || "Gallery image"}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain"
              style={{ width: "auto", height: "auto" }}
            />
          )}
        </div>
      )}
    </section>
  )
}
