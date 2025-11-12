"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProblems, getCategories, Problem, Category } from "@/lib/problemsService";
import { motion } from "framer-motion";

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  useEffect(() => {
    async function loadData() {
      try {
        const [problemsData, categoriesData] = await Promise.all([
          getProblems(),
          getCategories()
        ]);
        setProblems(problemsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
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

  const categoryColors: Record<string, string> = {
    "web": "bg-red-100 text-red-800",
    "crypto": "bg-green-100 text-green-800",
    "reversing": "bg-blue-100 text-blue-800",
    "forensics": "bg-purple-100 text-purple-800",
    "pwn": "bg-yellow-100 text-yellow-800",
    "misc": "bg-pink-100 text-pink-800"
  };

  // Filter problems based on selected filters
  const filteredProblems = problems.filter(problem => {
    if (filterCategory !== "all" && problem.category !== filterCategory) {
      return false;
    }
    if (filterDifficulty !== "all" && problem.difficulty !== filterDifficulty) {
      return false;
    }
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading problems...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Problems</h1>
          <p className="text-gray-600">Challenge yourself with these CTF problems across multiple categories</p>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/problems/${category.id}`} 
              className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-2xl mb-2">
                {category.id === "web" && "🌐"}
                {category.id === "crypto" && "🔐"}
                {category.id === "reversing" && "🔄"}
                {category.id === "forensics" && "🔍"}
                {category.id === "pwn" && "💣"}
                {category.id === "misc" && "🧩"}
              </div>
              <div className="font-medium text-gray-900">{category.name.split(' ')[0]}</div>
              <div className="text-sm text-gray-500">
                {problems.filter(p => p.category === category.id).length} challenges
              </div>
            </Link>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">All Challenges</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <select 
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Difficulties</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
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

        {/* Problems Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Challenge
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
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
                {filteredProblems.length > 0 ? (
                  filteredProblems.map((problem, index) => (
                    <motion.tr 
                      key={problem.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2">
                          {problem.description.substring(0, 100)}...
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColors[problem.category]}`}>
                          {categoryNames[problem.category]}
                        </span>
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
                          href={`/problems/${problem.category}/${problem.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No problems match the selected filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supabase Integration Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Dynamic Content Management</h2>
          <p className="text-gray-600 mb-4">
            All problems are hosted and managed through Supabase. This allows for easy deployment, 
            updating, and management of challenges. Problems can be dynamically added, modified, 
            or removed without changing the application code.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">How it works</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Problems are stored in Supabase database tables</li>
                <li>Files and attachments are stored in Supabase storage</li>
                <li>Real-time updates through Supabase subscriptions</li>
                <li>Secure access control with Supabase authentication</li>
              </ul>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Easy deployment of new challenges</li>
                <li>Centralized problem management</li>
                <li>Scalable infrastructure</li>
                <li>Real-time collaboration features</li>
              </ul>
            </div>
          </div>
          <div className="mt-6">
            <Link 
              href="/admin"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}