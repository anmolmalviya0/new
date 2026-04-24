import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Srijan Tiwari for speaking engagements, training programmes, technical consulting, or research collaboration. 48-hour response guarantee.',
};

export default function ContactPage() {
  return <ContactClient />;
}
