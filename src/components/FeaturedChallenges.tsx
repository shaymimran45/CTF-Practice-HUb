"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function FeaturedChallenges() {
  const challenges = [
    {
      id: 1,
      title: "SQL Injection Master",
      category: "Web Exploitation",
      difficulty: "Hard",
      points: 350,
      solves: 42,
      description: "Exploit a complex SQL injection vulnerability with multiple filters.",
    },
    {
      id: 2,
      title: "RSA Decryption Challenge",
      category: "Cryptography",
      difficulty: "Medium",
      points: 250,
      solves: 87,
      description: "Decrypt a message encrypted with a weak RSA implementation.",
    },
    {
      id: 3,
      title: "Memory Forensics",
      category: "Forensics",
      difficulty: "Medium",
      points: 300,
      solves: 56,
      description: "Analyze a memory dump to recover sensitive information.",
    },
  ];

  const difficultyColors: Record<string, string> = {
    "Easy": "bg-green-100 text-green-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "Hard": "bg-red-100 text-red-800"
  };

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Challenges</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try our most popular challenges to test your skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{challenge.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColors[challenge.difficulty]}`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    {challenge.category}
                  </span>
                  <span className="text-sm text-gray-600">{challenge.points} points</span>
                </div>
                
                <p className="text-gray-600 mb-6">{challenge.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{challenge.solves} solves</span>
                  <Link 
                    href={`/problems/web/${challenge.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Solve Challenge
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/problems" 
            className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            View All Challenges
          </Link>
        </div>
      </div>
    </div>
  );
}