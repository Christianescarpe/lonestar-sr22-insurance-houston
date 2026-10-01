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
import siteData from '@/data/siteData.json';

const homeData = siteData.mainPages[0];

export const metadata: Metadata = {
  title: homeData.seoTitle,
  description: homeData.metaDesc
};

export default function HomePage() {
  // Let's pass the first section body to AboutFeatureSection if available
  const firstSection = homeData.sections && homeData.sections.length > 0 ? homeData.sections[0] : null;
  const remainingSections = homeData.sections && homeData.sections.length > 1 ? homeData.sections.slice(1) : [];

  return (
    <div className="flex flex-col">
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
