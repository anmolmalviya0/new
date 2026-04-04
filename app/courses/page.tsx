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
            Learn from my experience. From AI to startup skills, master the tools that matter.
          </p>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">5000+</div>
            <p className="text-gray-300">Engineers Trained</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">4.8★</div>
            <p className="text-gray-300">Average Rating</p>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">100%</div>
            <p className="text-gray-300">Satisfaction Guarantee</p>
          </div>
        </div>
      </section>

      {/* COURSES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course, idx) => (
              <div key={idx} className="rounded-lg border border-light-gray overflow-hidden hover:shadow-lg hover:border-teal transition group">
                <div className="bg-off-white h-32 flex items-center justify-center text-5xl group-hover:bg-light-gray transition">
                  {course.image}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-navy mb-3 group-hover:text-teal transition">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    <span>📚 {course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-teal">{course.price}</span>
                    <span className="text-xs text-gray-500">{course.enrolled} enrolled</span>
                  </div>
                  <button className="w-full mt-4 bg-navy text-white py-3 rounded-lg font-semibold hover:bg-teal transition">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-navy mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-light-gray rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex justify-between items-center bg-white hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-navy text-left">{faq.question}</span>
                  <span className="text-teal text-xl">{expandedFaq === idx ? '−' : '+'}</span>
                </button>
                {expandedFaq === idx && (
                  <div className="p-6 bg-white border-t border-light-gray text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to learn?</h2>
        <p className="text-xl mb-8 text-gray-300">Start with a course today. Certificates upon completion.</p>
        <button className="bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-off-white hover:text-navy transition">
          Browse All Courses
        </button>
      </section>
    </>
  );
}
