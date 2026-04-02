import SingleDestinationsClient from './SingleDestinationsClient';
import { getDestinationByKey } from '@/lib/api';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; key: string }>;
}) {
  const { locale, key } = await params;

  const destination = await getDestinationByKey(key);

  return (
    <SingleDestinationsClient
      locale={locale}
      destination={destination}
    />
  );
}