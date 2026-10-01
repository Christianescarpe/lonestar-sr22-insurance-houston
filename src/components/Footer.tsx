import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ShieldCheck, Clock, ExternalLink } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function Footer() {
  return (
    <footer className="bg-[#0b1a2c] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      {/* Top CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-[#0e2a47] to-[#163b63] rounded-2xl p-8 sm:p-10 border border-slate-700/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-red-400 font-bold uppercase tracking-wider text-xs sm:text-sm">
              Ready to Reinstate Your License?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Speak With A Licensed SR22 Specialist Today
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              Instant electronic certificate filing with low-cost monthly rates. Call us directly for immediate quotes and state compliance.
            </p>
          </div>
          <div className="flex-shrink-0">
            <a
              href={`tel:${siteData.phoneTel}`}
              className="inline-flex items-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-8 py-4 rounded-xl font-extrabold text-base shadow-lg hover:shadow-red-600/30 transition-all transform hover:-translate-y-1"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              <span>Call: {siteData.phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Company Profile & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-white p-1">
                <Image
                  src="/images/logo.png"
                  alt="LoneStar SR22 Insurance Houston"
                  width={64}
                  height={64}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white block leading-tight">
                  LONESTAR
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400 font-semibold">
                  SR22 Insurance Houston
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Providing fast, reliable SR-22 and FR-44 insurance certificates, license reinstatement solutions, and high-risk auto coverage tailored to your budget.
            </p>

            <div className="pt-2 space-y-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <a
                  href={`tel:${siteData.phoneTel}`}
                  className="font-bold text-white hover:text-red-400 transition-colors"
                >
                  {siteData.phoneNumber}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span>Mon - Sat: 8:00 AM - 7:00 PM EST</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span>Direct State Electronic Filing</span>
              </div>
            </div>
          </div>

          {/* Column 2: SR22 Services */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              SR22 Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteData.services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/${service.slug}`}
                    className="hover:text-red-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{service.pageName}</span>
                    <span className="text-slate-600 group-hover:text-red-400">→</span>
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="text-white font-bold text-base uppercase tracking-wider mt-6 mb-3 border-b border-slate-700/60 pb-2">
              Driver Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blogs"
                  className="hover:text-red-400 transition-colors font-medium flex items-center justify-between"
                >
                  <span>All SR-22 Blogs & Guides</span>
                  <span className="text-slate-600">→</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-red-400 transition-colors font-medium flex items-center justify-between"
                >
                  <span>Contact Us & Map</span>
                  <span className="text-slate-600">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Locations Covered */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2">
              Pennsylvania Cities
            </h4>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
              {siteData.locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="hover:text-red-400 transition-colors truncate block"
                >
                  {loc.pageName.replace('SR22 Insurance ', '')}
                </Link>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
              Need assistance in another city? Call us directly for immediate multi-state and Pennsylvania statewide coverage.
            </div>
          </div>

          {/* Column 4: Visible Embedded Google Map */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-4 border-b border-slate-700/60 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Location & Coverage</span>
            </h4>
            
            {/* Embedded Google Map as requested */}
            <div className="rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d443005.0145939474!2d-95.46119!3d29.836095!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2325291572b78755%3A0xc2c94ac07120a25a!2s!5e0!3m2!1sen!2sph!4v1790862931479!5m2!1sen!2sph"
                width="100%"
                height="230"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="LoneStar SR22 Insurance Houston Location Map"
                className="w-full h-56"
              ></iframe>
            </div>

            <div className="mt-3 text-center">
              <a
                href={`tel:${siteData.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-2.5 px-4 rounded-md font-bold text-sm transition-colors shadow"
              >
                <Phone className="w-4 h-4" />
                <span>Call {siteData.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteData.companyName}. All rights reserved.</p>
          <p className="max-w-xl text-slate-400">
            SR-22 and FR-44 certificates are filed electronically. Driving privilege reinstatement is subject to state regulatory approval.
          </p>
        </div>
      </div>
    </footer>
  );
}
