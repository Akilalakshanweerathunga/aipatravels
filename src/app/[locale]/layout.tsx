import type { Metadata } from 'next';
import MuiProvider from '../providers/MuiProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { company } from '@/data/company';
import { Locale } from '@/i18n/settings';
import '../globals.css';

export const metadata: Metadata = {
  title: {
    default: company.name,
    template: `%s | ${company.name}`,
  },
  description: company.description,

  metadataBase: new URL(company.website),

  openGraph: {
    title: company.name,
    description: company.description,
    url: company.website,
    siteName: company.name,
    images: [
      {
        url: company.logo,
        width: 800,
        height: 600,
      },
    ],
    type: 'website',
  },

  icons: {
    icon: company.logo,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ MUST be Promise
}) {
  const { locale } = await params; // ✅ await it

  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale}>
      <body>
        <MuiProvider params={{ locale: typedLocale }}>
          <Navbar locale={typedLocale} />
          {children}
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}