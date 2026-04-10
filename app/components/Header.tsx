'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E27]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.4)] border-b border-[#1F2937]'
          : 'bg-[#0A0E27]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2 transition-transform duration-200 hover:scale-[1.02]">
          <Image
            src="/logo-dark.svg"
            alt="Srijan Speaks"
            width={180}
            height={52}
            priority
            className="h-12 w-auto"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-500 transition-all duration-200 pb-0.5 group
                  ${isActive ? 'text-[#00D9FF]' : 'text-[#AAAAAA] hover:text-white'}`}
              >
                {link.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-[#FF6B35] rounded-full transition-all duration-300
                    ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA + MOBILE TOGGLE */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-[#FF6B35] hover:bg-[#FF8A5B] text-white text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,107,53,0.4)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.86 6.81a19.79 19.79 0 01-3.07-8.57A2 2 0 012.77 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Invite Srijan
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded border border-[#1F2937] text-white transition-all duration-200 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FF6B35]/10"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? (
                <>
                  <line x1="3" y1="6" x2="21" y2="18" />
                  <line x1="3" y1="18" x2="21" y2="6" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="10" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-[#1F2937] bg-[#0D1220]">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1 animate-slide-down">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-3 px-4 rounded transition-all duration-200 border-b border-[#1F2937] last:border-0
                    ${isActive
                      ? 'text-[#00D9FF] bg-[#00D9FF]/5'
                      : 'text-[#AAAAAA] hover:text-white hover:bg-white/5'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              );
            })}
            <div className="pt-3">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#FF8A5B] text-white font-bold uppercase tracking-wider py-3 px-6 rounded transition-all duration-200 w-full"
                onClick={() => setIsMenuOpen(false)}
              >
                Invite Srijan →
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
