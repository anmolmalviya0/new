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

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', inquiryType: 'speaking' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0E27] text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-[#AAAAAA] font-mono">Let's collaborate and create something amazing together.</p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* FORM */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Send me a message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-teal text-white rounded-lg">
                  ✓ Message sent! I'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <option value="speaking">Speaking Engagement</option>
                    <option value="course">Course Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-navy mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-navy text-white py-3 rounded-lg font-semibold hover:bg-teal transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* CONTACT INFO */}
            <div>
              <h2 className="text-3xl font-bold text-navy mb-8">Other ways to reach out</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-teal mb-2">Email</h3>
                  <p className="text-gray-600">hello@srijanspeaks.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-teal mb-2">Twitter/X</h3>
                  <p className="text-gray-600">@srijankumarspeaks</p>
                </div>

                <div>
                  <h3 className="font-semibold text-teal mb-2">LinkedIn</h3>
                  <p className="text-gray-600">linkedin.com/in/srijankumar</p>
                </div>

                <div>
                  <h3 className="font-semibold text-teal mb-2">Response Time</h3>
                  <p className="text-gray-600">Usually within 48 hours</p>
                </div>

                <div className="mt-12 p-6 bg-off-white rounded-lg">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Whether you're interested in booking me for a speaking engagement, taking one of my courses, or exploring potential collaborations, I'm always excited to connect with people doing interesting work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
