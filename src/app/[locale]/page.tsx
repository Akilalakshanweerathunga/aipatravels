'use client';

import Box from '@mui/material/Box';
import HeroSlider from '@/components/home/HeroSlider';
import { WhoWeAre } from '@/components/home/WhoWeAre';
import MiddleBanner from '@/components/home/MiddleBanner';
import Extraordinary from '@/components/home/Extraordinary';
import Adventures from '@/components/home/Adventures';
import Itinerary from '@/components/home/Itinerary';

export default function HomePage() {

  return (
      <Box sx={{ m: 0, p: 0, position: 'relative', top: -100}}>
        <HeroSlider />
        <WhoWeAre />
        <MiddleBanner />
        <Extraordinary />
        <Adventures />
        <Itinerary currency="USD" rate={1} />
      </Box>
  );
}