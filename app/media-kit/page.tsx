import type { Metadata } from 'next';
import MediaKitClient from './MediaKitClient';

export const metadata: Metadata = {
  title: 'Media Kit',
  description:
    'Press resources for Srijan Tiwari — speaker bios, headshots, logos, key facts, and contact information for media and event organisers.',
};

export default function MediaKitPage() {
  return <MediaKitClient />;
}
