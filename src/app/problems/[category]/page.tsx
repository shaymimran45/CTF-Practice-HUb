"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProblemsByCategory, Problem } from "@/lib/problemsService";
import { useParams } from "next/navigation";

export default function CategoryProblemsPage() {
  const params = useParams();
  const category = typeof params.category === 'string' ? params.category : '';
  
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblems() {
      if (!category) return;
      
      try {
        const data = await getProblemsByCategory(category);
        setProblems(data);
      } catch (error) {
        console.error(`Failed to load ${category} problems:`, error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProblems();
  }, [category]);

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

  const categoryName = categoryNames[category] || category;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading {categoryName} problems...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryName} Challenges</h1>
      <p className="text-gray-600 mb-6">Practice problems specifically for {categoryName}</p>
      
      {problems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
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
        <div className="bg-white rounded-lg shadow-md p-6">
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
                {problems.map((problem) => (
                  <tr key={problem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{problem.title}</div>
                      <div className="text-sm text-gray-500">{problem.description}</div>
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
                        Solve
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}