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
      <section className="bg-off-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">Online Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
              <div
                key={idx}
                className="border border-light-gray rounded-lg overflow-hidden hover:shadow-lg hover:border-teal transition"
              >
                <div className="bg-off-white h-32 flex items-center justify-center text-5xl">{course.image}</div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-navy mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-4 pb-4 border-b border-light-gray">
                    <span>{course.level}</span>
                    <span>{course.duration}</span>
                    <span>{course.enrolled.toLocaleString()} enrolled</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-teal">{course.price}</div>
                    <a
                      href="/contact"
                      className="bg-teal text-white px-6 py-2 rounded-lg font-semibold hover:bg-navy transition"
                    >
                      Enroll
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-off-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16 text-navy">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-light-gray rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-6 flex justify-between items-center bg-white hover:bg-off-white transition text-left"
                >
                  <h3 className="font-bold text-navy text-lg">{faq.question}</h3>
                  <span className="text-2xl text-teal">{expandedFaq === idx ? '−' : '+'}</span>
                </button>

                {expandedFaq === idx && (
                  <div className="p-6 bg-off-white border-t border-light-gray text-gray-700">
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
        <h2 className="text-4xl font-bold mb-6">Ready to level up?</h2>
        <a
          href="/"
          className="inline-block bg-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-off-white hover:text-navy transition"
        >
          Browse All Courses
        </a>
      </section>
    </>
  );
}
