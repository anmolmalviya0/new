'use client';

import { useState } from 'react';

// Contact page — enhanced with glass cards, response SLA chips, FAQ strip, and social proof
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', inquiryType: 'speaking' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'speaking' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setError('Something went wrong. Please try again or email directly.');
      }
    } catch {
      setError('Network error. Please try again or email directly.');
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 1rem',
    background: 'var(--glass-bg)', border: '1px solid var(--border)',
    borderRadius: 'var(--r-sm)', color: 'var(--fg)',
    fontFamily: 'var(--font-body, Plus Jakarta Sans, sans-serif)',
    fontSize: '0.95rem', outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box',
    backdropFilter: 'blur(8px)',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.72rem', fontWeight: 700,
    color: 'var(--fg-muted)', textTransform: 'uppercase',
    letterSpacing: '0.12em', marginBottom: '0.5rem',
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--cyan)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0,217,255,0.08)';
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.boxShadow = 'none';
  };

  const inquiryTypes = [
    { value: 'speaking',    label: '🎤 Speaking Engagement' },
    { value: 'course',      label: '📚 Course / Training' },
    { value: 'consulting',  label: '⚙️ Technical Consulting' },
    { value: 'partnership', label: '🤝 Partnership / Collaboration' },
    { value: 'other',       label: '💬 Other' },
  ];

  const slaCards = [
    { icon: '⚡', label: 'Speaking Inquiries', sla: '24–48 hrs', color: 'var(--cyan)' },
    { icon: '🎓', label: 'Course Questions',    sla: '48 hrs',    color: 'var(--accent)' },
    { icon: '🔬', label: 'Consulting',          sla: '48–72 hrs', color: 'var(--purple)' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        background: 'radial-gradient(ellipse 120% 70% at 50% -10%, #0d1d45 0%, #050a18 65%)',
        paddingTop: 'clamp(5rem, 12vw, 8rem)', paddingBottom: 'clamp(3rem, 8vw, 5rem)',
        borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,94,26,0.1) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Let&apos;s Talk</span>
          <h1 style={{ color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.05 }}>
            Get in <span className="gradient-text-accent">Touch</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', color: 'var(--fg-2)', maxWidth: '42rem', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Speaking inquiry, course question, or research collaboration? Every message is read personally. I respond within 48 hours.
          </p>
          {/* Response SLA chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
            {slaCards.map(s => (
              <div key={s.label} className="stat-pill" style={{ color: s.color, borderColor: `${s.color}30`, background: `${s.color}08` }}>
                <span>{s.icon}</span>
                <span style={{ fontWeight: 600 }}>{s.label}</span>
                <span style={{ color: 'var(--fg-muted)', fontSize: '0.72rem' }}>→ {s.sla}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1100px', margin: '0 auto' }}>

            {/* ── LEFT: FORM ── */}
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '2rem', letterSpacing: '-0.02em' }}>Send a Message</h2>

              {submitted && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.3)', borderRadius: 'var(--r-sm)', color: 'var(--cyan)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.92rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  Message sent! I&apos;ll reply within 48 hours.
                </div>
              )}
              {error && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(255,94,26,0.1)', border: '1px solid rgba(255,94,26,0.3)', borderRadius: 'var(--r-sm)', color: 'var(--accent)', fontWeight: 600, fontSize: '0.92rem' }}>
                  ✗ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="Your name" style={fieldStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="your@email.com" style={fieldStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} style={{ ...fieldStyle, appearance: 'none', cursor: 'pointer' }}>
                    {inquiryTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required placeholder="What's this about?" style={fieldStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} onFocus={onFocus} onBlur={onBlur} required rows={6} placeholder="Tell me more about what you're looking for..." style={{ ...fieldStyle, resize: 'vertical', minHeight: '140px' }} />
                </div>

                <button
                  type="submit" disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', fontSize: '0.92rem' }}
                >
                  {loading ? '⏳ Sending…' : '✦ Send Message'}
                </button>
              </form>
            </div>

            {/* ── RIGHT: CONTACT INFO ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Other Ways to Connect</h2>

              {/* Email */}
              <div className="card" style={{ padding: '1.25rem 1.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
              >
                <p style={{ fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>
                  Email
                </p>
                <a href="mailto:hello@srijanspeaks.com" style={{ color: 'var(--fg-2)', fontSize: '0.95rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}
                >
                  hello@srijanspeaks.com
                </a>
              </div>

              {/* LinkedIn */}
              <div className="card" style={{ padding: '1.25rem 1.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,217,255,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
              >
                <p style={{ fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.5rem' }}>LinkedIn</p>
                <a href="https://linkedin.com/in/srijantiwari" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--fg-2)', fontSize: '0.95rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}
                >
                  linkedin.com/in/srijantiwari
                </a>
              </div>

              {/* YouTube */}
              <div className="card" style={{ padding: '1.25rem 1.5rem' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,94,26,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--glass-border)')}
              >
                <p style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.5rem' }}>YouTube</p>
                <a href="https://www.youtube.com/@srijanspeaks" target="_blank" rel="noopener noreferrer"
                  style={{ color: 'var(--fg-2)', fontSize: '0.95rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}
                >
                  youtube.com/@srijanspeaks
                </a>
              </div>

              {/* Best For */}
              <div className="card" style={{ padding: '1.5rem' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1rem' }}>Best for</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { icon: '🎤', text: 'Keynotes, workshops & panel invitations', c: 'var(--cyan)' },
                    { icon: '🏢', text: 'Corporate training programs (10+ engineers)', c: 'var(--cyan)' },
                    { icon: '⚙️', text: 'AI / NDE consulting engagements', c: 'var(--cyan)' },
                    { icon: '🔬', text: 'Research collaborations & institutional partnerships', c: 'var(--accent)' },
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '0.1rem' }}>{item.icon}</span>
                      <span style={{ color: 'var(--fg-2)', fontSize: '0.88rem', lineHeight: 1.55 }}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Proof Snippet */}
              <div style={{ padding: '1.25rem 1.5rem', background: 'linear-gradient(135deg, rgba(0,217,255,0.06) 0%, rgba(139,92,246,0.04) 100%)', border: '1px solid rgba(0,217,255,0.15)', borderRadius: 'var(--r-md)', backdropFilter: 'blur(12px)' }}>
                <p style={{ fontSize: '0.82rem', color: 'var(--fg-2)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                  &ldquo;Working with Srijan was seamless from first email to final keynote. He understood our audience and delivered exactly what we needed.&rdquo;
                </p>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Event Organiser · NDE India 2023</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
