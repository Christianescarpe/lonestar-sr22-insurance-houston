import React from 'react';
import { PhoneCall } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function FloatingCallButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end">
      <a
        href={`tel:${siteData.phoneTel}`}
        aria-label="Call SR22 Specialist"
        className="flex items-center gap-2 bg-[#dc2626] text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-[#b91c1c] active:scale-95 transition-all animate-pulse-subtle border-2 border-white"
      >
        <PhoneCall className="w-5 h-5 animate-bounce" />
        <span className="font-bold text-sm tracking-wide">Call Now</span>
      </a>
    </div>
  );
}
