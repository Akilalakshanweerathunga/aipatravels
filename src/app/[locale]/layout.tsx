import type { Metadata } from 'next';
import MuiProvider from '../providers/MuiProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { company } from '@/data/company';
import { Locale } from '@/i18n/settings';
import '../globals.css';
import FloatingActions from "@/components/FloatingActions";
import CookieBanner from "@/components/CookieBanner";

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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: company.name,
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: company.name,
    description: company.description,
    images: '/og-image.png .png',
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  manifest: '/site.webmanifest',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale}>
      <body>
        <MuiProvider params={{ locale: typedLocale }}>
          <Navbar locale={typedLocale} />
          {children}
          <FloatingActions />
          <CookieBanner />
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}