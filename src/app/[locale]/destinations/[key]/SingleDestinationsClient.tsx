'use client';

import { Box } from '@mui/material';
import HeroBanner from '@/components/partials/HeroBanner';
import { useTranslation } from 'react-i18next';
import AboutSection from '@/components/destination/AboutSection';
import DestinationLineup from '@/components/destination/DestinationLineup';
import ThingsToDo from '@/components/destination/ThingsToDo';
import DestinationGallery from '@/components/destination/DestinationGallery';
import { getGalleryImages } from '@/utils/gallery';

type Props = {
  locale: string;
  destination: any;
};

export default function SingleDestinationsClient({ destination }: Props) {
  const { t } = useTranslation();

  if (!destination) {
    return <div>Destination not found</div>;
  }

  // Use destination.activities directly
  const galleryImages = getGalleryImages(destination, destination.activities);

  console.log("🔥 FULL DESTINATION:", destination);
  console.log("🔥 ACTIVITIES:", destination?.activities);

  return (
    <Box sx={{ display: 'block', position: 'relative', width: '100%' }}>
      <HeroBanner
        headTitle={destination.title}      
        title={destination.label}         
        subtitle={destination.overview}    
        image={`/images/destinations/hero/${destination.main_banner}`} 
      />

      <AboutSection
        title="About Destination"
        subtitle={destination?.overview || destination?.label || ''}
        description={destination?.description || ''}
      />

      <DestinationLineup items={destination.destination_lineups} />
      <ThingsToDo items={destination.activities} />

      <DestinationGallery
        destination={destination}
        activities={destination.activities} // <-- pass activities here
      />
    </Box>
  );
}