"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  getUserProfile, 
  getUserProgress, 
  getProblems, 
  getLeaderboard, 
  getCategories,
  User, 
  Problem,
  Category
} from "@/lib/problemsService";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<any[]>([]);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock user data - in a real app this would come from Supabase auth
  const mockUserId = "user-123";

  useEffect(() => {
    async function loadData() {
      try {
        // In a real app, we would get the user ID from Supabase auth
        const userData = {
          id: mockUserId,
          username: "ctf_player",
          email: "player@example.com",
          created_at: new Date().toISOString()
        };
        
        const [progressData, problemsData, leaderboardData, categoriesData] = await Promise.all([
          getUserProgress(mockUserId),
          getProblems(),
          getLeaderboard(),
          getCategories()
        ]);
        
        setUser(userData);
        setProgress(progressData);
        setProblems(problemsData);
        setLeaderboard(leaderboardData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load profile data:", error);
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

  // Get recent activity (last 4 solved problems)
  const recentActivity = progress
    .filter(p => p.solved)
    .sort((a, b) => new Date(b.solved_at!).getTime() - new Date(a.solved_at!).getTime())
    .slice(0, 4)
    .map(p => {
      const problem = problems.find(pr => pr.id === p.problem_id);
      return {
        ...p,
        problem_title: problem?.title || "Unknown Problem",
        problem_category: problem?.category || "unknown",
        points: problem?.points || 0
      };
    });

  // Get solved challenges by category
  const solvedByCategory = problems.reduce((acc, problem) => {
    const isSolved = progress.some(p => p.problem_id === problem.id && p.solved);
    if (isSolved) {
      acc[problem.category] = (acc[problem.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get points by category
  const pointsByCategory = problems.reduce((acc, problem) => {
    const isSolved = progress.some(p => p.problem_id === problem.id && p.solved);
    if (isSolved) {
      acc[problem.category] = (acc[problem.category] || 0) + problem.points;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get difficulty distribution
  const difficultyDistribution = problems.reduce((acc, problem) => {
    const isSolved = progress.some(p => p.problem_id === problem.id && p.solved);
    if (isSolved) {
      acc[problem.difficulty] = (acc[problem.difficulty] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Loading profile...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold mb-4 md:mb-0 md:mr-6">
                {user?.username?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold">{user?.username || "User"}</h1>
                <p className="text-xl text-blue-200 mb-2">{user?.email || "user@example.com"}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    <span>Global</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📅</span>
                    <span>Joined {new Date(user?.created_at || new Date()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0 md:ml-auto flex flex-col items-center">
                <div className="text-3xl font-bold">#{Math.floor(Math.random() * 1000) + 1}</div>
                <div className="text-blue-200">Global Rank</div>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 border-b border-gray-200">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{totalPoints.toLocaleString()}</div>
              <div className="text-gray-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{solvedProblems}</div>
              <div className="text-gray-600">Challenges Solved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{totalProblems}</div>
              <div className="text-gray-600">Challenges Attempted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{successRate}%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "activity"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Recent Activity
              </button>
              <button
                onClick={() => setActiveTab("progress")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "progress"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Progress Analysis
              </button>
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "leaderboard"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab("tools")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "tools"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Recommended Tools
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Solved Challenges by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(solvedByCategory).map(([category, count]) => {
                    const totalInCategory = problems.filter(p => p.category === category).length;
                    const percentage = totalInCategory > 0 ? (count / totalInCategory) * 100 : 0;
                    
                    return (
                      <div key={category} className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                          {category === "web" && "Web Exploitation"}
                          {category === "crypto" && "Cryptography"}
                          {category === "reversing" && "Reverse Engineering"}
                          {category === "forensics" && "Forensics"}
                          {category === "pwn" && "Binary Exploitation"}
                          {category === "misc" && "Miscellaneous"}
                          {!["web", "crypto", "reversing", "forensics", "pwn", "misc"].includes(category) && category}
                        </h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{count} solved</span>
                          <span>{totalInCategory} total</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Summary Card */}
                <div className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Progress Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-2xl font-bold">{solvedProblems}</div>
                      <div className="text-gray-200">Challenges Solved</div>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-2xl font-bold">{totalPoints}</div>
                      <div className="text-gray-200">Total Points</div>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-2xl font-bold">{successRate}%</div>
                      <div className="text-gray-200">Success Rate</div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Overall Progress</h4>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full"
                        style={{ width: `${totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{solvedProblems} of {totalProblems} challenges completed</span>
                      <span>{totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                {recentActivity.length > 0 ? (
                  <div className="overflow-hidden">
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
                            Points
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentActivity.map((activity) => (
                          <tr key={activity.problem_id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{activity.problem_title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                {activity.problem_category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {activity.points}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(activity.solved_at!).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Solved
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No activity yet. Start solving challenges to see your progress!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "progress" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Progress Analysis</h2>
                
                {/* Category Performance Chart */}
                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Category</h3>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const solvedCount = solvedByCategory[category.id] || 0;
                      const totalInCategory = problems.filter(p => p.category === category.id).length;
                      const pointsInCategory = pointsByCategory[category.id] || 0;
                      const percentage = totalInCategory > 0 ? (solvedCount / totalInCategory) * 100 : 0;
                      
                      return (
                        <div key={category.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-700 capitalize">
                              {category.name}
                            </span>
                            <span className="text-gray-600">
                              {solvedCount}/{totalInCategory} ({Math.round(percentage)}%) - {pointsInCategory} pts
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Difficulty Distribution */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Solved by Difficulty</h3>
                    <div className="space-y-3">
                      {Object.entries({ Easy: 0, Medium: 0, Hard: 0 }).map(([difficulty]) => {
                        const count = difficultyDistribution[difficulty] || 0;
                        const totalOfDifficulty = problems.filter(p => p.difficulty === difficulty).length;
                        const percentage = totalOfDifficulty > 0 ? (count / totalOfDifficulty) * 100 : 0;
                        
                        let colorClass = "";
                        if (difficulty === "Easy") colorClass = "bg-green-500";
                        else if (difficulty === "Medium") colorClass = "bg-yellow-500";
                        else if (difficulty === "Hard") colorClass = "bg-red-500";
                        
                        return (
                          <div key={difficulty} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">{difficulty}</span>
                              <span className="text-gray-600">{count}/{totalOfDifficulty} ({Math.round(percentage)}%)</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`${colorClass} h-2 rounded-full`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Points by Category</h3>
                    <div className="space-y-3">
                      {categories.map((category) => {
                        const points = pointsByCategory[category.id] || 0;
                        const maxPoints = Math.max(...Object.values(pointsByCategory), 1);
                        const percentage = (points / maxPoints) * 100;
                        
                        return (
                          <div key={category.id} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700 capitalize">{category.name}</span>
                              <span className="text-gray-600">{points} pts</span>
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
                </div>
                
                {/* Progress Summary */}
                <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Progress Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-2xl font-bold">{solvedProblems}</div>
                      <div className="text-gray-200">Challenges Solved</div>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-2xl font-bold">{totalPoints}</div>
                      <div className="text-gray-200">Total Points</div>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <div className="text-2xl font-bold">{successRate}%</div>
                      <div className="text-gray-200">Success Rate</div>
                    </div>
                  </div>
                  
                  {/* Overall Progress Bar */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Overall Progress</h4>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
                        style={{ width: `${totalProblems > 0 ? (solvedProblems / totalProblems) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{solvedProblems} of {totalProblems} challenges completed</span>
                      <span>{totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "leaderboard" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Global Leaderboard</h2>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rank
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Player
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Challenges Solved
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {leaderboard.map((player, index) => {
                        const solvedCount = progress.filter(p => 
                          p.user_id === player.id && p.solved
                        ).length;
                        
                        return (
                          <tr 
                            key={player.id} 
                            className={player.id === mockUserId ? "bg-blue-50" : ""}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{index + 1}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    {player.username.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {player.username}
                                    {player.id === mockUserId && (
                                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        You
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-sm text-gray-500">{player.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {player.points || 0}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {solvedCount}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "tools" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Web Exploitation Tools */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🌐</span> Web Exploitation
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://portswigger.net/burp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Burp Suite
                        </a>
                        <p className="text-sm text-gray-600">Web application security testing platform</p>
                      </li>
                      <li>
                        <a href="https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          OWASP ZAP
                        </a>
                        <p className="text-sm text-gray-600">Open-source web application security scanner</p>
                      </li>
                      <li>
                        <a href="https://github.com/sqlmapproject/sqlmap" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          SQLMap
                        </a>
                        <p className="text-sm text-gray-600">Automatic SQL injection and database takeover tool</p>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Cryptography Tools */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🔐</span> Cryptography
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://gchq.github.io/CyberChef/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          CyberChef
                        </a>
                        <p className="text-sm text-gray-600">Web app for encryption, encoding, compression and data analysis</p>
                      </li>
                      <li>
                        <a href="https://hashcat.net/hashcat/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Hashcat
                        </a>
                        <p className="text-sm text-gray-600">Advanced password recovery tool</p>
                      </li>
                      <li>
                        <a href="https://www.openwall.com/john/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          John the Ripper
                        </a>
                        <p className="text-sm text-gray-600">Password security auditing and recovery tool</p>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Reverse Engineering Tools */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🔄</span> Reverse Engineering
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://ghidra-sre.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Ghidra
                        </a>
                        <p className="text-sm text-gray-600">NSA's software reverse engineering suite</p>
                      </li>
                      <li>
                        <a href="https://www.hex-rays.com/products/ida/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          IDA Pro
                        </a>
                        <p className="text-sm text-gray-600">Industry standard disassembler and debugger</p>
                      </li>
                      <li>
                        <a href="https://github.com/radareorg/radare2" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Radare2
                        </a>
                        <p className="text-sm text-gray-600">Open-source reverse engineering framework</p>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Forensics Tools */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🔍</span> Forensics
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Wireshark
                        </a>
                        <p className="text-sm text-gray-600">Network protocol analyzer</p>
                      </li>
                      <li>
                        <a href="https://www.autopsy.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Autopsy
                        </a>
                        <p className="text-sm text-gray-600">Digital forensics platform</p>
                      </li>
                      <li>
                        <a href="https://github.com/ReFirmLabs/binwalk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Binwalk
                        </a>
                        <p className="text-sm text-gray-600">Firmware analysis tool</p>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Binary Exploitation Tools */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">💣</span> Binary Exploitation
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://github.com/Gallopsled/pwntools" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Pwntools
                        </a>
                        <p className="text-sm text-gray-600">CTF framework and exploit development library</p>
                      </li>
                      <li>
                        <a href="https://www.gnu.org/software/gdb/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          GDB
                        </a>
                        <p className="text-sm text-gray-600">GNU Debugger</p>
                      </li>
                      <li>
                        <a href="https://github.com/pwndbg/pwndbg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Pwndbg
                        </a>
                        <p className="text-sm text-gray-600">GDB plug-in that makes debugging with GDB suck less</p>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Miscellaneous Tools */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">🧩</span> Miscellaneous
                    </h3>
                    <ul className="space-y-2">
                      <li>
                        <a href="https://github.com/StefanoDeVuono/steghide" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Steghide
                        </a>
                        <p className="text-sm text-gray-600">Steganography tool for hiding data in images</p>
                      </li>
                      <li>
                        <a href="https://github.com/zed-0xff/zsteg" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          Zsteg
                        </a>
                        <p className="text-sm text-gray-600">PNG/BMP steganography tool</p>
                      </li>
                      <li>
                        <a href="https://github.com/brimorlabs/RTFExploit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          ExifTool
                        </a>
                        <p className="text-sm text-gray-600">Tool for reading, writing and editing meta information</p>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Tools Recommendation Summary */}
                <div className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Getting Started with CTF Tools</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">1. Install Essential Tools</h4>
                      <p className="text-gray-200">
                        Start with tools like Python, GDB, and basic command-line utilities. 
                        Then move to category-specific tools as you progress.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">2. Practice with Examples</h4>
                      <p className="text-gray-200">
                        Use deliberately vulnerable applications and CTF challenges to practice 
                        with each tool in a controlled environment.
                      </p>
                    </div>
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold mb-2">3. Build Your Workflow</h4>
                      <p className="text-gray-200">
                        Develop a systematic approach for each category, combining multiple 
                        tools to solve complex challenges efficiently.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}