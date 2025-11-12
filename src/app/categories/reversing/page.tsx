"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ReversingCategoryPage() {
  const techniques = [
    {
      title: "Static Analysis",
      description: "Examining binary code without executing it to understand its structure, functions, and potential vulnerabilities.",
      difficulty: "Beginner to Expert",
      examples: ["Disassembly", "Control Flow Analysis", "Data Flow Analysis"]
    },
    {
      title: "Dynamic Analysis",
      description: "Analyzing program behavior during execution using debuggers and monitoring tools to understand runtime operations.",
      difficulty: "Intermediate to Expert",
      examples: ["Debugging", "Tracing", "Memory Analysis"]
    },
    {
      title: "Anti-Analysis Techniques",
      description: "Methods used by malware and protected software to prevent or complicate reverse engineering efforts.",
      difficulty: "Advanced",
      examples: ["Packing", "Obfuscation", "Anti-Debugging"]
    },
    {
      title: "Protocol Reversing",
      description: "Analyzing network protocols and file formats to understand their structure and implementation details.",
      difficulty: "Intermediate to Expert",
      examples: ["Network Protocol Analysis", "File Format Reversing"]
    }
  ];

  const tools = [
    { name: "Ghidra", description: "NSA's software reverse engineering suite" },
    { name: "IDA Pro", description: "Industry standard disassembler and debugger" },
    { name: "Radare2", description: "Open-source reverse engineering framework" },
    { name: "x64dbg", description: "Open-source x64/x32 debugger for Windows" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Reverse Engineering</h1>
          <p className="text-xl text-gray-600">
            Reverse engineering involves analyzing binaries and compiled code to understand their functionality 
            and find vulnerabilities. This category requires deep technical knowledge of assembly language, 
            debugging techniques, and software architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Reverse engineering is the process of analyzing a system to identify its components and their interrelationships, 
                  and to create representations of the system from the analysis. In CTF competitions, reverse engineering challenges 
                  typically involve:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Analyzing compiled binaries to understand their functionality</li>
                  <li>Finding hidden algorithms or secret data within programs</li>
                  <li>Identifying vulnerabilities that could be exploited</li>
                  <li>Recreating source code or algorithms from machine code</li>
                </ul>
                <p className="mb-4">
                  Reverse engineering challenges require a combination of technical skills including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Understanding of assembly language and processor architectures</li>
                  <li>Proficiency with disassemblers and debuggers</li>
                  <li>Knowledge of file formats and protocols</li>
                  <li>Programming skills in multiple languages</li>
                </ul>
                <p>
                  Success in reverse engineering challenges often comes from systematic analysis, 
                  pattern recognition, and the ability to think like a compiler or programmer. 
                  Participants must be comfortable working with low-level code and understanding 
                  how high-level constructs translate to machine instructions.
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl shadow-lg p-8 text-white mb-8">
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
                    <li>Assembly language basics (x86, x64)</li>
                    <li>Introduction to disassemblers</li>
                    <li>Basic debugging techniques</li>
                    <li>Understanding calling conventions</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Advanced disassembly techniques</li>
                    <li>Understanding compiler optimizations</li>
                    <li>Working with different file formats (PE, ELF)</li>
                    <li>Dynamic analysis with debuggers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Anti-analysis techniques</li>
                    <li>Virtual machine reversal</li>
                    <li>Custom protocol reversing</li>
                    <li>Kernel-level reverse engineering</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/problems/reversing"
                  className="w-full inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Practice Reversing Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Reverse Engineering Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Learning Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://beginners.re/" target="_blank" rel="noopener noreferrer" className="hover:underline">Reverse Engineering for Beginners</a></li>
                <li><a href="https://malwareunicorn.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Malware Unicorn</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Intel Software Developer Manual</a></li>
                <li><a href="https://docs.microsoft.com/en-us/windows/win32/debug/pe-format" target="_blank" rel="noopener noreferrer" className="hover:underline">PE File Format</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://ghidra-sre.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">Ghidra</a></li>
                <li><a href="https://www.hex-rays.com/products/ida/" target="_blank" rel="noopener noreferrer" className="hover:underline">IDA Pro</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Books</h3>
              <ul className="space-y-1 text-sm">
                <li>Practical Reverse Engineering by Bruce Dang</li>
                <li>The IDA Pro Book by Chris Eagle</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}