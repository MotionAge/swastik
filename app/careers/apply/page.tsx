import GeneralApplicationForm from "@/components/GeneralApplicationForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Submit Your Resume - ABC Company Careers",
  description:
    "Submit your resume for future opportunities at ABC Company. We'll keep your information on file and contact you when suitable positions become available.",
}

export default function GeneralApplicationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <Link href="/careers" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Submit Your Resume</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              While we don't have any open positions at the moment, we're always interested in connecting with talented
              individuals. Submit your resume and we'll keep it on file for future opportunities that match your skills
              and experience.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits of Submitting */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Submit Your Resume?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">First to Know</h3>
              <p className="text-gray-600 text-sm">
                Be the first to hear about new opportunities that match your profile
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Track</h3>
              <p className="text-gray-600 text-sm">Skip the initial screening when positions open up</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Personal Touch</h3>
              <p className="text-gray-600 text-sm">Get personalized outreach for roles that fit your expertise</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <GeneralApplicationForm />
      </div>
    </div>
  )
}
