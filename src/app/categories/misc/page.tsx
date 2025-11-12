"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MiscCategoryPage() {
  const techniques = [
    {
      title: "Programming Challenges",
      description: "Tasks that require writing code to solve algorithmic or mathematical problems within constraints.",
      difficulty: "Beginner to Expert",
      examples: ["Algorithm Implementation", "Mathematical Puzzles", "Automation Scripts"]
    },
    {
      title: "Steganography",
      description: "The practice of concealing messages or information within other non-secret text or data.",
      difficulty: "Beginner to Advanced",
      examples: ["LSB Steganography", "Image Steganography", "Audio Steganography"]
    },
    {
      title: "Hardware Hacking",
      description: "Analyzing and manipulating physical devices to extract information or change behavior.",
      difficulty: "Intermediate to Expert",
      examples: ["UART Debugging", "JTAG Exploitation", "RF Analysis"]
    },
    {
      title: "Specialized Challenges",
      description: "Unique challenges that don't fit into standard categories but require creative problem-solving.",
      difficulty: "Varies",
      examples: ["Blockchain Challenges", "AI/ML Security", "Cloud Security"]
    }
  ];

  const tools = [
    { name: "Python", description: "General-purpose programming language for scripting" },
    { name: "Steghide", description: "Steganography tool for hiding data in images" },
    { name: "Saleae Logic", description: "Logic analyzer for hardware debugging" },
    { name: "Wireshark", description: "Network protocol analyzer" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <Link href="/categories" className="text-blue-600 hover:text-blue-800">
            ← Back to All Categories
          </Link>
        </nav>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Miscellaneous</h1>
          <p className="text-xl text-gray-600">
            Miscellaneous challenges encompass various other types of challenges that don't fit into 
            the standard categories. This category tests diverse skills and creative problem-solving abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  The miscellaneous category in CTF competitions is a catch-all for challenges that don't 
                  fit neatly into the traditional categories of web, crypto, reversing, forensics, or pwn. 
                  These challenges often require:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Creative problem-solving and lateral thinking</li>
                  <li>Knowledge of diverse topics and technologies</li>
                  <li>Ability to research and learn new concepts quickly</li>
                  <li>Combination of skills from multiple disciplines</li>
                </ul>
                <p className="mb-4">
                  Misc challenges can cover a wide range of topics including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Programming and algorithmic challenges</li>
                  <li>Steganography and hidden data extraction</li>
                  <li>Hardware and embedded systems analysis</li>
                  <li>Specialized domains like blockchain or AI security</li>
                </ul>
                <p>
                  Success in miscellaneous challenges often comes from having a broad knowledge base, 
                  strong research skills, and the ability to approach problems from unconventional angles. 
                  Participants must be comfortable learning new tools and techniques on the fly and 
                  combining knowledge from different domains to solve complex puzzles.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techniques.map((technique, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{technique.title}</h3>
                    <p className="text-gray-600 mb-3">{technique.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                        {technique.difficulty}
                      </span>
                      <div className="text-sm text-gray-500">
                        {technique.examples.length} variants
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-xl shadow-lg p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-4">Essential Tools</h2>
              <div className="space-y-4">
                {tools.map((tool, index) => (
                  <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
                    <p className="text-gray-200 text-sm">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Path</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Beginner</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Basic programming skills (Python, Bash)</li>
                    <li>Introduction to steganography</li>
                    <li>Basic automation and scripting</li>
                    <li>Familiarity with common file formats</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Advanced programming and algorithm design</li>
                    <li>Network protocol analysis</li>
                    <li>Image and audio processing</li>
                    <li>Basic hardware analysis</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Specialized domain knowledge</li>
                    <li>Advanced steganography techniques</li>
                    <li>Hardware reverse engineering</li>
                    <li>Emerging technology security</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/problems/misc"
                  className="w-full inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Practice Misc Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Miscellaneous Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Learning Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://overthewire.org/wargames/" target="_blank" rel="noopener noreferrer" className="hover:underline">OverTheWire</a></li>
                <li><a href="https://cryptopals.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Cryptopals</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://en.wikipedia.org/wiki/Steganography" target="_blank" rel="noopener noreferrer" className="hover:underline">Steganography Wikipedia</a></li>
                <li><a href="https://docs.python.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Python Documentation</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://github.com/StefanoDeVuono/steghide" target="_blank" rel="noopener noreferrer" className="hover:underline">Steghide</a></li>
                <li><a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Wireshark</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Books</h3>
              <ul className="space-y-1 text-sm">
                <li>Automate the Boring Stuff with Python by Al Sweigart</li>
                <li>Practical Malware Analysis by Michael Sikorski</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}