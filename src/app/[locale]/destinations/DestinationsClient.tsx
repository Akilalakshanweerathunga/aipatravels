'use client';

import HeroBanner from '@/components/partials/HeroBanner';
import DestinationList from '@/components/destination/partials/DestinationList';
import CustomJourney from '@/components/partials/CustomJourneyBanner';
import { Destination } from '@/types/destination';
import FeaturedBanner from '@/components/destination/FeaturedBanner';
import { useTranslation } from 'react-i18next';

type Props = {
  locale: string;
  data: Destination[];
};

export default function DestinationsClient({ locale, data }: Props) {
  const { t } = useTranslation();

  const bannerDestination = data.find((d) => d.banner);

  if (!bannerDestination) return null;

  return (
    <>
      <HeroBanner
        headTitle={t('destinations.headTitle')}
        title={t('destinations.title')}
        subtitle={t('destinations.subtitle')}
        image="/images/hero/destination.jpg"
      />
      <DestinationList data={data} locale={locale} />
      <FeaturedBanner destination={bannerDestination} />
      <CustomJourney />
    </>
  );
}