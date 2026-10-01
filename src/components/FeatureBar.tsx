import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileSpreadsheet, UserCheck, Phone, ArrowUpRight } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function FeatureBar() {
  const cards = [
    {
      title: 'Non-Owner SR22 Coverage',
      desc: 'Reinstate your driving privileges quickly without owning a vehicle. Ideal for borrowing cars or meeting court orders.',
      href: '/non-owner-sr22-insurance-philadelphia-pa',
      icon: ShieldCheck,
      isDark: false
    },
    {
      title: 'Instant Quotes & Low Rates',
      desc: 'Compare affordable high-risk rates across certified carriers. Lock in low down payments with rapid electronic filing.',
      href: '/sr22-insurance-quotes-philadelphia-pa',
      icon: FileSpreadsheet,
      isDark: true
    },
    {
      title: 'State Rules & Compliance',
      desc: 'Understand PennDOT filing durations, DL-123 requirements, and prevent policy lapses that restart your suspension.',
      href: '/sr22-insurance-requirements-philadelphia-pa',
      icon: UserCheck,
      isDark: false
    }
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          if (card.isDark) {
            return (
              <div
                key={idx}
                className="bg-[#0e2a47] text-white rounded-xl p-8 shadow-xl border-t-4 border-[#dc2626] flex flex-col justify-between transform md:-translate-y-4 hover:-translate-y-6 transition-all duration-300"
              >
                <div>
                  <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center text-red-400 mb-6">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {card.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-red-400 hover:text-white transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${siteData.phoneTel}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 py-1.5 rounded transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="bg-white text-slate-800 rounded-xl p-8 shadow-lg border border-slate-200/80 border-t-4 border-slate-300 hover:border-[#dc2626] flex flex-col justify-between hover:-translate-y-2 transition-all duration-300"
            >
              <div>
                <div className="w-14 h-14 rounded-lg bg-red-50 flex items-center justify-center text-[#dc2626] mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0e2a47]">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#dc2626] hover:text-[#b91c1c] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#dc2626] transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>{siteData.phoneNumber}</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
