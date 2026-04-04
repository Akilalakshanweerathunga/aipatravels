import HomePageClient from './HomePageClient';
import { company } from '@/data/company';

export const metadata = {
    title: company.name + ' - Explore Sri Lanka with Us',
    description: company.description,
};

export default function Page() {
  return <HomePageClient />;
}