'use client';

import { useState } from 'react';
import Link from 'next/link';

const shortBio = `Srijan Tiwari is an AI keynote speaker, IIT Madras researcher, and co-founder of TIQ World. He has trained 5,000+ engineers across 50+ institutions in 12 countries, specialising in the intersection of artificial intelligence and non-destructive evaluation (NDE). His keynotes translate cutting-edge research into actionable frameworks for industry leaders.`;

const longBioParas = [
  `Srijan Tiwari is an AI researcher at the Centre for Non-Destructive Evaluation (CNDE), IIT Madras, and co-founder of TIQ World — an AI-powered platform transforming industrial inspection. With 8+ years of research experience and 200+ publications and talks, Srijan bridges the gap between academic innovation and real-world deployment.`,
  `As a keynote speaker, Srijan has addressed audiences at AI Summit India, DGZfP (Germany), Stanford, NDE India, and 50+ global events. His talks combine technical depth with storytelling clarity, making complex AI concepts accessible to diverse audiences — from C-suite executives to early-career engineers.`,
  `Through his online courses and corporate training programmes, Srijan has trained over 5,000 engineers across manufacturing, energy, aerospace, and infrastructure sectors. He is a recognised voice in India's AI ecosystem, featured in YourStory, Analytics India Magazine, NASSCOM, and Times of India.`,
];

const speakingTopics = [
  'AI & Machine Learning in Non-Destructive Testing',
  'Building an AI Startup from a Research Lab',
  'Manufacturing 4.0 & Industrial AI Playbook',
  'The Art of Technical Speaking',
  "India's AI Moment — Policy, Talent & Opportunity",
];

