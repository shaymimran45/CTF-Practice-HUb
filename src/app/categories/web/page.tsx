"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function WebCategoryPage() {
  const techniques = [
    {
      title: "Cross-Site Scripting (XSS)",
      description: "XSS involves injecting malicious scripts into web pages viewed by other users. It can be used to steal session cookies, deface websites, or redirect users to malicious sites.",
      difficulty: "Beginner to Advanced",
      examples: ["Reflected XSS", "Stored XSS", "DOM-based XSS"]
    },
    {
      title: "SQL Injection",
      description: "SQL Injection occurs when user input is not properly sanitized before being included in SQL queries. Attackers can manipulate queries to extract data, modify records, or execute administrative operations.",
      difficulty: "Beginner to Expert",
      examples: ["Union-based SQLi", "Error-based SQLi", "Blind SQLi", "Time-based SQLi"]
    },
    {
      title: "Cross-Site Request Forgery (CSRF)",
      description: "CSRF tricks a victim's browser into executing unwanted actions on a web application where they're authenticated. This can lead to unauthorized transactions or data modifications.",
      difficulty: "Intermediate",
      examples: ["GET-based CSRF", "POST-based CSRF", "Login CSRF"]
    },
    {
      title: "Server-Side Request Forgery (SSRF)",
      description: "SSRF occurs when an application fetches a remote resource without validating the user-supplied URL. This can lead to internal services exposure or cloud metadata access.",
      difficulty: "Intermediate to Expert",
      examples: ["Basic SSRF", "Blind SSRF", "DNS Rebinding"]
    }
  ];

  const tools = [
    { name: "Burp Suite", description: "Integrated platform for web application security testing" },
    { name: "OWASP ZAP", description: "Open-source web application security scanner" },
    { name: "SQLMap", description: "Automated SQL injection and database takeover tool" },
    { name: "XSStrike", description: "Advanced XSS detection and exploitation suite" }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="mb-6">
          <Link href="/categories" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to All Categories
          </Link>
        </nav>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Web Exploitation</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Web exploitation involves finding and exploiting vulnerabilities in web applications. 
            This category covers a wide range of attack vectors that target the client-side and server-side 
            components of web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Overview</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  Web exploitation is one of the most common categories in CTF competitions because 
                  web applications are ubiquitous and often contain security vulnerabilities. 
                  Challenges in this category typically involve:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Identifying vulnerabilities in web applications</li>
                  <li>Exploiting these vulnerabilities to gain unauthorized access</li>
                  <li>Extracting sensitive information or performing unauthorized actions</li>
                  <li>Bypassing security mechanisms</li>
                </ul>
                <p className="mb-4">
                  Web challenges often simulate real-world scenarios where participants must 
                  think like attackers to find weaknesses in web applications. These challenges 
                  help develop skills that are directly applicable to web application security 
                  assessments and penetration testing.
                </p>
                <p>
                  Success in web exploitation requires a deep understanding of web technologies, 
                  including HTTP protocols, HTML, CSS, JavaScript, server-side languages, 
                  and database systems. Familiarity with common web application frameworks 
                  and security best practices is also essential.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {techniques.map((technique, index) => (
                  <motion.div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 bg-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{technique.title}</h3>
                    <p className="text-gray-600 mb-3 leading-relaxed">{technique.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {technique.difficulty}
                      </span>
                      <div className="text-sm text-gray-500">
                        {technique.examples.length} variants
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-xl shadow-lg p-8 text-white mb-8">
              <h2 className="text-2xl font-bold mb-4">Essential Tools</h2>
              <div className="space-y-4">
                {tools.map((tool, index) => (
                  <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="font-semibold text-lg mb-1">{tool.name}</h3>
                    <p className="text-gray-200 text-sm">{tool.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Path</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Beginner</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>HTML/CSS/JavaScript fundamentals</li>
                    <li>HTTP protocol basics</li>
                    <li>Introduction to OWASP Top 10</li>
                    <li>Basic XSS and SQLi challenges</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intermediate</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>Advanced XSS techniques</li>
                    <li>Blind SQL injection</li>
                    <li>CSRF and session management</li>
                    <li>File inclusion vulnerabilities</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced</h3>
                  <ul className="list-disc pl-6 space-y-1 text-gray-600">
                    <li>SSRF exploitation</li>
                    <li>Deserialization attacks</li>
                    <li>Prototype pollution</li>
                    <li>GraphQL security issues</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8">
                <Link 
                  href="/problems/web"
                  className="w-full inline-block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Practice Web Challenges
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl shadow-lg p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Web Security Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Documentation</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">OWASP Top 10</a></li>
                <li><a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">PortSwigger Academy</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Practice Platforms</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://hackthebox.eu" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">Hack The Box</a></li>
                <li><a href="https://tryhackme.com" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">TryHackMe</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Tools</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="https://portswigger.net/burp" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">Burp Suite</a></li>
                <li><a href="https://github.com/sqlmapproject/sqlmap" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors">SQLMap</a></li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-semibold mb-2">Books</h3>
              <ul className="space-y-1 text-sm">
                <li>The Web Application Hacker's Handbook</li>
                <li>Hacking APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}