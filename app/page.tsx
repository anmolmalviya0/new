"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Animated counter ──────────────────────────────── */
function useCountUp(target: number, duration = 2000, started: boolean) {
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

/* ── 3D Tilt on mouse move ─────────────────────────── */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(10px)`;
  }, [intensity]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('mousemove', handleMove as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);
  return ref;
}

/* ── 3D Metric Card ────────────────────────────────── */
function MetricCard({ target, suffix = "", label, accent, delay, started, icon }: {
  target: number; suffix?: string; label: string; accent: string; delay: number; started: boolean; icon: string;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(target, 2000, go);
  const tiltRef = useTilt(6);

  return (
    <div
      ref={tiltRef}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 3vw, 2.25rem)',
        textAlign: 'center',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease',
        cursor: 'default',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.2)',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="metric-card"
    >
      {/* Inner top highlight */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
      {/* Glow at bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '40px', background: accent.includes('cyan') ? 'rgba(0,217,255,0.08)' : 'rgba(255,94,26,0.08)', filter: 'blur(12px)', borderRadius: '50%' }} />

      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem', filter: 'drop-shadow(0 0 8px currentColor)' }}>{icon}</div>
      <div style={{
        fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
        fontWeight: 900,
        color: accent,
        lineHeight: 1,
        marginBottom: '0.5rem',
        fontFamily: 'var(--font-display, Syne)',
        textShadow: accent.includes('cyan')
          ? '0 0 30px rgba(0,217,255,0.5), 0 0 60px rgba(0,217,255,0.2)'
          : '0 0 30px rgba(255,94,26,0.5), 0 0 60px rgba(255,94,26,0.2)',
      }}>
        {count}{suffix}
      </div>
      <p style={{
        fontSize: '0.68rem',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--fg-muted)',
        margin: 0,
      }}>
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const { ref: metricsRef, inView: metricsInView } = useInView(0.1);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.08);
  const { ref: teachRef,   inView: teachInView   } = useInView(0.08);
  const heroBrandRef = useTilt(4);

  const pillars = [
    {
      icon: "⚛",
      gradient: "linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(0,217,255,0.02) 100%)",
      borderColor: "rgba(0,217,255,0.15)",
      accent: "var(--cyan)",
      glowColor: "rgba(0,217,255,0.12)",
      title: "Core Science",
      text: "8+ years of R&D at IIT Madras CNDE. 200+ peer-reviewed publications advancing AI for real-world manufacturing & NDE.",
    },
    {
      icon: "🔧",
      gradient: "linear-gradient(135deg, rgba(255,94,26,0.08) 0%, rgba(255,94,26,0.02) 100%)",
      borderColor: "rgba(255,94,26,0.15)",
      accent: "var(--accent)",
      glowColor: "rgba(255,94,26,0.12)",
      title: "Proven Systems",
      text: "Co-founder of TIQ World. Built AI-powered NDT platforms serving 50+ enterprise clients. $200M+ cumulative business impact.",
    },
    {
      icon: "📡",
      gradient: "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(139,92,246,0.02) 100%)",
      borderColor: "rgba(139,92,246,0.15)",
      accent: "var(--purple)",
      glowColor: "rgba(139,92,246,0.12)",
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
      {/* ═══ HERO — 3D Realistic ══════════════════════ */}
      <section
        style={{
          background: 'radial-gradient(ellipse 120% 80% at 50% -10%, #0d1d45 0%, #050a18 60%)',
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '100vw',
        }}
      >
        {/* Perspective grid floor */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          backgroundImage: `
            linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(400px) rotateX(60deg)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Top grid */}
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

        {/* Aurora blob 1 — cyan */}
        <div style={{
          position: 'absolute', top: '5%', left: '-5%',
          width: 'clamp(300px,45vw,600px)', height: 'clamp(300px,45vw,600px)',
          background: 'radial-gradient(circle, rgba(0,217,255,0.18) 0%, rgba(0,100,255,0.08) 50%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
          animation: 'aurora 12s ease-in-out infinite',
        }} />
        {/* Aurora blob 2 — orange */}
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: 'clamp(250px,40vw,500px)', height: 'clamp(250px,40vw,500px)',
          background: 'radial-gradient(circle, rgba(255,94,26,0.22) 0%, rgba(255,50,0,0.08) 50%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none',
          animation: 'aurora 15s ease-in-out infinite reverse',
        }} />
        {/* Aurora blob 3 — purple center */}
        <div style={{
          position: 'absolute', top: '30%', left: '35%',
          width: 'clamp(200px,30vw,400px)', height: 'clamp(200px,30vw,400px)',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none',
          animation: 'aurora 18s ease-in-out infinite',
        }} />

        {/* Floating 3D orbs */}
        <div style={{
          position: 'absolute', top: '20%', right: '8%',
          width: 'clamp(60px,8vw,100px)', height: 'clamp(60px,8vw,100px)',
          background: 'radial-gradient(circle at 35% 35%, rgba(0,217,255,0.7) 0%, rgba(0,100,200,0.4) 40%, rgba(0,50,100,0.1) 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 30px rgba(0,217,255,0.4), 0 0 60px rgba(0,217,255,0.2), inset -10px -10px 20px rgba(0,0,0,0.3)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '25%', left: '6%',
          width: 'clamp(40px,5vw,70px)', height: 'clamp(40px,5vw,70px)',
          background: 'radial-gradient(circle at 35% 35%, rgba(255,94,26,0.8) 0%, rgba(200,50,0,0.4) 40%, rgba(100,20,0,0.1) 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 25px rgba(255,94,26,0.5), 0 0 50px rgba(255,94,26,0.2), inset -8px -8px 16px rgba(0,0,0,0.3)',
          animation: 'float 10s ease-in-out infinite 2s',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '60%', right: '15%',
          width: 'clamp(25px,3vw,45px)', height: 'clamp(25px,3vw,45px)',
          background: 'radial-gradient(circle at 35% 35%, rgba(139,92,246,0.9) 0%, rgba(100,50,200,0.4) 40%, transparent 100%)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(139,92,246,0.5), inset -5px -5px 10px rgba(0,0,0,0.3)',
          animation: 'float 7s ease-in-out infinite 1s',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '7rem' }}>

          {/* Badge */}
          <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1rem', borderRadius: '9999px',
              background: 'rgba(0,217,255,0.06)',
              border: '1px solid rgba(0,217,255,0.2)',
              fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--cyan)',
              boxShadow: '0 0 20px rgba(0,217,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', animation: 'pulse-dot 2s ease-in-out infinite', display: 'inline-block', boxShadow: '0 0 8px var(--cyan)' }} />
              AI · Speaker · Educator · Builder
            </span>
          </div>

          {/* Hero Name — 3D glass card effect */}
          <div
            ref={heroBrandRef}
            className="animate-fade-up delay-100"
            style={{
              textAlign: 'center',
              marginBottom: '3rem',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease',
            }}
          >
            {/* Main headline with shimmer */}
            <h1 className="text-shimmer" style={{
              fontFamily: 'var(--font-display, Syne)',
              fontWeight: 900,
              marginBottom: '1rem',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              background: 'linear-gradient(105deg, #e8f0ff 0%, #e8f0ff 35%, #00d9ff 50%, #e8f0ff 65%, #e8f0ff 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 5s linear infinite',
              filter: 'drop-shadow(0 0 40px rgba(0,217,255,0.25))',
            }}>
              SRIJAN TIWARI
            </h1>

            {/* Subtitle with gradient */}
            <p style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.7rem)',
              fontFamily: 'var(--font-display, Syne)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, var(--cyan) 0%, var(--brand-2) 50%, var(--accent) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Speaker · Educator · Builder
            </p>

            {/* Description inside a glass card */}
            <div style={{
              display: 'inline-block',
              maxWidth: '680px',
              padding: 'clamp(1.25rem, 3vw, 1.75rem) clamp(1.5rem, 4vw, 2.5rem)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }} />
              <p style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
                color: 'var(--fg-2)',
                lineHeight: 1.85,
                fontWeight: 400,
                margin: 0,
              }}>
                I help <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>engineers, organizations, and innovators</strong> understand, build, and deploy AI at scale — through keynotes, educational programs, and technical consulting.
              </p>
            </div>
          </div>

          {/* Metrics */}
          <div
            ref={metricsRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: 'clamp(0.75rem, 2vw, 1.25rem)',
              margin: '3rem 0',
            }}
          >
            <MetricCard target={5000} suffix="+" label="Engineers Trained"    accent="var(--cyan)"   delay={0}   started={metricsInView} icon="🎓" />
            <MetricCard target={50}   suffix="+" label="Institutions Reached" accent="var(--accent)" delay={200} started={metricsInView} icon="🏛" />
            <MetricCard target={10}   suffix="+" label="Years Experience"     accent="var(--cyan)"   delay={400} started={metricsInView} icon="⏱" />
            <MetricCard target={200}  suffix="+" label="Publications & Talks" accent="var(--accent)" delay={600} started={metricsInView} icon="📚" />
          </div>

          {/* CTAs */}
          <div className="animate-fade-up delay-400" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '1rem 2.25rem' }}>
              ✦ Invite Srijan
            </a>
            <a href="/speaking" className="btn btn-outline" style={{ fontSize: '0.9rem', padding: '1rem 2.25rem' }}>
              See Speaking Engagements →
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          color: 'var(--fg-muted)',
          animation: 'bounce 2s ease-in-out infinite',
        }}>
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{
            width: '24px', height: '38px',
            border: '1.5px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            display: 'flex', justifyContent: 'center', paddingTop: '6px',
          }}>
            <div style={{
              width: '4px', height: '8px', borderRadius: '2px',
              background: 'var(--cyan)',
              boxShadow: '0 0 8px var(--cyan)',
              animation: 'scroll-dot 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* ═══ TRUSTED BY ════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '2.5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="container">
          <p style={{
            textAlign: 'center', fontSize: '0.66rem', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.75rem',
          }}>
            Trusted Across Leading Organisations
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }}>
            {["IIT Madras", "TIQ World", "DGZfP", "Stanford", "NDE India"].map((org) => (
              <span key={org} className="org-badge" style={{
                fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--fg-muted)',
                cursor: 'default', transition: 'all 0.25s ease',
                padding: '0.4rem 1rem',
                border: '1px solid transparent',
                borderRadius: '8px',
              }}>
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS — 3D Glass Cards ═══════════ */}
      <section className="section" ref={pillarsRef} style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        {/* Background accent */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '300px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div className="container">
          <div style={{
            textAlign: 'center', marginBottom: '4rem',
            transition: 'all 0.8s cubic-bezier(0.34,1.2,0.64,1)',
            opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'none' : 'translateY(30px)',
          }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Foundation</span>
            <h2 style={{ color: 'var(--fg)' }}>Three Pillars of Impact</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {pillars.map((p, i) => (
              <PillarCard key={i} pillar={p} inView={pillarsInView} delay={i * 150} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIAL — Glass Quote ═════════════════ */}
      <section className="section" style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)',
        borderTop: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '400px', height: '200px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '720px', textAlign: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '24px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
            position: 'relative',
          }}>
            {/* Large quote mark */}
            <div style={{
              position: 'absolute', top: '-10px', left: '2rem',
              fontSize: '6rem', lineHeight: 1, fontFamily: 'Georgia, serif',
              color: 'var(--accent)', opacity: 0.2,
              fontWeight: 900, letterSpacing: '-0.05em',
            }}>&#8220;</div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" style={{ filter: 'drop-shadow(0 0 4px rgba(255,94,26,0.5))' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <blockquote style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              fontWeight: 300, color: 'var(--fg)',
              fontStyle: 'italic', lineHeight: 1.8, marginBottom: '2rem',
            }}>
              "Srijan doesn't just teach concepts — he creates genuine connections by showing you how it works in the real world. His teaching style brings clarity to complexity."
            </blockquote>
            <div style={{ width: '40px', height: '2px', background: 'linear-gradient(90deg, var(--accent), var(--cyan))', borderRadius: '999px', margin: '0 auto 1.25rem' }} />
            <p style={{ fontWeight: 700, color: 'var(--cyan)', fontSize: '1rem', margin: 0 }}>Aspiring ML Engineer</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.25rem' }}>
              Engineering Student · IIT Madras
            </p>
          </div>
        </div>
      </section>

      {/* ═══ TEACHING MOMENTS ══════════════════════════ */}
      <section className="section" ref={teachRef} style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{
            textAlign: 'center', marginBottom: '3.5rem',
            transition: 'all 0.8s cubic-bezier(0.34,1.2,0.64,1)',
            opacity: teachInView ? 1 : 0, transform: teachInView ? 'none' : 'translateY(30px)',
          }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>In Action</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Educator at Heart</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '520px', margin: '0 auto' }}>
              Real moments of teaching, mentoring, and knowledge transfer with engineers worldwide.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {moments.map((m, i) => (
              <div
                key={i}
                className="card moment-card"
                style={{
                  overflow: 'hidden',
                  transition: `all 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 150}ms`,
                  opacity: teachInView ? 1 : 0,
                  transform: teachInView ? 'none' : 'translateY(40px) scale(0.96)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <img
                    src={m.src}
                    alt={m.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }}
                    className="moment-img"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="moment-overlay" style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to top, ${m.accent === 'var(--cyan)' ? 'rgba(0,217,255,0.3)' : 'rgba(255,94,26,0.3)'} 0%, transparent 60%)`,
                    opacity: 0, transition: 'opacity 0.3s ease',
                    display: 'flex', alignItems: 'flex-end', padding: '1.25rem',
                  }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: m.accent, fontFamily: 'var(--font-mono, monospace)', textShadow: '0 0 10px currentColor' }}>→ {m.label}</span>
                  </div>
                  <div className="moment-bar" style={{ position: 'absolute', bottom: 0, left: 0, height: '3px', width: '0', background: `linear-gradient(90deg, ${m.accent}, transparent)`, transition: 'width 0.5s ease' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '1rem', marginBottom: '0.4rem' }}>{m.label}</p>
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

      {/* ═══ CTA BANNER — 3D Depth ═════════════════════ */}
      <section
        className="section"
        style={{
          background: 'linear-gradient(135deg, #050a18 0%, #0a0f25 50%, #050a18 100%)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Dramatic glow */}
        <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.08) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', left: '50%', transform: 'translateX(-50%)', width: '400px', height: '200px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.06) 0%, transparent 70%)', filter: 'blur(30px)', pointerEvents: 'none' }} />

        <div className="container" style={{ maxWidth: '680px', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>Let's Work Together</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1.25rem' }}>Ready to Transform?</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            Deploy cutting-edge AI. Book a keynote, technical workshop, or research consultation.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <a href="/contact" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '1rem 2.25rem' }}>✦ Get Started</a>
            <a href="/about" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>Learn More</a>
          </div>
        </div>
      </section>

      <style>{`
        .metric-card:hover {
          transform: perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(20px) !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,217,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.14) !important;
        }
        .pillar-card:hover .pillar-line { width: 100% !important; }
        .moment-card:hover .moment-img { transform: scale(1.08) !important; }
        .moment-card:hover .moment-overlay { opacity: 1 !important; }
        .moment-card:hover .moment-bar { width: 100% !important; }
        .moment-card:hover {
          box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(0,217,255,0.08) !important;
        }
        .org-badge:hover {
          color: var(--cyan) !important;
          border-color: rgba(0,217,255,0.2) !important;
          background: rgba(0,217,255,0.04) !important;
          box-shadow: 0 0 20px rgba(0,217,255,0.08) !important;
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scroll-dot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </>
  );
}

/* ── Pillar Card with 3D hover ────────────────────── */
function PillarCard({ pillar, inView, delay }: { pillar: {icon:string;gradient:string;borderColor:string;accent:string;glowColor:string;title:string;text:string}; inView: boolean; delay: number }) {
  const tiltRef = useTilt(8);
  return (
    <div
      ref={tiltRef}
      className="pillar-card"
      style={{
        padding: 'clamp(1.75rem, 3vw, 2.25rem)',
        transition: `all 0.6s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms, transform 0.15s ease`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)' : 'translateY(40px) scale(0.96)',
        background: pillar.gradient,
        border: `1px solid ${pillar.borderColor}`,
        borderRadius: '20px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.07)`,
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Bottom glow */}
      <div style={{ position: 'absolute', bottom: '-20px', left: '20%', right: '20%', height: '60px', background: pillar.glowColor, filter: 'blur(20px)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{
        fontSize: '2.5rem',
        marginBottom: '1.25rem',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '56px', height: '56px',
        background: `${pillar.glowColor}`,
        border: `1px solid ${pillar.borderColor}`,
        borderRadius: '14px',
        boxShadow: `0 4px 16px ${pillar.glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
        filter: 'drop-shadow(0 0 8px currentColor)',
      }}>
        {pillar.icon}
      </div>
      <h3 style={{
        color: pillar.accent, fontSize: '1rem', fontWeight: 800,
        letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.85rem',
        textShadow: `0 0 20px ${pillar.accent}60`,
      }}>
        {pillar.title}
      </h3>
      <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', lineHeight: 1.75, margin: 0 }}>
        {pillar.text}
      </p>
      <div className="pillar-line" style={{
        marginTop: '1.75rem',
        height: '2px', width: '0',
        background: `linear-gradient(90deg, ${pillar.accent}, transparent)`,
        borderRadius: '999px',
        transition: 'width 0.5s ease',
        boxShadow: `0 0 8px ${pillar.accent}80`,
      }} />
    </div>
  );
}
