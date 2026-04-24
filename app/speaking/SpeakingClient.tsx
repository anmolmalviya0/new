'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Speaking page — enhanced with topic detail cards, format options, testimonial, and richer gallery
// Gallery images served from /public/images/speaking/ — all verified HTTP 200

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

const topics = [
  {
    icon: '🤖',
    title: 'AI & Machine Learning in NDT',
    desc: 'How AI is transforming non-destructive testing. Deep dive into ML models, deployment challenges, and real-world use cases from IIT Madras and TIQ World.',
    duration: '45–60 min',
    audience: 'Engineers, Researchers, Industry',
    color: 'var(--cyan)',
    tags: ['AI', 'NDT', 'Industry 4.0'],
  },
  {
    icon: '🚀',
    title: 'Building Your First Startup',
    desc: 'From idea to 50+ clients. Lessons from founding TIQ World, raising funding, and scaling an AI startup from a research lab.',
    duration: '45–60 min',
    audience: 'Founders, Students, Researchers',
    color: 'var(--accent)',
    tags: ['Startup', 'Entrepreneurship', 'AI SaaS'],
  },
  {
    icon: '🎤',
    title: 'The Art of Technical Speaking',
    desc: 'Crafting memorable keynotes, engaging technical audiences, and making complex ideas accessible without dumbing them down.',
    duration: '30–45 min',
    audience: 'Engineers, Scientists, Academics',
    color: 'var(--purple)',
    tags: ['Communication', 'Speaking', 'Clarity'],
  },
  {
    icon: '🔬',
    title: 'Research to Market',
    desc: 'How to transition from academic research to building a profitable product company. A framework for researcher-founders.',
    duration: '45 min',
    audience: 'PhD Students, Researchers, Labs',
    color: 'var(--cyan)',
    tags: ['Commercialisation', 'R&D', 'Product'],
  },
  {
    icon: '⚙️',
    title: 'Manufacturing AI Playbook',
    desc: 'End-to-end guide to deploying AI in manufacturing environments — from data collection to edge inference and ROI measurement.',
    duration: '60–90 min',
    audience: 'Industry Leaders, Plant Managers',
    color: 'var(--accent)',
    tags: ['Manufacturing', 'AI Deployment', 'ROI'],
  },
  {
    icon: '🌐',
    title: 'India&apos;s AI Moment',
    desc: 'Why India is uniquely positioned to lead in industrial AI. The policy landscape, talent pool, and what needs to happen next.',
    duration: '30–45 min',
    audience: 'Policy, Industry, Students',
    color: 'var(--purple)',
    tags: ['India', 'Policy', 'Future of AI'],
  },
];

const formats = [
  { icon: '🎯', title: 'Keynote', desc: '45–90 minute headline address. Inspiring, story-driven, technically credible.', accent: 'var(--cyan)' },
  { icon: '🛠', title: 'Workshop', desc: 'Half-day or full-day hands-on technical workshop with exercises and live demos.', accent: 'var(--accent)' },
  { icon: '🤝', title: 'Panel Discussion', desc: 'Moderator or panelist for AI, manufacturing, and innovation conversations.', accent: 'var(--purple)' },
  { icon: '🎓', title: 'Masterclass', desc: 'Deep-dive educational session for cohorts of 20–100 engineers.', accent: 'var(--cyan)' },
];

const events = [
  { event: 'AI India Summit 2024',    date: 'Jun 15, 2024',   location: 'Delhi, India',    role: 'Keynote',   audience: '1200+' },
  { event: 'TechCrunch Disrupt',      date: 'Sep 9–11, 2024', location: 'San Francisco',   role: 'Panel',     audience: '3000+' },
  { event: 'IIT Madras Alumni Meet',  date: 'Jul 22, 2024',   location: 'Chennai',         role: 'Keynote',   audience: '500+' },
  { event: 'NDE India 2023',          date: 'Nov 12, 2023',   location: 'Mumbai, India',   role: 'Workshop',  audience: '800+' },
  { event: 'TIQ World Summit 2023',   date: 'Aug 4, 2023',    location: 'Hybrid',          role: 'Host',      audience: '2000+' },
  { event: 'DGZfP Conference',        date: 'May 3, 2016',    location: 'Berlin, Germany', role: 'Speaker',   audience: '400+' },
];

