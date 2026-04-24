import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Srijan Tiwari',
  description:
    'IIT Madras researcher, TIQ World co-founder, and AI educator who has trained 5,000+ engineers across 50+ institutions worldwide.',
};

export default function AboutPage() {
  return <AboutClient />;
}
