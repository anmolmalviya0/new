/**
 * Home Page (Route: /)
 * 
 * Primary landing page showcasing Srijan's expertise, impact, and teaching methodology.
 * 
 * Sections:
 * 1. Hero — Animated headline, 4-metric banner, CTAs, scroll cue
 * 2. Trusted By — Organization badges/logos
 * 3. Three Pillars — Core expertise areas with scroll animations
 * 4. Testimonial — 5-star review from student
 * 5. Teaching Moments — Gallery of real teaching/mentoring moments
 * 6. CTA Banner — Final call-to-action
 * 
 * Features:
 * - Intersection Observer for scroll-triggered animations
 * - Animated counters (useCountUp hook with staggered delays)
 * - Responsive grid layouts with clamp() sizing
 * - CSS variables for theming (dark/light mode)
 * - Glow blobs contained within hero section
 * - Hover effects on cards and images
 * - Mobile-optimized typography and spacing
 * 
 * Performance:
 * - No external dependencies
 * - Client-side animations only
 * - Lazy image loading with error handling
 * - Efficient IntersectionObserver usage
 * 
 * @component
 */

"use client";

import { useEffect, useRef, useState } from "react";

// Custom hooks and utilities
/* ── Animated counter ──────────────────────────────── */
function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let cur = 0;
    const step = Math.ceil(target / (duration / 16));
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      setCount(cur);
      if (cur >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target, duration, started]);
  return count;
}

