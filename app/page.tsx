"use client";
import { useEffect, useRef, useState, useCallback } from "react";

/* ── Intersection observer ─────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ── 3D Tilt ───────────────────────────────────────── */
function useTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(12px)`;
  }, [intensity]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0)';
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener('mousemove', handleMove as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);
  return ref;
}

/* ── Magnetic button ───────────────────────────────── */
function MagneticButton({ href, className, children, style }: {
  href: string; className?: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.3;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.3;
    el.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
  }, []);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = 'translate(0,0) scale(1)';
  }, []);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener('mousemove', handleMove as EventListener);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove as EventListener);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [handleMove, handleLeave]);
  return (
    <a ref={ref} href={href} className={className}
      style={{ ...style, transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
      {children}
    </a>
  );
}

/* ── Typewriter ────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [wi, setWi]     = useState(0);
  const [text, setText] = useState('');
  const [del, setDel]   = useState(false);
  useEffect(() => {
    const word = words[wi];
    const speed = del ? 35 : 75;
    const t = setTimeout(() => {
      if (!del) {
        if (text.length < word.length) { setText(word.slice(0, text.length + 1)); }
        else { setTimeout(() => setDel(true), 2000); }
      } else {
        if (text.length > 0) { setText(text.slice(0, -1)); }
        else { setDel(false); setWi((wi + 1) % words.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, wi, words]);
  return (
    <span style={{ color: 'var(--cyan)', borderRight: '2px solid var(--cyan)', paddingRight: '3px', animation: 'blink 0.9s step-end infinite' }}>
      {text}
    </span>
  );
}

/* ── Spotlight ─────────────────────────────────────── */
function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const spot = spotRef.current;
    if (!el || !spot) return;
    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spot.style.left = x + 'px';
      spot.style.top  = y + 'px';
      spot.style.opacity = '1';
    };
    const leave = () => { spot.style.opacity = '0'; };
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); };
  }, []);
  return { ref, spotRef };
}

/* ── Metric Card ───────────────────────────────────── */
function MetricCard({ target, suffix = "", label, accent, delay, started, icon }: {
  target: number; suffix?: string; label: string; accent: string; delay: number; started: boolean; icon: string;
}) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [started, delay]);
  const count = useCountUp(target, 1800, go);
  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '20px',
      padding: 'clamp(1.5rem,3vw,2rem)',
      textAlign: 'center',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      boxShadow: `0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
      position: 'relative', overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = 'translateY(-6px)';
      el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 30px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.1)`;
      el.style.borderColor = `${accent}44`;
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLDivElement;
      el.style.transform = '';
      el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)';
      el.style.borderColor = 'rgba(255,255,255,0.08)';
    }}
    >
      <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '50px', background: `radial-gradient(ellipse, ${accent}18 0%, transparent 70%)`, filter: 'blur(12px)' }} />
      <div style={{ fontSize: '1.6rem', marginBottom: '0.6rem' }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display, Syne)',
        fontSize: 'clamp(2.4rem,5vw,3.5rem)',
        fontWeight: 900, lineHeight: 1,
        color: accent, marginBottom: '0.5rem',
        textShadow: `0 0 40px ${accent}60`,
      }}>
        {count}{suffix}
      </div>
      <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', margin: 0 }}>{label}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */
export default function Home() {
  const { ref: metricsRef, inView: metricsInView } = useInView(0.1);
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.08);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.08);
  const { ref: teachRef, inView: teachInView } = useInView(0.08);
  const { ref: heroSpotRef, spotRef: heroSpot } = useSpotlight();

  const pillars = [
    { icon: "⚛", gradient: "linear-gradient(135deg,rgba(0,217,255,0.07) 0%,rgba(0,217,255,0.02) 100%)", borderColor: "rgba(0,217,255,0.14)", accent: "var(--cyan)", glowColor: "rgba(0,217,255,0.12)", title: "Core Science", text: "8+ years at IIT Madras CNDE. 200+ peer-reviewed publications advancing AI-driven NDE and manufacturing intelligence." },
    { icon: "🔧", gradient: "linear-gradient(135deg,rgba(255,94,26,0.07) 0%,rgba(255,94,26,0.02) 100%)", borderColor: "rgba(255,94,26,0.14)", accent: "var(--accent)", glowColor: "rgba(255,94,26,0.12)", title: "Proven Systems", text: "Co-founder of TIQ World. Built AI-powered NDT platforms serving 50+ enterprise clients with $200M+ documented impact." },
    { icon: "📡", gradient: "linear-gradient(135deg,rgba(139,92,246,0.07) 0%,rgba(139,92,246,0.02) 100%)", borderColor: "rgba(139,92,246,0.14)", accent: "var(--purple)", glowColor: "rgba(139,92,246,0.12)", title: "Knowledge Transfer", text: "Technical keynotes at AI Summit India, Stanford, DGZfP. Frameworks adopted by 50+ institutions globally." },
  ];

  const timeline = [
    { year: "2012", label: "IIT Madras", detail: "Joined CNDE as researcher. First contact with AI-driven defect detection.", icon: "🎓", accent: "var(--cyan)" },
    { year: "2016", label: "First Keynote", detail: "International debut at DGZfP Conference, Germany. 400+ attendees.", icon: "🎤", accent: "var(--accent)" },
    { year: "2019", label: "TIQ World", detail: "Co-founded AI-NDT SaaS platform. Scaled to 50+ enterprise clients.", icon: "🚀", accent: "var(--purple)" },
    { year: "2022", label: "5,000 Engineers", detail: "Trained 5,000+ engineers across 50+ global institutions.", icon: "🌍", accent: "var(--cyan)" },
    { year: "2024", label: "AI Summit India", detail: "Keynote speaker at India's largest AI conference. 1200+ attendees.", icon: "⚡", accent: "var(--accent)" },
  ];

  const events = [
    { name: "DGZfP Conference",  city: "Berlin, Germany",   year: "2016", audience: "400+",  type: "International" },
    { name: "AI Summit India",   city: "Bengaluru, India",  year: "2024", audience: "1200+", type: "Keynote" },
    { name: "NDE India",         city: "Mumbai, India",     year: "2023", audience: "800+",  type: "Workshop" },
    { name: "IIT Madras",        city: "Chennai, India",    year: "2022", audience: "500+",  type: "Masterclass" },
    { name: "TIQ World Summit",  city: "Hybrid",            year: "2023", audience: "2000+", type: "Summit" },
    { name: "Stanford AI Lab",   city: "Palo Alto, USA",    year: "2024", audience: "300+",  type: "Seminar" },
  ];

  const moments = [
    { src: "/images/teaching/classroom-teaching.jpg",  accent: "var(--cyan)",   label: "Classroom Teaching",  sub: "Live ML demos · real-time problem solving" },
    { src: "/images/speaking/conference-keynote.jpg",  accent: "var(--accent)", label: "Industry Conference",  sub: "200+ audience · translational research" },
    { src: "/images/mentoring/one-on-one.jpg",         accent: "var(--purple)", label: "1-on-1 Mentoring",     sub: "Career guidance · research collaboration" },
  ];

  return (
    <>
      {/* ═══ HERO ════════════════════════════════════ */}
      <section ref={heroSpotRef as React.RefObject<HTMLDivElement>} style={{
        background: 'radial-gradient(ellipse 140% 100% at 60% -20%, #0e1f50 0%, #060a1a 45%, #03050f 80%)',
        minHeight: '100svh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', width: '100%',
      }}>

        {/* Spotlight follow cursor */}
        <div ref={heroSpot} style={{
          position: 'absolute', pointerEvents: 'none',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.07) 0%, rgba(0,217,255,0.03) 35%, transparent 65%)',
          transform: 'translate(-50%,-50%)',
          opacity: 0, transition: 'opacity 0.4s ease',
          zIndex: 0,
        }} />

        {/* Dot grid */}
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

        {/* Dramatic aurora blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 'clamp(400px,55vw,800px)', height: 'clamp(400px,55vw,800px)', background: 'radial-gradient(circle, rgba(0,80,200,0.22) 0%, rgba(0,30,100,0.1) 50%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', animation: 'aurora 14s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '0%', left: '-8%', width: 'clamp(350px,50vw,700px)', height: 'clamp(350px,50vw,700px)', background: 'radial-gradient(circle, rgba(255,80,0,0.2) 0%, rgba(200,40,0,0.08) 50%, transparent 70%)', borderRadius: '50%', filter: 'blur(80px)', animation: 'aurora 18s ease-in-out infinite reverse', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '35%', left: '30%', width: 'clamp(200px,30vw,500px)', height: 'clamp(200px,30vw,500px)', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', animation: 'aurora 22s ease-in-out infinite', pointerEvents: 'none' }} />

        {/* Large decorative text behind */}
        <div style={{ position: 'absolute', bottom: '5%', right: '-2%', fontFamily: 'var(--font-display, Syne)', fontWeight: 900, fontSize: 'clamp(8rem,18vw,22rem)', lineHeight: 1, color: 'rgba(255,255,255,0.015)', userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.05em', zIndex: 0 }}>
          AI
        </div>

        {/* Floating 3D orbs */}
        {[
          { top: '18%', right: '7%',  size: 'clamp(70px,9vw,120px)', bg: 'radial-gradient(circle at 35% 30%, rgba(0,217,255,0.8) 0%, rgba(0,100,200,0.4) 40%, rgba(0,50,100,0.1) 100%)', shadow: '0 0 40px rgba(0,217,255,0.5), 0 0 80px rgba(0,217,255,0.2), inset -12px -12px 24px rgba(0,0,0,0.4)', dur: '9s', delay: '0s' },
          { bottom: '22%', left: '4%', size: 'clamp(45px,6vw,80px)',  bg: 'radial-gradient(circle at 35% 30%, rgba(255,100,30,0.9) 0%, rgba(200,50,0,0.5) 40%, rgba(100,20,0,0.1) 100%)', shadow: '0 0 30px rgba(255,94,26,0.6), 0 0 60px rgba(255,94,26,0.2), inset -8px -8px 16px rgba(0,0,0,0.4)', dur: '11s', delay: '2s' },
          { top: '55%', right: '14%', size: 'clamp(28px,4vw,55px)',  bg: 'radial-gradient(circle at 35% 30%, rgba(150,100,255,0.9) 0%, rgba(100,50,200,0.4) 40%, transparent 100%)', shadow: '0 0 20px rgba(139,92,246,0.6), inset -5px -5px 10px rgba(0,0,0,0.4)', dur: '7s', delay: '1s' },
          { top: '75%', right: '40%', size: 'clamp(16px,2.5vw,32px)', bg: 'radial-gradient(circle at 35% 30%, rgba(16,217,122,0.9) 0%, rgba(0,150,80,0.4) 40%, transparent 100%)', shadow: '0 0 16px rgba(16,217,122,0.6)', dur: '13s', delay: '3s' },
        ].map((o, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: (o as {top?:string}).top, right: (o as {right?:string}).right,
            bottom: (o as {bottom?:string}).bottom, left: (o as {left?:string}).left,
            width: o.size, height: o.size,
            background: o.bg, borderRadius: '50%',
            boxShadow: o.shadow,
            animation: `float ${o.dur} ease-in-out infinite ${o.delay}`,
            pointerEvents: 'none', zIndex: 1,
          }} />
        ))}

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: '5rem', paddingBottom: '8rem' }}>

          {/* Live availability badge */}
          <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.4rem 1.25rem 0.4rem 0.75rem',
              background: 'rgba(16,217,122,0.06)',
              border: '1px solid rgba(16,217,122,0.2)',
              borderRadius: '999px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 0 30px rgba(16,217,122,0.08)',
            }}>
              <span className="live-dot" />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--emerald)' }}>
                Available for Speaking · 2025–26
              </span>
            </div>
          </div>

          {/* Main headline — editorial, massive */}
          <div className="animate-fade-up delay-100" style={{ textAlign: 'center', marginBottom: '2rem' }}>

            {/* Eyebrow */}
            <p style={{
              fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'var(--fg-muted)',
              marginBottom: '1.5rem',
            }}>
              IIT Madras · AI Researcher · Keynote Speaker
            </p>

            {/* The name — the biggest thing on the page */}
            <h1 style={{
              fontFamily: 'var(--font-display, Syne)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              marginBottom: '1.5rem',
              position: 'relative',
            }}>
              <span style={{
                display: 'block',
                background: 'linear-gradient(170deg, #ffffff 0%, #c8d8f8 40%, #00d9ff 65%, #ffffff 90%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmer 6s linear infinite',
                filter: 'drop-shadow(0 0 60px rgba(0,217,255,0.2))',
              }}>
                SRIJAN
              </span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(170deg, #ff8a4a 0%, #ff5e1a 40%, #e84800 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 50px rgba(255,94,26,0.35))',
              }}>
                TIWARI
              </span>
            </h1>

            {/* Typewriter rotating title */}
            <div style={{
              fontSize: 'clamp(1.1rem,2.8vw,1.8rem)',
              fontFamily: 'var(--font-display, Syne)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              height: '2.4rem',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              marginBottom: '2.5rem',
            }}>
              <Typewriter words={["AI Keynote Speaker", "IIT Madras Researcher", "Tech Entrepreneur", "Innovation Catalyst", "AI Educator"]} />
            </div>

            {/* Description */}
            <div style={{
              maxWidth: '640px', margin: '0 auto 3rem',
              padding: 'clamp(1.25rem,3vw,1.75rem) clamp(1.5rem,4vw,2.5rem)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '20px',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)' }} />
              <p style={{ fontSize: 'clamp(1rem,2vw,1.15rem)', color: 'var(--fg-2)', lineHeight: 1.85, fontWeight: 400, margin: 0 }}>
                I help <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>engineers, organisations & innovators</strong> understand, build, and deploy AI at scale — through world-class keynotes, intensive courses, and high-impact consulting.
              </p>
            </div>

            {/* CTA row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
              <MagneticButton href="/contact" className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '1.05rem 2.5rem', borderRadius: '10px' }}>
                ✦ Invite Srijan to Speak
              </MagneticButton>
              <MagneticButton href="/courses" className="btn btn-outline" style={{ fontSize: '0.88rem', padding: '1.05rem 2.25rem', borderRadius: '10px' }}>
                Explore Courses →
              </MagneticButton>
            </div>
          </div>

          {/* Metrics strip */}
          <div ref={metricsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 'clamp(0.75rem,2vw,1.25rem)' }}>
            {[
              { target: 5000, suffix: '+', label: 'Engineers Trained',    accent: 'var(--cyan)',    icon: '🎓', delay: 0   },
              { target: 50,   suffix: '+', label: 'Global Institutions', accent: 'var(--accent)',  icon: '🏛',  delay: 150 },
              { target: 12,   suffix: '',  label: 'Countries Reached',   accent: 'var(--purple)',  icon: '🌍',  delay: 300 },
              { target: 200,  suffix: '+', label: 'Publications & Talks', accent: 'var(--emerald)', icon: '📚', delay: 450 },
            ].map((m, i) => (
              <MetricCard key={i} {...m} started={metricsInView} />
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--fg-muted)', animation: 'bounce 2.5s ease-in-out infinite' }}>
          <span style={{ fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: '26px', height: '42px', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: '13px', display: 'flex', justifyContent: 'center', paddingTop: '7px' }}>
            <div style={{ width: '4px', height: '8px', borderRadius: '2px', background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)', animation: 'scroll-dot 2.5s ease-in-out infinite' }} />
          </div>
        </div>
      </section>

      {/* ═══ GLOW SEPARATOR ═════════════════════════ */}
      <div className="glow-line" />

      {/* ═══ TRUST BAR (marquee) ════════════════════ */}
      <section style={{ background: 'var(--bg-2)', padding: '1.75rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(90deg, var(--bg-2) 0%, transparent 8%, transparent 92%, var(--bg-2) 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <p style={{ textAlign: 'center', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>
          Trusted by world-class institutions
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: 0, width: 'max-content', animation: 'marquee 30s linear infinite' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
          >
            {[...["IIT Madras", "TIQ World", "DGZfP", "Stanford", "NDE India", "AI Summit India", "IIT Bombay", "DRDO", "Boeing", "Tata Steel", "NASSCOM", "YourStory"],
              ...["IIT Madras", "TIQ World", "DGZfP", "Stanford", "NDE India", "AI Summit India", "IIT Bombay", "DRDO", "Boeing", "Tata Steel", "NASSCOM", "YourStory"]
            ].map((org, i) => (
              <span key={i} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                padding: '0.4rem 1.5rem', flexShrink: 0,
                fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--fg-muted)',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--border-strong)', display: 'inline-block' }} />
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ══════════════════════════ */}
      <section className="section" ref={pillarsRef} style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: '60%', height: '300px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.04) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.34,1.2,0.64,1)' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Foundation</span>
            <h2 style={{ color: 'var(--fg)' }}>Three Pillars of Impact</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
            {pillars.map((p, i) => {
              const tiltRef = useTilt(7);
              return (
                <div key={i} ref={tiltRef}
                  style={{
                    padding: 'clamp(1.75rem,3vw,2.5rem)',
                    background: p.gradient,
                    border: `1px solid ${p.borderColor}`,
                    borderRadius: '24px',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)',
                    position: 'relative', overflow: 'hidden',
                    transformStyle: 'preserve-3d',
                    opacity: pillarsInView ? 1 : 0,
                    transform: pillarsInView ? 'perspective(900px) rotateX(0) rotateY(0)' : 'translateY(40px) scale(0.96)',
                    transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${i * 150}ms, transform 0.15s ease`,
                    cursor: 'default',
                  }}
                >
                  <div style={{ position: 'absolute', bottom: '-20px', left: '20%', right: '20%', height: '60px', background: p.glowColor, filter: 'blur(20px)', borderRadius: '50%' }} />
                  <div style={{ fontSize: '2.2rem', marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '54px', height: '54px', background: p.glowColor, border: `1px solid ${p.borderColor}`, borderRadius: '14px', boxShadow: `0 4px 16px ${p.glowColor}` }}>
                    {p.icon}
                  </div>
                  <h3 style={{ color: p.accent, fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.85rem', textShadow: `0 0 20px ${p.accent}50` }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', lineHeight: 1.8, margin: 0 }}>{p.text}</p>
                  <div style={{ marginTop: '1.75rem', height: '2px', width: '40px', background: `linear-gradient(90deg, ${p.accent}, transparent)`, borderRadius: '999px', transition: 'width 0.5s ease', boxShadow: `0 0 8px ${p.accent}60` }} className="pillar-line" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ PRESS / FEATURED IN ════════════════════ */}
      <div className="glow-line" />
      <section style={{ background: 'var(--bg)', padding: '3.5rem 0', overflow: 'hidden' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '2rem' }}>
            As Featured In &amp; Trusted By
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
            {[
              { name: 'YourStory', icon: '📰' },
              { name: 'Analytics India', icon: '📊' },
              { name: 'IIT Madras', icon: '🎓' },
              { name: 'NASSCOM', icon: '🏛️' },
              { name: 'Times of India', icon: '🗞️' },
              { name: 'Entrepreneur India', icon: '💡' },
              { name: 'TIQ World', icon: '🌐' },
            ].map((p) => (
              <div key={p.name} className="press-logo"
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--fg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.color = 'var(--fg-muted)'; }}
              >
                <span style={{ fontSize: '0.9rem' }}>{p.icon}</span>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY TIMELINE ═════════════════════════ */}
      <section className="section" ref={timelineRef} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent 0%, var(--border-strong) 15%, var(--border-strong) 85%, transparent 100%)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: timelineInView ? 1 : 0, transform: timelineInView ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.34,1.2,0.64,1)' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>The Journey</span>
            <h2 style={{ color: 'var(--fg)' }}>Built Over a Decade</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 60px 1fr',
                alignItems: 'center', gap: 0,
                opacity: timelineInView ? 1 : 0,
                transform: timelineInView ? 'none' : 'translateY(30px)',
                transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${i * 120}ms`,
              }}>
                <div style={{ textAlign: 'right', paddingRight: '2rem', paddingBottom: '2.5rem', ...(i % 2 === 0 ? {} : { opacity: 0, pointerEvents: 'none' }) }}>
                  {i % 2 === 0 && (
                    <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))', border: `1px solid ${t.accent}28`, borderRadius: '16px', padding: '1.1rem 1.25rem', backdropFilter: 'blur(20px)', maxWidth: '260px' }}>
                      <p style={{ color: t.accent, fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{t.year}</p>
                      <p style={{ color: 'var(--fg)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.label}</p>
                      <p style={{ color: 'var(--fg-2)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{t.detail}</p>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1.25rem', paddingBottom: '2.5rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: `radial-gradient(circle, ${t.accent} 0%, ${t.accent}60 100%)`, border: `2px solid ${t.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', boxShadow: `0 0 24px ${t.accent}60, 0 0 50px ${t.accent}25`, flexShrink: 0 }}>
                    {t.icon}
                  </div>
                </div>
                <div style={{ paddingLeft: '2rem', paddingBottom: '2.5rem', ...(i % 2 === 1 ? {} : { opacity: 0, pointerEvents: 'none' }) }}>
                  {i % 2 === 1 && (
                    <div style={{ display: 'inline-block', background: 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))', border: `1px solid ${t.accent}28`, borderRadius: '16px', padding: '1.1rem 1.25rem', backdropFilter: 'blur(20px)', maxWidth: '260px' }}>
                      <p style={{ color: t.accent, fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{t.year}</p>
                      <p style={{ color: 'var(--fg)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.label}</p>
                      <p style={{ color: 'var(--fg-2)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{t.detail}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPEAKING REEL ══════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-label" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>On Stage</span>
              <h2 style={{ color: 'var(--fg)', margin: 0 }}>Speaking Reel</h2>
            </div>
            <a href="/speaking" style={{ color: 'var(--cyan)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid rgba(0,217,255,0.3)', paddingBottom: '2px' }}>View All →</a>
          </div>
        </div>
        <div style={{ paddingLeft: 'max(1.25rem,calc((100vw - 1280px)/2 + 1.25rem))', overflow: 'auto', paddingBottom: '1rem', cursor: 'grab' }} className="scroll-reel">
          <div style={{ display: 'flex', gap: '1.25rem', width: 'max-content', paddingRight: '2rem' }}>
            {events.map((ev, i) => (
              <div key={i} style={{
                width: '280px', flexShrink: 0,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px', padding: '1.5rem',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-8px) scale(1.02)'; el.style.boxShadow = '0 24px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,217,255,0.08), inset 0 1px 0 rgba(255,255,255,0.09)'; el.style.borderColor = 'rgba(0,217,255,0.15)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'none'; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: i % 2 === 0 ? 'var(--cyan)' : 'var(--accent)', background: i % 2 === 0 ? 'rgba(0,217,255,0.08)' : 'rgba(255,94,26,0.08)', border: `1px solid ${i % 2 === 0 ? 'rgba(0,217,255,0.18)' : 'rgba(255,94,26,0.18)'}`, borderRadius: '6px', padding: '0.2rem 0.55rem' }}>{ev.type}</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{ev.year}</span>
                </div>
                <h3 style={{ color: 'var(--fg)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>{ev.name}</h3>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.78rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="10" r="3"/><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 13 8 13s8-7.75 8-13a8 8 0 0 0-8-8z"/></svg>
                  {ev.city}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Audience</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>{ev.audience}</span>
                </div>
                <div style={{ marginTop: '1rem', height: '2px', width: '100%', background: `linear-gradient(90deg, ${i % 2 === 0 ? 'var(--cyan)' : 'var(--accent)'}, transparent)`, borderRadius: '999px', opacity: 0.35 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO ══════════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 100%)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '50%', height: '300px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.06) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Watch</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>See Srijan in Action</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '500px', margin: '0 auto' }}>Watch a keynote excerpt — from complex AI theory to room-holding clarity in minutes.</p>
          </div>
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)', aspectRatio: '16/9', background: '#050810', cursor: 'pointer' }}
            onClick={() => window.open('https://www.youtube.com/@srijanspeaks', '_blank')}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 40% 50%, rgba(0,80,160,0.5) 0%, rgba(5,10,24,0.9) 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '84px', height: '84px', borderRadius: '50%', background: 'linear-gradient(135deg, #ff6b2b, #e84800)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(255,94,26,0.6), 0 0 100px rgba(255,94,26,0.25)', animation: 'pulse-play 2.5s ease-in-out infinite' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '4px' }}><path d="M5 3l14 9-14 9V3z"/></svg>
              </div>
              <span style={{ color: 'var(--fg)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Watch Keynote Excerpt</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>AI Summit India 2024 · Bengaluru</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--cyan)', fontWeight: 700, border: '1px solid rgba(0,217,255,0.25)', borderRadius: '6px', padding: '0.2rem 0.6rem' }}>1200+ Attendees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══════════════════════════ */}
      <section className="section" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '40%', left: '5%', width: '350px', height: '350px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '5%', width: '300px', height: '300px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>Social Proof</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>What People Say</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '480px', margin: '0 auto' }}>Voices from engineers, founders, and learners whose trajectories shifted.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { quote: "Srijan doesn't just teach concepts — he creates genuine connections by showing you how AI works in the real world. His style brings clarity to complexity.", name: 'Rohan Mehta', role: 'ML Engineer · Google', avatar: '🧑‍💻', accent: 'var(--accent)' },
              { quote: "His keynote at AI Summit India literally changed how our leadership thinks about automation. We implemented his framework within 3 weeks.", name: 'Priya Sharma', role: 'CTO · FinTech Startup, Mumbai', avatar: '👩‍💼', accent: 'var(--cyan)' },
              { quote: "Best investment of my engineering career. Srijan's course gave me the practical skills to lead our AI transformation — from zero to production in 90 days.", name: 'Arjun Nair', role: 'Senior Engineer · TCS', avatar: '🧑‍🔬', accent: 'var(--purple)' },
            ].map((t, i) => (
              <div key={i} className="testimonial-card"
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = t.accent; el.style.boxShadow = `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${t.accent}22, inset 0 1px 0 rgba(255,255,255,0.09)`; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)'; }}
              >
                <div style={{ position: 'absolute', top: '-8px', left: '1.5rem', fontSize: '5rem', lineHeight: 1, fontFamily: 'Georgia,serif', color: t.accent, opacity: 0.15, fontWeight: 900 }}>&#8220;</div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill={t.accent}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <blockquote style={{ fontSize: '0.93rem', fontWeight: 300, color: 'var(--fg)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '1.5rem' }}>"{t.quote}"</blockquote>
                <div style={{ width: '32px', height: '2px', background: `linear-gradient(90deg, ${t.accent}, transparent)`, borderRadius: '999px', marginBottom: '1.25rem' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: `linear-gradient(135deg, ${t.accent}30, ${t.accent}10)`, border: `1px solid ${t.accent}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '0.88rem', margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', letterSpacing: '0.05em', marginTop: '0.15rem' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="/speaking" style={{ fontSize: '0.82rem', color: 'var(--fg-muted)', textDecoration: 'none', borderBottom: '1px solid var(--border)', paddingBottom: '2px', transition: 'color 0.2s, border-color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--fg-muted)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; }}
            >Read more stories from the community →</a>
          </div>
        </div>
      </section>

      {/* ═══ TEACHING MOMENTS ═══════════════════════ */}
      <section className="section" ref={teachRef} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: teachInView ? 1 : 0, transform: teachInView ? 'none' : 'translateY(30px)', transition: 'all 0.8s cubic-bezier(0.34,1.2,0.64,1)' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>In Action</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Educator at Heart</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '500px', margin: '0 auto' }}>Real moments of teaching, mentoring, and knowledge transfer with engineers worldwide.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
            {moments.map((m, i) => (
              <div key={i} className="card moment-card" style={{ overflow: 'hidden', opacity: teachInView ? 1 : 0, transform: teachInView ? 'none' : 'translateY(40px) scale(0.96)', transition: `all 0.7s cubic-bezier(0.34,1.2,0.64,1) ${i * 150}ms` }}>
                <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <img src={m.src} alt={m.label} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', display: 'block' }} className="moment-img" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <div className="moment-overlay" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${m.accent === 'var(--cyan)' ? 'rgba(0,217,255,0.3)' : m.accent === 'var(--purple)' ? 'rgba(139,92,246,0.3)' : 'rgba(255,94,26,0.3)'} 0%, transparent 60%)`, opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'flex-end', padding: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: m.accent, textShadow: '0 0 10px currentColor' }}>→ {m.label}</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '1rem', marginBottom: '0.4rem' }}>{m.label}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <MagneticButton href="/speaking" className="btn btn-outline">See All Speaking Engagements →</MagneticButton>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═════════════════════════════ */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #03050f 0%, #07101f 50%, #03050f 100%)', borderTop: '1px solid var(--border)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '350px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.07) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(255,94,26,0.05) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        {/* Animated border top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent), var(--cyan), var(--purple), var(--accent), transparent)', backgroundSize: '300% 100%', animation: 'gradient-flow 5s linear infinite', opacity: 0.6 }} />
        <div className="container" style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>Let&apos;s Work Together</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1.25rem', lineHeight: 1.1 }}>Ready to Transform<br/>Your Organisation?</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto 2.5rem', maxWidth: '520px' }}>
            Book a keynote, technical workshop, or AI research consultation. Let&apos;s build something that matters.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <MagneticButton href="/contact" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '1.1rem 2.5rem' }}>✦ Start the Conversation</MagneticButton>
            <MagneticButton href="/about" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>Learn About Srijan</MagneticButton>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blink {
          0%,100% { border-color: var(--cyan); }
          50%      { border-color: transparent; }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(10px); }
        }
        @keyframes scroll-dot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(16px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        @keyframes pulse-play {
          0%, 100% { box-shadow: 0 0 50px rgba(255,94,26,0.6), 0 0 100px rgba(255,94,26,0.25); }
          50%       { box-shadow: 0 0 70px rgba(255,94,26,0.8), 0 0 130px rgba(255,94,26,0.35); }
        }
        .pillar-card:hover .pillar-line { width: 100% !important; }
        .moment-card:hover .moment-img { transform: scale(1.07) !important; }
        .moment-card:hover .moment-overlay { opacity: 1 !important; }
        .moment-card:hover { box-shadow: 0 24px 60px rgba(0,0,0,0.7) !important; }
      `}</style>
    </>
  );
}
