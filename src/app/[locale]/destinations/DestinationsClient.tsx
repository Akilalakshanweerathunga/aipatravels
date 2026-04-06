'use client';

import { Box } from '@mui/material';
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": data.map((dest, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://aipatravels.com/${locale}/destinations/${dest.key}`,
              "name": dest.label
            }))
          })
        }}
      />
      <Box sx={{ display: 'block', position: 'relative', width: '100%' }}>
        <HeroBanner
          headTitle={t('destinations.headTitle')}
          title={t('destinations.title')}
          subtitle={t('destinations.subtitle')}
          image="/images/hero/destination.jpg"
        />
        
        <DestinationList data={data} locale={locale} />
        
        <CustomJourney />
      </Box>
    </>
  );
}