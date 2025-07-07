// Enhanced storage utility functions

export async function uploadToVercelBlob(file: File, type = "general"): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", type)

  const response = await fetch("/api/upload-blob", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to upload file")
  }

  const { url } = await response.json()
  return url
}

// File type validation
export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some((type) => {
    if (type.includes("*")) {
      const baseType = type.split("/")[0]
      return file.type.startsWith(baseType)
    }
    return file.type === type
  })
}

// File size validation
export function validateFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  return file.size <= maxSizeBytes
}

// Generate unique filename
export function generateUniqueFilename(originalName: string, prefix?: string): string {
  const timestamp = Date.now()
  const cleanName = originalName.replace(/[^a-zA-Z0-9.-]/g, "_")
  return prefix ? `${prefix}_${timestamp}_${cleanName}` : `${timestamp}_${cleanName}`
}

// Get file metadata
export function getFileMetadata(file: File): Promise<{
  width?: number
  height?: number
  duration?: number
}> {
  return new Promise((resolve) => {
    if (file.type.startsWith("image/")) {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = () => resolve({})
      img.src = URL.createObjectURL(file)
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video")
      video.preload = "metadata"
      video.onloadedmetadata = () => {
        resolve({
          width: video.videoWidth,
          height: video.videoHeight,
          duration: Math.round(video.duration),
        })
      }
      video.onerror = () => resolve({})
      video.src = URL.createObjectURL(file)
    } else {
      resolve({})
    }
  })
}

// Format file size
export function formatFileSize(bytes: number): string {
  const sizes = ["Bytes", "KB", "MB", "GB"]
  if (bytes === 0) return "0 Bytes"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i]
}

// Format duration for videos
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}
