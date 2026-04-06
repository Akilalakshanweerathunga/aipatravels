'use client';

import Box from '@mui/material/Box';
import HeroSlider from '@/components/home/HeroSlider';
import { WhoWeAre } from '@/components/home/WhoWeAre';
import MiddleBanner from '@/components/home/MiddleBanner';
import Extraordinary from '@/components/home/Extraordinary';
import Adventures from '@/components/home/Adventures';
import Itinerary from '@/components/home/Itinerary';
import WhyBookSection from '@/components/home/WhyUs';
import BookingCTA from '@/components/home/BookNow';

export default function HomePage() {

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://aipatravels.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://aipatravels.com/en/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })
      }}
      />
      <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          "name": "AIPA Travels",
          "priceRange": "$$",
          "areaServed": "Sri Lanka",
          "knowsAbout": ["Sri Lanka Tourism", "Wildlife Safaris", "Cultural Tours"]
        })
      }}
      />
      <Box sx={{ m: 0, p: 0, position: 'relative', top: -100}}>
        <HeroSlider />
        <WhoWeAre />
        <MiddleBanner />
        <Extraordinary />
        <Adventures />
        <Itinerary currency="USD" rate={1} />
        <WhyBookSection />
        <BookingCTA />
      </Box>
    </>
  );
}