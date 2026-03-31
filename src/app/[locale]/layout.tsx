import MuiProvider from '../providers/MuiProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Locale } from '@/i18n/settings';
import '../globals.css';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 👈 FIX HERE
}) {
  const { locale } = await params;

  // 👇 safely cast AFTER receiving
  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale} style={{ height: '100%' }} data-scroll-behavior="smooth">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#fcf8f3',
        }}
      >
        <MuiProvider params={{ locale: typedLocale }}>
          <Navbar locale={typedLocale} />
          {children}
          <Footer />
        </MuiProvider>
      </body>
    </html>
  );
}