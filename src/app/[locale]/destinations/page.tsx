import { company } from "@/data/company";
import DestinationsClient from "./DestinationsClient";
import { getDestinations } from "@/lib/api";
import { Destination } from "@/types/destination";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: 'Top Destinations in Sri Lanka',
    description: 'Explore the best of Sri Lanka, from the golden beaches of Mirissa to the ancient fortress of Sigiriya. Discover your next adventure with our curated destination guide.',
    alternates: {
      canonical: `https://aipatravels.com/${locale}/destinations`,
    },
    openGraph: {
      title: 'Explore Sri Lanka Destinations',
      description: 'Find the perfect spot for your next holiday.',
      images: ['/images/hero/destination.jpg'],
    }
  };
}
type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params; 

  const destinations = await getDestinations();

  return (
    <DestinationsClient
      locale={locale}
      data={destinations}
    />
  );
}