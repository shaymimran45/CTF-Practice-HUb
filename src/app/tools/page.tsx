"use client";

import Link from "next/link";

export default function ToolsPage() {
  const toolCategories = [
    {
      name: "Web Exploitation",
      icon: "🌐",
      description: "Tools for testing and exploiting web application vulnerabilities",
      tools: [
        {
          name: "Burp Suite",
          description: "Integrated platform for performing security testing of web applications",
          features: [
            "Intercepting HTTP traffic",
            "Automated scanning for vulnerabilities",
            "Intruder for brute-force attacks",
            "Repeater for manual testing"
          ],
          installation: "Download from PortSwigger website",
          usage: "Proxy traffic through Burp to intercept and modify requests",
          link: "https://portswigger.net/burp"
        },
        {
          name: "OWASP ZAP",
          description: "Open-source web application security scanner",
          features: [
            "Automated vulnerability scanner",
            "Proxy for intercepting traffic",
            "Active and passive scanning",
            "Fuzzing capabilities"
          ],
          installation: "Download from OWASP website or use Docker",
          usage: "Set browser proxy to ZAP and browse the target application",
          link: "https://www.zaproxy.org/"
        },
        {
          name: "SQLMap",
          description: "Automatic SQL injection and database takeover tool",
          features: [
            "Detecting SQL injection vulnerabilities",
            "Database fingerprinting",
            "Data extraction",
            "Executing OS commands"
          ],
          installation: "pip install sqlmap",
          usage: "sqlmap -u 'http://target.com/page?id=1'",
          link: "https://github.com/sqlmapproject/sqlmap"
        }
      ]
    },
    {
      name: "Cryptography",
      icon: "🔐",
      description: "Tools for encryption, decryption, and cryptographic analysis",
      tools: [
        {
          name: "CyberChef",
          description: "Web app for encryption, encoding, compression and data analysis",
          features: [
            "Over 300 cryptographic operations",
            "Encoding/decoding (Base64, Hex, etc.)",
            "Encryption/decryption (AES, RSA, etc.)",
            "Data manipulation and analysis"
          ],
          installation: "Access via web browser at gchq.github.io/CyberChef",
          usage: "Drag and drop operations to create recipes",
          link: "https://gchq.github.io/CyberChef/"
        },
        {
          name: "Hashcat",
          description: "Advanced password recovery tool with GPU acceleration",
          features: [
            "Supports over 300 hash types",
            "GPU-accelerated cracking",
            "Dictionary and brute-force attacks",
            "Rule-based attack modes"
          ],
          installation: "Download from hashcat.net or use package manager",
          usage: "hashcat -m 0 hash.txt wordlist.txt",
          link: "https://hashcat.net/hashcat/"
        },
        {
          name: "John the Ripper",
          description: "Password security auditing and recovery tool",
          features: [
            "Cracks various password hash types",
            "Dictionary and brute-force attacks",
            "Customizable rules",
            "Multi-platform support"
          ],
          installation: "Download from openwall.com or use package manager",
          usage: "john --wordlist=wordlist.txt hash.txt",
          link: "https://www.openwall.com/john/"
        }
      ]
    },
    {
      name: "Reverse Engineering",
      icon: "🔄",
      description: "Tools for analyzing binaries and understanding program behavior",
      tools: [
        {
          name: "Ghidra",
          description: "NSA's software reverse engineering suite",
          features: [
            "Disassembler for multiple architectures",
            " Decompiler for C/C++",
            "Scripting with Python/Java",
            "Collaborative reverse engineering"
          ],
          installation: "Download from NSA's GitHub repository",
          usage: "Import binary file and analyze in Code Browser",
          link: "https://ghidra-sre.org/"
        },
        {
          name: "IDA Pro",
          description: "Industry standard disassembler and debugger",
          features: [
            "Advanced disassembly and debugging",
            "Extensive processor support",
            "Interactive analysis",
            "Plugin architecture"
          ],
          installation: "Purchase license and download from hex-rays.com",
          usage: "Load binary and navigate through disassembly",
          link: "https://www.hex-rays.com/products/ida/"
        },
        {
          name: "Radare2",
          description: "Open-source reverse engineering framework",
          features: [
            "Disassembler and debugger",
            "Hex editor",
            "Scriptable with Python",
            "Cross-platform support"
          ],
          installation: "Clone from GitHub or use package manager",
          usage: "r2 binary_file",
          link: "https://github.com/radareorg/radare2"
        }
      ]
    },
    {
      name: "Forensics",
      icon: "🔍",
      description: "Tools for digital forensics and data recovery",
      tools: [
        {
          name: "Wireshark",
          description: "Network protocol analyzer",
          features: [
            "Capture and analyze network traffic",
            "Support for hundreds of protocols",
            "Deep inspection capabilities",
            "Filtering and search functions"
          ],
          installation: "Download from wireshark.org",
          usage: "Start capture on network interface or open pcap file",
          link: "https://www.wireshark.org/"
        },
        {
          name: "Autopsy",
          description: "Digital forensics platform and graphical interface to The Sleuth Kit",
          features: [
            "File recovery and analysis",
            "Timeline analysis",
            "Keyword searching",
            "Web artifact analysis"
          ],
          installation: "Download from autopsy.sleuthkit.org",
          usage: "Create case and add disk image for analysis",
          link: "https://www.autopsy.com/"
        },
        {
          name: "Binwalk",
          description: "Firmware analysis tool",
          features: [
            "Firmware image analysis",
            "File carving",
            "Entropy analysis",
            "Signature scanning"
          ],
          installation: "pip install binwalk",
          usage: "binwalk firmware.bin",
          link: "https://github.com/ReFirmLabs/binwalk"
        }
      ]
    },
    {
      name: "Binary Exploitation",
      icon: "💣",
      description: "Tools for exploiting vulnerabilities in compiled programs",
      tools: [
        {
          name: "Pwntools",
          description: "CTF framework and exploit development library",
          features: [
            "Exploit development framework",
            "Assembly and disassembly utilities",
            "Networking and remote access",
            "Tubes for I/O operations"
          ],
          installation: "pip install pwntools",
          usage: "from pwn import *",
          link: "https://github.com/Gallopsled/pwntools"
        },
        {
          name: "GDB",
          description: "GNU Debugger",
          features: [
            "Program debugging",
            "Breakpoints and watchpoints",
            "Memory inspection",
            "Stack and register examination"
          ],
          installation: "Usually pre-installed on Linux, available via package manager",
          usage: "gdb ./program",
          link: "https://www.gnu.org/software/gdb/"
        },
        {
          name: "Pwndbg",
          description: "GDB plug-in that makes debugging with GDB suck less",
          features: [
            "Enhanced GDB interface",
            "Heap visualization",
            "Exploit development helpers",
            "Colorized output"
          ],
          installation: "Clone from GitHub and follow installation instructions",
          usage: "source pwndbg/gdbinit.py",
          link: "https://github.com/pwndbg/pwndbg"
        }
      ]
    },
    {
      name: "Miscellaneous",
      icon: "🧩",
      description: "Various other tools for different types of challenges",
      tools: [
        {
          name: "Steghide",
          description: "Steganography tool for hiding data in images",
          features: [
            "Embed data in JPEG and BMP files",
            "Extract hidden data from images",
            "Password protection",
            "Support for various compression algorithms"
          ],
          installation: "Available via package manager or download from source",
          usage: "steghide embed -cf image.jpg -ef secret.txt",
          link: "https://github.com/StefanoDeVuono/steghide"
        },
        {
          name: "ExifTool",
          description: "Tool for reading, writing and editing meta information",
          features: [
            "Read metadata from various file formats",
            "Write and edit metadata",
            "Support for over 200 file types",
            "Batch processing capabilities"
          ],
          installation: "Download from exiftool.org or use package manager",
          usage: "exiftool image.jpg",
          link: "https://exiftool.org/"
        },
        {
          name: "Zsteg",
          description: "PNG/BMP steganography tool",
          features: [
            "Detect LSB steganography in PNG/BMP files",
            "Extract hidden data",
            "Support for various bit depths",
            "Multiple extraction methods"
          ],
          installation: "gem install zsteg",
          usage: "zsteg image.png",
          link: "https://github.com/zed-0xff/zsteg"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CTF Tools Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive guide to essential tools for each CTF category. Learn how to install, use, and master these tools.
          </p>
        </div>

        <div className="space-y-12">
          {toolCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                    <p className="text-gray-300">{category.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {category.tools.map((tool, toolIndex) => (
                  <div key={toolIndex} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Key Features</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Installation</h4>
                      <p className="text-sm text-gray-600">{tool.installation}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-800 mb-2">Basic Usage</h4>
                      <p className="text-sm text-gray-600 font-mono bg-gray-100 p-2 rounded">{tool.usage}</p>
                    </div>
                    
                    <Link
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      Visit Website
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Getting Started with CTF Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">1. Install Essential Tools</h3>
              <p className="text-gray-200">
                Start with tools like Python, GDB, and basic command-line utilities. 
                Then move to category-specific tools as you progress.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">2. Practice with Examples</h3>
              <p className="text-gray-200">
                Use deliberately vulnerable applications and CTF challenges to practice 
                with each tool in a controlled environment.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">3. Build Your Workflow</h3>
              <p className="text-gray-200">
                Develop a systematic approach for each category, combining multiple 
                tools to solve complex challenges efficiently.
              </p>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Learning Platforms</h4>
                <ul className="space-y-1 text-sm">
                  <li>• HackTheBox - Realistic cyber security training platform</li>
                  <li>• TryHackMe - Gamified cybersecurity learning platform</li>
                  <li>• OverTheWire - Wargames for learning security concepts</li>
                  <li>• picoCTF - Beginner-friendly CTF platform</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Documentation & Guides</h4>
                <ul className="space-y-1 text-sm">
                  <li>• OWASP Testing Guide - Web application security testing</li>
                  <li>• PentesterLab - Web pentesting learning path</li>
                  <li>• CTF Field Guide - Comprehensive CTF techniques</li>
                  <li>• GTFOBins - Curated list of Unix binaries</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}