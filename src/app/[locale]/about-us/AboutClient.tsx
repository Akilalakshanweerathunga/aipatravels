'use client';

import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStact';
import OurStory from '@/components/about/OurStory';
import AboutFeatures from '@/components/about/AboutFeatures';
import OurCulture from '@/components/about/OurCulture';

export default function AboutPage() {
  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "AIPA Travels",
            "url": "https://aipatravels.com",
            "logo": "https://aipatravels.com/logo.png",
            "description": "Expert travel agency specializing in authentic Sri Lankan tours.",
            "address": {
                "@type": "PostalAddress",
                "addressCountry": "Sri Lanka"
            },
            "sameAs": [
                "https://facebook.com/aipatravels",
                "https://instagram.com/aipatravels"
            ]
            })
        }}
        />
      <AboutHero />
      <AboutStats />
      <OurStory />
      <AboutFeatures />
      <OurCulture />
    </>
  );
}