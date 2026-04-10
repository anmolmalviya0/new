'use client';

import { useState } from 'react';

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
    },
    {
      title: 'Startup Fundamentals',
      description: 'From idea to first $100K revenue. Real lessons from TIQ World.',
      price: '$199',
      duration: '8 weeks',
      level: 'Beginner',
      enrolled: 850,
      image: '🚀',
    },
    {
      title: 'Advanced Python for ML',
      description: 'Build production ML systems with best practices and optimization.',
      price: '$349',
      duration: '10 weeks',
      level: 'Advanced',
      enrolled: 620,
      image: '🐍',
    },
    {
      title: 'Technical Writing & Speaking',
      description: 'Communicate complex ideas clearly. For engineers and researchers.',
      price: '$149',
      duration: '6 weeks',
      level: 'Beginner',
      enrolled: 425,
      image: '✍️',
    },
  ];

  const faqs = [
    {
      question: 'Do I need prior experience?',
      answer: 'Each course specifies its level (Beginner/Intermediate/Advanced). Most courses are beginner-friendly. Prerequisites are listed in course descriptions.',
    },
    {
      question: 'What happens after course completion?',
      answer: 'You get a certificate of completion, lifetime access to course materials, and exclusive job board access for intermediate+ students.',
    },
    {
      question: 'Can I get a refund?',
      answer: 'Yes! 7-day money-back guarantee if you\'re not satisfied. No questions asked.',
    },
    {
      question: 'How long do I have access?',
      answer: 'Lifetime! All course materials, including future updates, are yours forever.',
    },
    {
      question: 'Is there any doubt support?',
      answer: 'Yes, via Discord community and email. I personally respond to questions within 24 hours.',
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0E27] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Online Courses</h1>
          <p className="text-xl text-[#AAAAAA] font-mono max-w-3xl mx-auto">
            Learn from practical experience. Built by an educator committed to your growth.
          </p>
        </div>
      </section>

      {/* TEACHING PHILOSOPHY */}
      <section className="bg-[#121829] border-t border-[#1F2937] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-[#00D9FF] mb-2">Real-World First</h3>
              <p className="text-[#AAAAAA] font-mono text-sm">Every concept connected to actual industry problems and solutions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-bold text-[#FF6B35] mb-2">Connect, Not Confuse</h3>
              <p className="text-[#AAAAAA] font-mono text-sm">Simplified explanations of complex topics with relatable examples</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-lg font-bold text-[#00D9FF] mb-2">Skill to Career</h3>
              <p className="text-[#AAAAAA] font-mono text-sm">Move from learning to applying—direct pathways to opportunity</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-[#0A0E27] text-white py-16 border-t border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold mb-2 text-[#00D9FF]">5000+</div>
            <p className="text-[#AAAAAA] font-mono uppercase tracking-widest text-sm">Engineers Trained</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2 text-[#FF6B35]">4.8★</div>
            <p className="text-[#AAAAAA] font-mono uppercase tracking-widest text-sm">Average Rating</p>
          </div>
          <div>
            <div className="text-5xl font-bold mb-2 text-[#00D9FF]">100%</div>
            <p className="text-[#AAAAAA] font-mono uppercase tracking-widest text-sm">Satisfaction Guarantee</p>
          </div>
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Curated Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, idx) => (
              <div key={idx} className="rounded-lg border border-[#1F2937] overflow-hidden hover:border-[#00D9FF] transition group bg-[#121829]">
                <div className="bg-[#1F2937] h-32 flex items-center justify-center text-6xl group-hover:bg-[#00D9FF]/10 transition">
                  {course.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#00D9FF] mb-3 group-hover:text-[#FF6B35] transition">{course.title}</h3>
                  <p className="text-[#AAAAAA] font-mono mb-4">{course.description}</p>
                  <div className="flex justify-between items-center mb-4 text-sm text-[#AAAAAA] font-mono">
                    <span>📚 {course.duration}</span>
                    <span className="text-[#FF6B35]">{course.level}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-[#00D9FF]">{course.price}</span>
                    <span className="text-xs text-[#AAAAAA] font-mono">{course.enrolled} enrolled</span>
                  </div>
                  <button className="w-full bg-[#00D9FF] text-[#0A0E27] py-3 rounded-lg font-semibold hover:bg-[#FF6B35] transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#121829] border-t border-[#1F2937]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#00D9FF] mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#1F2937] rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex justify-between items-center bg-[#0A0E27] hover:bg-[#1F2937] transition"
                >
                  <span className="font-semibold text-[#FFFFFF] text-left">{faq.question}</span>
                  <span className="text-[#00D9FF] text-xl">{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="p-6 bg-[#0A0E27] border-t border-[#1F2937] text-[#AAAAAA] font-mono">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A0E27] text-white py-20 text-center border-t border-[#1F2937]">
        <h2 className="text-4xl font-bold mb-6">Ready to learn?</h2>
        <p className="text-lg text-[#AAAAAA] font-mono mb-8 max-w-2xl mx-auto">
          Start your learning journey today. Certificates upon completion. Join 5000+ engineers.
        </p>
        <a
          href="#courses"
          className="inline-block bg-[#00D9FF] text-[#0A0E27] px-8 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-[#FF6B35] transition"
        >
          → Browse All Courses
        </a>
      </section>
    </>
  );
}
