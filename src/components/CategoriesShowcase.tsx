"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoriesShowcase() {
  const categories = [
    {
      id: "web",
      name: "Web Exploitation",
      description: "Find and exploit vulnerabilities in web applications",
      icon: "🌐",
      color: "from-red-500 to-orange-500",
      challenges: 32,
    },
    {
      id: "crypto",
      name: "Cryptography",
      description: "Decrypt encoded messages and break encryption schemes",
      icon: "🔐",
      color: "from-green-500 to-emerald-500",
      challenges: 28,
    },
    {
      id: "reversing",
      name: "Reverse Engineering",
      description: "Analyze binaries to understand their functionality",
      icon: "🔄",
      color: "from-blue-500 to-cyan-500",
      challenges: 24,
    },
    {
      id: "forensics",
      name: "Forensics",
      description: "Recover hidden information from digital media",
      icon: "🔍",
      color: "from-purple-500 to-violet-500",
      challenges: 19,
    },
    {
      id: "pwn",
      name: "Binary Exploitation",
      description: "Exploit binary programs for unintended behavior",
      icon: "💣",
      color: "from-yellow-500 to-amber-500",
      challenges: 15,
    },
    {
      id: "misc",
      name: "Miscellaneous",
      description: "Various other types of challenges",
      icon: "🧩",
      color: "from-pink-500 to-rose-500",
      challenges: 9,
    },
  ];

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">CTF Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different cybersecurity domains and master each one
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-gray-600">{category.challenges} challenges</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <Link 
                  href={`/categories/${category.id}`}
                  className="inline-block w-full text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Learn & Practice
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}