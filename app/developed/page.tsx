"use client"

import { Github, Linkedin } from "lucide-react"
import Image from "next/image"

export default function DeveloperCard() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-black dark:to-neutral-900 p-4">
      <div className="bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-6 sm:p-10 flex flex-col items-center max-w-sm">
        <div className="w-32 h-32 relative mb-4">
          <Image
            src={"https://avatars.githubusercontent.com/u/98589641?v=4"}
            alt="Developer"
            fill
            className="rounded-full object-cover border-4 border-primary"
          />
        </div>
        <p className="text-gray-600 dark:text-neutral-400 text-sm mb-1">Developed by</p>
        <h1 className="text-2xl font-bold text-blue-900"><a href="https://github.com/AshimKoirala" target="_blank">Ashim Koirala</a></h1>
        <div className="flex gap-4">
          <a
            href="https://github.com/AshimKoirala" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ashimkoirala" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-[#0A66C2] dark:text-gray-300 dark:hover:text-[#0A66C2] transition"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}

