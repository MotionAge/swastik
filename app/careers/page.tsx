import { MapPin, Clock, DollarSign, Users } from "lucide-react"
import JobCard from "@/components/JobCard"
import { getAllJobs } from "@/lib/data"

export const metadata = {
  title: "Careers - Swastik Holding Private Ltd",
  description: "Join our team and build your career with Swastik Holding Private Ltd. Explore exciting opportunities and grow with us.",
}

export default async function CareersPage() {
  const jobs = await getAllJobs()

  const benefits = [
    {
      title: "Competitive Salary",
      description: "Industry-leading compensation packages with performance bonuses",
      icon: DollarSign,
    },
    {
      title: "Flexible Hours",
      description: "Work-life balance with flexible scheduling and remote work options",
      icon: Clock,
    },
    {
      title: "Great Team",
      description: "Collaborative environment with talented professionals",
      icon: Users,
    },
    {
      title: "Prime Location",
      description: "Modern offices in convenient locations with great amenities",
      icon: MapPin,
    },
  ]

  const perks = [
    "🏥 Comprehensive health insurance",
    "🏖️ Generous vacation policy",
    "📚 Professional development budget",
    "💻 Latest technology and equipment",
    "🍕 Free meals and snacks",
    "🚗 Transportation allowance",
    "🎉 Team building events",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Join Our Team
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 leading-relaxed mb-8">
              Build your career with innovative projects, amazing colleagues, and endless opportunities to grow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#open-positions"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
              >
                View Open Positions
              </a>
              <a
                href="#why-join-us"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-colors"
              >
                Why Join Us?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section id="why-join-us" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Swastik Holding Private Ltd?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating an environment where talent thrives and innovation flourishes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Perks Grid */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Perks & Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {perks.map((perk, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-gray-700 font-medium">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting opportunities to advance your career with us
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Found {jobs.length} open position{jobs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {jobs.length > 0 ? (
            <div className="grid gap-6 max-w-4xl mx-auto">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Positions You were looking FOR?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Don't worry leave your CV in our pool and we will contact you when we are opened for that position.
              </p>
              <a
                href="/careers/apply"
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              >
                Send Your Resume
              </a>
            </div>
            </div>
            
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Open Positions Right Now</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                We're not actively hiring at the moment, but we're always interested in connecting with talented
                individuals. Feel free to send us your resume for future opportunities.
              </p>
              <a
                href="/careers/apply"
                className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition-colors shadow-lg"
              >
                Send Your Resume
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">Our Culture</h2>
              <div className="space-y-6">
                <p className="text-lg text-purple-100 leading-relaxed">
                  At Swastik Holding Private Ltd, we foster a culture of innovation, collaboration, and continuous learning. Our team is
                  our greatest asset, and we're committed to creating an environment where everyone can thrive.
                </p>
                <p className="text-lg text-purple-100 leading-relaxed">
                  We believe in work-life balance, professional growth, and making a positive impact on the world
                  through our work. Join us and be part of something extraordinary.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Innovation First</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Remote Friendly</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Diverse Team</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">Growth Mindset</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/swastikW.jpg?height=400&width=600"
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