export default function MediaKitPage() {
  const [copiedShort, setCopiedShort] = useState(false);
  const [copiedLong, setCopiedLong] = useState(false);

  const copyText = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2500);
  };

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'radial-gradient(ellipse 120% 70% at 50% -10%, #0d1d45 0%, #050a18 65%)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(5rem, 12vw, 8rem) 0 clamp(3rem, 8vw, 5rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '5%', right: '-5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(255,94,26,0.08) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Press Resources</span>
          <h1 style={{ color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.05 }}>
            Media <span className="gradient-text-accent">Kit</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'var(--fg-2)', maxWidth: '42rem', margin: '0 auto', lineHeight: 1.8 }}>
            Bios, headshots, logos, and key facts for press, event organisers, and media partners.
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Biography</span>
            <h2 style={{ color: 'var(--fg)' }}>Speaker Bio</h2>
          </div>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Short bio */}
            <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--cyan)' }}>Short Bio (1 paragraph)</h3>
                <button
                  onClick={() => copyText(shortBio, setCopiedShort)}
                  style={{
                    padding: '0.4rem 1rem', borderRadius: 'var(--r-full)',
                    border: `1px solid ${copiedShort ? 'rgba(16,217,122,0.3)' : 'var(--border)'}`,
                    background: copiedShort ? 'rgba(16,217,122,0.08)' : 'var(--glass-bg)',
                    color: copiedShort ? 'var(--emerald)' : 'var(--fg-muted)',
                    fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {copiedShort ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <p style={{ color: 'var(--fg-2)', fontSize: '0.95rem', lineHeight: 1.8 }}>{shortBio}</p>
            </div>

            {/* Long bio */}
            <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent)' }}>Full Bio (3 paragraphs)</h3>
                <button
                  onClick={() => copyText(longBioParas.join('\n\n'), setCopiedLong)}
                  style={{
                    padding: '0.4rem 1rem', borderRadius: 'var(--r-full)',
                    border: `1px solid ${copiedLong ? 'rgba(16,217,122,0.3)' : 'var(--border)'}`,
                    background: copiedLong ? 'rgba(16,217,122,0.08)' : 'var(--glass-bg)',
                    color: copiedLong ? 'var(--emerald)' : 'var(--fg-muted)',
                    fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {copiedLong ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              {longBioParas.map((para, i) => (
                <p key={i} style={{ color: 'var(--fg-2)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: i < 2 ? '1rem' : 0 }}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Headshots & Brand Assets */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Assets</span>
            <h2 style={{ color: 'var(--fg)' }}>Headshots & Logos</h2>
          </div>

          <h3 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>Headshots</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {[
              { src: '/images/headshots/hero-professional.jpg', label: 'Professional Headshot' },
              { src: '/images/headshots/hero.jpg', label: 'Casual Headshot' },
            ].map(img => (
              <div key={img.label} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ aspectRatio: '3/4', background: 'var(--bg-3)', position: 'relative', overflow: 'hidden' }}>
                  <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--fg)' }}>{img.label}</p>
                  <a href={img.src} download style={{
                    padding: '0.35rem 0.85rem', borderRadius: 'var(--r-full)',
                    border: '1px solid rgba(0,217,255,0.25)', background: 'rgba(0,217,255,0.06)',
                    color: 'var(--cyan)', fontSize: '0.72rem', fontWeight: 700, transition: 'all 0.2s',
                  }}>
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '1.25rem' }}>Logo Files</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {[
              { src: '/logo-dark.svg', label: 'Logo (Dark Background)', bg: 'var(--bg)' },
              { src: '/logo-light.svg', label: 'Logo (Light Background)', bg: '#f0f4ff' },
            ].map(logo => (
              <div key={logo.label} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '120px', background: logo.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', border: '1px solid var(--border)' }}>
                  <img src={logo.src} alt={logo.label} style={{ maxHeight: '60px', maxWidth: '100%' }}
                    onError={e => { const el = e.target as HTMLImageElement; el.style.display = 'none'; }} />
                </div>
                <div style={{ padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--fg)' }}>{logo.label}</p>
                  <a href={logo.src} download style={{
                    padding: '0.35rem 0.85rem', borderRadius: 'var(--r-full)',
                    border: '1px solid rgba(0,217,255,0.25)', background: 'rgba(0,217,255,0.06)',
                    color: 'var(--cyan)', fontSize: '0.72rem', fontWeight: 700, transition: 'all 0.2s',
                  }}>
                    SVG
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking Topics */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Topics</span>
            <h2 style={{ color: 'var(--fg)' }}>Speaking Topics</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {speakingTopics.map((topic, i) => (
              <div key={i} className="card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: i % 2 === 0 ? 'var(--cyan)' : 'var(--accent)', fontFamily: 'var(--font-display)', minWidth: '28px' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ color: 'var(--fg)', fontSize: '0.95rem', fontWeight: 600 }}>{topic}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/speaking" className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
              View All Topics & Formats →
            </Link>
          </div>
        </div>
      </section>

      {/* Key Facts */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>At a Glance</span>
            <h2 style={{ color: 'var(--fg)' }}>Key Facts</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { val: '5,000+', label: 'Engineers Trained', c: 'var(--cyan)' },
              { val: '50+', label: 'Global Institutions', c: 'var(--accent)' },
              { val: '12', label: 'Countries Reached', c: 'var(--purple)' },
              { val: '200+', label: 'Publications & Talks', c: 'var(--cyan)' },
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: s.c, fontFamily: 'var(--font-display)', lineHeight: 1, marginBottom: '0.5rem' }}>{s.val}</div>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contact & Social */}
      <section style={{ background: 'linear-gradient(135deg, #050a18 0%, #0a0f25 50%, #050a18 100%)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(0,217,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div className="container" style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Press Contact</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Media Inquiries</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            For interviews, press features, speaker profiles, or high-resolution assets, reach out directly.
          </p>

          <a href="mailto:hello@srijanspeaks.com" className="btn btn-primary" style={{ marginBottom: '2.5rem' }}>
            hello@srijanspeaks.com
          </a>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/srijantiwari' },
              { label: 'Twitter / X', href: 'https://twitter.com/srijanspeaks' },
              { label: 'YouTube', href: 'https://www.youtube.com/@srijanspeaks' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '0.5rem 1.25rem', borderRadius: 'var(--r-full)',
                  border: '1px solid var(--border)', background: 'var(--glass-bg)',
                  color: 'var(--fg-2)', fontSize: '0.82rem', fontWeight: 600,
                  transition: 'all 0.2s', backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)'; e.currentTarget.style.color = 'var(--cyan)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-2)'; }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
