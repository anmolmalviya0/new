'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: '/about',    label: 'About' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/courses',  label: 'Courses' },
    { href: '/blog',     label: 'Blog' },
    { href: '/contact',  label: 'Contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'color-mix(in srgb, var(--bg) 92%, transparent)' : 'var(--bg)',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem' }}>
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Srijan Speaks — Home"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: '1rem',
            transition: 'opacity 0.2s ease',
          }}
          className="hover:opacity-80"
        >
          <Logo size="md" />
        </Link>

        {/* DESKTOP NAV */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position: 'relative',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--cyan)' : 'var(--fg-muted)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link-item"
              >
                {link.label}
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    bottom: '-4px',
                    height: '2px',
                    width: isActive ? '100%' : '0',
                    background: 'var(--accent)',
                    borderRadius: '999px',
                    transition: 'width 0.3s ease',
                  }}
                  className="nav-underline"
                />
              </Link>
            );
          })}
        </nav>

        {/* CTA + MOBILE TOGGLE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/contact"
            className="hidden md:inline-flex btn btn-primary"
            style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}
          >
            Invite Srijan
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="md:hidden"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--r-sm)',
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--fg)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {isMenuOpen ? (
                <><line x1="3" y1="6" x2="21" y2="18"/><line x1="3" y1="18" x2="21" y2="6"/></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <nav
          className="md:hidden animate-slide-down"
          style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-2)',
          }}
        >
          <div className="container" style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--r-sm)',
                    color: isActive ? 'var(--cyan)' : 'var(--fg-2)',
                    background: isActive ? 'var(--cyan-glow)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.95rem',
                    borderBottom: '1px solid var(--border)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {link.label}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              );
            })}
            <div style={{ paddingTop: '0.75rem' }}>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Invite Srijan →
              </Link>
            </div>
          </div>
        </nav>
      )}

      <style>{`
        .nav-link-item:hover { color: var(--fg) !important; }
        .nav-link-item:hover .nav-underline { width: 100% !important; }
      `}</style>
    </header>
  );
}
