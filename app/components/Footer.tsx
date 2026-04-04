'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0E27] text-white py-12 border-t border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* ABOUT */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#00D9FF]">About</h3>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li>
                <Link href="/about" className="hover:text-[#00D9FF] transition">
                  Background
                </Link>
              </li>
              <li>
                <Link href="/speaking" className="hover:text-[#00D9FF] transition">
                  Speaking
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-[#00D9FF] transition">
                  Research
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTENT */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#00D9FF]">Content</h3>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li>
                <Link href="/blog" className="hover:text-[#00D9FF] transition">
                  Blog
                </Link>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-[#00D9FF] transition">
                  Newsletter
                </a>
              </li>
              <li>
                <a href="#media" className="hover:text-[#00D9FF] transition">
                  Media Kit
                </a>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#00D9FF]">Legal</h3>
            <ul className="space-y-2 text-[#AAAAAA]">
              <li>
                <a href="#privacy" className="hover:text-[#00D9FF] transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-[#00D9FF] transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#cookies" className="hover:text-[#00D9FF] transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#00D9FF]">Follow</h3>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF6B35] transition">
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} Srijan Speaks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
