import { MetadataRoute } from 'next';
import { getDestinations, getItineraries } from '@/lib/api';

const locales = ['en', 'fr', 'it', 'kr']; 
const EXTERNAL_DATA_URL = 'https://aipatravels.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const destinations = await getDestinations(); 
  const itineraries = await getItineraries();

  const staticPages = ['', 'about-us', 'contact-us', 'destinations', 'itineraries', 'tailor-made', 'privacy-policy', 'terms-and-conditions'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      sitemapEntries.push({
        url: `${EXTERNAL_DATA_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    });
    destinations.forEach((dest) => {
      sitemapEntries.push({
        url: `${EXTERNAL_DATA_URL}/${locale}/destinations/${dest.key}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
    itineraries.forEach((itinerary) => {
      sitemapEntries.push({
        url: `${EXTERNAL_DATA_URL}/${locale}/itineraries/inquiry/${itinerary.slug}`,
        lastModified: new Date(itinerary.created_at),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    });
  });

  return sitemapEntries;
}