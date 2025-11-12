"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Practice Problems", href: "/problems" },
    { name: "Resources", href: "/resources" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              CTF Practice Hub
            </Link>
          </div>
          
          <div className="flex-1 flex justify-center">
            <ul className="flex flex-wrap justify-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hover:text-blue-400 transition-colors ${
                      pathname === item.href ? "text-blue-400" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="flex items-center space-x-2 hover:text-blue-400 transition-colors">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold">
                JD
              </div>
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}