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
      <section className="bg-off-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">Blog</h1>
          <p className="text-xl text-gray-600">Thoughts on AI, entrepreneurship, and making impact.</p>
        </div>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="py-12 bg-white border-b border-light-gray">
        <div className="max-w-7xl mx-auto px-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-8 px-4 py-3 border border-light-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-teal"
          />

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-teal text-white'
                    : 'bg-off-white text-gray-700 hover:bg-light-gray'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.id}`}
                className="group rounded-lg border border-light-gray overflow-hidden hover:shadow-lg hover:border-teal transition"
              >
                <div className="bg-off-white h-48 flex items-center justify-center text-6xl group-hover:bg-light-gray transition">
                  {post.image}
                </div>
                <div className="p-6">
                  <div className="text-sm font-semibold text-teal mb-2">{post.category}</div>
                  <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-teal transition">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <p className="text-xs text-gray-500">{post.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

