import React from 'react';
import { Phone, Check, Shield } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function PricingCards() {
  const plans = [
    {
      name: 'Non-Owner SR22',
      tag: 'Budget Friendly',
      description: 'Cheapest filing for drivers who do not own a vehicle but need their license reinstated.',
      price: '$35',
      period: '/mo est.',
      features: [
        'State-mandated liability coverage',
        'Electronic transmission to PennDOT',
        'No vehicle ownership required',
        'Protects borrowed or rented cars',
        'Instant digital proof of insurance'
      ],
      isPopular: false
    },
    {
      name: 'Standard Owner SR22',
      tag: 'Most Popular',
      description: 'Comprehensive coverage and SR22 endorsement attached to your personal automobile.',
      price: '$65',
      period: '/mo est.',
      features: [
        'Complete bodily injury & property liability',
        'Same-day electronic SR22 certificate',
        'Flexible monthly payment options',
        'Coverage for all household drivers',
        'Full roadside assistance available'
      ],
      isPopular: true
    },
    {
      name: 'High-Risk & FR-44',
      tag: 'Major Violations',
      description: 'Specialized policies for DUI/DWI, multiple infractions, or license revocation restoration.',
      price: '$95',
      period: '/mo est.',
      features: [
        'Increased liability limits as required by court',
        'Rapid filing with state authorities',
        'Lapse prevention & dedicated monitoring',
        'Assistance with PennDOT DL-123 forms',
        'Priority specialist support'
      ],
      isPopular: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider mb-2">
            <Shield className="w-4 h-4" />
            <span>Transparent Rates & Quotes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e2a47] tracking-tight">
            Compare SR-22 Coverage Options
          </h2>
          <p className="text-slate-600 mt-3 text-base sm:text-lg">
            Exact pricing depends on your driving record and county. Call our specialists to lock in your lowest custom rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 bg-white flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? 'border-2 border-[#dc2626] shadow-2xl relative transform lg:-translate-y-3'
                  : 'border border-slate-200 shadow-md hover:shadow-xl'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#dc2626] text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow">
                  {plan.tag}
                </div>
              )}

              <div>
                <div className="text-center pb-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-[#0e2a47]">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
                  
                  <div className="mt-4 flex items-baseline justify-center gap-1">
                    <span className="text-4xl sm:text-5xl font-extrabold text-[#0e2a47]">
                      {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-slate-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-sm text-slate-600">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#dc2626] mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Phone CTA Button Only */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow ${
                    plan.isPopular
                      ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-white shadow-red-500/20'
                      : 'bg-[#0e2a47] hover:bg-[#163b63] text-white'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call to Quote</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
