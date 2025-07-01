import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <>
      {/* Section 1: Fullscreen Video */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/swostik_intro.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-lime-900/70 to-green-800/80"></div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Content */}
      <section className="relative w-full py-20 bg-white text-gray-900">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              🚀 Leading Innovation Since 2008
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
            <span className="bg-gradient-to-r from-green-600 via-lime-500 to-green-400 bg-clip-text text-transparent">
              Transform Your Business
            </span>
            <br />
            with Swastik
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            We deliver innovative solutions that drive growth, efficiency, and success. Join hundreds of satisfied
            clients who trust us for their digital transformation journey.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center mb-16">
            <Link
              href="/contact"
              className="group inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-green-200 hover:scale-105"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Happy Clients" },
              { number: "15+", label: "Years Experience" },
              { number: "1000+", label: "Projects Completed" },
              { number: "25+", label: "Countries Served" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-green-50 border border-green-100 rounded-2xl p-6 hover:bg-green-100 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl md:text-3xl font-bold text-green-700 mb-2">{stat.number}</div>
                <div className="text-green-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
