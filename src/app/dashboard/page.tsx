"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getProblems, 
  getCategories, 
  getUserProgress, 
  getLeaderboard,
  Problem, 
  Category,
  User
} from "@/lib/problemsService";

export default function DashboardPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock user data - in a real app this would come from Supabase auth
  const mockUserId = "user-123";

  useEffect(() => {
    async function loadData() {
      try {
        const [problemsData, categoriesData, progressData, leaderboardData] = await Promise.all([
          getProblems(),
          getCategories(),
          getUserProgress(mockUserId),
          getLeaderboard()
        ]);
        
        setProblems(problemsData);
        setCategories(categoriesData);
        setProgress(progressData);
        setLeaderboard(leaderboardData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  // Calculate statistics
  const solvedProblems = progress.filter(p => p.solved).length;
  const totalProblems = problems.length;
  const successRate = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;
  const totalPoints = progress
    .filter(p => p.solved)
    .reduce((sum, p) => {
      const problem = problems.find(pr => pr.id === p.problem_id);
      return sum + (problem ? problem.points : 0);
    }, 0);

  // Get recent problems (last 5 added)
  const recentProblems = [...problems]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  // Get solved challenges by category
  const solvedByCategory = problems.reduce((acc, problem) => {
    const isSolved = progress.some(p => p.problem_id === problem.id && p.solved);
    if (isSolved) {
      acc[problem.category] = (acc[problem.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your CTF practice overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-6 text-white">
            <div className="text-3xl font-bold mb-2">{totalPoints.toLocaleString()}</div>
            <div className="text-blue-100">Total Points</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-xl shadow-lg p-6 text-white">
            <div className="text-3xl font-bold mb-2">{solvedProblems}</div>
            <div className="text-green-100">Challenges Solved</div>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 rounded-xl shadow-lg p-6 text-white">
            <div className="text-3xl font-bold mb-2">{totalProblems}</div>
            <div className="text-yellow-100">Total Challenges</div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
            <div className="text-3xl font-bold mb-2">{successRate}%</div>
            <div className="text-purple-100">Success Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Recent Challenges</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {recentProblems.map((problem) => {
                  const isSolved = progress.some(p => p.problem_id === problem.id && p.solved);
                  const category = categories.find(c => c.id === problem.category);
                  
                  return (
                    <div key={problem.id} className="px-6 py-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{problem.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {category?.name || problem.category}
                            </span>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {problem.difficulty}
                            </span>
                            <span className="ml-2 text-sm text-gray-500">{problem.points} points</span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {isSolved ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              Solved
                            </span>
                          ) : (
                            <Link 
                              href={`/problems/${problem.category}/${problem.id}`}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                            >
                              Solve
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <Link 
                  href="/problems" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View all challenges →
                </Link>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Progress by Category</h2>
              </div>
              <div className="p-6">
                {categories.map((category) => {
                  const totalInCategory = problems.filter(p => p.category === category.id).length;
                  const solvedInCategory = solvedByCategory[category.id] || 0;
                  const percentage = totalInCategory > 0 ? (solvedInCategory / totalInCategory) * 100 : 0;
                  
                  return (
                    <div key={category.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                        <span>{category.name}</span>
                        <span>{solvedInCategory}/{totalInCategory}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {leaderboard.slice(0, 5).map((user, index) => (
                  <div key={user.id} className="px-6 py-4 flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-gray-700">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.username}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-gray-500">
                      {user.points || 0} pts
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <Link 
                  href="/leaderboard" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View full leaderboard →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Supabase Integration Info */}
        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Supabase-Powered Dashboard</h2>
          <p className="text-xl text-gray-200 mb-6">
            This dashboard dynamically fetches all data from Supabase in real-time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-200">
                All statistics and progress updates automatically when new data is added to Supabase.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Centralized Data</h3>
              <p className="text-gray-200">
                Problems, user progress, and leaderboard data are all stored and managed through Supabase.
              </p>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Scalable Architecture</h3>
              <p className="text-gray-200">
                Easily handle thousands of users and challenges with Supabase's scalable infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}