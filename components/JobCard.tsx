import { MapPin, Clock, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

interface Job {
  id: string
  title: string
  department: string
  location: string
  type: string
  salary?: string
  description: string
  requirements: string[]
  posted: string
}

interface JobCardProps {
  job: Job
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
            <p className="text-lg text-purple-600 font-semibold mb-4">{job.department}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">{job.type}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
        </div>

        <p className="text-gray-700 mb-6 leading-relaxed line-clamp-3">{job.description}</p>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Requirements:</h4>
          <ul className="space-y-2">
            {job.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
            {job.requirements.length > 3 && (
              <li className="text-gray-500 italic">+{job.requirements.length - 3} more requirements</li>
            )}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500 mb-4 sm:mb-0">
            <Calendar className="h-4 w-4 mr-1" />
            Posted {new Date(job.posted).toLocaleDateString()}
          </div>
          <div className="flex gap-3">
            <Link href={`/careers/${job.id}`}>
              <button className="px-6 py-3 border border-purple-600 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-colors">
                Learn More
              </button>
            </Link>
            <Link href={`/careers/${job.id}#apply-form`}>
              <button className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors shadow-lg">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
