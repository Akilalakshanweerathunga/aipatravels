import { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'AIPA Travels | Authentic Sri Lanka Tours & Tailor-Made Journeys',
  description: 'Experience the soul of Sri Lanka with AIPA Travels. From private wildlife safaris to cultural heritage tours, we craft personalized itineraries for an unforgettable island escape.',
  alternates: {
    canonical: 'https://aipatravels.com/en',
  },
  openGraph: {
    title: 'AIPA Travels - Your Gateway to Sri Lanka',
    description: 'Expertly crafted tours exploring the hidden gems of Sri Lanka.',
    images: ['/images/home/og-banner.jpg'],
    type: 'website',
  },
};

export default function Page() {
  return <HomePageClient />;
}