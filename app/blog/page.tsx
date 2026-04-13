'use client';

import { useState } from 'react';

// Blog page with search, filtering, and newsletter subscription - content hub
// Posts are currently static; connect Sanity CMS for dynamic content
export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in NDT',
      excerpt: 'How machine learning is revolutionizing non-destructive testing.',
      date: 'Mar 15, 2024',
      category: 'AI & ML',
      image: '🤖',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'Building Your First Startup',
      excerpt: 'Lessons from founding TIQ World and scaling to 50+ clients.',
      date: 'Mar 8, 2024',
      category: 'Entrepreneurship',
      image: '🚀',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'Speaking at Tech Conferences',
      excerpt: 'Tips for crafting memorable keynotes and engaging audiences.',
      date: 'Feb 28, 2024',
      category: 'Speaking',
      image: '🎤',
      readTime: '4 min read',
    },
    {
      id: 4,
      title: 'Python for NDT Data Analysis',
      excerpt: 'Practical guide to processing ultrasonic and radiographic data with Python.',
      date: 'Feb 14, 2024',
      category: 'AI & ML',
      image: '🐍',
      readTime: '8 min read',
    },
    {
      id: 5,
      title: 'Manufacturing 4.0 in India',
      excerpt: 'How Indian manufacturers can leapfrog into Industry 4.0 with AI.',
      date: 'Jan 30, 2024',
      category: 'Research',
      image: '🏭',
      readTime: '6 min read',
    },
    {
      id: 6,
      title: 'From Engineer to Entrepreneur',
      excerpt: 'The mindset shift required when you stop building for others and start building for yourself.',
      date: 'Jan 15, 2024',
      category: 'Entrepreneurship',
      image: '💡',
      readTime: '5 min read',
    },
  ];

  const categories = ['all', 'AI & ML', 'Entrepreneurship', 'Speaking', 'Research'];

  const filtered = blogPosts.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--bg)', paddingTop: 'clamp(5rem,12vw,8rem)', paddingBottom: 'clamp(3rem,8vw,5rem)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">✍️ Thoughts & Ideas</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,7vw,4rem)', fontWeight: 900, color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.1 }}>
            The <span style={{ color: 'var(--accent)' }}>Blog</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem,2.5vw,1.1rem)', color: 'var(--fg-2)', fontFamily: 'monospace', maxWidth: '38rem', margin: '0 auto' }}>
            Thoughts on AI, entrepreneurship, and making impact.
          </p>
        </div>
      </section>

      {/* ── SEARCH & FILTERS ── */}
      <section style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: 'clamp(1.5rem,4vw,2.5rem) 0' }}>
        <div className="container">
          <input
            type="text"
            placeholder="Search posts…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '1.2rem',
              padding: '0.85rem 1rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-card)',
              color: 'var(--fg)',
              fontFamily: 'monospace',
              fontSize: '0.95rem',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--cyan)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
          />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${selectedCategory === cat ? 'var(--cyan)' : 'var(--border)'}`,
                  background: selectedCategory === cat ? 'var(--cyan)' : 'var(--bg-card)',
                  color: selectedCategory === cat ? 'var(--bg)' : 'var(--fg-2)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG GRID ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,8vw,5rem) 0' }}>
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--fg-muted)', fontFamily: 'monospace' }}>
              No posts found for "{searchTerm}" in {selectedCategory === 'all' ? 'all categories' : selectedCategory}.
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.id}`}
                  style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--cyan)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ background: 'var(--bg-3)', height: '10rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                    {post.image}
                  </div>
                  <div style={{ padding: '1.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{post.category}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', fontFamily: 'monospace' }}>{post.readTime}</span>
                    </div>
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '0.6rem', lineHeight: 1.3, transition: 'color 0.2s' }}>
                      {post.title}
                    </h3>
                    <p style={{ color: 'var(--fg-muted)', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '1rem' }}>{post.excerpt}</p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', fontFamily: 'monospace' }}>{post.date}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── NEWSLETTER CTA ── */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center' }}>
        <span className="section-label">📬 Newsletter</span>
        <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.4rem)', fontWeight: 900, color: 'var(--fg)', margin: '1rem 0 0.75rem' }}>
          Subscribe to stay updated
        </h2>
        <p style={{ color: 'var(--fg-2)', fontFamily: 'monospace', fontSize: '0.95rem', marginBottom: '2rem', maxWidth: '30rem', margin: '0 auto 2rem' }}>
          New articles on AI, manufacturing, and entrepreneurship — delivered to your inbox.
        </p>

        {subscribed ? (
          <div style={{ display: 'inline-block', padding: '1rem 2rem', background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, fontFamily: 'monospace', borderRadius: 'var(--radius-sm)' }}>
            ✓ You're subscribed! Watch your inbox.
          </div>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); if (email) setSubscribed(true); }}
            style={{ display: 'flex', gap: '0.75rem', maxWidth: '28rem', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{
                flex: '1 1 200px',
                padding: '0.85rem 1rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                color: 'var(--fg)',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'var(--cyan)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
            />
            <button
              type="submit"
              style={{
                padding: '0.85rem 1.8rem',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Subscribe →
            </button>
          </form>
        )}
      </section>
    </>
  );
}

