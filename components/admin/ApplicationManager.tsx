"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Mail, Phone, Calendar, Briefcase, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Application {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  job_id: string | null
  job_title: string
  cover_letter: string
  experience?: string
  linkedin_url?: string
  portfolio_url?: string
  cv_url: string
  created_at: string
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired"
}

export default function ApplicationManager() {
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/job-applications")
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error("Error fetching applications:", error)
      toast({
        title: "Error",
        description: "Failed to fetch applications",
        variant: "destructive",
      })
    }
  }

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/job-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Application status updated successfully",
        })
        fetchApplications()
        // Update selected application if it's the one being updated
        if (selectedApplication?.id === id) {
          setSelectedApplication({ ...selectedApplication, status: status as any })
        }
      } else {
        throw new Error("Failed to update status")
      }
    } catch (error) {
      console.error("Error updating application:", error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      })
    }
  }

  const deleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      return
    }

    setIsDeleting(id)
    try {
      const response = await fetch(`/api/job-applications/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Application deleted successfully",
        })
        fetchApplications()
        // Close detail view if the deleted application was selected
        if (selectedApplication?.id === id) {
          setSelectedApplication(null)
        }
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete application")
      }
    } catch (error) {
      console.error("Error deleting application:", error)
      toast({
        title: "Error",
        description: "Failed to delete application",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const downloadCV = async (cvUrl: string, applicantName: string) => {
    try {
      const response = await fetch(cvUrl)
      const blob = await response.blob()

      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob)

      // Create a temporary anchor element and trigger download
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url

      // Extract file extension from URL or default to pdf
      const urlParts = cvUrl.split(".")
      const extension = urlParts.length > 1 ? urlParts[urlParts.length - 1].split("?")[0] : "pdf"

      a.download = `${applicantName.replace(/\s+/g, "_")}_CV.${extension}`

      document.body.appendChild(a)
      a.click()

      // Clean up
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Success",
        description: "CV downloaded successfully",
      })
    } catch (error) {
      console.error("Error downloading CV:", error)
      toast({
        title: "Error",
        description: "Failed to download CV",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "reviewed":
        return "bg-blue-100 text-blue-800"
      case "shortlisted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "hired":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Job Applications</h2>
        <div className="text-sm text-gray-500">{applications.length} total applications</div>
      </div>

      {selectedApplication ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">
                  {selectedApplication.first_name} {selectedApplication.last_name}
                </CardTitle>
                <p className="text-gray-600">{selectedApplication.job_title}</p>
                {selectedApplication.job_title.includes("(Job Deleted)") && (
                  <p className="text-red-500 text-sm mt-1">⚠️ Original job posting has been deleted</p>
                )}
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(selectedApplication.status)}>{selectedApplication.status}</Badge>
                <Button variant="outline" onClick={() => setSelectedApplication(null)}>
                  Back to List
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <h3 className="font-semibold mb-2">Cover Letter</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
              </div>
            </div>

            {/* Experience */}
            {selectedApplication.experience && (
              <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.experience}</p>
                </div>
              </div>
            )}

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedApplication.linkedin_url && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                  <a
                    href={selectedApplication.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
              {selectedApplication.portfolio_url && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Portfolio</p>
                  <a
                    href={selectedApplication.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Portfolio
                  </a>
                </div>
              )}
            </div>

            {/* CV Download */}
            <div>
              <Button
                onClick={() =>
                  downloadCV(
                    selectedApplication.cv_url,
                    `${selectedApplication.first_name}_${selectedApplication.last_name}`,
                  )
                }
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
            </div>

            {/* Status Update */}
            <div>
              <h3 className="font-semibold mb-2">Update Status</h3>
              <div className="flex gap-2 flex-wrap">
                {["pending", "reviewed", "shortlisted", "rejected", "hired"].map((status) => (
                  <Button
                    key={status}
                    variant={selectedApplication.status === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateApplicationStatus(selectedApplication.id, status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Delete Application */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold mb-2 text-red-600">Danger Zone</h3>
              <Button
                variant="destructive"
                onClick={() => deleteApplication(selectedApplication.id)}
                disabled={isDeleting === selectedApplication.id}
              >
                {isDeleting === selectedApplication.id ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Application
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        {application.first_name} {application.last_name}
                      </h3>
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                    </div>

                    <p className="text-purple-600 font-medium mb-3">{application.job_title}</p>
                    {application.job_title.includes("(Job Deleted)") && (
                      <p className="text-red-500 text-sm mb-3">⚠️ Original job posting has been deleted</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        {application.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {application.phone}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(application.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        downloadCV(application.cv_url, `${application.first_name}_${application.last_name}`)
                      }
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteApplication(application.id)}
                      disabled={isDeleting === application.id}
                    >
                      {isDeleting === application.id ? (
                        <span className="animate-spin">⏳</span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
              <p className="text-gray-500">Applications will appear here when candidates apply for jobs.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
