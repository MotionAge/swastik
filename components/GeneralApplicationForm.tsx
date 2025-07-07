"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import FileUpload from "./admin/FileUpload"

export default function GeneralApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    currentRole: "",
    experience: "",
    interestedRoles: "",
    availabilityDate: "",
    linkedinUrl: "",
    portfolioUrl: "",
    additionalInfo: "",
  })
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const uploadCV = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", "cvs")

    const response = await fetch("/api/upload-blob", {
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

      // Submit general application
      const response = await fetch("/api/general-applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cvUrl,
        }),
      })

      if (response.ok) {
        toast({
          title: "Resume Submitted Successfully!",
          description:
            "Thank you for your interest. We'll keep your resume on file and contact you when suitable opportunities arise.",
        })

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          currentRole: "",
          experience: "",
          interestedRoles: "",
          availabilityDate: "",
          linkedinUrl: "",
          portfolioUrl: "",
          additionalInfo: "",
        })
        setCvFile(null)
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit resume. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900">Submit Your Resume</CardTitle>
        <p className="text-gray-600 mt-2">
          Tell us about yourself and we'll reach out when opportunities that match your profile become available.
        </p>
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

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Role/Position</label>
              <Input
                name="currentRole"
                value={formData.currentRole}
                onChange={handleChange}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years (Entry Level)</option>
                <option value="2-3">2-3 years</option>
                <option value="4-6">4-6 years</option>
                <option value="7-10">7-10 years</option>
                <option value="10+">10+ years (Senior Level)</option>
              </select>
            </div>
          </div>

          {/* CV Upload */}
          <div>
            <FileUpload onFileSelect={setCvFile} accept=".pdf,.doc,.docx" maxSize={5} label="Upload CV/Resume *" />
            <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>

          {/* Interested Roles */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Roles/Departments of Interest</label>
            <Textarea
              name="interestedRoles"
              value={formData.interestedRoles}
              onChange={handleChange}
              rows={3}
              placeholder="e.g., Software Development, Marketing, Sales, Product Management..."
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              name="availabilityDate"
              value={formData.availabilityDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">When can you start?</option>
              <option value="immediately">Immediately</option>
              <option value="2-weeks">2 weeks notice</option>
              <option value="1-month">1 month notice</option>
              <option value="2-months">2 months notice</option>
              <option value="3-months">3+ months</option>
              <option value="flexible">Flexible</option>
            </select>
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

          {/* Additional Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
            <Textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us anything else you'd like us to know about your background, skills, or career goals..."
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? "Submitting Resume..." : "Submit Resume"}
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• We'll review your resume and add it to our talent database</li>
              <li>• You'll receive a confirmation email within 24 hours</li>
              <li>• We'll contact you directly when suitable positions become available</li>
              <li>• Your information will be kept confidential and secure</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to our privacy policy and consent to us keeping your information on file
            for future opportunities.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
