'use client';

import { useState } from 'react';

// Courses page — enhanced with testimonials, comparison table, and richer cards
export default function CoursesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const courses = [
    {
      title: 'AI for NDT Engineers',
      description: 'Master machine learning for non-destructive testing inspection. Covers CNNs, signal processing, and deployment.',
      price: '$299',
      originalPrice: '$499',
      duration: '12 weeks',
      level: 'Intermediate',
      enrolled: 1250,
      image: '🤖',
      color: 'var(--cyan)',
      badge: 'Most Popular',
      highlights: ['CNNs for defect detection', 'Signal processing basics', 'Deploy on edge devices', 'Certificate included'],
    },
    {
      title: 'Startup Fundamentals',
      description: 'From idea to first $100K revenue. Real lessons from TIQ World — zero fluff, pure playbook.',
      price: '$199',
      originalPrice: '$349',
      duration: '8 weeks',
      level: 'Beginner',
      enrolled: 850,
      image: '🚀',
      color: 'var(--accent)',
      badge: 'Bestseller',
      highlights: ['Ideation to MVP', 'Funding strategies', 'B2B sales basics', 'Founder community'],
    },
    {
      title: 'Advanced Python for ML',
      description: 'Build production ML systems with best practices, optimization techniques, and deployment patterns.',
      price: '$349',
      originalPrice: '$599',
      duration: '10 weeks',
      level: 'Advanced',
      enrolled: 620,
      image: '🐍',
      color: 'var(--cyan)',
      badge: null,
      highlights: ['PyTorch deep dive', 'MLOps fundamentals', 'Model optimization', 'Production deployment'],
    },
    {
      title: 'Technical Writing & Speaking',
      description: 'Communicate complex ideas clearly. For engineers and researchers who want to amplify their impact.',
      price: '$149',
      originalPrice: '$249',
      duration: '6 weeks',
      level: 'Beginner',
      enrolled: 425,
      image: '✍️',
      color: 'var(--accent)',
      badge: null,
      highlights: ['Paper writing', 'Keynote frameworks', 'LinkedIn storytelling', 'Slide design'],
    },
  ];

  const philosophy = [
    { icon: '🎯', title: 'Real-World First', desc: 'Every concept connected to actual industry problems and solutions', color: 'var(--cyan)' },
    { icon: '💡', title: 'Connect, Not Confuse', desc: 'Simplified explanations of complex topics with relatable examples', color: 'var(--accent)' },
    { icon: '🚀', title: 'Skill to Career', desc: 'Move from learning to applying — direct pathways to opportunity', color: 'var(--cyan)' },
  ];

  const testimonials = [
    { quote: 'The AI for NDT course changed how I approach inspection problems. Srijan&apos;s industry examples made every concept stick.', name: 'Ravi Kumar', role: 'NDT Engineer · BHEL', color: 'var(--cyan)' },
    { quote: 'Startup Fundamentals gave me the confidence to pitch investors. Raised a pre-seed round within 3 months of finishing the course.', name: 'Priya Nair', role: 'Founder · ScanBot AI', color: 'var(--accent)' },
    { quote: 'Best ML course I&apos;ve taken. Production-focused, no toy examples. I shipped my first model to production in week 6.', name: 'Arjun Mehta', role: 'ML Engineer · Tata Steel', color: 'var(--cyan)' },
  ];

  const faqs = [
    { question: 'Do I need prior experience?', answer: 'Each course specifies its level (Beginner/Intermediate/Advanced). Most courses are beginner-friendly. Prerequisites are listed in course descriptions.' },
    { question: 'What happens after course completion?', answer: 'You get a certificate of completion, lifetime access to course materials, and exclusive job board access for intermediate+ students.' },
    { question: 'Can I get a refund?', answer: "Yes! 7-day money-back guarantee if you're not satisfied. No questions asked." },
    { question: 'How long do I have access?', answer: 'Lifetime! All course materials, including future updates, are yours forever.' },
    { question: 'Is there doubt support?', answer: 'Yes, via Discord community and email. I personally respond to questions within 24 hours.' },
    { question: 'Are group / corporate discounts available?', answer: 'Yes. Teams of 5+ get 20% off; 20+ get 35% off. Email hello@srijanspeaks.com with your team size.' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{
        background: 'radial-gradient(ellipse 120% 70% at 50% -10%, #0d1d45 0%, #050a18 65%)',
        paddingTop: 'clamp(5rem, 12vw, 8rem)',
        paddingBottom: 'clamp(3rem, 8vw, 5rem)',
        borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <span className="section-label" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Learning Hub</span>
          <h1 style={{ color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.05 }}>
            Online Courses
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', color: 'var(--fg-2)', maxWidth: '42rem', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Learn from real engineering experience. Every course is built around problems I&apos;ve actually solved — no theory for theory&apos;s sake.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#courses" className="btn btn-primary">Browse Courses ↓</a>
            <a href="/contact" className="btn btn-outline">Corporate Training →</a>
          </div>
        </div>
      </section>

      {/* ── TEACHING PHILOSOPHY ── */}
      <section style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '0.75rem' }}>Philosophy</span>
            <h2 style={{ color: 'var(--fg)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>How I Teach</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {philosophy.map((p, i) => (
              <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: p.color, marginBottom: '0.6rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.88rem', lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem, 6vw, 4rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { val: '5000+', label: 'Engineers Trained', c: 'var(--cyan)' },
              { val: '4.8★',  label: 'Average Rating',    c: 'var(--accent)' },
              { val: '100%',  label: 'Money-Back Guarantee', c: 'var(--cyan)' },
              { val: '24h',   label: 'Doubt Response SLA', c: 'var(--purple)' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(2.2rem, 6vw, 3.2rem)', fontWeight: 900, color: s.c, lineHeight: 1, fontFamily: 'var(--font-display)' }}>{s.val}</div>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.5rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section id="courses" style={{ background: 'var(--bg)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Catalog</span>
            <h2 style={{ color: 'var(--fg)' }}>Curated Learning Paths</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="card"
                style={{ overflow: 'hidden', position: 'relative' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = course.color;
                  el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${course.color}18`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.boxShadow = '';
                }}
              >
                {/* Badge */}
                {course.badge && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 2, fontSize: '0.65rem', fontWeight: 800, color: '#fff', background: course.color === 'var(--cyan)' ? 'var(--cyan)' : 'var(--accent)', borderRadius: 'var(--r-full)', padding: '0.25rem 0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: `0 4px 12px ${course.color}60` }}>
                    {course.badge}
                  </div>
                )}

                {/* Header */}
                <div style={{ background: 'var(--bg-3)', height: '7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', borderBottom: `2px solid ${course.color}40` }}>
                  {course.image}
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: course.color, lineHeight: 1.2 }}>{course.title}</h3>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent)', background: 'var(--accent-deep)', border: '1px solid rgba(255,94,26,0.2)', borderRadius: 'var(--r-full)', padding: '0.2rem 0.6rem' }}>{course.level}</span>
                  </div>
                  <p style={{ color: 'var(--fg-muted)', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.6 }}>{course.description}</p>

                  {/* Highlights */}
                  <ul style={{ listStyle: 'none', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {course.highlights.map((h, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--fg-2)' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={course.color} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono, monospace)', marginBottom: '1rem' }}>
                    <span>📚 {course.duration}</span>
                    <span>{course.enrolled.toLocaleString()} enrolled</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 900, color: course.color, fontFamily: 'var(--font-display)' }}>{course.price}</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', textDecoration: 'line-through' }}>{course.originalPrice}</span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4ade80', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 'var(--r-full)', padding: '0.15rem 0.5rem' }}>Sale</span>
                  </div>

                  <button
                    style={{
                      width: '100%', padding: '0.9rem',
                      background: `linear-gradient(135deg, ${course.color}, ${course.color === 'var(--cyan)' ? '#0090cc' : '#e84800'})`,
                      color: course.color === 'var(--cyan)' ? 'var(--bg)' : '#fff',
                      border: 'none', borderRadius: 'var(--r-sm)',
                      fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                      transition: 'opacity 0.2s, transform 0.2s',
                      letterSpacing: '0.04em',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
                  >
                    Enroll Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT TESTIMONIALS ── */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>Testimonials</span>
            <h2 style={{ color: 'var(--fg)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>What Students Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} className="card" style={{ padding: 'clamp(1.5rem,3vw,2rem)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-8px', left: '1.25rem', fontSize: '4rem', lineHeight: 1, fontFamily: 'Georgia, serif', color: t.color, opacity: 0.15, fontWeight: 900 }}>&#8220;</div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '1rem' }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="var(--accent)"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--fg-2)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: '1.25rem' }}>&ldquo;{t.quote}&rdquo;</p>
                <div style={{ width: '30px', height: '2px', background: `linear-gradient(90deg, ${t.color}, transparent)`, borderRadius: '999px', marginBottom: '0.75rem' }} />
                <p style={{ fontWeight: 700, color: t.color, fontSize: '0.9rem', marginBottom: '0.2rem' }}>{t.name}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 0' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1rem' }}>FAQ</span>
            <h2 style={{ color: 'var(--fg)', fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} className="card" style={{ overflow: 'hidden', borderRadius: 'var(--r-md)' }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{ width: '100%', padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '0.97rem' }}>{faq.question}</span>
                  <span style={{ color: 'var(--cyan)', fontSize: '1.3rem', fontWeight: 700, flexShrink: 0, transition: 'transform 0.2s', transform: expandedFaq === idx ? 'rotate(45deg)' : 'none' }}>+</span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '0.75rem 1.5rem 1.4rem', borderTop: '1px solid var(--border)', color: 'var(--fg-muted)', fontSize: '0.9rem', lineHeight: 1.75, animation: 'fadeIn 0.2s ease both' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'linear-gradient(135deg, #050a18 0%, #0a0f25 50%, #050a18 100%)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem, 8vw, 5rem) 1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '560px', margin: '0 auto' }}>
          <span className="section-label" style={{ display: 'inline-flex', marginBottom: '1.25rem' }}>Start Learning</span>
          <h2 style={{ color: 'var(--fg)', marginBottom: '1rem' }}>Ready to level up?</h2>
          <p style={{ color: 'var(--fg-2)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.75 }}>
            Join 5000+ engineers. Certificates upon completion. 7-day money-back guarantee.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#courses" className="btn btn-primary">✦ Browse All Courses</a>
            <a href="/contact" className="btn btn-ghost">Corporate Training →</a>
          </div>
        </div>
      </section>
    </>
  );
}
