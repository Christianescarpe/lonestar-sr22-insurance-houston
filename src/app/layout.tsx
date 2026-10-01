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

export const metadata: Metadata = {
  metadataBase: new URL('https://lonestar-sr22-insurance.com'),
  title: {
    default: `${siteData.companyName} | Cheap Quotes & Requirements`,
    template: `%s | ${siteData.companyName}`
  },
  description: 'Fast, cheap SR22 insurance and electronic certificate filing to PennDOT. Call +1 (267) 310-0435 for immediate driver license reinstatement.',
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
