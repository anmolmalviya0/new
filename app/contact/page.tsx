'use client';

import { useState } from 'react';

// Contact form component with social links and response commitment
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'speaking',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
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
    width: '100%',
    padding: '0.85rem 1rem',
    background: 'var(--bg-3)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--fg)',
    fontFamily: 'monospace',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.72rem',
    fontWeight: 700,
    color: 'var(--fg-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    marginBottom: '0.5rem',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--cyan)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--border)';
  };

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--bg)', paddingTop: 'clamp(5rem,12vw,8rem)', paddingBottom: 'clamp(3rem,8vw,5rem)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">— Let's Talk —</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,7vw,4rem)', fontWeight: 900, color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.1 }}>
            Get in <span style={{ color: 'var(--accent)' }}>Touch</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem,2.5vw,1.1rem)', color: 'var(--fg-2)', fontFamily: 'monospace', maxWidth: '38rem', margin: '0 auto' }}>
            Speaking inquiry, course question, or collaboration? I respond within 48 hours.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section style={{ background: 'var(--bg)', padding: 'clamp(3rem,8vw,5rem) 0' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>

            {/* ── LEFT: FORM ── */}
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Send a Message
              </h2>

              {submitted && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem 1.2rem', background: 'var(--cyan)', color: 'var(--bg)', fontWeight: 700, fontFamily: 'monospace', borderRadius: 'var(--radius-sm)' }}>
                  ✓ Message sent! I'll reply within 48 hours.
                </div>
              )}

              {error && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem 1.2rem', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontFamily: 'monospace', borderRadius: 'var(--radius-sm)' }}>
                  ✗ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required placeholder="Your name" style={fieldStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required placeholder="your@email.com" style={fieldStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} style={fieldStyle}>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="course">Course / Training</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="partnership">Partnership / Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Subject *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} required placeholder="What's this about?" style={fieldStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    rows={6}
                    placeholder="Tell me more about what you're looking for..."
                    style={{ ...fieldStyle, resize: 'vertical', minHeight: '140px' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: loading ? 'var(--fg-muted)' : 'var(--accent)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => !loading && (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {loading ? '⏳ Sending…' : '→ Send Message'}
                </button>
              </form>
            </div>

            {/* ── RIGHT: CONTACT INFO ── */}
            <div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Other Ways to Connect
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Email */}
                <div style={{ padding: '1.2rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <p style={{ fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.4rem' }}>Email</p>
                  <a href="mailto:hello@srijanspeaks.com" style={{ color: 'var(--fg-2)', fontFamily: 'monospace', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}
                  >
                    hello@srijanspeaks.com
                  </a>
                </div>

                {/* LinkedIn */}
                <div style={{ padding: '1.2rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--cyan)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <p style={{ fontSize: '0.7rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.4rem' }}>LinkedIn</p>
                  <a href="https://linkedin.com/in/srijantiwari" target="_blank" rel="noopener noreferrer"
                    style={{ color: 'var(--fg-2)', fontFamily: 'monospace', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--cyan)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--fg-2)')}
                  >
                    linkedin.com/in/srijantiwari
                  </a>
                </div>

                {/* Response Time */}
                <div style={{ padding: '1.2rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '0.4rem' }}>Response Time</p>
                  <p style={{ color: 'var(--fg-2)', fontFamily: 'monospace' }}>Typically within 24–48 hours</p>
                </div>

                {/* Best For */}
                <div style={{ padding: '1.2rem 1.5rem', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)' }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '1rem' }}>Best for</p>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', listStyle: 'none', padding: 0, margin: 0 }}>
                    {[
                      { icon: '✓', text: 'Keynotes, workshops, and panel invitations', c: 'var(--cyan)' },
                      { icon: '✓', text: 'Corporate training programs (10+ engineers)', c: 'var(--cyan)' },
                      { icon: '✓', text: 'AI/NDE consulting engagements', c: 'var(--cyan)' },
                      { icon: '→', text: 'Research collaborations & institutional partnerships', c: 'var(--accent)' },
                    ].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <span style={{ color: item.c, fontWeight: 700, flexShrink: 0 }}>{item.icon}</span>
                        <span style={{ color: 'var(--fg-2)', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.5 }}>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
