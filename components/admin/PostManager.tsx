"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import FileUpload from "./FileUpload"

interface Post {
  id: string
  title: string
  summary: string
  content: string
  image?: string
  date: string
  slug: string
  category: string
  author: string
}

export default function PostManager() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "News",
    author: "Admin",
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/admin/posts")
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", "image")

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
    setIsUploading(true)

    try {
      let imageUrl = editingPost?.image || ""

      // Upload image if selected
      if (selectedImage) {
        imageUrl = await uploadFile(selectedImage)
      }

      const url = editingPost ? `/api/admin/posts/${editingPost.id}` : "/api/admin/posts"
      const method = editingPost ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      })

      if (response.ok) {
        fetchPosts()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving post:", error)
      alert("Error saving post. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      author: post.author,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await fetch(`/api/admin/posts/${id}`, { method: "DELETE" })
        fetchPosts()
      } catch (error) {
        console.error("Error deleting post:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "News",
      author: "Admin",
    })
    setEditingPost(null)
    setSelectedImage(null)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Posts</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? "Edit Post" : "Create New Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Post Title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                required
              />

              <Textarea
                placeholder="Summary"
                value={formData.summary}
                onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                required
              />

              <Textarea
                placeholder="Content (HTML allowed)"
                value={formData.content}
                onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                rows={10}
                required
              />

              <FileUpload
                onFileSelect={setSelectedImage}
                accept="image/*"
                maxSize={5}
                currentFile={editingPost?.image}
                label="Post Image"
              />

              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="News">News</option>
                <option value="Updates">Updates</option>
                <option value="Events">Events</option>
                <option value="Announcements">Announcements</option>
              </select>

              <div className="flex gap-2">
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? "Saving..." : editingPost ? "Update Post" : "Create Post"}
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
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-gray-600 mt-1">{post.summary}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>{post.category}</span>
                    <span>{post.author}</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(post.id)}>
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
