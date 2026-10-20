import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingCallButton from '@/components/FloatingCallButton';
import JsonLd from '@/components/JsonLd';
import siteData from '@/data/siteData.json';
import { SITE_URL, getOrganizationSchema } from '@/lib/seo';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteData.companyName} | Cheap Quotes & Requirements`,
    template: '%s'
  },
  description: 'Fast, cheap SR22 insurance and electronic certificate filing to PennDOT. Call +1 (267) 310-0435 for immediate driver license reinstatement.',
  alternates: {
    canonical: '/',
  },
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
  openGraph: {
    title: `${siteData.companyName} | Cheap Quotes & Requirements`,
    description: 'Fast, cheap SR22 insurance and electronic certificate filing to PennDOT. Call +1 (267) 310-0435 for immediate driver license reinstatement.',
    url: SITE_URL,
    siteName: siteData.companyName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/logo.png`,
        width: 800,
        height: 600,
        alt: siteData.companyName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteData.companyName} | Cheap Quotes & Requirements`,
    description: 'Fast, cheap SR22 insurance and electronic certificate filing to PennDOT. Call +1 (267) 310-0435.',
    images: [`${SITE_URL}/images/logo.png`],
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
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth`}>
      <head>
        <JsonLd data={organizationSchema} />
      </head>
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
