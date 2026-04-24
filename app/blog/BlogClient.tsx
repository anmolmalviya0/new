'use client';

import { useState } from 'react';

// Blog page — enhanced with featured post, category icons, read time chips, newsletter
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const blogPosts = [
    { id: 1, title: 'The Future of AI in NDT', excerpt: 'How machine learning is revolutionising non-destructive testing — from ultrasonic signal classification to edge deployment.', date: 'Mar 15, 2024', category: 'AI & ML', emoji: '🤖', readTime: '5 min', featured: true },
    { id: 2, title: 'Digital NDE Ecosystem 2030: Skills, Trust, Technology', excerpt: 'Exploring the convergence of digital technologies, skilled workforce, and trust frameworks reshaping the NDE industry. From ASNT — comprehensive insights on the future of non-destructive evaluation.', date: 'Apr 10, 2024', category: 'Research', emoji: '🔬', readTime: '12 min', featured: false },
    { id: 3, title: 'Empowering Industrial Excellence: NDT Workforce Development', excerpt: 'How NDT/NDE 4.0 workforce initiatives are transforming quality inspection and creating new opportunities for engineers across India. Building world-class talent for industrial excellence.', date: 'Apr 5, 2024', category: 'Research', emoji: '👥', readTime: '8 min', featured: false },
    { id: 4, title: 'Building Your First Startup', excerpt: 'Lessons from founding TIQ World and scaling to 50+ enterprise clients. What worked, what failed, and what I wish I knew.', date: 'Mar 8, 2024', category: 'Entrepreneurship', emoji: '🚀', readTime: '7 min', featured: false },
    { id: 5, title: 'Speaking at Tech Conferences', excerpt: 'Tips for crafting memorable keynotes and engaging technical audiences without dumbing down the content.', date: 'Feb 28, 2024', category: 'Speaking', emoji: '🎤', readTime: '4 min', featured: false },
    { id: 6, title: 'Python for NDT Data Analysis', excerpt: 'Practical guide to processing ultrasonic and radiographic data with Python, NumPy, and PyTorch.', date: 'Feb 14, 2024', category: 'AI & ML', emoji: '🐍', readTime: '8 min', featured: false },
    { id: 7, title: 'Manufacturing 4.0 in India', excerpt: 'How Indian manufacturers can leapfrog into Industry 4.0 with AI — the talent, the infrastructure, and the policy gaps.', date: 'Jan 30, 2024', category: 'Research', emoji: '🏭', readTime: '6 min', featured: false },
    { id: 8, title: 'From Engineer to Entrepreneur', excerpt: 'The mindset shift required when you stop building for others and start building for yourself. Hard-won lessons.', date: 'Jan 15, 2024', category: 'Entrepreneurship', emoji: '💡', readTime: '5 min', featured: false },
    { id: 9, title: 'Advancing NDE Research: Publications & Discoveries', excerpt: 'Curated collection of our latest peer-reviewed research on AI-driven defect detection, automated quality inspection, and edge deployment in manufacturing environments.', date: 'Dec 28, 2023', category: 'Research', emoji: '📚', readTime: '10 min', featured: false },
  ];

  const categories = [
    { id: 'all',             label: 'All Posts',      emoji: '📋' },
    { id: 'AI & ML',         label: 'AI & ML',        emoji: '🤖' },
    { id: 'Entrepreneurship',label: 'Startup',        emoji: '🚀' },
    { id: 'Speaking',        label: 'Speaking',       emoji: '🎤' },
    { id: 'Research',        label: 'Research',       emoji: '🔬' },
  ];

  const filtered = blogPosts.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = blogPosts.find(p => p.featured);
  const rest = filtered.filter(p => !p.featured || selectedCategory !== 'all' || searchTerm);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        background: 'radial-gradient(ellipse 120% 70% at 50% -10%, #0d1d45 0%, #050a18 65%)',
        paddingTop: 'clamp(5rem,12vw,8rem)', paddingBottom: 'clamp(3rem,8vw,5rem)',
        borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Thoughts &amp; Ideas</span>
          <h1 style={{ color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.05 }}>
            The <span className="gradient-text-accent">Blog</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem,2.5vw,1.1rem)', color: 'var(--fg-2)', maxWidth: '40rem', margin: '0 auto', lineHeight: 1.8 }}>
            Honest writing on AI, manufacturing, entrepreneurship, and the craft of technical communication.
          </p>
        </div>
      </section>

      {/* ── SEARCH & FILTERS ── */}
      <section style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: 'clamp(1.5rem,4vw,2.5rem) 0' }}>
        <div className="container">
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--fg-muted)" strokeWidth="2" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text" placeholder="Search posts…" value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', border: '1px solid var(--border)', borderRadius: 'var(--r-sm)', background: 'var(--glass-bg)', color: 'var(--fg)', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', backdropFilter: 'blur(8px)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                style={{ padding: '0.45rem 1rem', borderRadius: 'var(--r-full)', border: `1px solid ${selectedCategory === cat.id ? 'var(--cyan)' : 'var(--border)'}`, background: selectedCategory === cat.id ? 'rgba(0,217,255,0.1)' : 'transparent', color: selectedCategory === cat.id ? 'var(--cyan)' : 'var(--fg-2)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>{cat.emoji}</span> {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ── */}
      {featured && selectedCategory === 'all' && !searchTerm && (
        <section style={{ background: 'var(--bg)', padding: 'clamp(2.5rem,6vw,4rem) 0', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span className="badge badge-accent">Featured</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', letterSpacing: '0.08em' }}>Editor&apos;s pick</span>
            </div>
            <a href={`/blog/${featured.id}`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.92')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <div style={{ background: 'linear-gradient(135deg, rgba(0,217,255,0.12) 0%, rgba(139,92,246,0.08) 100%)', borderRadius: 'var(--r-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', minHeight: '220px', border: '1px solid rgba(0,217,255,0.15)' }}>
                {featured.emoji}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>{featured.category}</span>
                <h2 style={{ color: 'var(--fg)', marginBottom: '1rem', lineHeight: 1.2, fontSize: 'clamp(1.5rem,3vw,2.2rem)' }}>{featured.title}</h2>
                <p style={{ color: 'var(--fg-2)', lineHeight: 1.75, marginBottom: '1.25rem', fontSize: '1rem' }}>{featured.excerpt}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)' }}>{featured.date}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)', borderRadius: 'var(--r-full)', padding: '0.2rem 0.6rem' }}>⏱ {featured.readTime} read</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent)' }}>Read article →</span>
                </div>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* ── BLOG GRID ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,8vw,5rem) 0' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--fg-muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontSize: '1rem' }}>No posts found for &ldquo;{searchTerm}&rdquo; {selectedCategory !== 'all' ? `in ${selectedCategory}` : ''}.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} style={{ marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'transparent', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', color: 'var(--fg-2)', cursor: 'pointer', fontSize: '0.85rem' }}>Clear filters</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {rest.map(post => (
                <a key={post.id} href={`/blog/${post.id}`}
                  className="card"
                  style={{ display: 'block', overflow: 'hidden', textDecoration: 'none', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease' }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-6px) scale(1.01)'; el.style.borderColor = 'var(--border-strong)'; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'none'; el.style.borderColor = 'var(--glass-border)'; }}
                >
                  <div style={{ background: 'linear-gradient(135deg, var(--bg-3), var(--bg-2))', height: '9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                    {post.emoji}
                  </div>
                  <div style={{ padding: '1.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{post.category}</span>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--cyan)', background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.15)', borderRadius: 'var(--r-full)', padding: '0.15rem 0.5rem' }}>⏱ {post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '0.6rem', lineHeight: 1.3 }}>{post.title}</h3>
                    <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '1rem' }}>{post.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)' }}>{post.date}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--cyan)' }}>Read →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section style={{ background: 'linear-gradient(135deg, #050a18 0%, #0a0f25 50%, #050a18 100%)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '250px', background: 'radial-gradient(ellipse, rgba(139,92,246,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '520px', margin: '0 auto' }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Newsletter</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '0.75rem', fontSize: 'clamp(1.6rem,4vw,2.4rem)' }}>Stay in the Loop</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.75 }}>
            New articles on AI, manufacturing, and entrepreneurship — delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          {subscribed ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 2rem', background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.3)', borderRadius: 'var(--r-sm)', color: 'var(--cyan)', fontWeight: 700 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              You&apos;re subscribed! Watch your inbox.
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
              style={{ display: 'flex', gap: '0', maxWidth: '420px', margin: '0 auto', borderRadius: 'var(--r-sm)', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--glass-bg)', backdropFilter: 'blur(12px)' }}>
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
