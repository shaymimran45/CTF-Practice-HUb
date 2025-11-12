"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  getProblemById, 
  validateFlag, 
  recordSubmission, 
  updateUserProgress, 
  incrementProblemSolves,
  getCurrentUser
} from "@/lib/problemsService";

export default function ProblemPage() {
  const params = useParams();
  const categoryId = typeof params.category === 'string' ? params.category : '';
  const problemId = typeof params.id === 'string' ? parseInt(params.id) : 0;
  
  const [activeTab, setActiveTab] = useState("description");
  const [userInput, setUserInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showHint, setShowHint] = useState(0); // 0 = no hint, 1-3 = hint index
  const [currentUser, setCurrentUser] = useState<any>(null);

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

  const categoryName = categoryNames[categoryId] || categoryId;

  useEffect(() => {
    async function loadProblem() {
      if (!problemId) return;
      
      try {
        // Get current user
        const user = await getCurrentUser();
        setCurrentUser(user);
        
        const data = await getProblemById(problemId);
        setProblem(data);
      } catch (error) {
        console.error(`Failed to load problem ${problemId}:`, error);
      } finally {
        setLoading(false);
      }
    }
    
    loadProblem();
  }, [problemId]);

  useEffect(() => {
    // Timer for tracking time spent on problem
    const timer = setInterval(() => {
      if (!isSolved) {
        setTimeElapsed(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSolved]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!problem) return;
    
    setSubmitted(true);
    
    // Validate the flag (must be in WOW{} format)
    const correct = await validateFlag(problem.id, userInput);
    setIsCorrect(correct);
    
    // Get user ID or use mock if not logged in
    const userId = currentUser?.id || "user-123";
    
    if (correct) {
      setIsSolved(true);
      await recordSubmission(userId, problem.id, userInput, true);
      await updateUserProgress(userId, problem.id, true);
      await incrementProblemSolves(problem.id);
    } else {
      await recordSubmission(userId, problem.id, userInput, false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Loading problem...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-600">Problem not found</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <Link href="/problems" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to All Problems
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href={`/problems/${categoryId}`} className="text-blue-600 hover:text-blue-800 transition-colors">
            {categoryName}
          </Link>
        </nav>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          {/* Problem Header */}
          <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold mb-2">{problem.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-medium">
                    {categoryName}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[problem.difficulty]}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-sm bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full">
                    {problem.points} points
                  </span>
                  <span className="text-sm bg-gray-800 bg-opacity-50 px-3 py-1 rounded-full">
                    {problem.solves} solves
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-sm text-gray-300">Time Elapsed</div>
                <div className="text-2xl font-mono font-bold">{formatTime(timeElapsed)}</div>
              </div>
            </div>
          </div>

          {/* Problem Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b border-gray-200 bg-gray-50">
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-lg font-bold text-gray-900">{problem.solves}</div>
              <div className="text-sm text-gray-600">Solves</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-lg font-bold text-gray-900">{problem.points}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-lg font-bold text-gray-900">Admin</div>
              <div className="text-sm text-gray-600">Author</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg shadow-sm">
              <div className="text-lg font-bold text-gray-900">
                {new Date(problem.created_at).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-600">Created</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex flex-wrap -mb-px">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "description"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("files")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "files"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab("hints")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "hints"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Hints
              </button>
              <button
                onClick={() => setActiveTab("solver")}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "solver"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Submit Flag
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Challenge Description</h2>
                <div className="prose max-w-none text-gray-700 mb-6 leading-relaxed">
                  {problem.description.split('\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        <strong>Objective:</strong> Extract the flag from the challenge and submit it in the format WOW&#123;content&#125;.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "files" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Challenge Files</h2>
                {problem.files && problem.files.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {problem.files.map((file: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                        <div className="flex items-center">
                          <div className="bg-gray-100 p-3 rounded-lg mr-4">
                            <svg className="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{file.name}</h3>
                            <p className="text-sm text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <a 
                          href={file.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 w-full inline-block text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No files available</h3>
                    <p className="mt-1 text-sm text-gray-500">This challenge does not require any downloadable files.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "hints" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Hints</h2>
                {problem.hints && problem.hints.length > 0 ? (
                  <div className="space-y-4">
                    {problem.hints.map((hint: string, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                          </div>
                          <div className="ml-4">
                            <p className="text-gray-700">{hint}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No hints available</h3>
                    <p className="mt-1 text-sm text-gray-500">No hints have been provided for this challenge.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "solver" && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Submit Flag</h2>
                {!currentUser && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Note:</strong> You are not logged in. Your progress will not be saved. 
                          <Link href="/login" className="font-medium text-yellow-800 underline ml-1 hover:text-yellow-900 transition-colors">Log in</Link> to save your progress.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="mb-4">
                    <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Answer
                    </label>
                    <input
                      type="text"
                      id="answer"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="WOW{...}"
                      disabled={submitted && isCorrect}
                    />
                    <p className="mt-1 text-sm text-gray-500">Flag format: WOW&#123;content&#125;</p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    disabled={submitted && isCorrect}
                  >
                    Submit Flag
                  </button>
                </form>

                {submitted && (
                  <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'}`}>
                    {isCorrect ? (
                      <div>
                        <h3 className="font-semibold text-green-800">Correct!</h3>
                        <p className="text-green-700">You've successfully solved this challenge.</p>
                        <div className="mt-4 flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-green-700">+{problem.points} points awarded</span>
                        </div>
                        {currentUser ? (
                          <p className="text-green-700 mt-2">Your progress has been saved!</p>
                        ) : (
                          <p className="text-green-700 mt-2">
                            Log in to save your progress. 
                            <Link href="/login" className="font-medium text-green-800 underline ml-1 hover:text-green-900 transition-colors">Log in now</Link>
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <h3 className="font-semibold text-red-800">Incorrect</h3>
                        <p className="text-red-700">Please try again. Make sure you're following the flag format WOW&#123;content&#125;.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Additional Resources */}
                <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-gray-800 mb-2">Category Tools</h4>
                      <p className="text-sm text-gray-600 mb-3">Check out the tools recommended for this category</p>
                      <Link 
                        href="/tools" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        View Tools →
                      </Link>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-gray-800 mb-2">Learning Resources</h4>
                      <p className="text-sm text-gray-600 mb-3">Find tutorials and guides for this challenge type</p>
                      <Link 
                        href="/resources" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        View Resources →
                      </Link>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                      <h4 className="font-medium text-gray-800 mb-2">Community</h4>
                      <p className="text-sm text-gray-600 mb-3">Join our community to discuss challenges</p>
                      <Link 
                        href="/discord" 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        Join Discord →
                      </Link>
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