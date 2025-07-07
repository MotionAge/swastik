// Storage utility functions

export async function uploadToVercelBlob(file: File, type = "general"): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", type)

  const response = await fetch("/api/upload-blob", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload file")
  }

  const { url } = await response.json()
  return url
}

// Alternative: Cloudinary upload
export async function uploadToCloudinary(file: File): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  )

  const data = await response.json()
  return data.secure_url
}
