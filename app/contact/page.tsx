'use client';

import { useState } from 'react';

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

  const inputClass =
    'w-full px-4 py-3 bg-[#121829] border border-[#1F2937] text-[#FFFFFF] font-mono focus:outline-none focus:border-[#00D9FF] transition placeholder-[#555555]';
  const labelClass = 'block text-xs font-bold text-[#AAAAAA] uppercase tracking-widest mb-2';

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0E27] text-white py-16 md:py-24 border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[#00D9FF] uppercase tracking-widest text-xs mb-4">— Let's Talk —</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-lg text-[#AAAAAA] font-mono max-w-2xl mx-auto">
            Speaking inquiry, course question, or collaboration? I respond within 48 hours.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* LEFT — FORM */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest">
                Send a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-[#00D9FF] text-[#0A0E27] font-bold font-mono">
                  ✓ Message sent. I'll reply within 48 hours.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-[#FF6B35] text-white font-bold font-mono">
                  ✗ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="speaking">Speaking Engagement</option>
                    <option value="course">Course / Training</option>
                    <option value="consulting">Technical Consulting</option>
                    <option value="partnership">Partnership / Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me more about what you're looking for..."
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#FF6B35] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#FF8A5B] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '⏳ Sending...' : '→ Send Message'}
                </button>
              </form>
            </div>

            {/* RIGHT — CONTACT INFO */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-widest">
                Other Ways to Connect
              </h2>

              <div className="space-y-6">
                <div className="p-6 bg-[#121829] border border-[#1F2937] hover:border-[#00D9FF] transition">
                  <p className="text-xs text-[#00D9FF] uppercase tracking-widest mb-2">Email</p>
                  <a
                    href="mailto:hello@srijanspeaks.com"
                    className="text-[#AAAAAA] font-mono hover:text-[#00D9FF] transition"
                  >
                    hello@srijanspeaks.com
                  </a>
                </div>

                <div className="p-6 bg-[#121829] border border-[#1F2937] hover:border-[#00D9FF] transition">
                  <p className="text-xs text-[#00D9FF] uppercase tracking-widest mb-2">LinkedIn</p>
                  <a
                    href="https://linkedin.com/in/srijantiwari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AAAAAA] font-mono hover:text-[#00D9FF] transition"
                  >
                    linkedin.com/in/srijantiwari
                  </a>
                </div>

                <div className="p-6 bg-[#121829] border border-[#1F2937] hover:border-[#FF6B35] transition">
                  <p className="text-xs text-[#FF6B35] uppercase tracking-widest mb-2">Response Time</p>
                  <p className="text-[#AAAAAA] font-mono">Typically within 24–48 hours</p>
                </div>

                <div className="p-6 bg-[#121829] border border-[#1F2937]">
                  <p className="text-xs text-[#AAAAAA] uppercase tracking-widest mb-4">Best for</p>
                  <ul className="space-y-3 font-mono text-sm text-[#AAAAAA]">
                    <li className="flex gap-3 items-start">
                      <span className="text-[#00D9FF]">✓</span>
                      <span>Keynotes, workshops, and panel invitations</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-[#00D9FF]">✓</span>
                      <span>Corporate training programs (10+ engineers)</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-[#00D9FF]">✓</span>
                      <span>AI/NDE consulting engagements</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <span className="text-[#FF6B35]">→</span>
                      <span>Research collaborations & institutional partnerships</span>
                    </li>
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
