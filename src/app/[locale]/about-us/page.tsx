import { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About AIPA Travels | Our Story & Culture',
  description: 'Learn about AIPA Travels, our passion for Sri Lankan heritage, and our commitment to creating sustainable, authentic travel experiences.',
  openGraph: {
    title: 'About AIPA Travels',
    description: 'Discover the heart of Sri Lankan travel.',
    images: ['/images/about/team-hero.jpg'],
  },
};

export default function Page() {
  return <AboutClient />;
}