'use client';

import { Box } from '@mui/material';
import HeroBanner from '@/components/partials/HeroBanner';
import { useTranslation } from 'react-i18next';
import AboutSection from '@/components/destination/AboutSection';
import DestinationLineup from '@/components/destination/DestinationLineup';
import ThingsToDo from '@/components/destination/ThingsToDo';
import DestinationGallery from '@/components/destination/DestinationGallery';
import { getGalleryImages } from '@/utils/gallery';

type ActivityItem = {
  slug: string;
  key: string;
  name: string;
  duration: string;
  best_time_to_visit: string;
  category: string;
  overview: string;
  description: string;
};

type LineupItem = {
  place_name: string;
  specialty: string;
  best_time_to_visit: string;
  season?: string;
  overview?: string;
};

type Props = {
  locale: string;
  destination: any;
};

export default function SingleDestinationsClient({ destination }: Props) {
  const { t } = useTranslation();
  const key = destination.locale_tag;
  if (!destination) {
    return <div>Destination not found</div>;
  }
  const rawItems = t(`destinations.${key}.places`, {
    returnObjects: true,
    defaultValue: [],
  });

  const lineupItems: LineupItem[] = Array.isArray(rawItems)
    ? rawItems
    : [];
  const rawActivities = t(`destinations.${key}.activities`, {
    returnObjects: true,
    defaultValue: {},
  });

  const activityItems: ActivityItem[] =
  rawActivities && typeof rawActivities === 'object'
    ? Object.values(rawActivities)
    : [];
    
  const galleryImages = getGalleryImages(destination, destination.activities);


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Place",
            "name": destination.title,
            "description": destination.overview,
            "image": `/images/destinations/hero/${destination.main_banner}`,
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "Sri Lanka"
            },
            "touristType": destination.category_key?.replace('_', ' ') || "Tourist Attraction"
          })
        }}
      />
      <Box sx={{ display: 'block', position: 'relative', width: '100%' }}>
        <HeroBanner
          headTitle={t(`destinations.${key}.title`)}
          title={t(`destinations.${key}.title`)}
          subtitle={t(`destinations.${key}.overview`)}
          image={`/images/destinations/hero/${destination.main_banner}`}
        />

        <AboutSection
          title={t('destinations.about_title')}
          subtitle={t(`destinations.${key}.overview`, {
            defaultValue: destination?.overview || destination?.label || '',
          })}
          description={t(`destinations.${key}.description`, {
            defaultValue: destination?.description || '',
          })}
        />

        <DestinationLineup
          items={lineupItems}
          images={destination.destination_lineups}
        />
        <ThingsToDo
          items={activityItems}
          images={destination.activities}
        />

        <DestinationGallery
          destination={destination}
          activities={destination.activities}
        />
      </Box>
    </>
  );
}