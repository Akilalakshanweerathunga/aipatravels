import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact AIPA Travels | Plan Your Sri Lanka Trip',
  description: 'Get in touch with our travel experts to customize your Sri Lanka itinerary. Reach us via phone, email, or our inquiry form for 24/7 support.',
  alternates: {
    canonical: 'https://aipatravels.com/en/contact-us',
    languages: {
      'en-US': 'https://aipatravels.com/en/contact-us',
      'fr-FR': 'https://aipatravels.com/fr/contact-us',
      'it-IT': 'https://aipatravels.com/it/contact-us',
      'kr-KR': 'https://aipatravels.com/kr/contact-us',
    },
  },
};

export default function Page() {
  return <ContactClient />;
}