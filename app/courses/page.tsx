'use client';

import { useState } from 'react';

// Courses page component with FAQ and course catalog - online learning platform
export default function CoursesPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const courses = [
    {
      title: 'AI for NDT Engineers',
      description: 'Master machine learning for non-destructive testing inspection.',
      price: '$299',
      duration: '12 weeks',
      level: 'Intermediate',
      enrolled: 1250,
      image: '🤖',
      color: 'var(--cyan)',
    },
    {
      title: 'Startup Fundamentals',
      description: 'From idea to first $100K revenue. Real lessons from TIQ World.',
      price: '$199',
      duration: '8 weeks',
      level: 'Beginner',
      enrolled: 850,
      image: '🚀',
      color: 'var(--accent)',
    },
    {
      title: 'Advanced Python for ML',
      description: 'Build production ML systems with best practices and optimization.',
      price: '$349',
      duration: '10 weeks',
      level: 'Advanced',
      enrolled: 620,
      image: '🐍',
      color: 'var(--cyan)',
    },
    {
      title: 'Technical Writing & Speaking',
      description: 'Communicate complex ideas clearly. For engineers and researchers.',
      price: '$149',
      duration: '6 weeks',
      level: 'Beginner',
      enrolled: 425,
      image: '✍️',
      color: 'var(--accent)',
    },
  ];

  const philosophy = [
    { icon: '🎯', title: 'Real-World First', desc: 'Every concept connected to actual industry problems and solutions', color: 'var(--cyan)' },
    { icon: '💡', title: 'Connect, Not Confuse', desc: 'Simplified explanations of complex topics with relatable examples', color: 'var(--accent)' },
    { icon: '🚀', title: 'Skill to Career', desc: 'Move from learning to applying—direct pathways to opportunity', color: 'var(--cyan)' },
  ];

  const faqs = [
    { question: 'Do I need prior experience?', answer: 'Each course specifies its level (Beginner/Intermediate/Advanced). Most courses are beginner-friendly. Prerequisites are listed in course descriptions.' },
    { question: 'What happens after course completion?', answer: 'You get a certificate of completion, lifetime access to course materials, and exclusive job board access for intermediate+ students.' },
    { question: 'Can I get a refund?', answer: "Yes! 7-day money-back guarantee if you're not satisfied. No questions asked." },
    { question: 'How long do I have access?', answer: 'Lifetime! All course materials, including future updates, are yours forever.' },
    { question: 'Is there any doubt support?', answer: 'Yes, via Discord community and email. I personally respond to questions within 24 hours.' },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ background: 'var(--bg)', paddingTop: 'clamp(5rem,12vw,8rem)', paddingBottom: 'clamp(3rem,8vw,5rem)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">📚 Learning Hub</span>
          <h1 style={{ fontSize: 'clamp(2.4rem,7vw,4rem)', fontWeight: 900, color: 'var(--fg)', margin: '1rem 0 1.2rem', lineHeight: 1.1 }}>
            Online <span style={{ color: 'var(--accent)' }}>Courses</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem,2.5vw,1.2rem)', color: 'var(--fg-2)', fontFamily: 'monospace', maxWidth: '38rem', margin: '0 auto' }}>
            Learn from practical experience. Built by an educator committed to your growth.
          </p>
        </div>
      </section>

      {/* ── TEACHING PHILOSOPHY ── */}
      <section style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--border)', padding: 'clamp(3rem,8vw,5rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {philosophy.map((p, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'var(--bg-card)', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: p.color, marginBottom: '0.6rem' }}>{p.title}</h3>
                <p style={{ color: 'var(--fg-muted)', fontFamily: 'monospace', fontSize: '0.88rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', padding: 'clamp(2.5rem,6vw,4rem) 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {[
              { val: '5000+', label: 'Engineers Trained', c: 'var(--cyan)' },
              { val: '4.8★', label: 'Average Rating', c: 'var(--accent)' },
              { val: '100%', label: 'Satisfaction Guarantee', c: 'var(--cyan)' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 'clamp(2.2rem,6vw,3.2rem)', fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.val}</div>
                <p style={{ color: 'var(--fg-muted)', fontFamily: 'monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: '0.5rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COURSES GRID ── */}
      <section id="courses" style={{ background: 'var(--bg)', padding: 'clamp(3rem,8vw,5rem) 0' }}>
        <div className="container">
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: 'var(--fg)', textAlign: 'center', marginBottom: '3rem' }}>
            Curated Learning Paths
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {courses.map((course, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = course.color;
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px color-mix(in srgb, ${course.color} 18%, transparent)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'none';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <div style={{ background: 'var(--bg-3)', height: '7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                  {course.image}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: course.color, marginBottom: '0.6rem' }}>{course.title}</h3>
                  <p style={{ color: 'var(--fg-muted)', fontFamily: 'monospace', fontSize: '0.88rem', marginBottom: '1rem', lineHeight: 1.6 }}>{course.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--fg-muted)', fontFamily: 'monospace', marginBottom: '1rem' }}>
                    <span>📚 {course.duration}</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{course.level}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 900, color: course.color }}>{course.price}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', fontFamily: 'monospace' }}>{course.enrolled.toLocaleString()} enrolled</span>
                  </div>
                  <button
                    style={{
                      width: '100%',
                      padding: '0.85rem',
                      background: course.color,
                      color: 'var(--bg)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Enroll Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: 'clamp(3rem,8vw,5rem) 0' }}>
        <div style={{ maxWidth: '52rem', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 800, color: 'var(--cyan)', textAlign: 'center', marginBottom: '2.5rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  background: 'var(--bg-card)',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.2rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    gap: '1rem',
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--fg)', fontSize: '0.97rem' }}>{faq.question}</span>
                  <span style={{ color: 'var(--cyan)', fontSize: '1.3rem', fontWeight: 700, flexShrink: 0 }}>{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '1rem 1.5rem 1.4rem', borderTop: '1px solid var(--border)', color: 'var(--fg-muted)', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: 'var(--brand)', padding: 'clamp(3rem,8vw,5rem) 1.5rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem,5vw,2.6rem)', fontWeight: 900, color: '#fff', marginBottom: '1rem' }}>Ready to level up?</h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace', fontSize: '1rem', marginBottom: '2rem', maxWidth: '36rem', margin: '0 auto 2rem' }}>
          Start your learning journey today. Certificates upon completion. Join 5000+ engineers.
        </p>
        <a
          href="#courses"
          style={{
            display: 'inline-block',
            background: 'var(--accent)',
            color: '#fff',
            padding: '0.9rem 2.5rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 800,
            fontSize: '1rem',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          → Browse All Courses
        </a>
      </section>
    </>
  );
}