const gallery = [
  { src: '/images/speaking/keynote-stage-cnde.jpg',     accent: 'var(--accent)', title: 'CNDE Industry Keynote',           desc: 'Empowering Industrial Excellence — IIT Madras CNDE & TIQ World on the big stage.' },
  { src: '/images/speaking/keynote-podium-1.jpg',       accent: 'var(--cyan)',   title: 'Podium Address',                  desc: 'Engaging 200+ engineers and researchers at a national NDE conference.' },
  { src: '/images/speaking/keynote-tiqworld-1.jpg',     accent: 'var(--accent)', title: 'TIQ World Product Launch',        desc: 'Presenting AI-powered certification platform to industry leaders.' },
  { src: '/images/speaking/keynote-tiqworld-3.jpg',     accent: 'var(--cyan)',   title: 'Building World-Class Talent',     desc: 'Keynote on AI in manufacturing quality — from research lab to production floor.' },
  { src: '/images/speaking/keynote-podium-2.jpg',       accent: 'var(--purple)', title: 'Research Meets Industry',         desc: 'Deep-diving into NDE methodologies and AI applications with fellow researchers.' },
  { src: '/images/speaking/keynote-tiqworld-4.jpg',     accent: 'var(--accent)', title: 'Quality & Inspection Innovation', desc: 'AI-driven quality inspection transforming how India manufactures.' },
  { src: '/images/speaking/keynote-tiqworld-5.jpg',     accent: 'var(--cyan)',   title: 'Empowering Engineers',            desc: 'Skills, jobs, and tools that drive industrial excellence — one engineer at a time.' },
  { src: '/images/speaking/keynote-tiqworld-2.jpg',     accent: 'var(--purple)', title: 'The AI Manufacturing Playbook',   desc: 'End-to-end framework for deploying AI in real manufacturing environments.' },
];

