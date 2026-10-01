'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  HelpCircle,
  Phone,
  Link2,
  ExternalLink,
  ListTree,
  Compass,
  ArrowRight
} from 'lucide-react';
import siteData from '@/data/siteData.json';

interface FaqItem {
  question: string;
  answer: string;
}

interface SectionItem {
  id?: string;
  heading: string;
  isFaq?: boolean;
  faqs?: FaqItem[];
  bodyHtml: string;
}

interface TableOfContentItem {
  id: string;
  title: string;
}

interface InternalAnchorItem {
  text: string;
  targetTitle: string;
  url: string;
}

interface ExternalAnchorItem {
  text: string;
  url: string;
}

interface ContentSectionProps {
  sections: SectionItem[];
  pageName?: string;
  tableOfContents?: TableOfContentItem[];
  internalAnchorsList?: InternalAnchorItem[];
  externalAnchorItem?: ExternalAnchorItem | null;
}

export default function ContentSection({
  sections,
  pageName,
  tableOfContents,
  internalAnchorsList,
  externalAnchorItem
}: ContentSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!sections || sections.length === 0) return null;

  return (
    <div id="details" className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* On-Page Jump Anchors (Table of Contents) */}
        {tableOfContents && tableOfContents.length > 1 && (
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 text-[#0e2a47]">
              <Compass className="w-5 h-5 text-[#dc2626]" />
              <h3 className="font-extrabold text-lg sm:text-xl tracking-tight">
                Quick Navigation & On-Page Anchors
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4">
              {tableOfContents.map((item, idx) => (
                <a
                  key={idx}
                  href={`#${item.id}`}
                  className="group flex items-start gap-2 text-sm text-slate-700 hover:text-[#dc2626] transition-colors py-1"
                >
                  <span className="text-[#dc2626] font-mono font-bold text-xs mt-0.5">#</span>
                  <span className="group-hover:underline underline-offset-2 font-medium leading-snug">
                    {item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Content Sections */}
        {sections.map((sec, idx) => {
          const sectionId = sec.id || `section-${idx}`;

          // If this section is FAQ
          if (sec.isFaq && sec.faqs && sec.faqs.length > 0) {
            return (
              <div
                key={idx}
                id={sectionId}
                className="section-anchor bg-slate-50 rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 text-[#dc2626] flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0e2a47]">
                        {sec.heading}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Common questions answered by insurance specialists
                      </p>
                    </div>
                  </div>
                  <a
                    href={`#${sectionId}`}
                    className="text-slate-300 hover:text-[#dc2626] font-mono text-lg font-bold p-1"
                    title="Anchor link to this section"
                  >
                    #
                  </a>
                </div>

                <div className="space-y-4">
                  {sec.faqs.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full px-5 py-4 text-left font-bold text-base sm:text-lg text-[#0e2a47] flex items-center justify-between gap-4 hover:text-[#dc2626] transition-colors"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180 text-[#dc2626]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div
                            className="px-5 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 prose-content"
                            dangerouslySetInnerHTML={{ __html: faq.answer }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Regular Content Section
          return (
            <div key={idx} id={sectionId} className="space-y-4 section-anchor">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0e2a47] tracking-tight border-b-2 border-slate-100 pb-3 relative flex items-center justify-between group">
                <span>{sec.heading}</span>
                <a
                  href={`#${sectionId}`}
                  className="text-slate-300 group-hover:text-[#dc2626] font-mono text-xl transition-colors opacity-0 group-hover:opacity-100 px-2"
                  title="Anchor link to this section"
                >
                  #
                </a>
                <span className="absolute bottom-[-2px] left-0 w-16 h-[2px] bg-[#dc2626]" />
              </h2>

              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: sec.bodyHtml }}
              />

              {/* Mid-content CTA Banner on 2nd section */}
              {idx === 1 && (
                <div className="my-10 bg-gradient-to-r from-[#0e2a47] to-[#163b63] rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Need Personalized Advice?
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      Speak with our SR-22 Specialist Now
                    </h3>
                    <p className="text-sm text-slate-300">
                      Get an instant price quote and ensure your paperwork meets all state regulations.
                    </p>
                  </div>
                  <a
                    href={`tel:${siteData.phoneTel}`}
                    className="flex-shrink-0 inline-flex items-center gap-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>Call: {siteData.phoneNumber}</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}

        {/* Dedicated Internal Anchors & Related Resources Card */}
        {((internalAnchorsList && internalAnchorsList.length > 0) || externalAnchorItem) && (
          <div className="mt-16 bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4 text-[#0e2a47]">
              <Link2 className="w-5 h-5 text-[#dc2626]" />
              <h3 className="font-extrabold text-lg sm:text-xl">
                Internal Anchors & Referenced Resources
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Official Pennsylvania SR-22 insurance guides, quote comparisons, and state filing resources referenced in this guide:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {internalAnchorsList?.map((anchor, aIdx) => (
                <Link
                  key={aIdx}
                  href={anchor.url}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 hover:border-[#dc2626] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Internal Anchor {aIdx + 1}
                  </div>
                  <div className="font-bold text-sm text-[#0e2a47] group-hover:text-[#dc2626] transition-colors line-clamp-2">
                    {anchor.text}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                    <span>Explore Resource</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}

              {externalAnchorItem && (
                <a
                  href={externalAnchorItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-4 rounded-xl border border-slate-200/90 hover:border-[#dc2626] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">
                    Official External Resource
                  </div>
                  <div className="font-bold text-sm text-[#0e2a47] group-hover:text-[#dc2626] transition-colors line-clamp-2">
                    {externalAnchorItem.text}
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
                    <span>Visit Official Site</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
