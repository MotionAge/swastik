"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, File, ImageIcon, Video } from "lucide-react"
import { validateFileSize, formatFileSize } from "@/lib/storage"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSize?: number // in MB
  label?: string
  multiple?: boolean
  currentFile?: string
}

export default function FileUpload({
  onFileSelect,
  accept = "*/*",
  maxSize = 10,
  label = "Upload File",
  multiple = false,
  currentFile,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setError("")

    // Validate file type if accept is specified
    if (accept !== "*/*") {
      const allowedTypes = accept.split(",").map((type) => type.trim())

      // Check if file matches any allowed type
      const isValidType = allowedTypes.some((type) => {
        if (type.startsWith(".")) {
          // Extension check (e.g., .pdf, .doc)
          return file.name.toLowerCase().endsWith(type.toLowerCase())
        } else if (type.includes("*")) {
          // MIME type with wildcard (e.g., image/*)
          const baseType = type.split("/")[0]
          return file.type.startsWith(baseType)
        } else {
          // Exact MIME type match
          return file.type === type
        }
      })

      if (!isValidType) {
        setError(`File type not allowed. Accepted types: ${accept}`)
        return
      }
    }

    // Validate file size
    if (!validateFileSize(file, maxSize)) {
      setError(`File size too large. Maximum size: ${maxSize}MB`)
      return
    }

    setSelectedFile(file)
    onFileSelect(file)
  }

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    onFileSelect(null)
    setError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="h-8 w-8 text-blue-500" />
    if (file.type.startsWith("video/")) return <Video className="h-8 w-8 text-purple-500" />
    return <File className="h-8 w-8 text-gray-500" />
  }

  const getAcceptedFormats = () => {
    if (accept === "*/*") return "Any file type"

    const formats = accept.split(",").map((type) => type.trim())
    const displayFormats = formats.map((format) => {
      if (format.startsWith(".")) {
        return format.toUpperCase()
      } else if (format.includes("*")) {
        const baseType = format.split("/")[0]
        return baseType.toUpperCase() + " files"
      }
      return format
    })

    return displayFormats.join(", ")
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
            dragActive ? "border-blue-400 bg-blue-50" : "border-gray-300 hover:border-gray-400"
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
            multiple={multiple}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600 hover:text-blue-500">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {getAcceptedFormats()} up to {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getFileIcon(selectedFile)}
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Show current file if exists and no new file selected */}
      {!selectedFile && currentFile && (
        <div className="border rounded-lg p-4 bg-blue-50">
          <div className="flex items-center space-x-3">
            <File className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Current file</p>
              <a
                href={currentFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline"
              >
                View current file
              </a>
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
