"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CryptoCategoryPage() {
  const techniques = [
    {
      title: "Classical Ciphers",
      description: "Traditional encryption methods including Caesar cipher, Vigenère cipher, and substitution ciphers that form the foundation of cryptography.",
      difficulty: "Beginner",
      examples: ["Caesar Cipher", "Atbash Cipher", "Vigenère Cipher", "Rail Fence Cipher"]
    },
    {
      title: "Modern Encryption",
      description: "Contemporary cryptographic algorithms including symmetric and asymmetric encryption systems used in modern applications.",
      difficulty: "Intermediate to Expert",
      examples: ["AES", "RSA", "ECC", "DES"]
    },
    {
      title: "Hash Functions",
      description: "Cryptographic functions that map data of arbitrary size to fixed-size values, often used for password storage and data integrity.",
      difficulty: "Intermediate",
      examples: ["MD5", "SHA-1", "SHA-256", "bcrypt"]
    },
    {
      title: "Cryptanalysis",
      description: "The study of methods for obtaining the meaning of encrypted information without access to the secret information.",
      difficulty: "Intermediate to Expert",
      examples: ["Frequency Analysis", "Differential Cryptanalysis", "Linear Cryptanalysis"]
    }
  ];

  const tools = [
    { name: "CyberChef", description: "Web app for encryption, encoding, compression and data analysis" },
    { name: "Hashcat", description: "Advanced password recovery tool with GPU acceleration" },
    { name: "John the Ripper", description: "Password security auditing and recovery tool" },
    { name: "RSA Tool", description: "Tool for RSA encryption and decryption" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cryptography</h1>
          <p className="text-xl text-gray-600">
            Cryptography challenges involve decrypting encoded messages, breaking encryption algorithms, 
            and understanding cryptographic protocols. This category tests mathematical and analytical skills 
            in the field of secure communications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Cryptography is the practice and study of techniques for secure communication in the presence of third parties. 
                  In CTF competitions, cryptography challenges often involve:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Decrypting messages encoded with various ciphers</li>
                  <li>Breaking weak encryption implementations</li>
                  <li>Exploiting vulnerabilities in cryptographic protocols</li>
                  <li>Performing mathematical attacks on cryptographic systems</li>
                </ul>
                <p className="mb-4">
                  Cryptography challenges require a combination of mathematical knowledge, programming skills, 
                  and familiarity with cryptographic tools. Participants often need to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Identify the type of cipher or encryption used</li>
                  <li>Apply appropriate cryptanalytic techniques</li>
                  <li>Write scripts to automate decryption processes</li>
                  <li>Understand the mathematical foundations of cryptographic algorithms</li>
                </ul>
                <p>
                  Success in cryptography challenges often comes from recognizing patterns, 
                  understanding common weaknesses in implementations, and having a solid foundation 
                  in number theory and algebra.
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
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
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 text-white mb-8">
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
                    <li>Classical ciphers and their weaknesses</li>
                    <li>Base64, hexadecimal, and binary encoding</li>
                    <li>Basic frequency analysis</li>
                    <li>Introduction to modular arithmetic</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Symmetric encryption (AES, DES)</li>
                    <li>Asymmetric encryption (RSA)</li>
                    <li>Hash functions and collision attacks</li>
                    <li>Block cipher modes of operation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Elliptic Curve Cryptography</li>
                    <li>Post-quantum cryptography</li>
                    <li>Side-channel attacks</li>
                    <li>Advanced cryptanalysis techniques</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/problems/crypto"
                  className="w-full inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Practice Crypto Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Cryptography Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Learning Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://cryptohack.org/" target="_blank" rel="noopener noreferrer" className="hover:underline">CryptoHack</a></li>
                <li><a href="https://cryptopals.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Cryptopals</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://en.wikipedia.org/wiki/Cryptography" target="_blank" rel="noopener noreferrer" className="hover:underline">Wikipedia Cryptography</a></li>
                <li><a href="https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.197.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">AES Standard</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener noreferrer" className="hover:underline">CyberChef</a></li>
                <li><a href="https://github.com/hashcat/hashcat" target="_blank" rel="noopener noreferrer" className="hover:underline">Hashcat</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Books</h3>
              <ul className="space-y-1 text-sm">
                <li>Serious Cryptography by Jean-Philippe Aumasson</li>
                <li>Applied Cryptography by Bruce Schneier</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}