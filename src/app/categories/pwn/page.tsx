"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PwnCategoryPage() {
  const techniques = [
    {
      title: "Buffer Overflows",
      description: "Exploiting programs that write more data to a buffer than it can hold, potentially overwriting adjacent memory.",
      difficulty: "Beginner to Expert",
      examples: ["Stack-based BOF", "Heap-based BOF", "Format String Vulnerabilities"]
    },
    {
      title: "Memory Corruption",
      description: "Taking advantage of memory management errors to execute arbitrary code or crash programs.",
      difficulty: "Intermediate to Expert",
      examples: ["Use-after-free", "Double Free", "Heap Spraying"]
    },
    {
      title: "Return Oriented Programming",
      description: "Executing code by chaining together small instruction sequences (gadgets) found in existing code.",
      difficulty: "Advanced",
      examples: ["ROP Chains", "JOP (Jump-oriented Programming)", "SROP (Sigreturn-oriented Programming)"]
    },
    {
      title: "Kernel Exploitation",
      description: "Exploiting vulnerabilities in operating system kernels to gain elevated privileges.",
      difficulty: "Expert",
      examples: ["Privilege Escalation", "Kernel UAF", "Race Conditions"]
    }
  ];

  const tools = [
    { name: "GDB", description: "GNU Debugger for analyzing program execution" },
    { name: "Pwntools", description: "CTF framework and exploit development library" },
    { name: "Radare2", description: "Reverse engineering framework and command-line tools" },
    { name: "QEMU", description: "Generic and open source machine emulator and virtualizer" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Binary Exploitation</h1>
          <p className="text-xl text-gray-600">
            Binary exploitation (often called "pwn") involves exploiting binary programs for unintended behavior 
            through buffer overflows, format strings, and other memory corruption techniques. This category 
            requires deep understanding of low-level programming and system security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Binary exploitation is the art of finding and exploiting vulnerabilities in compiled programs 
                  to achieve unintended behavior. In CTF competitions, pwn challenges typically involve:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Identifying memory corruption vulnerabilities in binaries</li>
                  <li>Developing exploits to gain control of program execution</li>
                  <li>Bypassing modern exploit mitigations like ASLR and DEP</li>
                  <li>Escalating privileges to gain system access</li>
                </ul>
                <p className="mb-4">
                  Pwn challenges require a combination of technical skills including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Deep understanding of computer architecture and assembly language</li>
                  <li>Knowledge of memory management and calling conventions</li>
                  <li>Proficiency with debugging tools and exploit development frameworks</li>
                  <li>Understanding of modern exploit mitigations and bypass techniques</li>
                </ul>
                <p>
                  Success in binary exploitation challenges often comes from systematic analysis, 
                  creative problem-solving, and the ability to think at the intersection of software 
                  and hardware. Participants must be comfortable working with low-level concepts 
                  and understanding how programs interact with the operating system.
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
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
            <div className="bg-gradient-to-r from-yellow-600 to-amber-500 rounded-xl shadow-lg p-8 text-white mb-8">
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
                    <li>Basic buffer overflows (stack-based)</li>
                    <li>Understanding of memory layout</li>
                    <li>Introduction to GDB and debugging</li>
                    <li>Basic shellcode development</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Bypassing stack canaries</li>
                    <li>Return-to-libc attacks</li>
                    <li>Format string vulnerabilities</li>
                    <li>Introduction to heap exploitation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Return Oriented Programming (ROP)</li>
                    <li>Bypassing ASLR and DEP</li>
                    <li>Advanced heap exploitation</li>
                    <li>Kernel exploitation basics</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/problems/pwn"
                  className="w-full inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Practice Pwn Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Binary Exploitation Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Learning Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://exploit.education/" target="_blank" rel="noopener noreferrer" className="hover:underline">Exploit Education</a></li>
                <li><a href="https://pwn.college/" target="_blank" rel="noopener noreferrer" className="hover:underline">PWN College</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://docs.pwntools.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Pwntools Documentation</a></li>
                <li><a href="https://www.corelan.be/" target="_blank" rel="noopener noreferrer" className="hover:underline">Corelan Team Exploit Writing Tutorials</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://github.com/Gallopsled/pwntools" target="_blank" rel="noopener noreferrer" className="hover:underline">Pwntools</a></li>
                <li><a href="https://www.gnu.org/software/gdb/" target="_blank" rel="noopener noreferrer" className="hover:underline">GDB</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Books</h3>
              <ul className="space-y-1 text-sm">
                <li>Hacking: The Art of Exploitation by Jon Erickson</li>
                <li>The Shellcoder's Handbook by Chris Anley</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}