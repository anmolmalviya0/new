import type { Metadata } from 'next';
import BlogClient from './BlogClient';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Articles on AI, machine learning, non-destructive testing, entrepreneurship, and technical communication by Srijan Tiwari.',
};

export default function BlogPage() {
  return <BlogClient />;
}
