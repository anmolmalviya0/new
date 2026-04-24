import type { Metadata } from 'next';
import CoursesClient from './CoursesClient';

export const metadata: Metadata = {
  title: 'Online Courses',
  description:
    'Learn AI, machine learning, NDT, and startup fundamentals from Srijan Tiwari. 5,000+ engineers trained. Certificates included.',
};

export default function CoursesPage() {
  return <CoursesClient />;
}
