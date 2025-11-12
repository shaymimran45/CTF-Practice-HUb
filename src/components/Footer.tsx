"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CTF Practice Hub</h3>
            <p className="text-gray-400">
              A comprehensive platform for learning and practicing cybersecurity skills through CTF challenges.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/categories/web" className="hover:text-white transition-colors">Web Exploitation</Link></li>
              <li><Link href="/categories/crypto" className="hover:text-white transition-colors">Cryptography</Link></li>
              <li><Link href="/categories/reversing" className="hover:text-white transition-colors">Reverse Engineering</Link></li>
              <li><Link href="/categories/forensics" className="hover:text-white transition-colors">Forensics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/resources" className="hover:text-white transition-colors">Learning Materials</Link></li>
              <li><Link href="/problems" className="hover:text-white transition-colors">Practice Problems</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Problem Dashboard</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Community Forum</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white transition-colors">GitHub</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Twitter</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Discord</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} CTF Practice Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}