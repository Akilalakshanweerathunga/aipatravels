import { Metadata } from 'next';
import { getItineraryBySlug } from '@/lib/api';
import InquiryPage from './InquiryPage'; // Your existing client component

type Props = {
  params: Promise<{ locale: string; key: string }>;
};

// 1. DYNAMIC SEO METADATA
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, key } = await params;
  const itinerary = await getItineraryBySlug(key);

  if (!itinerary) return { title: 'Itinerary Not Found' };

  const baseUrl = 'https://aipatravels.com';
  
  return {
    title: `${itinerary.name} Inquiry | AIPA Travels`,
    description: `Book your ${itinerary.day_num}-day ${itinerary.category_key.replace('_', ' ')} experience in Sri Lanka. Request a custom quote today.`,
    alternates: {
      canonical: `${baseUrl}/${locale}/itineraries/inquiry/${key}`,
    },
    openGraph: {
      images: [`/images/itineraries/${itinerary.slug}.png`],
    }
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const itinerary = await getItineraryBySlug(resolvedParams.key);

  return <InquiryPage params={params} />;
}