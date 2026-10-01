import React from 'react';
import Image from 'next/image';
import { Phone, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import siteData from '@/data/siteData.json';

interface AboutFeatureSectionProps {
  title?: string;
  bodyHtml?: string;
}

export default function AboutFeatureSection({
  title = 'Direct Reinstatement Filing with PennDOT',
  bodyHtml
}: AboutFeatureSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Images Grid */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] bg-slate-100">
                  <Image
                    src="/images/car-insurance-agreement-with-toy-car-and-keys-2026-01-08-07-27-34-utc.webp"
                    alt="Insurance Agreement and Keys"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-[#0e2a47] text-white p-5 rounded-2xl shadow-md">
                  <div className="text-2xl sm:text-3xl font-extrabold text-red-400">100%</div>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">State Verified Documentation</div>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="bg-red-50 border border-red-100 p-5 rounded-2xl shadow-sm">
                  <Zap className="w-7 h-7 text-[#dc2626] mb-2" />
                  <div className="text-sm font-bold text-[#0e2a47]">Same-Day Transmission</div>
                  <div className="text-xs text-slate-600 mt-1">Direct to state licensing agency</div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5] bg-slate-100">
                  <Image
                    src="/images/signing-auto-insurance-document-with-car-key-and-c-2026-01-06-09-05-16-utc.webp"
                    alt="Signing SR22 Auto Insurance Documents"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Insurance Guidance</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0e2a47] tracking-tight leading-tight">
              {title}
            </h2>

            {bodyHtml ? (
              <div
                className="text-slate-600 leading-relaxed space-y-4 prose-content"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            ) : (
              <p className="text-slate-600 leading-relaxed">
                Filing an SR22 certificate satisfies state mandates so you can restore your driving privileges without unnecessary delays. We connect you with top-rated carriers offering cheap rates for high-risk drivers, non-owners, and those requiring electronic proof of liability coverage.
              </p>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-7 py-3.5 rounded-lg font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call An Agent: {siteData.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
