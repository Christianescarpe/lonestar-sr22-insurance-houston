import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HeroSection from '@/components/HeroSection';
import FeatureBar from '@/components/FeatureBar';
import AboutFeatureSection from '@/components/AboutFeatureSection';
import ContentSection from '@/components/ContentSection';
import PricingCards from '@/components/PricingCards';
import TestimonialSection from '@/components/TestimonialSection';
import LatestNewsSection from '@/components/LatestNewsSection';
import LocationsGrid from '@/components/LocationsGrid';
import siteData from '@/data/siteData.json';

interface PageItem {
  pageName: string;
  title: string;
  slug: string;
  pageType: string;
  targetKeyword: string;
  seoTitle: string;
  rawContent: string;
  metaDesc: string;
  heroTitle: string;
  introHtml: string;
  sections: Array<{
    id?: string;
    heading: string;
    isFaq?: boolean;
    faqs?: Array<{ question: string; answer: string }>;
    bodyHtml: string;
  }>;
  tableOfContents?: Array<{ id: string; title: string }>;
  internalAnchorsList?: Array<{ text: string; targetTitle: string; url: string }>;
  externalAnchorItem?: { text: string; url: string } | null;
  fullLinkedHtml: string;
  image: string;
}

const allPagesList: PageItem[] = siteData.allPages as PageItem[];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allPagesList
    .filter((p) => p.slug && p.slug.trim() !== '')
    .map((p) => ({
      slug: p.slug
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = allPagesList.find((p) => p.slug === slug);

  if (!page) {
    return {
      title: 'Page Not Found'
    };
  }

  return {
    title: page.seoTitle || page.title || page.pageName,
    description: page.metaDesc || ''
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = allPagesList.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  const isLocation = page.pageType === 'location';
  const isService = page.pageType === 'service';
  const isBlog = page.pageType === 'blog';

  let badge = 'SR22 FILING & DRIVER RESTORATION';
  if (isLocation) {
    badge = `PENNSYLVANIA LOCAL FILING • ${page.pageName.replace('SR22 Insurance ', '')}`;
  } else if (isService) {
    badge = 'SPECIALIZED SR22 COVERAGE OPTION';
  } else if (isBlog) {
    badge = 'PENN-DOT DRIVER GUIDE & ADVICE';
  }

  const firstSection = page.sections && page.sections.length > 0 ? page.sections[0] : null;
  const remainingSections = page.sections && page.sections.length > 1 ? page.sections.slice(1) : [];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection
        title={page.heroTitle || page.title || page.pageName}
        introHtml={page.introHtml || ''}
        image={page.image || '/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp'}
        badge={badge}
      />

      {/* 2. Feature Bar (Services & Locations) */}
      {!isBlog && <FeatureBar />}

      {/* 3. Sub-Feature About Section with 2-image collage */}
      {firstSection && (
        <AboutFeatureSection
          title={firstSection.heading}
          bodyHtml={firstSection.bodyHtml}
        />
      )}

      {/* 4. Pricing / Plan Comparison Cards (Only for services and location pages) */}
      {!isBlog && <PricingCards />}

      {/* 5. Detailed Content Sections (H2s, Accordion FAQs, lists, tables) */}
      <ContentSection
        sections={remainingSections}
        pageName={page.pageName || page.title}
        tableOfContents={page.tableOfContents}
        internalAnchorsList={page.internalAnchorsList}
        externalAnchorItem={page.externalAnchorItem}
      />

      {/* 6. Testimonial / Social Proof Section */}
      <TestimonialSection />

      {/* 7. Locations Grid (Shown for Service & Location pages) */}
      {(isService || isLocation) && <LocationsGrid />}

      {/* 8. Latest News & Driver Guides */}
      <LatestNewsSection />
    </div>
  );
}
