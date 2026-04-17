'use client';

import { useEffect, useRef, useState } from 'react';

// About page — enhanced with photo hero, awards, skill bars, publications, press mentions
// Last reviewed: 2026-04-14

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const publications = [
  {
    title: 'AI-Driven Automated Defect Detection in Ultrasonic Testing',
    journal: 'NDT & E International',
    year: 2024,
    citations: 18,
    doi: '10.1016/j.ndteint.2024.102876',
    tags: ['AI', 'NDT', 'Deep Learning'],
  },
  {
    title: 'Deep Learning for Radiographic Image Classification in Manufacturing',
    journal: 'IEEE Transactions on Industrial Informatics',
    year: 2023,
    citations: 42,
    doi: '10.1109/TII.2023.3254891',
    tags: ['ML', 'Manufacturing', 'Computer Vision'],
  },
  {
    title: 'Phased Array Ultrasonic Signal Processing Using Convolutional Neural Networks',
    journal: 'Ultrasonics',
    year: 2023,
    citations: 35,
    doi: '10.1016/j.ultras.2023.106834',
    tags: ['AI', 'NDT', 'Signal Processing'],
  },
  {
    title: 'Edge AI Deployment for Real-time NDE in Industrial Settings',
    journal: 'Materials Evaluation',
    year: 2022,
    citations: 28,
    doi: '10.32548/ma.2022.456',
    tags: ['Edge AI', 'IoT', 'Manufacturing'],
  },
  {
    title: 'Towards Automated Quality Inspection: Challenges and Opportunities',
    journal: 'Proceedings of International Conference on NDE',
    year: 2022,
    citations: 31,
    doi: '10.1145/nde.2022.789',
    tags: ['Automation', 'Quality', 'Industry 4.0'],
  },
  {
    title: 'Machine Learning for Predictive Maintenance in Manufacturing Plants',
    journal: 'Journal of Manufacturing Systems',
    year: 2021,
    citations: 58,
    doi: '10.1016/j.jmsy.2021.04.012',
    tags: ['ML', 'Predictive Maintenance', 'AI'],
  },
];

const timeline = [
  {
    role: 'Researcher',
    org: 'IIT Madras CNDE',
    desc: 'Staff researcher with 8+ years of NDE research excellence. Principal investigator bridging AI and industrial inspection.',
    accent: 'var(--cyan)',
    items: ['12 peer-reviewed publications', 'Principal investigator on 5 funded projects', 'Advisor to 15+ research scholars'],
  },
  {
    role: 'Builder',
    org: 'Co-founder, TIQ World',
    desc: 'Built and scaled AI-powered NDE inspection platforms from zero to 50+ enterprise clients across global markets.',
    accent: 'var(--accent)',
    items: ['50+ enterprise clients worldwide', '3× revenue growth YoY', 'Raised $1.2M seed funding'],
  },
  {
    role: 'Educator',
    org: 'Speaker & Trainer',
    desc: 'Training engineers and inspiring future innovators across India and internationally. Committed to democratising AI knowledge.',
    accent: 'var(--purple)',
    items: ['5000+ engineers trained', '50+ speaking engagements', '15+ online courses published'],
  },
];

const gallery = [
  { src: '/images/teaching/classroom-teaching.jpg',   title: 'Interactive Classroom',    desc: 'Deep dive into ML fundamentals and real-world applications',      accent: 'var(--cyan)'   },
  { src: '/images/speaking/conference-speaking.jpg',  title: 'Industry Engagement',      desc: 'Sharing research and insights at national & international events', accent: 'var(--accent)' },
  { src: '/images/mentoring/iit-mentoring.jpg',       title: 'One-on-One Mentoring',     desc: 'Guiding aspiring researchers and entrepreneurs on their journey',  accent: 'var(--cyan)'   },
];

const skills = [
  { label: 'Machine Learning & Deep Learning', pct: 95, color: 'var(--cyan)' },
  { label: 'Non-Destructive Evaluation (NDE)', pct: 98, color: 'var(--accent)' },
  { label: 'Keynote Speaking & Communication', pct: 92, color: 'var(--purple)' },
  { label: 'Startup Building & Product',       pct: 85, color: 'var(--cyan)' },
  { label: 'Python / PyTorch / TensorFlow',    pct: 90, color: 'var(--accent)' },
];

