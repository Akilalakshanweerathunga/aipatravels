'use client';

import { use, useEffect, useState } from 'react';
import HeroBanner from '@/components/partials/HeroBanner';
import { useTranslation } from 'react-i18next';
import { getItineraryBySlug } from '@/lib/api';
import { CircularProgress, Box, Container, Typography } from '@mui/material';
import ItineraryInquiryForm from '@/components/itinerary/InquiryForm';
import ItineraryDetails from '@/components/itinerary/inquiryDetails'; // Import the details component

interface PageProps {
  params: Promise<{
    key: string;
    locale: string;
  }>;
}

export default function InquiryPage({ params }: PageProps) {
  const { t } = useTranslation();
  const { key } = use(params);
  
  const [itinerary, setItinerary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getItineraryBySlug(key);
      setItinerary(data);
      setLoading(false);
    }
    loadData();
  }, [key]);

  // Helper functions used by the Details component
  const convertPrice = (price: number) => `$${price}`; // Replace with your actual conversion logic
  const getImage = (key: string) => `/images/categories/${key}.jpg`;
  const getAlt = (key: string) => key.replace(/-/g, ' ');

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: '#657b43' }} />
      </Box>
    );
  }

  if (!itinerary) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5">Itinerary not found</Typography>
      </Container>
    );
  }

  return (
    <>
        <HeroBanner
            headTitle={t('itineraries.headTitle')}
            title={t(`itineraries.${itinerary.locale_tag}.title`)}
            subtitle={t(`itineraries.${itinerary.locale_tag}.overview`)}
            image={`/images/itineraries/${itinerary.slug}.png`} 
        />
        
        <ItineraryInquiryForm 
        itineraryTag={itinerary.locale_tag} 
        itinerarySlug={itinerary.slug} 
        />
        
        <ItineraryDetails 
            selected={itinerary}
            onClose={() => {}} 
            t={t}
            convertPrice={convertPrice}
            getImage={getImage}
            getAlt={getAlt}
            isPageView={true} 
        />
    </>
  );
}