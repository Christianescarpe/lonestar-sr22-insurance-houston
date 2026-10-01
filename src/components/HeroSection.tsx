import React from 'react';
import Image from 'next/image';
import { Phone, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import siteData from '@/data/siteData.json';

interface HeroSectionProps {
  title: string;
  introHtml: string;
  image?: string;
  badge?: string;
}

export default function HeroSection({
  title,
  introHtml,
  image = '/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp',
  badge = 'OFFICIAL SR22 FILING & HIGH-RISK INSURANCE'
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 md:py-20 overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2a47] tracking-tight leading-[1.15]">
              {title}
            </h1>

            {/* Introductory text from sheet */}
            <div
              className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal prose-intro"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            />

            {/* Key trust bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                <span>Same-Day Certificate Filing</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                <span>Owner & Non-Owner Coverage</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                <span>Lowest Rates for High-Risk Drivers</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                <span>Direct Electronic PennDOT Support</span>
              </div>
            </div>

            {/* CTA Buttons - Phone CTA Only as requested */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center justify-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-4 rounded-lg font-extrabold text-base shadow-lg shadow-red-500/20 hover:shadow-xl hover:shadow-red-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Phone className="w-5 h-5 animate-bounce" />
                <span>Call Now: {siteData.phoneNumber}</span>
              </a>

              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 bg-[#0e2a47] hover:bg-[#163b63] text-white px-6 py-4 rounded-lg font-bold text-base transition-colors text-center"
              >
                <span>Read Coverage Details</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Image with Floating Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer stylish border */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/4]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a47]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Trust Badge */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white rounded-xl p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-xs animate-float">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 text-[#dc2626]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500">Need Immediate Help?</div>
                  <div className="text-sm font-extrabold text-[#0e2a47]">
                    {siteData.phoneNumber}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium">Licensed Agents Standing By</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
