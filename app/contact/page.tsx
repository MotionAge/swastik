import ContactForm from "@/components/ContactForm"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "Contact Us - Swastik",
  description: "Get in touch with Swastik. We'd love to hear from you.",
}

export default function ContactPage() {
  return (
    <div className="container mt-20 mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <ContactForm />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">Address</h3>
                <p className="text-gray-600">
                  Talchikhel -14
                  <br />
                  Lalitpur,Nepal
                  <br />
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600">+977 9843455721</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600">info@swastik.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <Clock className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <p className="text-gray-600">
                  Sunday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: Closed
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Quick Response</h3>
            <p className="text-blue-800 text-sm">
              We typically respond to all inquiries within 24 hours during business days.
            </p>
          </div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5463.910058792348!2d85.317345755272!3d27.659558412405215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb17d26d8d958f%3A0x6c6324cc6fd90069!2sTalchikhel%2Clalitpur!5e0!3m2!1sen!2snp!4v1751365718791!5m2!1sen!2snp" width="600" height="450" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  )
}
