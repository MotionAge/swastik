"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, File } from "lucide-react"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  currentFile?: string
  label?: string
}

export default function FileUpload({
  onFileSelect,
  accept = "image/*",
  maxSize = 5,
  currentFile,
  label = "Upload File",
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(currentFile || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)

    // Create preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const clearFile = () => {
    setSelectedFile(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
          dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {selectedFile || preview ? (
          <div className="space-y-4">
            {preview && accept.includes("image") ? (
              <div className="relative">
                <img src={preview || "/placeholder.svg"} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={clearFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <File className="h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedFile?.name || "Current file"}</span>
                <Button type="button" variant="outline" size="sm" onClick={clearFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">Max file size: {maxSize}MB</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
