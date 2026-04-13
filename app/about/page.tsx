'use client';

// About page with premium fonts (Syne display + Plus Jakarta Sans body)
// Timeline and gallery data - structured career journey
// Last reviewed: 2026-04-13
const timeline = [
  {
    role: 'Researcher',
    org: 'IIT Madras CNDE',
    desc: 'Staff researcher with 8+ years of NDE research excellence',
    accent: 'var(--cyan)',
    items: ['12 peer-reviewed publications', 'Principal investigator on 5 funded projects', 'Advisor to 15+ research scholars'],
  },
  {
    role: 'Builder',
    org: 'Co-founder, TIQ World',
    desc: 'Building AI-powered NDE inspection platforms at scale',
    accent: 'var(--accent)',
    items: ['50+ enterprise clients', '3× revenue growth YoY', 'Raised $1.2M seed funding'],
  },
  {
    role: 'Educator',
    org: 'Speaker & Trainer',
    desc: 'Training engineers and inspiring future innovators across India',
    accent: 'var(--cyan)',
    items: ['5000+ engineers trained', '50+ speaking engagements', '15+ online courses published'],
  },
];

const gallery = [
  { src: '/images/teaching/classroom-teaching.jpg',   title: 'Interactive Classroom',    desc: 'Deep dive into ML fundamentals and real-world applications',       accent: 'var(--cyan)'   },
  { src: '/images/speaking/conference-speaking.jpg',  title: 'Industry Engagement',      desc: 'Sharing research and insights at national & international events',  accent: 'var(--accent)' },
  { src: '/images/mentoring/iit-mentoring.jpg',       title: 'One-on-One Mentoring',     desc: 'Guiding aspiring researchers and entrepreneurs on their journey',   accent: 'var(--cyan)'   },
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'var(--bg)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(4rem, 10vw, 7rem) 0 clamp(3rem, 7vw, 5rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>About Srijan</span>
          <h1 style={{ color: 'var(--fg)', marginBottom: '1.25rem' }}>
            Researcher · Builder<br />
            <span style={{ color: 'var(--cyan)' }}>Educator</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--fg-2)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.75 }}>
            Passionate about AI, NDE, and creating meaningful impact across research, startups, and education.
          </p>
        </div>
      </section>

      {/* ── JOURNEY ── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Journey</span>
            <h2 style={{ color: 'var(--fg)' }}>Three Roles, One Mission</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {timeline.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', borderLeft: `4px solid ${item.accent}` }}
              >
                <h3 style={{ color: item.accent, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  {item.role}
                </h3>
                <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {item.org}
                </p>
                <p style={{ color: 'var(--fg-2)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.65 }}>
                  {item.desc}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {item.items.map((a, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--fg-2)', fontFamily: 'var(--font-mono, monospace)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={item.accent} strokeWidth="2.5" style={{ marginTop: '2px', flexShrink: 0 }}>
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHING IN ACTION ── */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>In Action</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>Teaching in Action</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '480px', margin: '0 auto' }}>
              Real moments of mentoring, teaching, and knowledge transfer
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {gallery.map((g, i) => (
              <div key={i} className="card about-card" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <img
                    src={g.src}
                    alt={g.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="about-img"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="about-bar" style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: 0, background: g.accent, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h4 style={{ color: g.accent, fontWeight: 700, marginBottom: '0.4rem' }}>{g.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Work Together</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Let's Build Something</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Whether you need a keynote speaker, course creator, or technical consultant — I'm here to help.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary">Get in Touch →</a>
            <a href="/speaking" className="btn btn-outline">See Speaking</a>
          </div>
        </div>
      </section>

      <style>{`
        .about-card:hover .about-img { transform: scale(1.05); }
        .about-card:hover .about-bar { width: 100% !important; }
      `}</style>
    </>
  );
}

