"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import FileUpload from "./admin/FileUpload"

interface JobApplicationFormProps {
  jobId: string
  jobTitle: string
}

export default function JobApplicationForm({ jobId, jobTitle }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
    experience: "",
    linkedinUrl: "",
    portfolioUrl: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const uploadCV = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", "cv")

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload CV")
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cvFile) {
      toast({
        title: "CV Required",
        description: "Please upload your CV/Resume",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload CV first
      const cvUrl = await uploadCV(cvFile)

      // Submit application
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          jobId,
          jobTitle,
          cvUrl,
        }),
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest. We'll review your application and get back to you soon.",
        })

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          coverLetter: "",
          experience: "",
          linkedinUrl: "",
          portfolioUrl: "",
        })
        setCvFile(null)
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900">Apply for {jobTitle}</CardTitle>
        <p className="text-gray-600 mt-2">Fill out the form below and we'll get back to you as soon as possible.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <Input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <Input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Doe" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john.doe@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <FileUpload onFileSelect={setCvFile} accept=".pdf,.doc,.docx" maxSize={5} label="Upload CV/Resume *" />
            <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
            <Textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Experience</label>
            <Textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              placeholder="Briefly describe your relevant work experience..."
            />
          </div>

          {/* Optional Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
              <Input
                name="linkedinUrl"
                type="url"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
              <Input
                name="portfolioUrl"
                type="url"
                value={formData.portfolioUrl}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            By submitting this application, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