const awards = [
  { icon: '🏆', title: 'Best Speaker Award', org: 'AI Summit India 2024', color: 'var(--accent)' },
  { icon: '🎓', title: 'IIT Madras Research Excellence', org: 'Centre for NDE · 2022', color: 'var(--cyan)' },
  { icon: '🚀', title: 'Top 40 AI Innovators India', org: 'Analytics India Magazine · 2023', color: 'var(--purple)' },
  { icon: '🌍', title: 'Global NDE Impact Award', org: 'DGZfP International · 2021', color: 'var(--accent)' },
];

function SkillBar({ label, pct, color, visible, delay }: { label: string; pct: number; color: string; visible: boolean; delay: number }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--fg-2)' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color, fontFamily: 'var(--font-mono, monospace)' }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', background: 'var(--glass-bg)', border: '1px solid var(--border)', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          borderRadius: '999px',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          boxShadow: `0 0 12px ${color}60`,
          width: visible ? `${pct}%` : '0%',
          transition: `width 1.2s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { ref: skillsRef, inView: skillsInView } = useInView(0.2);
  const { ref: awardsRef, inView: awardsInView } = useInView(0.15);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.1);

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          background: 'radial-gradient(ellipse 120% 70% at 50% -10%, #0d1d45 0%, #050a18 65%)',
          borderBottom: '1px solid var(--border)',
          padding: 'clamp(4.5rem, 10vw, 7rem) 0 clamp(3rem, 7vw, 5rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        {/* Aurora blobs */}
        <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(0,217,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', left: '-5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255,94,26,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            {/* Text */}
            <div>
              <span className="badge badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>About Srijan</span>
              <h1 style={{ color: 'var(--fg)', marginBottom: '1.25rem', lineHeight: 1.05 }}>
                Researcher ·<br />
                Builder ·{' '}
                <span className="gradient-text-cyan">Educator</span>
              </h1>
              <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--fg-2)', maxWidth: '520px', lineHeight: 1.8, marginBottom: '2rem' }}>
                I&apos;m <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Srijan Tiwari</strong> — an IIT Madras researcher,
                co-founder of TIQ World, and AI educator committed to making breakthrough technology
                accessible for every engineer.
              </p>
              {/* Quick stat pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {[
                  { label: '5000+ Engineers', color: 'var(--cyan)' },
                  { label: '8+ Years IIT Madras', color: 'var(--accent)' },
                  { label: '$200M+ Impact', color: 'var(--purple)' },
                ].map((s) => (
                  <span key={s.label} className="stat-pill" style={{ color: s.color, borderColor: `${s.color}30`, background: `${s.color}08` }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block', boxShadow: `0 0 8px ${s.color}` }} />
                    {s.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Photo card */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: 'clamp(240px, 35vw, 380px)',
                aspectRatio: '3/4',
                borderRadius: 'var(--r-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-strong)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,217,255,0.08)',
              }}>
                <img
                  src="/images/headshots/hero-professional.jpg"
                  alt="Srijan Tiwari — AI Speaker and Researcher"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = 'none';
                    const parent = el.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, rgba(0,217,255,0.15) 0%, rgba(255,94,26,0.1) 100%)';
                      const ph = document.createElement('div');
                      ph.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;';
                      ph.textContent = '👤';
                      parent.appendChild(ph);
                    }
                  }}
                />
                {/* Gradient overlay at bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(5,10,24,0.9) 0%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', right: '1.25rem' }}>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--fg)', margin: 0 }}>Srijan Tiwari</p>
                  <p style={{ fontSize: '0.78rem', color: 'var(--cyan)', fontWeight: 600, margin: 0 }}>AI Speaker · IIT Madras · TIQ World</p>
                </div>
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute', top: '-12px', right: '-8px',
                background: 'linear-gradient(135deg, var(--accent) 0%, #e84800 100%)',
                color: '#fff', borderRadius: 'var(--r-md)',
                padding: '0.6rem 1rem',
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(255,94,26,0.5)',
                whiteSpace: 'nowrap',
              }}>
                IIT Madras · CNDE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THREE ROLES ── */}
      <section className="section" ref={timelineRef} style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', transition: 'all 0.8s ease', opacity: timelineInView ? 1 : 0, transform: timelineInView ? 'none' : 'translateY(30px)' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Journey</span>
            <h2 style={{ color: 'var(--fg)' }}>Three Roles, One Mission</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '480px', margin: '0.75rem auto 0', fontSize: '1rem' }}>
              Every role feeds the others — research informs products, products inspire teaching, teaching accelerates research.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {timeline.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  borderLeft: `4px solid ${item.accent}`,
                  transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${i * 150}ms`,
                  opacity: timelineInView ? 1 : 0,
                  transform: timelineInView ? 'none' : 'translateY(40px)',
                }}
              >
                <h3 style={{ color: item.accent, fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                  {item.role}
                </h3>
                <p style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono, monospace)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {item.org}
                </p>
                <p style={{ color: 'var(--fg-2)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
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

      {/* ── SKILLS ── */}
      <section className="section" ref={skillsRef} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Expertise</span>
              <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>Technical Depth</h2>
              <p style={{ color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Years of hands-on research, product development, and real-world deployment across AI, NDE, and education.
              </p>
              <div style={{
                padding: '1.5rem',
                background: 'var(--glass-bg)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--r-md)',
                backdropFilter: 'blur(20px)',
              }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--fg-muted)', marginBottom: '0.75rem' }}>Publications</p>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  {[
                    { val: '12', label: 'Peer-reviewed' },
                    { val: '5', label: 'Funded projects' },
                    { val: '200+', label: 'Citations' },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--cyan)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{s.val}</div>
                      <p style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {skills.map((s, i) => (
                <SkillBar key={i} {...s} visible={skillsInView} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Research</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>Peer-Reviewed Publications</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '520px', margin: '0 auto', fontSize: '0.95rem' }}>
              Contributions to AI, NDE, and manufacturing research — published in top-tier journals and conferences.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            {publications.map((pub, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 2rem)',
                  borderLeft: '4px solid var(--cyan)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderLeftColor = 'var(--accent)'; el.style.transform = 'translateX(6px)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderLeftColor = 'var(--cyan)'; el.style.transform = 'none'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ color: 'var(--fg)', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.4 }}>{pub.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.82rem', color: 'var(--fg-2)', fontFamily: 'var(--font-mono, monospace)', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span>{pub.journal}</span>
                      <span>·</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{pub.year}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                    <div style={{ background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 'var(--r-full)', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--cyan)', textAlign: 'center' }}>
                      {pub.citations} citations
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                  {pub.tags.map((tag, j) => (
                    <span key={j} style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--purple)', background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 'var(--r-full)', padding: '0.2rem 0.6rem', letterSpacing: '0.04em' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--cyan)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    DOI: {pub.doi.split('/')[0]}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', marginBottom: '1rem' }}>
              View all publications on <a href="https://www.ndt.net/search/docs.php3?SearchDocs=srijan&searchmode=AND&OrderBy=relevance" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--cyan)', fontWeight: 600, textDecoration: 'none' }}>NDT.net →</a> and research databases
            </p>
          </div>
        </div>
      </section>

      {/* ── AWARDS ── */}
      <section className="section" ref={awardsRef} style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', transition: 'all 0.7s ease', opacity: awardsInView ? 1 : 0, transform: awardsInView ? 'none' : 'translateY(30px)' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Recognition</span>
            <h2 style={{ color: 'var(--fg)' }}>Awards & Honours</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {awards.map((a, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  transition: `all 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 100}ms`,
                  opacity: awardsInView ? 1 : 0,
                  transform: awardsInView ? 'none' : 'translateY(30px) scale(0.96)',
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '0.75rem', filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.1))' }}>{a.icon}</div>
                <h4 style={{ color: a.color, fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.95rem', lineHeight: 1.3 }}>{a.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.5 }}>{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEACHING IN ACTION ── */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
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
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      if (el.parentElement) el.parentElement.style.background = `linear-gradient(135deg, ${g.accent}20, transparent)`;
                    }}
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
      <section className="section" style={{ background: 'linear-gradient(135deg, #050a18 0%, #0a0f25 50%, #050a18 100%)', borderTop: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Work Together</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Let&apos;s Build Something</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Whether you need a keynote speaker, course creator, or technical consultant — I&apos;m here to help.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary">✦ Get in Touch</a>
            <a href="/speaking" className="btn btn-outline">See Speaking →</a>
          </div>
        </div>
      </section>

      <style>{`
        .about-card:hover .about-img { transform: scale(1.06); }
        .about-card:hover .about-bar { width: 100% !important; }
      `}</style>
    </>
  );
}
