"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ForensicsCategoryPage() {
  const techniques = [
    {
      title: "File Analysis",
      description: "Examining file formats, headers, and hidden data to recover information or identify anomalies.",
      difficulty: "Beginner to Expert",
      examples: ["File Carving", "Metadata Analysis", "Steganography"]
    },
    {
      title: "Network Forensics",
      description: "Analyzing network traffic captures to identify malicious activity or extract sensitive information.",
      difficulty: "Intermediate to Expert",
      examples: ["PCAP Analysis", "Protocol Dissection", "Traffic Reconstruction"]
    },
    {
      title: "Memory Forensics",
      description: "Investigating the contents of system memory dumps to find evidence of malicious activity.",
      difficulty: "Advanced",
      examples: ["Volatility Framework", "Process Analysis", "Network Connections"]
    },
    {
      title: "Disk Image Analysis",
      description: "Examining disk images and file systems to recover deleted files or hidden data.",
      difficulty: "Intermediate to Expert",
      examples: ["File System Analysis", "Deleted File Recovery", "Partition Analysis"]
    }
  ];

  const tools = [
    { name: "Wireshark", description: "Network protocol analyzer for troubleshooting and analysis" },
    { name: "Autopsy", description: "Digital forensics platform and graphical interface to The Sleuth Kit" },
    { name: "Volatility", description: "Advanced memory forensics framework" },
    { name: "Binwalk", description: "Firmware analysis tool for embedded devices" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Forensics</h1>
          <p className="text-xl text-gray-600">
            Forensics challenges involve recovering hidden information from digital media, analyzing file formats, 
            and investigating digital evidence. This category tests analytical skills and familiarity with forensic tools.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Digital forensics is the process of identifying, preserving, analyzing, and presenting digital evidence 
                  in a manner that is legally admissible. In CTF competitions, forensics challenges typically involve:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Analyzing file formats and headers for hidden information</li>
                  <li>Recovering deleted files or data from disk images</li>
                  <li>Examining network traffic captures for sensitive information</li>
                  <li>Investigating memory dumps for evidence of malicious activity</li>
                </ul>
                <p className="mb-4">
                  Forensics challenges require a combination of technical skills including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Understanding of file formats and structures</li>
                  <li>Proficiency with forensic analysis tools</li>
                  <li>Knowledge of operating systems and their artifacts</li>
                  <li>Attention to detail and systematic analysis approach</li>
                </ul>
                <p>
                  Success in forensics challenges often comes from methodical investigation, 
                  pattern recognition, and the ability to use specialized tools effectively. 
                  Participants must be comfortable working with various types of digital evidence 
                  and understanding how data is stored and manipulated in different systems.
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
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
            <div className="bg-gradient-to-r from-purple-600 to-violet-500 rounded-xl shadow-lg p-8 text-white mb-8">
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
                    <li>File format basics and hex editors</li>
                    <li>Introduction to steganography</li>
                    <li>Basic metadata analysis</li>
                    <li>Understanding file headers and magic bytes</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Network traffic analysis with Wireshark</li>
                    <li>Disk image analysis and file recovery</li>
                    <li>Advanced steganography techniques</li>
                    <li>File carving and data recovery</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Memory forensics with Volatility</li>
                    <li>Malware analysis and reverse engineering</li>
                    <li>Advanced network forensics</li>
                    <li>Mobile device forensics</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/problems/forensics"
                  className="w-full inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Practice Forensics Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Forensics Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Learning Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://forensicswiki.xyz/" target="_blank" rel="noopener noreferrer" className="hover:underline">Forensics Wiki</a></li>
                <li><a href="https://www.sans.org/security-resources/" target="_blank" rel="noopener noreferrer" className="hover:underline">SANS Digital Forensics</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://wiki.wireshark.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Wireshark Wiki</a></li>
                <li><a href="https://github.com/volatilityfoundation/volatility/wiki" target="_blank" rel="noopener noreferrer" className="hover:underline">Volatility Wiki</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Wireshark</a></li>
                <li><a href="https://www.autopsy.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Autopsy</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Books</h3>
              <ul className="space-y-1 text-sm">
                <li>Digital Forensics with Open Source Tools by Cory Altheide</li>
                <li>Practical Packet Analysis by Chris Sanders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}