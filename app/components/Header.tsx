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
    <header className="sticky top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--cream)]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--navy)] text-sm font-semibold text-[color:var(--cream)] transition group-hover:-translate-y-0.5">
            SS
          </span>
          <span className="leading-tight">
            <span className="block text-[0.7rem] uppercase tracking-[0.25em] text-[color:var(--text-muted)]">
              Srijan
            </span>
            <span className="block text-lg font-semibold text-[color:var(--navy)]">Speaks</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/contact" className="hidden md:inline-flex btn btn-primary px-6">
            Invite Srijan
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border)] text-[color:var(--navy)] transition hover:border-[color:var(--teal)] hover:text-[color:var(--teal)]"
            aria-label="Toggle menu"
          >
            <svg
              width="22"
              height="22"
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

      {isMenuOpen && (
        <nav className="md:hidden border-t border-[color:var(--border)] bg-[color:var(--cream-2)]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link py-3 border-b border-[color:var(--border)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href="/contact"
                className="btn btn-primary w-full justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Invite Srijan
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
