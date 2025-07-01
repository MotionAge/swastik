"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import Image from "next/image"

interface GalleryImage {
  id: string
  url: string
  alt: string
  caption?: string
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    url: "",
    alt: "",
    caption: "",
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()
      setImages(data)
    } catch (error) {
      console.error("Error fetching images:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchImages()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving image:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
        fetchImages()
      } catch (error) {
        console.error("Error deleting image:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({ url: "", alt: "", caption: "" })
    setIsAdding(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Gallery</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Image
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Image</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Image URL"
                value={formData.url}
                onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
                required
              />

              <Input
                placeholder="Alt Text"
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
                <Button type="submit">Add Image</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id}>
            <CardContent className="p-4">
              <div className="relative h-48 mb-4">
                <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover rounded" />
              </div>
              <div className="space-y-2">
                <p className="font-medium">{image.alt}</p>
                {image.caption && <p className="text-sm text-gray-600">{image.caption}</p>}
                <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)} className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
