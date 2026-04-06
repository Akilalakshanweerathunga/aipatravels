'use client';

import TailorMadeHero from '@/components/tailor-made/heroBanner';
import TailorForm from '@/components/tailor-made/tailorForm';

export default function AboutPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Custom Travel Planning",
            "provider": {
                "@type": "TravelAgency",
                "name": "AIPA Travels"
            },
            "areaServed": "Sri Lanka",
            "description": "Tailor-made travel itineraries designed by local experts based on traveler preferences.",
            "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock"
            }
            })
        }}
        />
      <TailorMadeHero />
      <TailorForm />
    </>
  );
}