"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getProblems, getCategories } from "@/lib/problemsService";

export default function HomePage() {
  const [problemsCount, setProblemsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    async function loadData() {
      try {
        const [problems, categories] = await Promise.all([
          getProblems(),
          getCategories()
        ]);
        setProblemsCount(problems.length);
        setCategoriesCount(categories.length);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }
    
    loadData();
  }, []);

  const features = [
    {
      title: "Dynamic Challenges",
      description: "All challenges are dynamically loaded from Supabase, allowing easy updates and additions without code changes.",
      icon: "🔄"
    },
    {
      title: "Real-time Updates",
      description: "Get real-time updates on new challenges, leaderboard changes, and community activity.",
      icon: "⚡"
    },
    {
      title: "Progress Tracking",
      description: "Track your progress across all categories with detailed statistics and achievements.",
      icon: "📊"
    },
    {
      title: "Community Leaderboard",
      description: "Compete with other CTF players globally on our dynamic leaderboard.",
      icon: "🏆"
    }
  ];

  const categories = [
    { id: "web", name: "Web Exploitation", description: "Exploiting web application vulnerabilities", icon: "🌐", color: "from-red-500 to-orange-500" },
    { id: "crypto", name: "Cryptography", description: "Decrypting encoded messages and breaking encryption", icon: "🔐", color: "from-green-500 to-emerald-500" },
    { id: "reversing", name: "Reverse Engineering", description: "Analyzing binaries to understand functionality", icon: "🔄", color: "from-blue-500 to-cyan-500" },
    { id: "forensics", name: "Forensics", description: "Recovering hidden information from digital media", icon: "🔍", color: "from-purple-500 to-violet-500" },
    { id: "pwn", name: "Binary Exploitation", description: "Exploiting binaries for unintended behavior", icon: "💣", color: "from-yellow-500 to-amber-500" },
    { id: "misc", name: "Miscellaneous", description: "Various other types of challenges", icon: "🧩", color: "from-pink-500 to-rose-500" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Master CTF Challenges
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Practice cybersecurity skills with dynamically updated challenges powered by Supabase
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="/problems" 
                className="px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
              >
                Start Practicing
              </Link>
              <Link 
                href="/categories" 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-colors text-lg"
              >
                Explore Categories
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">{problemsCount}+</div>
              <div className="text-xl text-gray-700">Challenges</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-5xl font-bold text-green-600 mb-2">{categoriesCount}</div>
              <div className="text-xl text-gray-700">Categories</div>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-5xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-xl text-gray-700">Supabase Powered</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform offers everything you need to master CTF challenges with dynamic content powered by Supabase
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Challenge Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore different types of CTF challenges, each with unique techniques and methodologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 bg-gradient-to-r ${category.color}`}></div>
                <div className="p-8">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>
                  <Link 
                    href={`/categories/${category.id}`}
                    className="inline-block w-full text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Learn & Practice
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Supabase Integration Section */}
      <div className="py-24 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powered by Supabase</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform leverages Supabase for real-time data, authentication, and scalable infrastructure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Why Supabase?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-400 mr-3">✓</div>
                  <p>Real-time database updates for instant challenge availability</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-400 mr-3">✓</div>
                  <p>Secure authentication with email/password or social login</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-400 mr-3">✓</div>
                  <p>Automatic API generation for seamless frontend integration</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-400 mr-3">✓</div>
                  <p>Scalable infrastructure that grows with your needs</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-400 mr-3">✓</div>
                  <p>Open source with no vendor lock-in</p>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Supabase Features in Action</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg mb-2">Dynamic Content</h4>
                  <p className="text-gray-300">
                    All challenges, categories, and user progress are stored in Supabase and 
                    dynamically loaded in real-time.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Real-time Leaderboard</h4>
                  <p className="text-gray-300">
                    Leaderboard updates automatically as users solve challenges, 
                    powered by Supabase real-time subscriptions.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Secure Authentication</h4>
                  <p className="text-gray-300">
                    User accounts and progress are securely managed with Supabase Auth, 
                    supporting multiple authentication providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              href="https://supabase.io" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors mr-4"
            >
              Learn About Supabase
            </Link>
            <Link 
              href="/admin"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Master CTF Challenges?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Join thousands of cybersecurity enthusiasts practicing their skills with our Supabase-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/problems" 
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Start Practicing Now
            </Link>
            <Link 
              href="/resources" 
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}