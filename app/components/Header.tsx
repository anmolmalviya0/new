'use client';

/**
 * Header Component
 * 
 * Sticky navigation bar with adaptive mobile/desktop layouts.
 * - Desktop (≥768px): Horizontal nav with CTA button
 * - Mobile (<768px): Hamburger menu with dropdown nav
 * - Uses JS-based `isMobile` state to prevent Tailwind conflicts
 * - Active nav links highlighted with cyan underline
 * - Scroll-triggered backdrop blur and border
 * 
 * Features:
 * - Responsive hamburger menu (SVG icons)
 * - Active route highlighting via usePathname
 * - Smooth animations and transitions
 * - Accessibility: ARIA labels, semantic navigation
 * - Logo auto-scales (sm on mobile, md on desktop)
 * 
 * @component
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [isMobile, setIsMobile]     = useState(true); // start mobile-first
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

   useEffect(() => { setIsMenuOpen(false); }, [pathname]);

   // Navigation links configuration
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
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition: 'all 0.3s ease',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* LOGO */}
        <Link
          href="/"
          aria-label="Srijan Speaks — Home"
          style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}
        >
          <Logo size={isMobile ? 'sm' : 'md'} />
        </Link>

        {/* DESKTOP NAV — only shown on ≥768px */}
        {!isMobile && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    position: 'relative',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--cyan)' : 'var(--fg-muted)',
                    paddingBottom: '2px',
                    transition: 'color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg)'; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-muted)'; }}
                >
                  {link.label}
                  <span style={{
                    position: 'absolute', left: 0, bottom: '-4px',
                    height: '2px', width: isActive ? '100%' : '0',
                    background: 'var(--accent)', borderRadius: '999px',
                    transition: 'width 0.3s ease',
                  }} />
                </Link>
              );
            })}
          </nav>
        )}

        {/* RIGHT SIDE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {/* Desktop CTA */}
          {!isMobile && (
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '0.55rem 1.25rem',
                background: 'var(--accent)', color: '#fff',
                borderRadius: 'var(--r-sm)', fontWeight: 700,
                fontSize: '0.78rem', letterSpacing: '0.06em',
                textTransform: 'uppercase', whiteSpace: 'nowrap',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Invite Srijan
            </Link>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '44px', height: '44px',
                borderRadius: 'var(--r-sm)',
                border: '1px solid var(--border)',
                background: 'transparent',
                color: 'var(--fg)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isMenuOpen
                  ? <><line x1="3" y1="6" x2="21" y2="18"/><line x1="3" y1="18" x2="21" y2="6"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobile && isMenuOpen && (
        <nav style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-2)',
          animation: 'slideDown 0.2s ease',
        }}>
          <div style={{ padding: '0.75rem 1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0.9rem 1rem',
                    borderRadius: 'var(--r-sm)',
                    color: isActive ? 'var(--cyan)' : 'var(--fg-2)',
                    background: isActive ? 'color-mix(in srgb, var(--cyan) 10%, transparent)' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '1rem',
                    borderBottom: '1px solid var(--border)',
                    transition: 'background 0.15s',
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
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '100%', padding: '0.85rem',
                  background: 'var(--accent)', color: '#fff',
                  borderRadius: 'var(--r-sm)', fontWeight: 700,
                  fontSize: '0.9rem', letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
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
