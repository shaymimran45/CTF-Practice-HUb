"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProblemsByCategory, Problem } from "@/lib/problemsService";
import { motion } from "framer-motion";

export default function CryptoProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await getProblemsByCategory("crypto");
        setProblems(data);
      } catch (error) {
        console.error("Failed to load crypto problems:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProblems();
  }, []);

  const difficultyColors: Record<string, string> = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Hard": "bg-red-100 text-red-800"
  };

  const categoryNames: Record<string, string> = {
    "web": "Web Exploitation",
    "crypto": "Cryptography",
    "reversing": "Reverse Engineering",
    "forensics": "Forensics",
    "pwn": "Binary Exploitation",
    "misc": "Miscellaneous"
  };

  const categoryName = categoryNames["crypto"] || "crypto";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading {categoryName} problems...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <Link href="/problems" className="text-blue-600 hover:text-blue-800">
            ← Back to All Problems
          </Link>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryName} Challenges</h1>
          <p className="text-gray-600">Practice problems specifically for {categoryName}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="text-3xl font-bold text-blue-600">{problems.length}</div>
            <div className="text-gray-600">Total Problems</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="text-3xl font-bold text-green-600">
              {problems.filter(p => p.difficulty === "Easy").length}
            </div>
            <div className="text-gray-600">Easy Problems</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="text-3xl font-bold text-yellow-600">
              {problems.filter(p => p.difficulty === "Medium").length}
            </div>
            <div className="text-gray-600">Medium Problems</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="text-3xl font-bold text-red-600">
              {problems.filter(p => p.difficulty === "Hard").length}
            </div>
            <div className="text-gray-600">Hard Problems</div>
          </motion.div>
        </div>

        {problems.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No problems available</h2>
            <p className="text-gray-600 mb-4">Check back later for new challenges in this category.</p>
            <Link 
              href="/problems"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Challenges
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Challenge
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Solves
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {problems.map((problem, index) => (
                    <motion.tr 
                      key={problem.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">{problem.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${difficultyColors[problem.difficulty]}`}>
                          {problem.difficulty}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {problem.points}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {problem.solves}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          href={`/problems/crypto/${problem.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Solve
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Cryptography Learning Path</h2>
          <p className="text-xl text-gray-200 mb-6">
            Start with classical ciphers and progress to modern encryption techniques.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Beginner</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Caesar Cipher</li>
                <li>Base64 Encoding</li>
                <li>ROT13</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Intermediate</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>RSA Basics</li>
                <li>AES Modes</li>
                <li>Hash Functions</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Advanced</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>ECC Cryptography</li>
                <li>Block Cipher Attacks</li>
                <li>Quantum Crypto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}