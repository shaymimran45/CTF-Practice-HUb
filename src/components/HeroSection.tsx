"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] bg-repeat opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Master Cybersecurity Skills with <span className="text-blue-400">CTF Challenges</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              A comprehensive platform for learning and practicing Capture The Flag challenges. 
              Enhance your skills in web exploitation, cryptography, forensics, and more.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/problems" 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors shadow-lg"
              >
                Start Practicing
              </Link>
              <Link 
                href="/categories" 
                className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 rounded-lg font-medium transition-colors"
              >
                Explore Categories
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-sm text-gray-400">terminal</div>
              </div>
              <div className="font-mono text-sm">
                <div className="text-green-400">$ ctf-practice --start</div>
                <div className="text-white mt-2">Initializing CTF training environment...</div>
                <div className="text-blue-400">Loading challenges: 127 available</div>
                <div className="text-yellow-400">Categories: Web, Crypto, Forensics, Pwn, Reversing</div>
                <div className="text-green-400 mt-2">Ready! Type 'help' for commands</div>
                <div className="flex mt-2">
                  <div className="text-green-400">$ </div>
                  <div className="ml-1 w-2 h-5 bg-white animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}