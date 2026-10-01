import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, ShieldCheck, Phone } from 'lucide-react';
import siteData from '@/data/siteData.json';
import LocationsGrid from '@/components/LocationsGrid';

export const metadata: Metadata = {
  title: 'SR22 Insurance Blogs & Pennsylvania Driver Guides | LoneStar SR22 Insurance Houston',
  description: 'Read the latest guides on Pennsylvania SR-22 requirements, PennDOT reinstatement, DL-123 forms, and affordable high-risk auto insurance.'
};

const blogImages = [
  '/images/car-insurance-concept-toy-car-covered-by-umbrella-2026-03-26-23-19-45-utc.webp',
  '/images/protecting-a-toy-car-with-hands-insurance-concept-2026-01-07-02-05-26-utc.webp',
  '/images/insurance-adjuster-inspecting-damage-after-car-cra-2026-01-05-05-08-40-utc.webp',
  '/images/signing-auto-insurance-document-with-car-key-and-c-2026-01-06-09-05-16-utc.webp',
  '/images/car-insurance-coverage-with-protection-concept-2026-01-08-08-12-25-utc.webp',
  '/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp',
  '/images/car-insurance-agreement-with-toy-car-and-keys-2026-01-08-07-27-34-utc.webp',
  '/images/man-holding-insurance-document-in-a-corporate-sett-2026-01-09-11-36-08-utc.webp',
  '/images/car-insurance-protection-covered-by-an-umbrella-2026-01-08-08-12-25-utc.webp',
  '/images/woman-inspecting-damage-car-after-auto-accident-2026-03-27-03-00-53-utc.webp'
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Driver Education & Compliance Guides</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2a47] tracking-tight">
            SR22 Insurance Blogs & Articles
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about navigating Pennsylvania SR-22 requirements, PennDOT license reinstatement, non-owner filings, and saving on high-risk coverage.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={`tel:${siteData.phoneTel}`}
              className="inline-flex items-center gap-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-7 py-3.5 rounded-lg font-bold text-sm shadow-md transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Questions? Call: {siteData.phoneNumber}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.blogPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={blogImages[idx % blogImages.length]}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0e2a47] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                      SR22 Blog
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-lg font-bold text-[#0e2a47] group-hover:text-[#dc2626] transition-colors leading-snug">
                      <Link href={`/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {post.metaDesc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#dc2626] group-hover:text-[#b91c1c] transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <LocationsGrid />
    </div>
  );
}
