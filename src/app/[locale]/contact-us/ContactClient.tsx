'use client';

import { Box } from '@mui/material';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactClient() {

  return (
    <>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TravelAgency",
                "name": "AIPA Travels",
                "image": "https://aipatravels.com/images/contact-hero.jpg",
                "telephone": "+94715703222",
                "email": "info@aipatravels.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Your Street Address",
                    "addressLocality": "City",
                    "addressRegion": "Western Province",
                    "addressCountry": "Sri Lanka"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 6.9271,
                    "longitude": 79.8612 
                },
                "url": "https://aipatravels.com/contact-us",
                "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "00:00",
                    "closes": "23:59"
                }
                })
            }}
        />
        <Box sx={{ display: 'block', position: 'relative', width: '100%' }}>
        <ContactHero />
        <ContactForm />
        </Box>
    </>
  );
}