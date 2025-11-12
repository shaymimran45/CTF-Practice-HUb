"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { isAdmin } from "@/lib/problemsService";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("web");
  const [difficulty, setDifficulty] = useState("Easy");
  const [points, setPoints] = useState(100);
  const [flag, setFlag] = useState("");
  const [hint1, setHint1] = useState("");
  const [hint2, setHint2] = useState("");
  const [hint3, setHint3] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is admin
  useEffect(() => {
    const checkAdmin = async () => {
      const adminStatus = await isAdmin();
      setIsAdminUser(adminStatus);
      setLoading(false);
      
      // Redirect if not admin
      if (!adminStatus) {
        router.push("/login");
      }
    };
    
    checkAdmin();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      // Prepare hints array
      const hints = [hint1, hint2, hint3].filter(hint => hint.trim() !== "");

      // Prepare files array
      const files = fileName && fileUrl && fileSize ? 
        [{ name: fileName, url: fileUrl, size: fileSize }] : [];

      // Insert the new problem
      const { data, error } = await supabase
        .from('problems')
        .insert([
          {
            title,
            description,
            category,
            difficulty,
            points: parseInt(points.toString()),
            flag,
            hints,
            files
          }
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      setMessage("Problem uploaded successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("web");
      setDifficulty("Easy");
      setPoints(100);
      setFlag("");
      setHint1("");
      setHint2("");
      setHint3("");
      setFileName("");
      setFileUrl("");
      setFileSize("");
    } catch (error) {
      console.error("Error uploading problem:", error);
      setMessage(`Error: ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Checking admin access...</div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdminUser) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full mx-4">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">You do not have permission to access the admin dashboard.</p>
          <button 
            onClick={() => router.push("/login")}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Upload and manage CTF problems</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Upload New Problem</h2>
          </div>
          
          <div className="p-6">
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('Error') ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-green-100 text-green-800 border border-green-200'}`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="web">Web Exploitation</option>
                    <option value="crypto">Cryptography</option>
                    <option value="reversing">Reverse Engineering</option>
                    <option value="forensics">Forensics</option>
                    <option value="pwn">Binary Exploitation</option>
                    <option value="misc">Miscellaneous</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                    Points
                  </label>
                  <input
                    type="number"
                    id="points"
                    value={points}
                    onChange={(e) => setPoints(parseInt(e.target.value))}
                    min="10"
                    max="1000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="flag" className="block text-sm font-medium text-gray-700 mb-1">
                    Flag (Format: WOW&#123;flag_content&#125;)
                  </label>
                  <input
                    type="text"
                    id="flag"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    pattern="WOW\{[^}]+\}"
                    title="Flag must be in the format WOW{flag_content}"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">Must follow the format: WOW&#123;flag_content&#125;</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                ></textarea>
                <p className="mt-1 text-sm text-gray-500">Provide a detailed description of the challenge including any background information, objectives, and instructions.</p>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Hints</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="hint1" className="block text-sm font-medium text-gray-700 mb-1">
                      Hint 1
                    </label>
                    <input
                      type="text"
                      id="hint1"
                      value={hint1}
                      onChange={(e) => setHint1(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="First hint to help users solve the challenge"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hint2" className="block text-sm font-medium text-gray-700 mb-1">
                      Hint 2
                    </label>
                    <input
                      type="text"
                      id="hint2"
                      value={hint2}
                      onChange={(e) => setHint2(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Second hint for additional guidance"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="hint3" className="block text-sm font-medium text-gray-700 mb-1">
                      Hint 3
                    </label>
                    <input
                      type="text"
                      id="hint3"
                      value={hint3}
                      onChange={(e) => setHint3(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Third hint for more advanced users"
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Files</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="fileName" className="block text-sm font-medium text-gray-700 mb-1">
                      File Name
                    </label>
                    <input
                      type="text"
                      id="fileName"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="challenge.zip"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      File URL
                    </label>
                    <input
                      type="url"
                      id="fileUrl"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="https://example.com/challenge.zip"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fileSize" className="block text-sm font-medium text-gray-700 mb-1">
                      File Size
                    </label>
                    <input
                      type="text"
                      id="fileSize"
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="1.2 MB"
                    />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500">Provide downloadable files needed for the challenge (optional)</p>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? "Uploading..." : "Upload Problem"}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Database Setup Instructions</h2>
          <p className="text-xl text-gray-200 mb-6 leading-relaxed">
            To initialize your Supabase database, copy and paste the contents of the SUPABASE_INIT.sql file into your Supabase SQL editor.
          </p>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Steps to Set Up:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Go to your Supabase project dashboard</li>
              <li>Navigate to the SQL editor</li>
              <li>Copy the entire contents of SUPABASE_INIT.sql</li>
              <li>Paste it into the SQL editor and run it</li>
              <li>Your database tables will be created with sample data</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}