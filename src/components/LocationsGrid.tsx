import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function LocationsGrid() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>Statewide Coverage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e2a47] tracking-tight">
            SR22 Insurance Locations Across Pennsylvania
          </h2>
          <p className="text-slate-600 mt-2 text-base">
            Select your city below for local rate factors, PennDOT requirements, and reinstatement guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {siteData.locations.map((loc) => {
            const cityName = loc.pageName.replace('SR22 Insurance ', '').replace(' PA', '');
            return (
              <Link
                key={loc.slug}
                href={`/${loc.slug}`}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#dc2626] transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-red-50 text-[#dc2626] flex items-center justify-center flex-shrink-0 group-hover:bg-[#dc2626] group-hover:text-white transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-sm text-[#0e2a47] group-hover:text-[#dc2626] transition-colors truncate">
                    {cityName}, PA
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span>View Rates</span>
                  <ArrowRight className="w-3 h-3 text-[#dc2626] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-white px-6 py-4 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-sm font-semibold text-slate-700">
              Don&apos;t see your municipality? We provide electronic filing for all Pennsylvania drivers.
            </span>
            <a
              href={`tel:${siteData.phoneTel}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-2 rounded-lg transition-colors shadow"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {siteData.phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
