"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Mail, Phone, Calendar, Briefcase } from "lucide-react"

interface Application {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  jobId: string
  jobTitle: string
  coverLetter: string
  experience?: string
  linkedinUrl?: string
  portfolioUrl?: string
  cvUrl: string
  submittedAt: string
  status: "pending" | "reviewed" | "shortlisted" | "rejected" | "hired"
}

export default function ApplicationManager() {
  const [applications, setApplications] = useState<Application[]>([])
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)

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
        fetchApplications()
      }
    } catch (error) {
      console.error("Error updating application:", error)
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
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </CardTitle>
                <p className="text-gray-600">{selectedApplication.jobTitle}</p>
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
                <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
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
              {selectedApplication.linkedinUrl && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                  <a
                    href={selectedApplication.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
              {selectedApplication.portfolioUrl && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Portfolio</p>
                  <a
                    href={selectedApplication.portfolioUrl}
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
              <Button asChild>
                <a href={selectedApplication.cvUrl} download>
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </a>
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
                        {application.firstName} {application.lastName}
                      </h3>
                      <Badge className={getStatusColor(application.status)}>{application.status}</Badge>
                    </div>

                    <p className="text-purple-600 font-medium mb-3">{application.jobTitle}</p>

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
                        {new Date(application.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm" onClick={() => setSelectedApplication(application)}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={application.cvUrl} download>
                        <Download className="h-4 w-4" />
                      </a>
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
