import { Metadata, ResolvingMetadata } from 'next';
import SingleDestinationsClient from './SingleDestinationsClient';
import { getDestinationByKey } from '@/lib/api';

type Props = {
  params: Promise<{ locale: string; key: string }>;
};

// --- ADVANCED SEO: DYNAMIC METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, key } = await params;
  const destination = await getDestinationByKey(key);

  if (!destination) {
    return { title: 'Destination Not Found' };
  }

  const baseUrl = 'https://aipatravels.com';
  const path = `/${locale}/destinations/${key}`;

  return {
    title: `${destination.title}`,
    description: destination.overview || destination.description?.substring(0, 160),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        'en-US': `${baseUrl}/en/destinations/${key}`,
        'fr-FR': `${baseUrl}/fr/destinations/${key}`,
        'it-IT': `${baseUrl}/it/destinations/${key}`,
        'kr-KR': `${baseUrl}/kr/destinations/${key}`,
      },
    },
    openGraph: {
      title: destination.title,
      description: destination.overview,
      url: `${baseUrl}${path}`,
      siteName: 'AIPA Travels',
      images: [
        {
          url: `/images/destinations/hero/${destination.main_banner}`,
          width: 1200,
          height: 630,
          alt: destination.label,
        },
      ],
      type: 'website',
    },
  };
}

export default async function Page({ params }: Props) {
  const { locale, key } = await params;
  const destination = await getDestinationByKey(key);

  return (
    <SingleDestinationsClient
      locale={locale}
      destination={destination}
    />
  );
}