/* ── Intersection observer ─────────────────────────── */
function useInView(threshold = 0.15) {
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

/* ── Metric card ───────────────────────────────────── */
function MetricCard({ target, suffix = "", label, accent, delay, started }: {
  target: number; suffix?: string; label: string; accent: string; delay: number; started: boolean;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => { if (!started) return; const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [started, delay]);
  const count = useCountUp(target, 1800, go);
  return (
    <div
      style={{
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-sm)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        textAlign: 'center',
        background: 'var(--bg-card)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        cursor: 'default',
      }}
      className="metric-card"
    >
      <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: accent, lineHeight: 1, marginBottom: '0.5rem' }}>
        {count}{suffix}
      </div>
      <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', margin: 0 }}>
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const { ref: metricsRef, inView: metricsInView } = useInView(0.1);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.08);
  const { ref: teachRef,   inView: teachInView   } = useInView(0.08);

  const pillars = [
    {
      icon: "⚛",
      accent: "var(--cyan)",
      title: "Core Science",
      text: "8+ years of R&D at IIT Madras CNDE. 200+ peer-reviewed publications advancing AI for real-world manufacturing & NDE.",
    },
    {
      icon: "🔧",
      accent: "var(--accent)",
      title: "Proven Systems",
      text: "Co-founder of TIQ World. Built AI-powered NDT platforms serving 50+ enterprise clients. $200M+ cumulative business impact.",
    },
    {
      icon: "📡",
      accent: "var(--cyan)",
      title: "Knowledge Transfer",
      text: "Technical leadership for 50+ institutions. Speaker at AI Summit India, international conferences. Frameworks adopted globally.",
    },
  ];

  const moments = [
    { src: "/images/teaching/classroom-teaching.jpg",  accent: "var(--cyan)",   label: "Classroom Teaching",    sub: "Live ML demos · real-time problem solving" },
    { src: "/images/speaking/conference-keynote.jpg",  accent: "var(--accent)", label: "Industry Conference",   sub: "200+ audience · translational research" },
    { src: "/images/mentoring/one-on-one.jpg",         accent: "var(--cyan)",   label: "1-on-1 Mentoring",      sub: "Career guidance · research collaboration" },
  ];

  return (
    <>
      {/* ═══ HERO ══════════════════════════════════════ */}
      <section
        style={{
          background: 'var(--bg)',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        {/* Grid overlay */}
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        {/* Glow blobs — contained within section */}
        <div style={{ position: 'absolute', top: '15%', left: '5%', width: 'clamp(150px,25vw,320px)', height: 'clamp(150px,25vw,320px)', background: 'var(--cyan-glow)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none', opacity: 0.7 }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: 'clamp(120px,20vw,260px)', height: 'clamp(120px,20vw,260px)', background: 'var(--accent-glow)', borderRadius: '50%', filter: 'blur(70px)', pointerEvents: 'none', opacity: 0.7 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '5rem', paddingBottom: '6rem' }}>
          {/* Badge */}
          <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="badge badge-accent">
              <span className="animate-pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
              AI · Manufacturing · Education
            </span>
          </div>

           {/* Headline */}
           <div className="animate-fade-up delay-100" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
             <h1 style={{ fontFamily: 'var(--font-display, Syne)', fontWeight: 800, color: 'var(--fg)', marginBottom: '1rem', letterSpacing: '-0.04em' }}>
               Building the Future<br />
               <span style={{ color: 'var(--cyan)', fontWeight: 700, letterSpacing: '-0.03em' }}>of Manufacturing</span>
             </h1>
            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: 'var(--fg-2)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
              Accelerating transformation through AI innovation — bridging research, industry & education
            </p>
          </div>

          {/* Metrics */}
          <div
            ref={metricsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              margin: '3rem 0',
            }}
          >
            <MetricCard target={5000} suffix="+" label="Engineers Trained"       accent="var(--cyan)"   delay={0}   started={metricsInView} />
            <MetricCard target={50}   suffix="+" label="Institutions Reached"    accent="var(--accent)" delay={200} started={metricsInView} />
            <MetricCard target={10}   suffix="+" label="Years Experience"        accent="var(--cyan)"   delay={400} started={metricsInView} />
            <MetricCard target={200}  suffix="+" label="Publications & Talks"    accent="var(--accent)" delay={600} started={metricsInView} />
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-300" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary">Invite Srijan →</a>
            <a href="/speaking" className="btn btn-outline">See Speaking Engagements</a>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', color: 'var(--fg-muted)', animation: 'bounce 1.8s ease-in-out infinite' }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        </div>
      </section>

      {/* ═══ TRUSTED BY ════════════════════════════════ */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '2.5rem 0' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.5rem' }}>
            Trusted Across Leading Organisations
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(1.5rem, 4vw, 3.5rem)', alignItems: 'center' }}>
            {["IIT Madras", "TIQ World", "DGZfP", "Stanford", "NDE India"].map((org) => (
              <span key={org} className="org-badge" style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', cursor: 'default', transition: 'color 0.2s ease' }}>
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═════════════════════════════ */}
      <section className="section" ref={pillarsRef} style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', transition: 'all 0.7s ease', opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'none' : 'translateY(24px)' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Foundation</span>
            <h2 style={{ color: 'var(--fg)' }}>Three Pillars of Impact</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {pillars.map((p, i) => (
              <div
                key={i}
                className="card pillar-card"
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  transition: `all 0.5s ease ${i * 120}ms`,
                  opacity: pillarsInView ? 1 : 0,
                  transform: pillarsInView ? 'none' : 'translateY(32px)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ color: p.accent, fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--fg-2)', lineHeight: 1.7, fontFamily: 'var(--font-mono, monospace)' }}>
                  {p.text}
                </p>
                <div className="pillar-line" style={{ marginTop: '1.5rem', height: '2px', width: '0', background: p.accent, borderRadius: '999px', transition: 'width 0.4s ease' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL ═══════════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '680px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <blockquote style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)', fontWeight: 300, color: 'var(--fg)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '2rem' }}>
            "Srijan doesn't just teach concepts — he creates genuine connections by showing you how it works in the real world. His teaching style brings clarity to complexity."
          </blockquote>
          <p style={{ fontWeight: 700, color: 'var(--cyan)', fontSize: '1rem' }}>Aspiring ML Engineer</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Engineering Student · IIT Madras</p>
        </div>
      </section>

      {/* ═══ TEACHING MOMENTS ══════════════════════════ */}
      <section className="section" ref={teachRef} style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', transition: 'all 0.7s ease', opacity: teachInView ? 1 : 0, transform: teachInView ? 'none' : 'translateY(24px)' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>In Action</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Educator at Heart</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '520px', margin: '0 auto', fontSize: '1rem' }}>
              Real moments of teaching, mentoring, and knowledge transfer with engineers and professionals worldwide.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {moments.map((m, i) => (
              <div
                key={i}
                className="card moment-card"
                style={{
                  overflow: 'hidden',
                  transition: `all 0.5s ease ${i * 120}ms`,
                  opacity: teachInView ? 1 : 0,
                  transform: teachInView ? 'none' : 'translateY(32px)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <img
                    src={m.src}
                    alt={m.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }}
                    className="moment-img"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="moment-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${m.accent}33, transparent)`, opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'flex-end', padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: m.accent, fontFamily: 'var(--font-mono, monospace)' }}>→ {m.label}</span>
                  </div>
                  <div className="moment-bar" style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '0', background: m.accent, transition: 'width 0.4s ease' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '0.95rem', marginBottom: '0.4rem' }}>{m.label}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)' }}>{m.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/speaking" className="btn btn-outline">See All Speaking Engagements →</a>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ════════════════════════════════ */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(135deg, var(--bg-2) 0%, var(--bg-3) 100%)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '640px' }}>
          <span className="section-label" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Let's Work Together</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1.25rem' }}>Ready to Transform?</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Deploy cutting-edge AI for manufacturing. Book a technical discussion or explore research frameworks.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary">Get Started →</a>
            <a href="/about" className="btn btn-ghost">Learn More</a>
          </div>
        </div>
      </section>

      <style>{`
        .metric-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--border-strong) !important; }
        .pillar-card:hover .pillar-line { width: 100% !important; }
        .moment-card:hover .moment-img { transform: scale(1.06); }
        .moment-card:hover .moment-overlay { opacity: 1 !important; }
        .moment-card:hover .moment-bar { width: 100% !important; }
        .org-badge:hover { color: var(--accent) !important; }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </>
  );
}
