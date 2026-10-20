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
import JsonLd from '@/components/JsonLd';
import siteData from '@/data/siteData.json';
import {
  SITE_URL,
  getCanonicalUrl,
  getBreadcrumbSchema,
  getArticleSchema,
  getFaqSchema
} from '@/lib/seo';

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

  const title = page.seoTitle || page.title || page.pageName;
  const description = page.metaDesc || '';
  const canonicalPath = `/${page.slug}`;
  const isBlog = page.pageType === 'blog';
  const pageImage = page.image
    ? page.image.startsWith('http')
      ? page.image
      : `${SITE_URL}${page.image}`
    : `${SITE_URL}/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: getCanonicalUrl(canonicalPath),
      siteName: siteData.companyName,
      locale: 'en_US',
      type: isBlog ? 'article' : 'website',
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [pageImage],
    },
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
  let categoryName = 'Services';
  let categoryUrl = '/';

  if (isLocation) {
    badge = `PENNSYLVANIA LOCAL FILING • ${page.pageName.replace('SR22 Insurance ', '')}`;
    categoryName = 'Pennsylvania Locations';
    categoryUrl = '/';
  } else if (isService) {
    badge = 'SPECIALIZED SR22 COVERAGE OPTION';
    categoryName = 'SR-22 Services';
    categoryUrl = '/';
  } else if (isBlog) {
    badge = 'PENN-DOT DRIVER GUIDE & ADVICE';
    categoryName = 'Driver Guides & Blogs';
    categoryUrl = '/blogs';
  }

  const firstSection = page.sections && page.sections.length > 0 ? page.sections[0] : null;
  const remainingSections = page.sections && page.sections.length > 1 ? page.sections.slice(1) : [];

  // Breadcrumbs Schema
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: categoryName, url: categoryUrl },
    { name: page.pageName || page.title, url: `/${page.slug}` }
  ]);

  // Article Schema for blogs
  const articleSchema = isBlog
    ? getArticleSchema({
        title: page.title || page.pageName,
        description: page.metaDesc || '',
        url: `/${page.slug}`,
        image: page.image
      })
    : null;

  // FAQ Schema if page has FAQs
  const faqSection = page.sections?.find((s) => s.isFaq || (s.faqs && s.faqs.length > 0));
  const faqSchema = faqSection?.faqs ? getFaqSchema(faqSection.faqs) : null;

  return (
    <div className="flex flex-col">
      <JsonLd data={breadcrumbsSchema} />
      {articleSchema && <JsonLd data={articleSchema} />}
      {faqSchema && <JsonLd data={faqSchema} />}

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
