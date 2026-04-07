'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A0E27] border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-[#00D9FF]">
          ▲ SRIJAN
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#AAAAAA] hover:text-[#00D9FF] transition font-medium text-sm uppercase tracking-widest"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + MOBILE TOGGLE */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-block bg-[#00D9FF] text-[#0A0E27] px-6 py-2 font-semibold hover:bg-[#00A8CC] transition text-sm uppercase tracking-widest"
          >
            → Contact
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#AAAAAA] hover:text-[#00D9FF] hover:bg-[#121829] transition"
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {isMenuOpen ? (
                <>
                  <line x1="3" y1="6" x2="21" y2="18" />
                  <line x1="3" y1="18" x2="21" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU — dark theme */}
      {isMenuOpen && (
        <nav className="md:hidden bg-[#0A0E27] border-t border-[#1F2937]">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#AAAAAA] hover:text-[#00D9FF] transition font-medium text-sm uppercase tracking-widest py-2 border-b border-[#1F2937]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-[#00D9FF] text-[#0A0E27] px-6 py-3 font-bold uppercase tracking-widest hover:bg-[#00A8CC] transition text-center mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              → Get in Touch
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
