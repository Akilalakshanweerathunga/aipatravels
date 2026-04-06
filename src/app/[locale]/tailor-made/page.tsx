import { Metadata } from 'next';
import TailorMadeClient from './TailorMadeClient';

export const metadata: Metadata = {
  title: 'Custom Sri Lanka Tour Planner | Tailor-Made Itineraries',
  description: 'Design your dream Sri Lanka vacation with AIPA Travels. Tell us your interests, budget, and pace, and our local experts will craft a 100% personalized itinerary for you.',
  keywords: ['custom travel sri lanka', 'private guide sri lanka', 'personalized tours', 'itinerary builder'],
  alternates: {
    canonical: 'https://aipatravels.com/en/tailor-made',
  },
};

export default function Page() {
  return <TailorMadeClient />;
}