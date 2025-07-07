"use client"

import { useState, useEffect } from "react"
import { X, Download } from "lucide-react"
import Image from "next/image"

interface Notice {
  id: string
  title: string
  type: "image" | "pdf"
  url: string
  created_at: string
}

interface NoticeModalProps {
  notice: Notice
}

export default function NoticeModal({ notice }: NoticeModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-close after 10 seconds
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!notice || !notice.url) return null

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold">Latest Notice</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <h4 className="text-xl font-semibold mb-4">{notice.title}</h4>

          {notice.type === "image" ? (
            <div className="relative h-96 mb-4">
              <Image src={notice.url || "/placeholder.svg"} alt={notice.title} fill className="object-contain" />
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📄</div>
              <p className="text-gray-600 mb-4">PDF Document</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Posted: {new Date(notice.created_at).toLocaleDateString()}</span>

            <a
              href={notice.url}
              download
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
