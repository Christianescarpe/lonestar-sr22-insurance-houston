import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Phone,
  Clock,
  MapPin,
  ShieldCheck,
  Zap,
  PhoneCall,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import siteData from '@/data/siteData.json';
import LocationsGrid from '@/components/LocationsGrid';

export const metadata: Metadata = {
  title: 'Contact Us | LoneStar SR22 Insurance Houston | Phone Support & Filing',
  description: 'Contact LoneStar SR22 Insurance Houston. Call +1 (267) 310-0435 for fast, cheap SR-22 and FR-44 insurance quotes and same-day electronic filing to PennDOT.'
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 md:py-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider">
                <Phone className="w-4 h-4" />
                <span>DIRECT TELEPHONE ASSISTANCE & SAME-DAY FILING</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0e2a47] tracking-tight leading-[1.15]">
                Contact LoneStar SR22 Insurance Houston
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Need immediate help reinstating your suspended driver&apos;s license or securing an affordable SR-22 or FR-44 insurance policy? Speak directly with our licensed specialists. We transmit your certificate electronically so you can get back on the road without delay.
              </p>

              {/* Trust Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                  <span>Immediate Telephone Quotes</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                  <span>Direct Electronic PennDOT Filing</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                  <span>Owner & Non-Owner Policies</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626]" />
                  <span>No Waiting — Instant Confirmation</span>
                </div>
              </div>

              {/* Dedicated Phone CTA Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className="inline-flex items-center justify-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-4 rounded-lg font-extrabold text-base shadow-lg shadow-red-500/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <PhoneCall className="w-5 h-5 animate-bounce" />
                  <span>Call Now: {siteData.phoneNumber}</span>
                </a>

                <a
                  href="#map-section"
                  className="inline-flex items-center justify-center gap-2 bg-[#0e2a47] hover:bg-[#163b63] text-white px-6 py-4 rounded-lg font-bold text-base transition-colors text-center"
                >
                  <MapPin className="w-4 h-4" />
                  <span>View Map & Coverage</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/4] bg-slate-100">
                <Image
                  src="/images/insurance-agent-reviewing-car-coverage-with-custom-2026-01-08-07-32-47-utc.webp"
                  alt="Speak with a LoneStar SR22 Insurance agent"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2a47]/50 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white rounded-xl p-4 shadow-xl border border-slate-100 flex items-center gap-3.5 max-w-xs animate-float">
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 text-[#dc2626]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500">Live Agent Hotline</div>
                  <div className="text-sm font-extrabold text-[#0e2a47]">{siteData.phoneNumber}</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Mon - Sat: 8AM - 7PM EST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three High-Contrast Contact Cards matching template design */}
      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Phone Support */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/90 border-t-4 border-slate-300 hover:border-[#dc2626] flex flex-col justify-between transition-all">
              <div>
                <div className="w-14 h-14 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center mb-6">
                  <PhoneCall className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0e2a47] mb-2">Telephone Inquiries</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Connect immediately with a licensed SR22 agent for instant rate comparisons, electronic certificate submissions, or policy questions.
                </p>
                <div className="font-extrabold text-lg text-[#0e2a47] mb-1">
                  {siteData.phoneNumber}
                </div>
                <div className="text-xs text-slate-500">
                  Toll-free telephone assistance
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {siteData.phoneNumber}</span>
                </a>
              </div>
            </div>

            {/* Card 2: Hours & Processing (Navy highlighted card) */}
            <div className="bg-[#0e2a47] text-white rounded-2xl p-8 shadow-xl border-t-4 border-[#dc2626] flex flex-col justify-between transform md:-translate-y-3 transition-all">
              <div>
                <div className="w-14 h-14 rounded-xl bg-white/10 text-red-400 flex items-center justify-center mb-6">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Operating Hours</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  Our specialists are ready to process your electronic certificate submission directly to state licensing databases.
                </p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-200">
                    <span>Monday – Saturday:</span>
                    <span className="font-bold text-white">8:00 AM – 7:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Sunday:</span>
                    <span>Closed (Emergency support)</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-700/60">
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow shadow-red-600/30"
                >
                  <Zap className="w-4 h-4" />
                  <span>Fast Electronic Filing</span>
                </a>
              </div>
            </div>

            {/* Card 3: Statewide Reinstatement */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-slate-200/90 border-t-4 border-slate-300 hover:border-[#dc2626] flex flex-col justify-between transition-all">
              <div>
                <div className="w-14 h-14 rounded-xl bg-red-50 text-[#dc2626] flex items-center justify-center mb-6">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0e2a47] mb-2">Statewide Coverage</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  We provide SR-22 and FR-44 filing across all Pennsylvania cities including Philadelphia, Pittsburgh, Allentown, Erie, Reading, Scranton, and Harrisburg.
                </p>
                <div className="font-bold text-sm text-[#0e2a47]">
                  Electronic State Transmission
                </div>
                <div className="text-xs text-slate-500">
                  Direct connection with PennDOT database
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0e2a47] hover:bg-[#163b63] text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Speak With An Agent</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Interactive Google Map Section */}
      <section id="map-section" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[#dc2626] text-xs font-extrabold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4" />
              <span>Location & Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0e2a47] tracking-tight">
              Our Location & Service Coverage
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Serving drivers statewide with rapid electronic insurance certificates and license reinstatement.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d443005.0145939474!2d-95.46119!3d29.836095!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2325291572b78755%3A0xc2c94ac07120a25a!2s!5e0!3m2!1sen!2sph!4v1790862931479!5m2!1sen!2sph"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="LoneStar SR22 Insurance Houston Location Map"
              className="w-full h-80 sm:h-96 md:h-[480px]"
            ></iframe>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#dc2626] flex-shrink-0" />
              <div>
                <div className="font-bold text-[#0e2a47] text-base">
                  Legacy SR22 Insurance Philadelphia / LoneStar SR22 Insurance Houston
                </div>
                <div className="text-xs text-slate-500">
                  Electronic filing service active throughout Pennsylvania & multi-state
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://maps.app.goo.gl/2u9v8YJWn4q9Edzu5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0e2a47] hover:text-[#dc2626] bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-xs"
              >
                <span>Find Us on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {siteData.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Locations Grid */}
      <LocationsGrid />
    </div>
  );
}
