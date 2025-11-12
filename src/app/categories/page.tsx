"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, getProblems, Category, Problem } from "@/lib/problemsService";
import { motion } from "framer-motion";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesData, problemsData] = await Promise.all([
          getCategories(),
          getProblems()
        ]);
        setCategories(categoriesData);
        setProblems(problemsData);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  const getCategoryChallengeCount = (categoryId: string) => {
    return problems.filter(problem => problem.category === categoryId).length;
  };

  const getCategoryDifficulty = (categoryId: string) => {
    const categoryProblems = problems.filter(problem => problem.category === categoryId);
    if (categoryProblems.length === 0) return "Beginner";
    
    const easyCount = categoryProblems.filter(p => p.difficulty === "Easy").length;
    const mediumCount = categoryProblems.filter(p => p.difficulty === "Medium").length;
    const hardCount = categoryProblems.filter(p => p.difficulty === "Hard").length;
    
    if (hardCount > mediumCount && hardCount > easyCount) return "Expert";
    if (mediumCount > easyCount) return "Intermediate";
    return "Beginner to Advanced";
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Loading categories...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">CTF Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the different categories of CTF challenges. Each category has its own set of techniques, 
            tools, and methodologies. Click on any category to learn more about it and access practice problems.
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
              <div className={`h-2 bg-gradient-to-r ${category.color || 'from-gray-500 to-gray-700'}`}></div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">
                    {category.id === "web" && "🌐"}
                    {category.id === "crypto" && "🔐"}
                    {category.id === "reversing" && "🔄"}
                    {category.id === "forensics" && "🔍"}
                    {category.id === "pwn" && "💣"}
                    {category.id === "misc" && "🧩"}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                    <p className="text-gray-600">{getCategoryChallengeCount(category.id)} challenges</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{category.description}</p>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {getCategoryDifficulty(category.id)}
                  </span>
                </div>
                
                <Link 
                  href={`/categories/${category.id}`}
                  className="w-full inline-block text-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Learn More & Practice
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Getting Started</h3>
              <p className="text-gray-300">
                New to CTFs? Start with Web Exploitation or Cryptography categories 
                as they typically have more beginner-friendly challenges.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Progress Tracking</h3>
              <p className="text-gray-300">
                Create an account to track your progress, save your solutions, 
                and compete on the global leaderboard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-gray-300">
                Join our Discord community to discuss challenges, share solutions, 
                and collaborate with other cybersecurity enthusiasts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}