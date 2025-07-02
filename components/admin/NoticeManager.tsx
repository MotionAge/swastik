"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Download } from "lucide-react"
import FileUpload from "./FileUpload"

interface Notice {
  id: string
  title: string
  type: "image" | "pdf"
  url: string
  date: string
}

export default function NoticeManager() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "image" as "image" | "pdf",
  })

  useEffect(() => {
    fetchNotices()
  }, [])

  const fetchNotices = async () => {
    try {
      const response = await fetch("/api/admin/notices")
      const data = await response.json()
      setNotices(data)
    } catch (error) {
      console.error("Error fetching notices:", error)
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", file.type.includes("pdf") ? "pdf" : "image")

    const response = await fetch("/api/admin/upload", {
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

      const response = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          url: fileUrl,
        }),
      })

      if (response.ok) {
        fetchNotices()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving notice:", error)
      alert("Error saving notice. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      try {
        await fetch(`/api/admin/notices/${id}`, { method: "DELETE" })
        fetchNotices()
      } catch (error) {
        console.error("Error deleting notice:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: "", type: "image" })
    setSelectedFile(null)
    setIsAdding(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Notices</h2>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Notice
        </Button>
      </div>

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Notice Title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />

              <select
                value={formData.type}
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value as "image" | "pdf" }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="image">Image (JPG/PNG)</option>
                <option value="pdf">PDF Document</option>
              </select>

              <FileUpload
                onFileSelect={setSelectedFile}
                accept={formData.type === "pdf" ? ".pdf" : "image/*"}
                maxSize={10}
                label={`Upload ${formData.type === "pdf" ? "PDF" : "Image"}`}
              />

              <div className="flex gap-2">
                <Button type="submit" disabled={isUploading || !selectedFile}>
                  {isUploading ? "Uploading..." : "Create Notice"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{notice.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="capitalize">{notice.type}</span>
                    <span>{new Date(notice.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={notice.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(notice.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
