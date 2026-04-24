'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';

/**
 * Footer — redesigned with:
 * - Brand column with tagline + social icon links
 * - Newsletter inline subscribe form
 * - Nav columns (Explore / Connect / Legal)
 * - Accent divider + bottom copyright
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);

  const cols = [
    {
      title: 'Explore',
      links: [
        { label: 'About',    href: '/about' },
        { label: 'Speaking', href: '/speaking' },
        { label: 'Courses',  href: '/courses' },
        { label: 'Blog',     href: '/blog' },
        { label: 'Contact',  href: '/contact' },
        { label: 'Media Kit', href: '/media-kit' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Keynote Speaking',       href: '/speaking' },
        { label: 'Corporate Workshops',    href: '/contact' },
        { label: 'Technical Consulting',   href: '/contact' },
        { label: 'Online Courses',         href: '/courses' },
        { label: 'Research Collaboration', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy',   href: '#privacy' },
        { label: 'Terms of Service', href: '#terms' },
        { label: 'Cookie Policy',    href: '#cookies' },
      ],
    },
  ];

  const socials = [
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/srijantiwari',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://twitter.com/srijanspeaks',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@srijanspeaks',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
          <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--bg-2)"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 100%)',
        borderTop: '1px solid var(--border)',
        paddingTop: '4rem',
        paddingBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '200px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── TOP GRID ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand + newsletter column */}
          <div style={{ gridColumn: 'span 1', minWidth: '200px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Logo size="sm" />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.65, maxWidth: '220px', marginBottom: '1.5rem' }}>
              AI · Manufacturing · Education.<br />
              Building the future, one engineer at a time.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter mini form */}
            <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '0.6rem' }}>
              Stay in the loop
            </p>
            {subbed ? (
              <div style={{ fontSize: '0.82rem', color: 'var(--cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                You're subscribed!
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setSubbed(true); }}
                style={{ display: 'flex', maxWidth: '240px' }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="footer-newsletter-input"
                  style={{ borderRight: 'none' }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.65rem 0.85rem',
                    background: 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '0 var(--r-sm) var(--r-sm) 0',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'opacity 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  →
                </button>
              </form>
            )}
          </div>

          {/* Nav columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--fg-muted)',
                  marginBottom: '1.25rem',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="footer-link"
                      style={{
                        fontFamily: "var(--font-body, 'Inter', sans-serif)",
                        fontSize: '0.875rem',
                        color: 'var(--fg-2)',
                        transition: 'color 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── ACCENT DIVIDER ── */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), var(--cyan), var(--purple), transparent)', opacity: 0.4, marginBottom: '1.5rem' }} />

        {/* ── BOTTOM ROW ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
            © {year} Srijan Speaks. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
              Built with ♥ · Next.js · AI · NDE · Education
            </p>
            <a
              href="mailto:hello@srijanspeaks.com"
              style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
            >
              hello@srijanspeaks.com
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--accent) !important; }
      `}</style>
    </footer>
  );
}
