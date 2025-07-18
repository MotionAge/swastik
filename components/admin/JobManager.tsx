"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, MapPin, Clock, DollarSign } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary?: string
  description: string
  requirements: string[]
  created_at: string
}

export default function JobManager() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
    requirements: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/admin/jobs")
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error("Error fetching jobs:", error)
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : "/api/admin/jobs"
      const method = editingJob ? "PUT" : "POST"

      const jobData = {
        ...formData,
        requirements: formData.requirements.split("\n").filter((req) => req.trim()),
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: editingJob ? "Job updated successfully" : "Job created successfully",
        })
        fetchJobs()
        resetForm()
      } else {
        throw new Error("Failed to save job")
      }
    } catch (error) {
      console.error("Error saving job:", error)
      toast({
        title: "Error",
        description: "Failed to save job",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (job: Job) => {
    setEditingJob(job)
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      salary: job.salary || "",
      description: job.description,
      requirements: job.requirements.join("\n"),
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this job posting? Applications for this job will be preserved but marked as 'Job Deleted'.",
      )
    ) {
      return
    }

    setIsDeleting(id)
    try {
      const response = await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        const result = await response.json()
        toast({
          title: "Success",
          description: result.message || "Job posting deleted successfully",
        })
        fetchJobs()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete job")
      }
    } catch (error) {
      console.error("Error deleting job:", error)
      toast({
        title: "Error",
        description: "Failed to delete job posting",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
      requirements: "",
    })
    setEditingJob(null)
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Job Postings</h2>
        <Button onClick={() => setIsEditing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Job
        </Button>
      </div>

      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingJob ? "Edit Job" : "Create New Job"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Job Title"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  required
                />

                <Input
                  placeholder="Department"
                  value={formData.department}
                  onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
                  required
                />

                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  required
                />

                <select
                  value={formData.type}
                  onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>

                <Input
                  placeholder="Salary (optional)"
                  value={formData.salary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, salary: e.target.value }))}
                />
              </div>

              <Textarea
                placeholder="Job Description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />

              <Textarea
                placeholder="Requirements (one per line)"
                value={formData.requirements}
                onChange={(e) => setFormData((prev) => ({ ...prev, requirements: e.target.value }))}
                rows={6}
                required
              />

              <div className="flex gap-2">
                <Button type="submit">{editingJob ? "Update Job" : "Create Job"}</Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-2">{job.title}</h3>
                  <p className="text-purple-600 font-medium mb-3">{job.department}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </div>
                    {job.salary && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {job.salary}
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
                  <p className="text-sm text-gray-500">Posted: {new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(job)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(job.id)}
                    disabled={isDeleting === job.id}
                  >
                    {isDeleting === job.id ? <span className="animate-spin">⏳</span> : <Trash2 className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {jobs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No job postings yet. Create your first job posting to get started!
          </div>
        )}
      </div>
    </div>
  )
}
