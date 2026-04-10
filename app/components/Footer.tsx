'use client';
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const year = new Date().getFullYear();

  const cols = [
    {
      title: 'Explore',
      links: [
        { label: 'About',    href: '/about' },
        { label: 'Speaking', href: '/speaking' },
        { label: 'Courses',  href: '/courses' },
        { label: 'Blog',     href: '/blog' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'Contact',    href: '/contact' },
        { label: 'LinkedIn',   href: 'https://linkedin.com', external: true },
        { label: 'Twitter/X',  href: 'https://twitter.com',  external: true },
        { label: 'GitHub',     href: 'https://github.com',   external: true },
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

  return (
    <footer
      style={{
        background: 'var(--bg-2)',
        borderTop: '1px solid var(--border)',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
      }}
    >
      <div className="container">
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Logo size="sm" />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.65, maxWidth: '200px' }}>
              AI · Manufacturing · Education. Building the future, one engineer at a time.
            </p>
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
                  marginBottom: '1rem',
                }}
              >
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={'external' in link && link.external ? '_blank' : undefined}
                      rel={'external' in link && link.external ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--fg-2)',
                        transition: 'color 0.2s ease',
                      }}
                      className="footer-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" style={{ marginBottom: '1.5rem' }} />

        {/* Bottom */}
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
          <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>
            Built with ♥ · AI · NDE · Education
          </p>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: var(--accent) !important; }
      `}</style>
    </footer>
  );
}
