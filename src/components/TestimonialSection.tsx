import React from 'react';
import { Star, Quote, Phone, CheckCircle2 } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 text-[#dc2626] mb-6">
          <Quote className="w-6 h-6" />
        </div>

        <div className="text-xs sm:text-sm font-extrabold text-[#dc2626] uppercase tracking-wider mb-2">
          Verified Driver Satisfaction
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e2a47] tracking-tight mb-6">
          2,000+ Drivers Reinstated
        </h2>

        <div className="flex items-center justify-center gap-1 text-amber-400 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-amber-400" />
          ))}
        </div>

        <blockquote className="text-lg sm:text-xl text-slate-700 leading-relaxed italic max-w-2xl mx-auto font-medium">
          &ldquo;We worked with LoneStar SR22 Insurance. The representative was very knowledgeable and helpful, explaining state requirements clearly and securing a policy that fit our budget within minutes.&rdquo;
        </blockquote>

        <div className="mt-6 flex flex-col items-center justify-center">
          <div className="font-bold text-base text-[#0e2a47]">Philadelphia Driver</div>
          <div className="text-xs text-slate-500">PennDOT Certified Reinstatement</div>
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-3 text-left">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <div className="text-sm font-semibold text-slate-800">
              Need immediate license restoration? Call now for fast electronic processing.
            </div>
          </div>
          <a
            href={`tel:${siteData.phoneTel}`}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{siteData.phoneNumber}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
