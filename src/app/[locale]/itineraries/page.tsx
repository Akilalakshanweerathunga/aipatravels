'use client';

import HeroBanner from '@/components/partials/HeroBanner';
import ItinerarySection from '@/components/itinerary/ItenarySection';
import CustomJourney from '@/components/partials/CustomJourneyBanner';
import { useTranslation } from 'react-i18next';

export default function ItinerariesPage() {
  const { t } = useTranslation();

  return (
    <>
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