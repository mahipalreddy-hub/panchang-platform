import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Daily Panchang & Muhurat Finder Platform | Vedic Astrology',
  description: 'Certified Daily Panchang, Shubh Muhurat timings, Choghadiya, Rahu Kalam, and Hindu Festival Calendar for Indian cities with high precision Drik Ganita calculations.',
  keywords: ['daily panchang', 'today panchang', 'rahu kalam timings', 'shubh muhurat finder', 'choghadiya today', 'hindu festival calendar 2026', 'vedic astrology'],
  metadataBase: new URL('https://vedicpanchang.internal'),
  openGraph: {
    title: 'Daily Vedic Panchang & Muhurat Platform',
    description: 'Accurate Tithi, Nakshatra, Rahu Kalam, Abhijit Muhurat and Festival Calendar for all Indian cities.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Vedic Panchang'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vedic Panchang & Muhurat Platform'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-[#080C14] text-amber-50">
        <Header />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}