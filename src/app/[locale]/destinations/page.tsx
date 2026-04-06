import { company } from "@/data/company";
import DestinationsClient from "./DestinationsClient";
import { getDestinations } from "@/lib/api";
import { Destination } from "@/types/destination";

export const metadata = {
    title: company.name + ' - Explore Sri Lanka with Us',
    description: company.description,
    alternates: {
      canonical: `/destinations`,
    },
};
type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function Page({ params }: PageProps) {
  const { locale } = await params; 

  const destinations = await getDestinations();

  return (
    <DestinationsClient
      locale={locale}
      data={destinations}
    />
  );
}