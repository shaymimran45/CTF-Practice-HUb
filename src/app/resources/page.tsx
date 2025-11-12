"use client";

import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      category: "Web Exploitation",
      description: "Learn about common web vulnerabilities and how to exploit them.",
      links: [
        { title: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" },
        { title: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
        { title: "HackTricks - Web", url: "https://book.hacktricks.xyz/pentesting-web" },
        { title: "Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/" }
      ],
      learningPath: [
        "Start with basic HTML/CSS/JavaScript",
        "Learn about HTTP protocol and request/response cycle",
        "Understand common web vulnerabilities (XSS, SQLi, CSRF)",
        "Practice with deliberately vulnerable applications like DVWA or WebGoat",
        "Move to CTF platforms like HackTheBox or TryHackMe"
      ]
    },
    {
      category: "Cryptography",
      description: "Study encryption algorithms, encoding schemes, and cryptographic attacks.",
      links: [
        { title: "CryptoHack", url: "https://cryptohack.org/" },
        { title: "Cryptopals", url: "https://cryptopals.com/" },
        { title: "RSA Calculator", url: "https://www.cryptool.org/en/cto/rsa-step-by-step" },
        { title: "Cryptographic Right Answers", url: "https://latacora.micro.blog/2018/04/03/cryptographic-right-answers.html" }
      ],
      learningPath: [
        "Learn basic encoding schemes (Base64, Hex, etc.)",
        "Understand classical ciphers (Caesar, Vigenère, etc.)",
        "Study modern encryption (AES, RSA, ECC)",
        "Learn about hash functions and digital signatures",
        "Practice with CTF cryptography challenges"
      ]
    },
    {
      category: "Reverse Engineering",
      description: "Practice analyzing binaries and understanding how programs work.",
      links: [
        { title: "Reverse Engineering for Beginners", url: "https://beginners.re/" },
        { title: "Ghidra", url: "https://ghidra-sre.org/" },
        { title: "IDA Free", url: "https://www.hex-rays.com/products/ida/support/download.shtml" },
        { title: "Malware Unicorn RE 101", url: "https://malwareunicorn.org/workshops/re101.html" }
      ],
      learningPath: [
        "Learn assembly language (x86, x64)",
        "Understand basic programming concepts in C/C++",
        "Practice with simple crackmes",
        "Learn to use disassemblers and debuggers",
        "Study file formats and protocols"
      ]
    },
    {
      category: "Forensics",
      description: "Develop skills in recovering hidden information from digital media.",
      links: [
        { title: "Forensics Wiki", url: "https://forensicswiki.xyz/" },
        { title: "Autopsy", url: "https://www.autopsy.com/" },
        { title: "Wireshark", url: "https://www.wireshark.org/" },
        { title: "Volatility Framework", url: "https://github.com/volatilityfoundation/volatility" }
      ],
      learningPath: [
        "Learn about file formats and headers",
        "Understand data storage concepts",
        "Practice with file carving techniques",
        "Learn network protocol analysis",
        "Study memory forensics"
      ]
    },
    {
      category: "Binary Exploitation",
      description: "Learn to exploit vulnerabilities in compiled programs.",
      links: [
        { title: "LiveOverflow", url: "https://liveoverflow.com/" },
        { title: "Pwning OWASP", url: "https://pwning.owasp-juice.shop/" },
        { title: "Exploit Education", url: "https://exploit.education/" },
        { title: "Shellcode Database", url: "http://shell-storm.org/shellcode/" }
      ],
      learningPath: [
        "Learn C programming and memory management",
        "Understand assembly language and calling conventions",
        "Practice basic buffer overflows",
        "Learn about stack canaries and ASLR",
        "Study advanced exploitation techniques"
      ]
    },
    {
      category: "Miscellaneous",
      description: "Explore various other types of challenges and problem-solving techniques.",
      links: [
        { title: "CTF Field Guide", url: "https://trailofbits.github.io/ctf/" },
        { title: "PentesterLab", url: "https://pentesterlab.com/" },
        { title: "OverTheWire", url: "https://overthewire.org/wargames/" },
        { title: "Regex Crossword", url: "https://regexcrossword.com/" }
      ],
      learningPath: [
        "Develop general problem-solving skills",
        "Learn Python for automation and scripting",
        "Practice steganography techniques",
        "Study networking fundamentals",
        "Explore specialized domains"
      ]
    }
  ];

  const tools = [
    {
      name: "Supabase",
      description: "Open source Firebase alternative for building secure and performant applications.",
      url: "https://supabase.io/"
    },
    {
      name: "Burp Suite",
      description: "Integrated platform for performing security testing of web applications.",
      url: "https://portswigger.net/burp"
    },
    {
      name: "Ghidra",
      description: "Software reverse engineering suite of tools developed by NSA.",
      url: "https://ghidra-sre.org/"
    },
    {
      name: "Wireshark",
      description: "Network protocol analyzer for troubleshooting and analysis.",
      url: "https://www.wireshark.org/"
    },
    {
      name: "John the Ripper",
      description: "Password security auditing and password recovery tool.",
      url: "https://www.openwall.com/john/"
    },
    {
      name: "Hashcat",
      description: "Advanced password recovery tool with GPU acceleration.",
      url: "https://hashcat.net/hashcat/"
    },
    {
      name: "SQLMap",
      description: "Automated SQL injection and database takeover tool.",
      url: "https://github.com/sqlmapproject/sqlmap"
    },
    {
      name: "CyberChef",
      description: "Web app for encryption, encoding, compression and data analysis.",
      url: "https://gchq.github.io/CyberChef/"
    }
  ];

  const books = [
    {
      title: "The Web Application Hacker's Handbook",
      author: "Dafydd Stuttard & Marcus Pinto",
      description: "Comprehensive guide to web application security",
      category: "Web"
    },
    {
      title: "Serious Cryptography",
      author: "Jean-Philippe Aumasson",
      description: "Practical guide to modern cryptography",
      category: "Crypto"
    },
    {
      title: "Practical Reverse Engineering",
      author: "Bruce Dang, et al.",
      description: "Hands-on guide to reverse engineering",
      category: "Reversing"
    },
    {
      title: "Digital Forensics with Open Source Tools",
      author: "Cory Altheide & Harlan Carvey",
      description: "Guide to digital forensics using open source tools",
      category: "Forensics"
    },
    {
      title: "Hacking: The Art of Exploitation",
      author: "Jon Erickson",
      description: "Introduction to hacking and exploitation techniques",
      category: "Pwn"
    },
    {
      title: "CTF Field Guide",
      author: "Travis Mick",
      description: "Comprehensive guide to CTF challenges",
      category: "Misc"
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learning Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of resources to help you master different CTF categories. 
            Whether you're a beginner or advanced player, these resources will help you improve your skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Category-Specific Resources</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {resources.map((resource, index) => (
                  <div key={index} className="px-6 py-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.category}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    
                    <h4 className="text-md font-medium text-gray-800 mb-2">Learning Path</h4>
                    <ol className="list-decimal pl-5 space-y-1 mb-4 text-gray-600">
                      {resource.learningPath.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                    
                    <h4 className="text-md font-medium text-gray-800 mb-2">Recommended Resources</h4>
                    <div className="flex flex-wrap gap-2">
                      {resource.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Essential Tools</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {tools.map((tool, index) => (
                  <div key={index} className="px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{tool.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{tool.description}</p>
                    <Link
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Visit Website →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recommended Books</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {books.map((book, index) => (
                  <div key={index} className="px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                    <p className="text-gray-500 text-xs mb-2">{book.category}</p>
                    <p className="text-gray-600 text-sm">{book.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Supabase Integration</h2>
              <p className="text-gray-200 mb-4">
                This CTF platform is powered by Supabase, providing real-time data synchronization, 
                authentication, and database management.
              </p>
              <ul className="space-y-2 text-gray-200 mb-4">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Real-time challenge updates</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Secure user authentication</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Scalable database infrastructure</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Automatic leaderboard updates</span>
                </li>
              </ul>
              <Link
                href="https://supabase.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 font-medium"
              >
                Learn About Supabase
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Comprehensive Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Beginner Path</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Web: SQL Injection Basics</li>
                <li>Crypto: Caesar Cipher</li>
                <li>Forensics: File Analysis</li>
                <li>Misc: Basic Steganography</li>
              </ol>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Intermediate Path</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Web: XSS and CSRF</li>
                <li>Crypto: RSA Basics</li>
                <li>Reversing: Simple Binaries</li>
                <li>Pwn: Buffer Overflows</li>
              </ol>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Advanced Path</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Web: SSRF and Deserialization</li>
                <li>Crypto: AES and ECC</li>
                <li>Reversing: Complex Binaries</li>
                <li>Pwn: ROP and Heap Exploitation</li>
              </ol>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Expert Path</h3>
              <ol className="list-decimal pl-5 space-y-1 text-sm">
                <li>Web: Advanced Bypasses</li>
                <li>Crypto: Post-Quantum</li>
                <li>Reversing: Anti-Analysis</li>
                <li>Pwn: Kernel Exploitation</li>
              </ol>
            </div>
          </div>
          
          {/* Additional Resources Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4">Additional Learning Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Online Platforms</h4>
                <ul className="space-y-1 text-sm">
                  <li>• HackTheBox</li>
                  <li>• TryHackMe</li>
                  <li>• OverTheWire</li>
                  <li>• picoCTF</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">YouTube Channels</h4>
                <ul className="space-y-1 text-sm">
                  <li>• LiveOverflow</li>
                  <li>• IppSec</li>
                  <li>• John Hammond</li>
                  <li>• The Cyber Mentor</li>
                </ul>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Communities</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Reddit r/securityCTF</li>
                  <li>• Discord CTF Servers</li>
                  <li>• Hackerspaces</li>
                  <li>• Local Meetups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}