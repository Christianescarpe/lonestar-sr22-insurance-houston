import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function LatestNewsSection() {
  const articles = siteData.blogPosts.slice(0, 3);

  const images = [
    '/images/car-insurance-concept-toy-car-covered-by-umbrella-2026-03-26-23-19-45-utc.webp',
    '/images/protecting-a-toy-car-with-hands-insurance-concept-2026-01-07-02-05-26-utc.webp',
    '/images/insurance-adjuster-inspecting-damage-after-car-cra-2026-01-05-05-08-40-utc.webp'
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Educational Resources</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e2a47] tracking-tight">
              Latest SR22 & Driver Guides
            </h2>
          </div>
          <Link
            href={`/${siteData.blogPosts[0].slug}`}
            className="inline-flex items-center gap-2 font-bold text-sm text-[#0e2a47] hover:text-[#dc2626] transition-colors"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((post, idx) => (
            <article
              key={post.slug}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={images[idx % images.length]}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0e2a47] text-white text-[11px] font-bold px-2.5 py-1 rounded">
                    SR22 Guide
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0e2a47] group-hover:text-[#dc2626] transition-colors line-clamp-2 leading-snug">
                    <Link href={`/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
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
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
