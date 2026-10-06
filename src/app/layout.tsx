import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCallButton from '@/components/FloatingCallButton';
import siteData from '@/data/siteData.json';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  'https://sr22insurancehoustontx.site'
).replace(/\/+$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteData.companyName} | Cheap Quotes & Requirements`,
    template: `%s | ${siteData.companyName}`
  },
  description: 'Fast, cheap SR22 insurance and electronic certificate filing to PennDOT. Call +1 (267) 310-0435 for immediate driver license reinstatement.',
  verification: {
    google: 'i5UKAo2SFZEKiktsmM4x0IKmRFNrMUBC5TNsq4RhzQQ',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800 antialiased selection:bg-red-500 selection:text-white">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
