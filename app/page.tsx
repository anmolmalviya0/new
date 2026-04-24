"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  const { ref: pillarsRef, inView: pillarsInView } = useInView(0.08);
  const { ref: timelineRef, inView: timelineInView } = useInView(0.08);
  const { ref: teachRef, inView: teachInView } = useInView(0.08);

  const pillars = [
    { accent: "var(--cyan)", title: "Core Science", text: "8+ years at IIT Madras CNDE. 200+ peer-reviewed publications advancing AI-driven NDE and manufacturing intelligence." },
    { accent: "var(--accent)", title: "Proven Systems", text: "Co-founder of TIQ World. Built AI-powered NDT platforms serving 50+ enterprise clients with $200M+ documented impact." },
    { accent: "var(--cyan)", title: "Knowledge Transfer", text: "Technical keynotes at AI Summit India, Stanford, DGZfP. Frameworks adopted by 50+ institutions globally." },
  ];

  const timeline = [
    { year: "2012", label: "IIT Madras", detail: "Joined CNDE as researcher. First contact with AI-driven defect detection.", accent: "var(--cyan)" },
    { year: "2016", label: "First Keynote", detail: "International debut at DGZfP Conference, Germany. 400+ attendees.", accent: "var(--accent)" },
    { year: "2019", label: "TIQ World", detail: "Co-founded AI-NDT SaaS platform. Scaled to 50+ enterprise clients.", accent: "var(--cyan)" },
    { year: "2022", label: "5,000 Engineers", detail: "Trained 5,000+ engineers across 50+ global institutions.", accent: "var(--accent)" },
    { year: "2024", label: "AI Summit India", detail: "Keynote speaker at India's largest AI conference. 1200+ attendees.", accent: "var(--cyan)" },
  ];

  const moments = [
    { src: "/images/teaching/classroom-teaching.jpg", label: "Classroom Teaching", sub: "Live ML demos · real-time problem solving" },
    { src: "/images/speaking/keynote-tiqworld-1.jpg", label: "Industry Conference", sub: "200+ audience · translational research" },
    { src: "/images/mentoring/one-on-one.jpg", label: "1-on-1 Mentoring", sub: "Career guidance · research collaboration" },
  ];

  const events = [
    { name: "DGZfP Conference", city: "Berlin, Germany", year: "2016", audience: "400+", type: "International" },
    { name: "AI Summit India", city: "Bengaluru, India", year: "2024", audience: "1200+", type: "Keynote" },
    { name: "NDE India", city: "Mumbai, India", year: "2023", audience: "800+", type: "Workshop" },
    { name: "IIT Madras", city: "Chennai, India", year: "2022", audience: "500+", type: "Masterclass" },
    { name: "TIQ World Summit", city: "Hybrid", year: "2023", audience: "2000+", type: "Summit" },
    { name: "Stanford AI Lab", city: "Palo Alto, USA", year: "2024", audience: "300+", type: "Seminar" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Srijan Tiwari',
            url: 'https://srijanspeaks.com',
            jobTitle: 'AI Keynote Speaker & Researcher',
            worksFor: [
              { '@type': 'Organization', name: 'IIT Madras CNDE' },
              { '@type': 'Organization', name: 'TIQ World' },
            ],
            alumniOf: { '@type': 'Organization', name: 'IIT Madras' },
            knowsAbout: ['Artificial Intelligence', 'Machine Learning', 'Non-Destructive Testing', 'Manufacturing AI'],
            sameAs: [
              'https://linkedin.com/in/srijantiwari',
              'https://twitter.com/srijanspeaks',
              'https://www.youtube.com/@srijanspeaks',
            ],
          }),
        }}
      />

      {/* ═══ HERO ═══ */}
      <section style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0e1a38 0%, var(--bg) 70%)',
        minHeight: '100svh',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '6rem', paddingBottom: '6rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,4rem)', alignItems: 'center' }}>

            {/* Left: Content */}
            <div>
              <p style={{
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.5rem',
              }}>
                IIT Madras · AI Researcher · Keynote Speaker
              </p>

              <h1 style={{
                fontFamily: "var(--font-display, 'Space Grotesk')",
                fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95,
                fontSize: 'clamp(3rem,6vw,5rem)', marginBottom: '1.5rem',
              }}>
                <span style={{ display: 'block', color: 'var(--fg)' }}>SRIJAN</span>
                <span style={{ display: 'block', color: 'var(--accent)' }}>TIWARI</span>
              </h1>

              <p style={{
                fontSize: 'clamp(1rem,1.8vw,1.2rem)', color: 'var(--fg-2)',
                lineHeight: 1.8, maxWidth: '480px', marginBottom: '2.5rem',
              }}>
                AI Keynote Speaker, IIT Madras Researcher & Co-founder of TIQ World. I help engineers, organisations & innovators understand, build, and deploy AI at scale.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <Link href="/contact" className="btn btn-primary" style={{ fontSize: '0.88rem', padding: '1rem 2.25rem', borderRadius: '10px' }}>
                  Invite Srijan to Speak
                </Link>
                <Link href="/courses" className="btn btn-outline" style={{ fontSize: '0.88rem', padding: '1rem 2rem', borderRadius: '10px' }}>
                  Explore Courses
                </Link>
              </div>

              {/* Static metrics */}
              <div style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,2.5rem)', flexWrap: 'wrap' }}>
                {[
                  { num: "5,000+", label: "Engineers Trained" },
                  { num: "50+", label: "Institutions" },
                  { num: "12", label: "Countries" },
                  { num: "200+", label: "Publications" },
                ].map((m, i) => (
                  <div key={i}>
                    <div style={{
                      fontFamily: "var(--font-display, 'Space Grotesk')",
                      fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 900,
                      color: 'var(--fg)', lineHeight: 1,
                    }}>{m.num}</div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginTop: '0.3rem' }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Photo */}
            <div style={{ position: 'relative', aspectRatio: '3/4', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <Image
                src="/images/speaking/keynote-tiqworld-4.jpg"
                alt="Srijan Tiwari speaking at a conference"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TRUST BAR (static) ═══ */}
      <section style={{ background: 'var(--bg-2)', padding: '2rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>
            Trusted by world-class institutions
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem 1.5rem' }}>
            {["IIT Madras", "TIQ World", "DGZfP", "Stanford", "NDE India", "AI Summit India", "DRDO", "Boeing", "Tata Steel", "NASSCOM"].map((org) => (
              <span key={org} style={{
                fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--fg-muted)', padding: '0.3rem 0',
              }}>
                {org}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THREE PILLARS ═══ */}
      <section ref={pillarsRef} style={{ background: 'var(--bg)', padding: 'clamp(5rem,10vw,8rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: pillarsInView ? 1 : 0, transform: pillarsInView ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Foundation</span>
            <h2 style={{ color: 'var(--fg)' }}>Three Pillars of Impact</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem' }}>
            {pillars.map((p, i) => (
              <div key={i} style={{
                padding: 'clamp(2rem,3vw,2.5rem)',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                opacity: pillarsInView ? 1 : 0,
                transform: pillarsInView ? 'none' : 'translateY(24px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ width: '3px', height: '24px', background: p.accent, borderRadius: '2px', marginBottom: '1.5rem' }} />
                <h3 style={{ color: 'var(--fg)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', lineHeight: 1.8, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED IN ═══ */}
      <section style={{ background: 'var(--bg)', padding: '3.5rem 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '2rem' }}>
            As Featured In
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
            {['YourStory', 'Analytics India', 'IIT Madras', 'NASSCOM', 'Times of India', 'Entrepreneur India', 'TIQ World'].map((name) => (
              <div key={name} className="press-logo">
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STORY TIMELINE ═══ */}
      <section ref={timelineRef} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)', padding: 'clamp(5rem,10vw,8rem) 0', borderTop: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(180deg, transparent 0%, var(--border-strong) 15%, var(--border-strong) 85%, transparent 100%)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '900px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: timelineInView ? 1 : 0, transform: timelineInView ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>The Journey</span>
            <h2 style={{ color: 'var(--fg)' }}>Built Over a Decade</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 48px 1fr',
                alignItems: 'center',
                opacity: timelineInView ? 1 : 0,
                transform: timelineInView ? 'none' : 'translateY(20px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}>
                <div style={{ textAlign: 'right', paddingRight: '2rem', paddingBottom: '2.5rem', ...(i % 2 !== 0 ? { opacity: 0, pointerEvents: 'none' as const } : {}) }}>
                  {i % 2 === 0 && (
                    <div style={{ display: 'inline-block', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem 1.25rem', maxWidth: '260px' }}>
                      <p style={{ color: t.accent, fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{t.year}</p>
                      <p style={{ color: 'var(--fg)', fontWeight: 700, fontSize: '1rem', marginBottom: '0.35rem' }}>{t.label}</p>
                      <p style={{ color: 'var(--fg-2)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>{t.detail}</p>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '1.25rem', paddingBottom: '2.5rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.accent, border: '2px solid var(--bg)', boxShadow: `0 0 0 2px ${t.accent}`, flexShrink: 0 }} />
                </div>
                <div style={{ paddingLeft: '2rem', paddingBottom: '2.5rem', ...(i % 2 !== 1 ? { opacity: 0, pointerEvents: 'none' as const } : {}) }}>
                  {i % 2 === 1 && (
                    <div style={{ display: 'inline-block', background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem 1.25rem', maxWidth: '260px' }}>
                      <p style={{ color: t.accent, fontWeight: 800, fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{t.year}</p>
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

      {/* ═══ SPEAKING REEL ═══ */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(5rem,10vw,8rem) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-label" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>On Stage</span>
              <h2 style={{ color: 'var(--fg)', margin: 0 }}>Speaking Reel</h2>
            </div>
            <Link href="/speaking" style={{ color: 'var(--accent)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>View All →</Link>
          </div>
        </div>
        <div style={{ paddingLeft: 'max(1.25rem,calc((100vw - 1280px)/2 + 1.25rem))', overflow: 'auto', paddingBottom: '1rem' }} className="scroll-reel">
          <div style={{ display: 'flex', gap: '1.25rem', width: 'max-content', paddingRight: '2rem' }}>
            {events.map((ev, i) => (
              <div key={i} style={{
                width: '280px', flexShrink: 0,
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: '16px', padding: '1.5rem',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: i % 2 === 0 ? 'var(--cyan)' : 'var(--accent)', background: i % 2 === 0 ? 'var(--cyan-deep)' : 'var(--accent-deep)', border: `1px solid ${i % 2 === 0 ? 'rgba(0,217,255,0.15)' : 'rgba(255,94,26,0.15)'}`, borderRadius: '6px', padding: '0.2rem 0.55rem' }}>{ev.type}</span>
                  <span style={{ fontSize: '1.6rem', fontWeight: 900, color: 'rgba(255,255,255,0.04)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{ev.year}</span>
                </div>
                <h3 style={{ color: 'var(--fg)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.3 }}>{ev.name}</h3>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.78rem', marginBottom: '1rem' }}>{ev.city}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.68rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Audience</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>{ev.audience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VIDEO ═══ */}
      <section style={{ background: 'var(--bg-2)', padding: 'clamp(5rem,10vw,8rem) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Watch</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>See Srijan in Action</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '500px', margin: '0 auto' }}>Watch a keynote excerpt — from complex AI theory to room-holding clarity in minutes.</p>
          </div>
          <div style={{
            position: 'relative', borderRadius: '16px', overflow: 'hidden',
            border: '1px solid var(--border)', aspectRatio: '16/9',
            background: '#050810', cursor: 'pointer',
          }}
            onClick={() => window.open('https://www.youtube.com/@srijanspeaks', '_blank')}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 40% 50%, rgba(0,80,160,0.4) 0%, rgba(5,10,24,0.95) 100%)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.3s ease' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ marginLeft: '3px' }}><path d="M5 3l14 9-14 9V3z"/></svg>
              </div>
              <span style={{ color: 'var(--fg)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Watch Keynote Excerpt</span>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI Summit India 2024 · Bengaluru</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', fontWeight: 700 }}>1200+ Attendees</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(5rem,10vw,8rem) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-label" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>Testimonials</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem' }}>What People Say</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '480px', margin: '0 auto' }}>Voices from engineers, founders, and learners whose trajectories shifted.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
            {[
              { quote: "Srijan doesn't just teach concepts — he creates genuine connections by showing you how AI works in the real world. His style brings clarity to complexity.", name: 'Rohan Mehta', role: 'ML Engineer · Google' },
              { quote: "His keynote at AI Summit India literally changed how our leadership thinks about automation. We implemented his framework within 3 weeks.", name: 'Priya Sharma', role: 'CTO · FinTech Startup, Mumbai' },
              { quote: "Best investment of my engineering career. Srijan's course gave me the practical skills to lead our AI transformation — from zero to production in 90 days.", name: 'Arjun Nair', role: 'Senior Engineer · TCS' },
            ].map((t, i) => (
              <div key={i} style={{
                padding: 'clamp(1.5rem,3vw,2rem)',
                background: 'var(--bg-2)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1.25rem' }}>
                  {[1,2,3,4,5].map(s => <svg key={s} width="13" height="13" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <blockquote style={{ fontSize: '0.93rem', color: 'var(--fg)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '1.5rem' }}>"{t.quote}"</blockquote>
                <div style={{ width: '32px', height: '2px', background: 'var(--accent)', borderRadius: '999px', marginBottom: '1rem' }} />
                <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '0.88rem', margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', marginTop: '0.2rem' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEACHING MOMENTS ═══ */}
      <section ref={teachRef} style={{ background: 'var(--bg-2)', padding: 'clamp(5rem,10vw,8rem) 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: teachInView ? 1 : 0, transform: teachInView ? 'none' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
            <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>In Action</span>
            <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Educator at Heart</h2>
            <p style={{ color: 'var(--fg-2)', maxWidth: '500px', margin: '0 auto' }}>Real moments of teaching, mentoring, and knowledge transfer with engineers worldwide.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
            {moments.map((m, i) => (
              <div key={i} style={{
                overflow: 'hidden', borderRadius: '16px',
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                opacity: teachInView ? 1 : 0,
                transform: teachInView ? 'none' : 'translateY(24px)',
                transition: `all 0.6s ease ${i * 100}ms`,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3', background: 'var(--bg-3)', overflow: 'hidden' }}>
                  <Image src={m.src} alt={m.label} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '1rem', marginBottom: '0.4rem' }}>{m.label}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', margin: 0 }}>{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/speaking" className="btn btn-outline">See All Speaking Engagements</Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(5rem,10vw,8rem) 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <span className="section-label" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>Let&apos;s Work Together</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1.25rem', lineHeight: 1.1 }}>Ready to Transform<br/>Your Organisation?</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1.05rem', lineHeight: 1.8, margin: '0 auto 2.5rem' }}>
            Book a keynote, technical workshop, or AI research consultation. Let&apos;s build something that matters.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/contact" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '1.1rem 2.5rem' }}>Start the Conversation</Link>
            <Link href="/about" className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>Learn About Srijan</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section:first-of-type .container > div { grid-template-columns: 1fr !important; }
          section:first-of-type .container > div > div:last-child { aspect-ratio: 16/9 !important; max-height: 400px; }
        }
      `}</style>
    </>
  );
}
