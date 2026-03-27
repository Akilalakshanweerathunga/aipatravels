import HeroBanner from '@/components/destination/HeroBanner';
import DestinationSection from '@/components/destination/DestinationSection';
import CustomJourney from '@/components/partials/CustomJourneyBanner';
import { useTranslation } from 'react-i18next';

export default function DestinationsPage() {
  const { t } = useTranslation();

  return (
    <>
      <HeroBanner
        headTitle={t('destinations.headTitle')}
        title={t('destinations.title')}
        subtitle={t('destinations.subtitle')}
        image="/images/hero/destination.jpg"
      />

      <DestinationSection />
      <CustomJourney />
    </>
  );
}