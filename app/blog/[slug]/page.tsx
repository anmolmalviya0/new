'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const blogPosts = [
  { id: 1, title: 'The Future of AI in NDT', excerpt: 'How machine learning is revolutionising non-destructive testing — from ultrasonic signal classification to edge deployment.', date: 'Mar 15, 2024', category: 'AI & ML', emoji: '🤖', readTime: '5 min', featured: true },
  { id: 2, title: 'Digital NDE Ecosystem 2030: Skills, Trust, Technology', excerpt: 'Exploring the convergence of digital technologies, skilled workforce, and trust frameworks reshaping the NDE industry. From ASNT — comprehensive insights on the future of non-destructive evaluation.', date: 'Apr 10, 2024', category: 'Research', emoji: '🔬', readTime: '12 min' },
  { id: 3, title: 'Empowering Industrial Excellence: NDT Workforce Development', excerpt: 'How NDT/NDE 4.0 workforce initiatives are transforming quality inspection and creating new opportunities for engineers across India.', date: 'Apr 5, 2024', category: 'Research', emoji: '👥', readTime: '8 min' },
  { id: 4, title: 'Building Your First Startup', excerpt: 'Lessons from founding TIQ World and scaling to 50+ enterprise clients. What worked, what failed, and what I wish I knew.', date: 'Mar 8, 2024', category: 'Entrepreneurship', emoji: '🚀', readTime: '7 min' },
  { id: 5, title: 'Speaking at Tech Conferences', excerpt: 'Tips for crafting memorable keynotes and engaging technical audiences without dumbing down the content.', date: 'Feb 28, 2024', category: 'Speaking', emoji: '🎤', readTime: '4 min' },
  { id: 6, title: 'Python for NDT Data Analysis', excerpt: 'Practical guide to processing ultrasonic and radiographic data with Python, NumPy, and PyTorch.', date: 'Feb 14, 2024', category: 'AI & ML', emoji: '🐍', readTime: '8 min' },
  { id: 7, title: 'Manufacturing 4.0 in India', excerpt: 'How Indian manufacturers can leapfrog into Industry 4.0 with AI — the talent, the infrastructure, and the policy gaps.', date: 'Jan 30, 2024', category: 'Research', emoji: '🏭', readTime: '6 min' },
  { id: 8, title: 'From Engineer to Entrepreneur', excerpt: 'The mindset shift required when you stop building for others and start building for yourself. Hard-won lessons.', date: 'Jan 15, 2024', category: 'Entrepreneurship', emoji: '💡', readTime: '5 min' },
  { id: 9, title: 'Advancing NDE Research: Publications & Discoveries', excerpt: 'Curated collection of our latest peer-reviewed research on AI-driven defect detection, automated quality inspection, and edge deployment.', date: 'Dec 28, 2023', category: 'Research', emoji: '📚', readTime: '10 min' },
];

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = blogPosts.find(p => p.id === Number(slug));
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!post) {
    return (
      <section style={{
        minHeight: '80svh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--hero-gradient-2)',
        position: 'relative', overflow: 'hidden', padding: '4rem 1.5rem',
      }}>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📄</div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', fontWeight: 800, color: 'var(--fg)', marginBottom: '1rem' }}>
            Post Not Found
          </h1>
          <p style={{ color: 'var(--fg-2)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
            The article you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/blog" className="btn btn-primary">← Back to Blog</Link>
        </div>
      </section>
    );
  }

  const related = blogPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--hero-gradient-2)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(5rem, 12vw, 8rem) 0 clamp(3rem, 8vw, 5rem)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto', padding: '0 1.25rem' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--fg-muted)', marginBottom: '2rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-muted)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Blog
          </Link>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className="badge badge-accent">{post.category}</span>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--cyan)', background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 'var(--r-full)', padding: '0.2rem 0.6rem' }}>
              ⏱ {post.readTime} read
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)' }}>{post.date}</span>
          </div>

          <h1 style={{ color: 'var(--fg)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '2rem' }}>
            {post.title}
          </h1>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '5rem', height: '160px',
            background: 'linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(139,92,246,0.05) 100%)',
            borderRadius: 'var(--r-lg)', border: '1px solid rgba(0,217,255,0.12)',
          }}>
            {post.emoji}
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.25rem' }}>
          <div style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', color: 'var(--fg)', lineHeight: 1.85,
            fontWeight: 400, marginBottom: '2.5rem',
            padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)', borderLeft: '4px solid var(--cyan)',
          }}>
            {post.excerpt}
          </div>

          <div style={{ color: 'var(--fg-2)', lineHeight: 1.85, fontSize: '1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              This article explores the latest developments and practical applications in {post.category.toLowerCase()}.
              Drawing from real-world experience at IIT Madras and TIQ World, we examine the challenges, opportunities,
              and frameworks that drive meaningful impact.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              The intersection of research and industry application continues to accelerate. Engineers and organisations
              that embrace these shifts early stand to gain significant competitive advantage — not just in technology
              adoption, but in building the talent and processes that sustain innovation.
            </p>

            <div style={{
              padding: '2rem', background: 'linear-gradient(135deg, rgba(0,217,255,0.04), rgba(139,92,246,0.03))',
              border: '1px solid rgba(0,217,255,0.12)', borderRadius: 'var(--r-md)', textAlign: 'center',
              margin: '2.5rem 0',
            }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: '0.75rem' }}>
                Full Article Coming Soon
              </p>
              <p style={{ color: 'var(--fg-2)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto' }}>
                This article is being prepared for publication. Subscribe below to get notified when it&apos;s live.
              </p>
            </div>

            <p style={{ marginBottom: '1.5rem' }}>
              Stay tuned for in-depth analysis, case studies, and actionable insights that you can apply
              to your own projects and organisations.
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)', margin: '3rem 0' }} />

          {/* Author Card */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(255,94,26,0.15))',
              border: '1px solid rgba(0,217,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem',
            }}>
              👤
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontWeight: 700, color: 'var(--fg)', fontSize: '1rem', marginBottom: '0.25rem' }}>Srijan Tiwari</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--cyan)', fontWeight: 600, marginBottom: '0.5rem' }}>AI Keynote Speaker & Researcher</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', lineHeight: 1.6 }}>
                IIT Madras researcher, TIQ World co-founder, and AI educator. Training 5000+ engineers across 50+ institutions worldwide.
              </p>
            </div>
            <Link href="/about" className="btn btn-outline" style={{ fontSize: '0.78rem', padding: '0.6rem 1.25rem', flexShrink: 0 }}>
              About Srijan →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Keep Reading</span>
            <h2 style={{ color: 'var(--fg)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>Related Articles</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '960px', margin: '0 auto' }}>
            {related.map(r => (
              <Link key={r.id} href={`/blog/${r.id}`} className="card" style={{ display: 'block', overflow: 'hidden', textDecoration: 'none', transition: 'transform 0.3s ease, border-color 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ background: 'linear-gradient(135deg, var(--bg-3), var(--bg-2))', height: '7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                  {r.emoji}
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{r.category}</span>
                    <span style={{ fontSize: '0.65rem', color: 'var(--cyan)' }}>⏱ {r.readTime}</span>
                  </div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{r.title}</h3>
                  <span style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)' }}>{r.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section style={{ background: 'var(--cta-gradient)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px', margin: '0 auto' }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Newsletter</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem', fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>Get Notified</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.75 }}>
            New articles on AI, manufacturing, and entrepreneurship — straight to your inbox.
          </p>
          {subscribed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.3)', borderRadius: 'var(--r-sm)', color: 'var(--cyan)', fontWeight: 700 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              You&apos;re subscribed!
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
              style={{ display: 'flex', gap: 0, maxWidth: '400px', margin: '0 auto', borderRadius: 'var(--r-sm)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)' }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                style={{ flex: 1, padding: '0.85rem 1rem', background: 'transparent', border: 'none', color: 'var(--fg)', fontSize: '0.95rem', outline: 'none', minWidth: 0 }} />
              <button type="submit" className="btn btn-primary" style={{ borderRadius: 0, fontSize: '0.82rem', padding: '0.85rem 1.5rem', flexShrink: 0 }}>
                Subscribe →
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
