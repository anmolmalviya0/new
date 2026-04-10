'use client';

const topics = [
  { title: 'AI & Machine Learning in NDT', desc: 'How AI is transforming non-destructive testing. Deep dive into ML models, deployment challenges, and real-world use cases.', duration: '45–60 min' },
  { title: 'Building Your First Startup',   desc: 'From idea to 50+ clients. Lessons from founding TIQ World, raising funding, and scaling an AI startup.',              duration: '45–60 min' },
  { title: 'The Art of Technical Speaking', desc: 'Crafting memorable keynotes, engaging technical audiences, and making complex ideas simple.',                           duration: '30–45 min' },
  { title: 'Research to Market',            desc: 'How to transition from academic research to building a profitable product company.',                                    duration: '45 min'    },
];

const events = [
  { event: 'AI India Summit 2024',    date: 'Jun 15, 2024',   location: 'Delhi, India',   role: 'Keynote' },
  { event: 'TechCrunch Disrupt',      date: 'Sep 9–11, 2024', location: 'San Francisco',  role: 'Panel'   },
  { event: 'IIT Madras Alumni Meet',  date: 'Jul 22, 2024',   location: 'Chennai',        role: 'Keynote' },
];

const gallery = [
  { src: '/images/speaking/industry-meet-keynote.jpg', accent: 'var(--accent)', title: 'Translational Research Keynote',   desc: 'Bridging academic research with industry — 200+ industry leaders.' },
  { src: '/images/speaking/make-in-india.jpg',         accent: 'var(--cyan)',   title: 'Quality & Inspection Innovation',  desc: 'AI in manufacturing quality at national conference, Bengaluru 2025.' },
  { src: '/images/speaking/iit-cnde-seminar.jpg',      accent: 'var(--accent)', title: 'CNDE Research Symposium',          desc: 'NDE methodologies & AI applications with fellow researchers.' },
  { src: '/images/teaching/classroom-ml.jpg',          accent: 'var(--cyan)',   title: 'Interactive Teaching',             desc: 'Creating aha moments through live demos and real-world case studies.' },
];

export default function SpeakingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: 'clamp(4rem,10vw,7rem) 0 clamp(3rem,7vw,5rem)', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>Speaking</span>
          <h1 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Keynote <span style={{ color: 'var(--accent)' }}>Speaking</span></h1>
          <p style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--fg-2)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.75 }}>
            Inspiring audiences on AI, entrepreneurship, and making impact at scale.
          </p>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Topics</span>
            <h2 style={{ color: 'var(--fg)' }}>Available Topics</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {topics.map((t, i) => (
              <div key={i} className="card" style={{ padding: 'clamp(1.25rem,3vw,1.75rem)' }}>
                <h3 style={{ color: 'var(--cyan)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{t.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--fg-2)', lineHeight: 1.7, fontFamily: 'var(--font-mono,monospace)', marginBottom: '1rem' }}>{t.desc}</p>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono,monospace)' }}>⏱ {t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>In Action</span>
            <h2 style={{ color: 'var(--fg)' }}>Speaking in Action</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {gallery.map((g, i) => (
              <div key={i} className="card spk-card" style={{ overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '16/9', background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <img src={g.src} alt={g.title} className="spk-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="spk-bar" style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: 0, background: g.accent, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ padding: '1.1rem' }}>
                  <h4 style={{ color: g.accent, fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{g.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono,monospace)', lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS TABLE ── */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Schedule</span>
            <h2 style={{ color: 'var(--fg)' }}>Speaking Engagements</h2>
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '480px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-2)', borderBottom: '2px solid var(--cyan)' }}>
                  {['Event', 'Date', 'Location', 'Role'].map(h => (
                    <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--cyan)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i} className="spk-row" style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--fg)', fontSize: '0.9rem', fontWeight: 500 }}>{e.event}</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--fg-2)', fontSize: '0.85rem', fontFamily: 'var(--font-mono,monospace)' }}>{e.date}</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--fg-2)', fontSize: '0.85rem', fontFamily: 'var(--font-mono,monospace)' }}>{e.location}</td>
                    <td style={{ padding: '0.9rem 1.25rem' }}><span className="badge badge-accent">{e.role}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Book Srijan</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Book Me for Your Event</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Available for keynotes, panels, workshops, and consulting worldwide.
          </p>
          <a href="/contact" className="btn btn-primary">Inquire Now →</a>
        </div>
      </section>

      <style>{`
        .spk-card:hover .spk-img { transform: scale(1.05); }
        .spk-card:hover .spk-bar { width: 100% !important; }
        .spk-row:hover { background: var(--bg-2); }
      `}</style>
    </>
  );
}
