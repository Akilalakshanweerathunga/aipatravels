'use client';

import HeroBanner from '@/components/partials/HeroBanner';
import ItinerarySection from '@/components/itinerary/ItenarySection';
import CustomJourney from '@/components/partials/CustomJourneyBanner';
import { useTranslation } from 'react-i18next';

export default function ItinerariesPage() {
  const { t } = useTranslation();

  return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ItemList",
                "name": "Sri Lanka Tour Itineraries",
                "description": "A collection of expertly crafted travel itineraries for Sri Lanka.",
                "itemListElement": [
                    {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Tea Highland Adventure",
                    "url": "https://aipatravels.com/en/itineraries/inquiry/tea-highland"
                    },
                    {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Wildlife Safari Experience",
                    "url": "https://aipatravels.com/en/itineraries/inquiry/wildlife-safari"
                    }
                    // Add more dynamically if you fetch data here
                ]
                })
            }}
            />
      <HeroBanner
        headTitle={t('itineraries.headTitle')}
        title={t('itineraries.title')}
        subtitle={t('itineraries.subtitle')}
        image="/images/hero/itinerary.jpg"
      />

      <ItinerarySection />
      <CustomJourney />
    </>
  );
}