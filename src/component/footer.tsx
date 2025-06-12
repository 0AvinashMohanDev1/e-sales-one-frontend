"use client";

import { FaGithub, FaEnvelope, FaPhone, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-6 sm:gap-0">
        {/* Contact Info */}
        <div className="text-center sm:text-left">
          <p className="font-semibold text-white text-base">
            Created by Avinash Mohan Dev
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaEnvelope className="text-gray-400" />{" "}
            <span>avinashmohandev@gmail.com</span>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaPhone className="text-gray-400" /> <span>+91 9792190895</span>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaGithub className="text-gray-400" />{" "}
            <a
              href="https://github.com/0avinashmohandev1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/0avinashmohandev1
            </a>
          </p>
        </div>

        {/* Additional Info */}
        <div className="text-center sm:text-right">
          <p className="mb-2">
            Built 100% on{" "}
            <span className="font-semibold text-white">Frontend</span> using{" "}
            <span className="text-blue-400">Next.js with TypeScript</span> and
            Tailwind CSS
          </p>
          <p className="flex items-center justify-center sm:justify-end gap-1">
            Made with <FaHeart className="text-red-500" /> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  );
}
