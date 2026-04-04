'use client';

import { useState } from 'react';

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of AI in NDT',
      excerpt: 'How machine learning is revolutionizing non-destructive testing.',
      date: 'Mar 15, 2024',
      category: 'AI & ML',
      image: '🤖',
    },
    {
      id: 2,
      title: 'Building Your First Startup',
      excerpt: 'Lessons from founding TIQ World and scaling to 50+ clients.',
      date: 'Mar 8, 2024',
      category: 'Entrepreneurship',
      image: '🚀',
    },
    {
      id: 3,
      title: 'Speaking at Tech Conferences',
      excerpt: 'Tips for crafting memorable keynotes and engaging audiences.',
      date: 'Feb 28, 2024',
      category: 'Speaking',
      image: '🎤',
    },
  ];

  const categories = ['all', 'AI & ML', 'Entrepreneurship', 'Speaking', 'Research'];

  return (
    <>
      {/* HERO */}
      <section className="bg-[#0A0E27] text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-[#AAAAAA] font-mono">Thoughts on AI, entrepreneurship, and making impact.</p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="py-12 bg-[#121829] border-b border-[#1F2937]">
        <div className="max-w-7xl mx-auto px-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-8 px-4 py-3 border border-[#1F2937] bg-[#0A0E27] text-[#FFFFFF] placeholder-[#AAAAAA] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00D9FF]"
          />

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#00D9FF] text-[#0A0E27]'
                    : 'bg-[#121829] text-[#AAAAAA] border border-[#1F2937] hover:border-[#00D9FF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="group border border-[#1F2937]overflow-hidden hover:border-[#00D9FF] transition"
              >
                <div className="bg-[#121829] h-48 flex items-center justify-center text-6xl group-hover:bg-[#1F2937] transition">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-[#FF6B35] mb-2">{post.category}</div>
                  <h3 className="text-xl font-bold text-[#FFFFFF] mb-3 group-hover:text-[#00D9FF] transition">{post.title}</h3>
                  <p className="text-[#AAAAAA] font-mono text-sm mb-4">{post.excerpt}</p>
                  <p className="text-xs text-[#777777]">{post.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Subscribe to my newsletter</h2>
        <p className="text-xl mb-8 text-gray-300">Get new articles delivered to your inbox.</p>
        <div className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-navy focus:outline-none focus:ring-2 focus:ring-teal"
          />
          <button className="bg-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-off-white hover:text-navy transition">
            Subscribe
          </button>
        </div>
      </section>
    </>
  );
}
