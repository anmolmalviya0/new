import type { Metadata } from 'next';
import SpeakingClient from './SpeakingClient';

export const metadata: Metadata = {
  title: 'Keynote Speaking',
  description:
    'Book Srijan Tiwari for keynotes, workshops, and panels on AI, manufacturing, and innovation. 50+ events across 12 countries.',
};

export default function SpeakingPage() {
  return <SpeakingClient />;
}
