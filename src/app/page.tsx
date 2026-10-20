import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import FeatureBar from '@/components/FeatureBar';
import AboutFeatureSection from '@/components/AboutFeatureSection';
import ContentSection from '@/components/ContentSection';
import PricingCards from '@/components/PricingCards';
import TestimonialSection from '@/components/TestimonialSection';
import LatestNewsSection from '@/components/LatestNewsSection';
import LocationsGrid from '@/components/LocationsGrid';
import JsonLd from '@/components/JsonLd';
import siteData from '@/data/siteData.json';
import { SITE_URL, getFaqSchema } from '@/lib/seo';

const homeData = siteData.mainPages[0];

export const metadata: Metadata = {
  title: homeData.seoTitle,
  description: homeData.metaDesc,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: homeData.seoTitle,
    description: homeData.metaDesc,
    url: SITE_URL,
    siteName: siteData.companyName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp`,
        width: 1200,
        height: 630,
        alt: homeData.seoTitle,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeData.seoTitle,
    description: homeData.metaDesc,
    images: [`${SITE_URL}/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp`],
  },
};

export default function HomePage() {
  const firstSection = homeData.sections && homeData.sections.length > 0 ? homeData.sections[0] : null;
  const remainingSections = homeData.sections && homeData.sections.length > 1 ? homeData.sections.slice(1) : [];

  const faqSection = homeData.sections?.find((s) => s.isFaq || (s.faqs && s.faqs.length > 0));
  const faqSchema = faqSection?.faqs ? getFaqSchema(faqSection.faqs) : null;

  return (
    <div className="flex flex-col">
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* 1. Hero Section matching template */}
      <HeroSection
        title={homeData.heroTitle}
        introHtml={homeData.introHtml}
        image="/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp"
        badge="SAVE TIME • SAVE MONEY • GET REINSTATED"
      />

      {/* 2. Feature Bar (3 Navy & White Cards from reference) */}
      <FeatureBar />

      {/* 3. Sub-Feature About Section with 2-image collage */}
      {firstSection && (
        <AboutFeatureSection
          title={firstSection.heading}
          bodyHtml={firstSection.bodyHtml}
        />
      )}

      {/* 4. Pricing / Plan Comparison Cards */}
      <PricingCards />

      {/* 5. Detailed Content Sections (H2s, Accordion FAQs, lists, tables) */}
      <ContentSection
        sections={remainingSections}
        pageName={homeData.pageName}
        tableOfContents={homeData.tableOfContents}
        internalAnchorsList={homeData.internalAnchorsList}
        externalAnchorItem={homeData.externalAnchorItem}
      />

      {/* 6. Testimonial / Social Proof Section */}
      <TestimonialSection />

      {/* 7. Locations Grid */}
      <LocationsGrid />

      {/* 8. Latest News & Driver Guides */}
      <LatestNewsSection />
    </div>
  );
}
