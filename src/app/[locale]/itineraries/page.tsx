import { Metadata } from 'next';
import ItinerariesPage from './ItinerariesPage';

export const metadata: Metadata = {
  title: 'Sri Lanka Tour Itineraries & Vacation Packages | AIPA Travels',
  description: 'Browse our curated Sri Lanka tour itineraries. From 5-day wildlife safaris to 14-day grand island adventures, find the perfect holiday package for your needs.',
  alternates: {
    canonical: 'https://aipatravels.com/en/itineraries',
    languages: {
      'en-US': 'https://aipatravels.com/en/itineraries',
      'fr-FR': 'https://aipatravels.com/fr/itineraries',
      'it-IT': 'https://aipatravels.com/it/itineraries',
      'kr-KR': 'https://aipatravels.com/kr/itineraries',
    },
  },
};

export default function Page() {
  return <ItinerariesPage />;
}