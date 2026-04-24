'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [isMobile, setIsMobile]     = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [pathname]);

  const navLinks = [
    { href: '/about',    label: 'About' },
    { href: '/speaking', label: 'Speaking' },
    { href: '/courses',  label: 'Courses' },
    { href: '/blog',     label: 'Blog' },
    { href: '/contact',  label: 'Contact' },
    { href: '/media-kit', label: 'Media Kit' },
  ];

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: scrolled
          ? 'rgba(3,5,15,0.85)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        width: '100%',
      }}>
        {/* Gradient line at very top when scrolled */}
        {scrolled && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,94,26,0.5) 30%, rgba(0,217,255,0.5) 70%, transparent 100%)',
            opacity: 0.6,
          }} />
        )}

        <div style={{
          width: '100%', maxWidth: '1280px', margin: '0 auto',
          padding: '0 1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: scrolled ? '60px' : '72px',
          transition: 'height 0.4s ease',
        }}>

          {/* LOGO */}
          <Link href="/" aria-label="Srijan Speaks — Home"
            style={{ display: 'inline-flex', alignItems: 'center', flexShrink: 0, transition: 'opacity 0.2s', textDecoration: 'none' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Logo size={isMobile ? 'sm' : 'md'} />
          </Link>

          {/* DESKTOP NAV */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    style={{
                      position: 'relative',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
                      background: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                      border: isActive ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-muted)';
                        (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      }
                    }}
                  >
                    {isActive && (
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: 'var(--accent)',
                        boxShadow: '0 0 6px var(--accent)',
                        flexShrink: 0,
                      }} />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* RIGHT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>

            {/* Desktop CTA */}
            {!isMobile && (
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.55rem 1.35rem',
                background: 'linear-gradient(135deg, #ff6b2b 0%, #e84800 100%)',
                color: '#fff',
                borderRadius: '8px',
                fontWeight: 700, fontSize: '0.78rem',
                letterSpacing: '0.06em', textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 16px rgba(255,94,26,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = 'translateY(-2px) scale(1.03)';
                el.style.boxShadow = '0 8px 28px rgba(255,94,26,0.55), inset 0 1px 0 rgba(255,255,255,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = '';
                el.style.boxShadow = '0 4px 16px rgba(255,94,26,0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
              }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.7)', flexShrink: 0 }} />
                Book Srijan
              </Link>
            )}

            {/* Mobile hamburger */}
            {isMobile && (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '42px', height: '42px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  background: isMenuOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                  color: 'var(--fg)', cursor: 'pointer', flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {isMenuOpen
                    ? <><line x1="4" y1="4" x2="20" y2="20"/><line x1="4" y1="20" x2="20" y2="4"/></>
                    : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>
                  }
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {isMobile && isMenuOpen && (
          <nav style={{
            borderTop: '1px solid var(--border)',
            background: 'rgba(3,5,15,0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            animation: 'slideDown 0.22s ease',
          }}>
            <div style={{ padding: '1rem 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      color: isActive ? 'var(--fg)' : 'var(--fg-2)',
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(255,94,26,0.12), rgba(0,217,255,0.06))'
                        : 'transparent',
                      border: isActive ? '1px solid rgba(255,94,26,0.2)' : '1px solid transparent',
                      fontWeight: isActive ? 600 : 400,
                      fontSize: '1rem',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 6px var(--accent)' }} />}
                      {link.label}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                );
              })}
              <div style={{ paddingTop: '0.75rem' }}>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    width: '100%', padding: '0.9rem',
                    background: 'linear-gradient(135deg, #ff6b2b 0%, #e84800 100%)',
                    color: '#fff', borderRadius: '10px',
                    fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 4px 20px rgba(255,94,26,0.4)',
                  }}
                >
                  ✦ Book Srijan
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
