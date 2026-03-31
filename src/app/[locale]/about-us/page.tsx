'use client';

import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStact';
import OurStory from '@/components/about/OurStory';
import AboutFeatures from '@/components/about/AboutFeatures';
import OurCulture from '@/components/about/OurCulture';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStats />
      <OurStory />
      <AboutFeatures />
      <OurCulture />
    </>
  );
}