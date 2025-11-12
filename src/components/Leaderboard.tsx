"use client";

import { motion } from "framer-motion";

export default function Leaderboard() {
  const topUsers = [
    { id: 1, name: "CyberNinja", score: 4250, country: "🇺🇸", rank: 1 },
    { id: 2, name: "CryptoMaster", score: 3875, country: "🇬🇧", rank: 2 },
    { id: 3, name: "BinaryWizard", score: 3620, country: "🇩🇪", rank: 3 },
    { id: 4, name: "ForensicExpert", score: 3400, country: "🇨🇦", rank: 4 },
    { id: 5, name: "WebHacker", score: 3150, country: "🇦🇺", rank: 5 },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Leaderboard</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compete with other cybersecurity enthusiasts worldwide
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-12 bg-gray-100 px-6 py-3 text-gray-600 font-medium">
              <div className="col-span-1">Rank</div>
              <div className="col-span-6">User</div>
              <div className="col-span-3">Country</div>
              <div className="col-span-2 text-right">Score</div>
            </div>
            
            {topUsers.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`grid grid-cols-12 px-6 py-4 border-b border-gray-100 last:border-0 ${
                  user.rank === 1 ? "bg-yellow-50" : 
                  user.rank === 2 ? "bg-gray-50" : 
                  user.rank === 3 ? "bg-amber-50" : ""
                }`}
              >
                <div className="col-span-1 font-bold">
                  {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : user.rank}
                </div>
                <div className="col-span-6 font-medium">
                  {user.name}
                  {user.rank <= 3 && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Top {user.rank}
                    </span>
                  )}
                </div>
                <div className="col-span-3">{user.country}</div>
                <div className="col-span-2 text-right font-bold text-gray-900">{user.score.toLocaleString()}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              View Full Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}