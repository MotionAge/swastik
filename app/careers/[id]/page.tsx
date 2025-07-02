import { notFound } from "next/navigation"
import { ArrowLeft, MapPin, Clock, DollarSign, Calendar, Users, Building } from "lucide-react"
import Link from "next/link"
import JobApplicationForm from "@/components/JobApplicationForm"
import { getJobById, getAllJobs } from "@/lib/data"

export async function generateStaticParams() {
  const jobs = await getAllJobs()
  return jobs.map((job: { id: string }) => ({
    id: job.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id)

  if (!job) {
    return {
      title: "Job Not Found",
    }
  }

  return {
    title: `${job.title} - ABC Company Careers`,
    description: job.description,
  }
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/careers" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
              <p className="text-xl text-purple-600 font-semibold mb-6">{job.department}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{job.type}</span>
                </div>
                {job.salary && (
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-5 w-5 mr-2" />
                    <span>{job.salary}</span>
                  </div>
                )}
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-2xl">
                <h3 className="font-semibold mb-2">Ready to Apply?</h3>
                <p className="text-sm text-purple-100 mb-4">Join our amazing team today!</p>
                <a
                  href="#apply-form"
                  className="inline-block bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Job Description</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-600 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Benefits */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "🏥 Comprehensive health insurance",
                  "🏖️ Generous vacation policy",
                  "📚 Professional development budget",
                  "💻 Latest technology and equipment",
                  "🍕 Free meals and snacks",
                  "🏋️ Gym membership reimbursement",
                  "🚗 Transportation allowance",
                  "🎉 Team building events",
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium">{job.department}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Employment Type</p>
                    <p className="font-medium">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{job.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Share Job */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Job</h3>
              <div className="flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  LinkedIn
                </button>
                <button className="flex-1 bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors text-sm">
                  Twitter
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div id="apply-form" className="mt-16">
          <JobApplicationForm jobId={job.id} jobTitle={job.title} />
        </div>
      </div>
    </div>
  )
}
