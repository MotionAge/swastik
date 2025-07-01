import Image from "next/image"
import { Users, Target, Award, Globe } from "lucide-react"

export const metadata = {
  title: "About Us - Swastik",
  description: "Learn more about Swastik's mission, vision, and the team behind our success.",
}

export default function AboutPage() {
  const stats = [
    { label: "Years of Experience", value: "15+", icon: Award },
    { label: "Happy Clients", value: "500+", icon: Users },
    { label: "Projects Completed", value: "1000+", icon: Target },
    { label: "Countries Served", value: "25+", icon: Globe },
  ]

  const team = [
    {
      name: "John Smith",
      role: "Chief Executive Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "With over 20 years of industry experience, John leads our company with vision and innovation.",
    },
    {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sarah drives our technical excellence and ensures we stay at the forefront of technology.",
    },
    {
      name: "Michael Brown",
      role: "Head of Operations",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Michael ensures smooth operations and exceptional service delivery across all projects.",
    },
    {
      name: "Emily Davis",
      role: "Head of Marketing",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Emily crafts our brand story and connects us with clients worldwide.",
    },
  ]

  const values = [
    {
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.",
      icon: "🚀",
    },
    {
      title: "Excellence",
      description:
        "We maintain the highest standards in everything we do, from service delivery to client relationships.",
      icon: "⭐",
    },
    {
      title: "Integrity",
      description: "We build trust through transparency, honesty, and ethical business practices.",
      icon: "🤝",
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork and foster strong partnerships with our clients.",
      icon: "👥",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-800 via-lime-700 to-green-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-lime-200 bg-clip-text text-transparent">
              About Swastik
            </h1>
            <p className="text-xl md:text-2xl text-lime-100 leading-relaxed">
              Pioneering innovation and excellence in business solutions since 2008
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-600 to-lime-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission & Vision</h2>
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-600">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To empower businesses worldwide with innovative solutions that drive growth, efficiency, and
                    success. We are committed to delivering exceptional value through cutting-edge technology and
                    unparalleled service.
                  </p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-lime-600">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the global leader in business transformation, recognized for our innovation, integrity, and
                    impact on the communities we serve. We envision a future where technology seamlessly enhances human
                    potential.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/swastikW.jpg?height=400&width=600" alt="Our office" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-green-600 to-lime-600 rounded-full opacity-20"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-lime-600 to-green-400 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide every decision we make and every relationship we build
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-lime-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-lime-100 max-w-3xl mx-auto">
              Experienced professionals dedicated to driving innovation and excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-lime-200 mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-lime-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Work With Us?</h2>
          <p className="text-xl mb-8 text-lime-100 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust Swastik for their business transformation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started Today
            </a>
            <a
              href="/careers"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-green-600 transition-colors"
            >
              Join Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