export default function SpeakingPage() {
  const { ref: topicsRef, inView: topicsInView } = useInView(0.06);
  const { ref: eventsRef, inView: eventsInView } = useInView(0.06);
  const [activeTab, setActiveTab] = useState<'all' | 'keynote' | 'workshop' | 'panel'>('all');

  const filteredTopics = activeTab === 'all' ? topics : topics.slice(0, 3);

  return (
    <>
       {/* ── HERO ── */}
       <section style={{
         background: 'radial-gradient(ellipse 120% 70% at 50% -10%, #0d1d45 0%, #050a18 65%)',
         borderBottom: '1px solid var(--border)',
         padding: 'clamp(4.5rem, 10vw, 7rem) 0 clamp(3rem, 7vw, 5rem)',
         position: 'relative', overflow: 'hidden',
         backgroundImage: 'url(/images/speaking/keynote-stage-cnde.jpg)',
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         backgroundAttachment: 'fixed',
       }}>
         <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
         {/* Dark overlay for text readability */}
         <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 120% 70% at 50% -10%, rgba(13,29,69,0.85) 0%, rgba(5,10,24,0.92) 65%)', pointerEvents: 'none' }} />
         <div style={{ position: 'absolute', top: '0%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,94,26,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
         <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '400px', height: '300px', background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

         <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <span className="badge badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>Speaking</span>
          <h1 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>
            Keynote{' '}
            <span className="gradient-text-accent">Speaking</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--fg-2)', maxWidth: '560px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Inspiring audiences on AI, entrepreneurship, and making impact at scale — from IIT lecture halls to international conferences.
          </p>
          {/* Quick stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {[
              { val: '50+', label: 'Events', color: 'var(--cyan)' },
              { val: '10K+', label: 'Audience reached', color: 'var(--accent)' },
              { val: '12', label: 'Countries', color: 'var(--purple)' },
            ].map(s => (
              <div key={s.label} className="stat-pill" style={{ color: s.color, borderColor: `${s.color}30`, background: `${s.color}08` }}>
                <span style={{ fontWeight: 900, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>{s.val}</span>
                <span style={{ color: 'var(--fg-muted)', fontWeight: 500, fontSize: '0.78rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMATS ── */}
      <section style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem, 6vw, 4rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>Formats</span>
            <h2 style={{ color: 'var(--fg)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>How I Can Speak</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            {formats.map((f, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{ color: f.accent, fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{f.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--fg-2)', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOPICS ── */}
      <section className="section" ref={topicsRef} style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem', transition: 'all 0.7s ease', opacity: topicsInView ? 1 : 0, transform: topicsInView ? 'none' : 'translateY(30px)' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Topics</span>
            <h2 style={{ color: 'var(--fg)' }}>Signature Topics</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '480px', margin: '0.75rem auto 0', fontSize: '0.95rem' }}>
              Each topic can be tailored in depth and duration to suit your audience and event.
            </p>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {(['all', 'keynote', 'workshop', 'panel'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--r-full)',
                  border: `1px solid ${activeTab === tab ? 'var(--cyan)' : 'var(--border)'}`,
                  background: activeTab === tab ? 'rgba(0,217,255,0.1)' : 'transparent',
                  color: activeTab === tab ? 'var(--cyan)' : 'var(--fg-muted)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize',
                  letterSpacing: '0.04em',
                }}
              >
                {tab === 'all' ? 'All Topics' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {filteredTopics.map((t, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                  transition: `all 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 100}ms`,
                  opacity: topicsInView ? 1 : 0,
                  transform: topicsInView ? 'none' : 'translateY(30px)',
                  borderTop: `2px solid ${t.color}`,
                }}
              >
                <div style={{ fontSize: '1.75rem', marginBottom: '0.85rem' }}>{t.icon}</div>
                <h3 style={{ color: t.color, fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>{t.title}</h3>
                <p style={{ fontSize: '0.87rem', color: 'var(--fg-2)', lineHeight: 1.75, fontFamily: 'var(--font-body)', marginBottom: '1.25rem' }}>{t.desc}</p>
                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '0.65rem', fontWeight: 700, color: t.color, background: `${t.color}10`, border: `1px solid ${t.color}25`, borderRadius: 'var(--r-full)', padding: '0.2rem 0.6rem', letterSpacing: '0.06em' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', fontFamily: 'var(--font-mono, monospace)' }}>⏱ {t.duration}</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)' }}>👥 {t.audience}</span>
                </div>
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
                  <Image
                    src={g.src}
                    alt={g.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="spk-img"
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onError={e => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      if (el.parentElement) el.parentElement.style.background = `linear-gradient(135deg, ${g.accent}20, transparent)`;
                    }}
                  />
                  <div className="spk-bar" style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: 0, background: g.accent, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ padding: '1.1rem' }}>
                  <h4 style={{ color: g.accent, fontWeight: 700, marginBottom: '0.35rem', fontSize: '0.95rem' }}>{g.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.6 }}>{g.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS TABLE ── */}
      <section className="section" ref={eventsRef} style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem', transition: 'all 0.7s ease', opacity: eventsInView ? 1 : 0, transform: eventsInView ? 'none' : 'translateY(30px)' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Schedule</span>
            <h2 style={{ color: 'var(--fg)' }}>Past & Upcoming Events</h2>
          </div>
          <div style={{ overflowX: 'auto', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
              <thead>
                <tr style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border-strong)' }}>
                  {['Event', 'Date', 'Location', 'Format', 'Audience'].map(h => (
                    <th key={h} style={{ padding: '1rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr key={i} className="spk-row" style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s ease' }}>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--fg)', fontSize: '0.9rem', fontWeight: 600 }}>{e.event}</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--fg-2)', fontSize: '0.82rem', fontFamily: 'var(--font-mono, monospace)', whiteSpace: 'nowrap' }}>{e.date}</td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--fg-2)', fontSize: '0.82rem', fontFamily: 'var(--font-mono, monospace)' }}>{e.location}</td>
                    <td style={{ padding: '0.9rem 1.25rem' }}><span className="badge badge-accent">{e.role}</span></td>
                    <td style={{ padding: '0.9rem 1.25rem', color: 'var(--cyan)', fontSize: '0.85rem', fontWeight: 700 }}>{e.audience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
          <div className="testimonial-card" style={{ textAlign: 'center' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '1.5rem', fontSize: '5rem', lineHeight: 1, fontFamily: 'Georgia, serif', color: 'var(--accent)', opacity: 0.15, fontWeight: 900 }}>&#8220;</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 4px rgba(255,94,26,0.4))' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <blockquote style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.3rem)', fontWeight: 300, color: 'var(--fg)', fontStyle: 'italic', lineHeight: 1.85, marginBottom: '2rem' }}>
              "Srijan&apos;s keynote at AI Summit India was the highlight of the conference. He made cutting-edge AI research feel immediately applicable. Our entire team came away with concrete action points."
            </blockquote>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, var(--accent), var(--cyan))', borderRadius: '999px', margin: '0 auto 1.25rem' }} />
            <p style={{ fontWeight: 700, color: 'var(--cyan)', fontSize: '1rem', margin: 0 }}>Conference Director</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>AI Summit India 2024 · Delhi</p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '560px', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Book Srijan</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Book Me for Your Event</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Available for keynotes, panels, workshops, and consulting worldwide. Typically 6–8 weeks advance booking recommended.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary">✦ Inquire Now</a>
            <a href="/contact" className="btn btn-outline">Check Availability →</a>
          </div>
        </div>
      </section>

      <style>{`
        .spk-card:hover .spk-img { transform: scale(1.06); }
        .spk-card:hover .spk-bar { width: 100% !important; }
        .spk-row:hover { background: var(--bg-2); }
      `}</style>
    </>
  );
}
