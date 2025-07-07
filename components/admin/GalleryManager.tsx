"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Edit, Play, ImageIcon } from "lucide-react"
import Image from "next/image"
import FileUpload from "./FileUpload"

interface GalleryItem {
  id: string
  url: string
  alt_text: string
  caption?: string
  file_type: "image" | "video"
  file_size?: number
  duration?: number
  created_at: string
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    alt: "",
    caption: "",
    file_type: "image" as "image" | "video",
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()
      setItems(data)
    } catch (error) {
      console.error("Error fetching gallery items:", error)
    }
  }

  const getFileInfo = (file: File) => {
    return new Promise<{ duration?: number }>((resolve) => {
      if (file.type.startsWith("video/")) {
        const video = document.createElement("video")
        video.preload = "metadata"
        video.onloadedmetadata = () => {
          resolve({ duration: Math.round(video.duration) })
        }
        video.onerror = () => resolve({})
        video.src = URL.createObjectURL(file)
      } else {
        resolve({})
      }
    })
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", "gallery")

    const response = await fetch("/api/upload-blob", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload file")
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      alert("Please select a file")
      return
    }

    setIsUploading(true)

    try {
      const fileUrl = await uploadFile(selectedFile)
      const fileInfo = await getFileInfo(selectedFile)

      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          url: fileUrl,
          file_type: selectedFile.type.startsWith("video/") ? "video" : "image",
          file_size: selectedFile.size,
          duration: fileInfo.duration,
        }),
      })

      if (response.ok) {
        fetchItems()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving gallery item:", error)
      alert("Error saving gallery item. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return

    try {
      const response = await fetch(`/api/admin/gallery/${editingItem.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alt: formData.alt,
          caption: formData.caption,
        }),
      })

      if (response.ok) {
        fetchItems()
        setEditingItem(null)
        resetForm()
      }
    } catch (error) {
      console.error("Error updating gallery item:", error)
      alert("Error updating gallery item. Please try again.")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
        fetchItems()
      } catch (error) {
        console.error("Error deleting gallery item:", error)
      }
    }
  }

  const startEdit = (item: GalleryItem) => {
    setEditingItem(item)
    setFormData({
      alt: item.alt_text,
      caption: item.caption || "",
      file_type: item.file_type,
    })
    setIsAdding(false)
  }

  const resetForm = () => {
    setFormData({ alt: "", caption: "", file_type: "image" })
    setSelectedFile(null)
    setIsAdding(false)
    setEditingItem(null)
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size"
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return ""
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Gallery</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Media
        </Button>
      </div>

      {(isAdding || editingItem) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Media" : "Add New Media"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingItem ? handleEdit : handleSubmit} className="space-y-4">
              {!editingItem && (
                <>
                  <Select
                    value={formData.file_type}
                    onValueChange={(value: "image" | "video") => setFormData((prev) => ({ ...prev, file_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>

                  <FileUpload
                    onFileSelect={setSelectedFile}
                    accept={formData.file_type === "video" ? "video/*" : "image/*"}
                    maxSize={formData.file_type === "video" ? 50 : 5}
                    label={formData.file_type === "video" ? "Video File" : "Image File"}
                  />
                </>
              )}

              <Input
                placeholder="Alt Text / Description"
                value={formData.alt}
                onChange={(e) => setFormData((prev) => ({ ...prev, alt: e.target.value }))}
                required
              />

              <Input
                placeholder="Caption (optional)"
                value={formData.caption}
                onChange={(e) => setFormData((prev) => ({ ...prev, caption: e.target.value }))}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isUploading || (!editingItem && !selectedFile)}>
                  {isUploading ? "Uploading..." : editingItem ? "Update" : "Add Media"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="relative mb-4">
                {item.file_type === "video" ? (
                  <div className="relative">
                    <video
                      src={item.url}
                      className="w-full h-48 object-contain bg-black rounded"
                      controls
                      preload="metadata"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Play className="h-3 w-3" />
                      {formatDuration(item.duration)}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <Image
                      src={item.url || "/placeholder.svg"}
                      alt={item.alt_text}
                      width={400}
                      height={300}
                      className="w-full h-48 object-contain bg-gray-100 rounded"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <ImageIcon className="h-3 w-3" />
                      IMG
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="font-medium text-sm">{item.alt_text}</p>
                {item.caption && <p className="text-xs text-gray-600">{item.caption}</p>}

                <div className="text-xs text-gray-500 space-y-1">
                  <p>Size: {formatFileSize(item.file_size)}</p>
                  <p>Type: {item.file_type.toUpperCase()}</p>
                  <p>Added: {new Date(item.created_at).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(item)} className="flex-1">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)} className="flex-1">
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No media items yet. Add some images or videos to get started!</p>
        </div>
      )}
    </div>
  )
}
