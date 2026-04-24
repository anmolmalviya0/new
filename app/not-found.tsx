'use client';

import Link from 'next/link';

/**
 * Custom 404 Not Found page — on-brand, with quick navigation links.
 */
export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '80svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse 100% 70% at 50% 0%, #0d1d45 0%, #050a18 70%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '4rem 1.5rem',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '600px' }}>
        {/* Big 404 */}
        <div
          style={{
            fontSize: 'clamp(6rem, 20vw, 12rem)',
            fontFamily: "var(--font-display, 'Space Grotesk')",
            fontWeight: 900,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--fg) 0%, var(--cyan) 50%, var(--accent) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            filter: 'drop-shadow(0 0 60px rgba(0,217,255,0.2))',
          }}
        >
          404
        </div>

        <span className="badge badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
          Page Not Found
        </span>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
            fontWeight: 800,
            color: 'var(--fg)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}
        >
          This page got lost in the cosmos
        </h1>

        <p
          style={{
            color: 'var(--fg-2)',
            fontSize: '1.05rem',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            maxWidth: '440px',
            margin: '0 auto 2.5rem',
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* Quick links */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <Link href="/" className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
            ← Back to Home
          </Link>
          <Link href="/speaking" className="btn btn-outline" style={{ fontSize: '0.875rem' }}>
            Speaking
          </Link>
          <Link href="/contact" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
            Contact
          </Link>
        </div>

        {/* Suggested pages */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center',
          }}
        >
          {[
            { href: '/about', label: 'About' },
            { href: '/courses', label: 'Courses' },
            { href: '/blog', label: 'Blog' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: '0.78rem',
                color: 'var(--fg-muted)',
                padding: '0.3rem 0.85rem',
                borderRadius: 'var(--r-full)',
                border: '1px solid var(--border)',
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--cyan)';
                e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--fg-muted)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
