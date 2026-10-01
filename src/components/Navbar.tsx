'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, ChevronDown, Menu, X, Shield, Clock } from 'lucide-react';
import siteData from '@/data/siteData.json';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Notification / Contact Bar */}
      <div className="bg-[#0e2a47] text-white text-xs sm:text-sm py-2 px-4 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-blue-200">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>Mon - Sat: 8:00 AM - 7:00 PM EST</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-blue-200">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Electronic Filing to PennDOT</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 ml-auto">
            <span className="text-gray-300 hidden sm:inline">Need Immediate Assistance?</span>
            <a
              href={`tel:${siteData.phoneTel}`}
              className="inline-flex items-center gap-1.5 font-bold text-white bg-[#dc2626] hover:bg-[#b91c1c] px-3 py-1 rounded transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{siteData.phoneNumber}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-14 h-14 overflow-hidden rounded">
            <Image
              src="/images/logo.png"
              alt="LoneStar SR22 Insurance Houston"
              width={80}
              height={80}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0e2a47] leading-none">
              LONESTAR
            </span>
            <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-gray-600">
              SR22 Insurance Houston
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 font-medium text-sm text-slate-700">
          <Link
            href="/"
            className="px-3 py-2 rounded-md hover:text-[#dc2626] hover:bg-slate-50 transition-colors"
          >
            Home
          </Link>

          {/* SR22 Insurance Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="px-3 py-2 rounded-md hover:text-[#dc2626] flex items-center gap-1 group-hover:text-[#dc2626] transition-colors"
            >
              <span>SR22 Insurance</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 hidden group-hover:block animate-fade-in">
              <div className="px-4 py-2 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Services & Filing Options
              </div>
              {siteData.services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-red-50 hover:text-[#dc2626] transition-colors"
                >
                  <div className="font-semibold">{service.pageName}</div>
                  <div className="text-xs text-gray-500 truncate">{service.seoTitle}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Locations Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setLocationsOpen(!locationsOpen)}
              className="px-3 py-2 rounded-md hover:text-[#dc2626] flex items-center gap-1 group-hover:text-[#dc2626] transition-colors"
            >
              <span>Locations</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>

            <div className="absolute top-full left-0 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 hidden group-hover:block animate-fade-in max-h-96 overflow-y-auto">
              <div className="px-4 py-2 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Pennsylvania Cities Covered
              </div>
              {siteData.locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#dc2626] transition-colors"
                >
                  <span className="font-medium">{loc.pageName}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Blogs Link */}
          <Link
            href="/blogs"
            className="px-3 py-2 rounded-md hover:text-[#dc2626] hover:bg-slate-50 transition-colors"
          >
            Blogs
          </Link>

          {/* Contact Us Link */}
          <Link
            href="/contact-us"
            className="px-3 py-2 rounded-md hover:text-[#dc2626] hover:bg-slate-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* CTA Phone Button (Header Right) */}
        <div className="hidden lg:flex items-center">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="inline-flex items-center gap-2.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-5 py-3 rounded-md font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>Call: {siteData.phoneNumber}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden gap-2">
          <a
            href={`tel:${siteData.phoneTel}`}
            className="inline-flex items-center justify-center p-2 rounded-md bg-[#dc2626] text-white shadow-sm"
            aria-label="Call Now"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:text-[#dc2626] hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto shadow-inner">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-md font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home
            </Link>

            <div className="border-t border-gray-100 pt-2 pb-1">
              <div className="px-3 py-1 text-xs font-bold text-[#dc2626] uppercase tracking-wider">
                SR22 Insurance Services
              </div>
              {siteData.services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-slate-700 hover:text-[#dc2626] hover:bg-slate-50"
                >
                  {service.pageName}
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-2 pb-1">
              <div className="px-3 py-1 text-xs font-bold text-[#0e2a47] uppercase tracking-wider">
                Locations Covered
              </div>
              <div className="grid grid-cols-2 gap-1 px-2">
                {siteData.locations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/${loc.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1.5 text-xs text-slate-700 hover:text-[#dc2626] hover:bg-slate-50 rounded"
                  >
                    {loc.pageName.replace('SR22 Insurance ', '')}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-2 pb-1 space-y-1">
              <Link
                href="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:text-[#dc2626] hover:bg-slate-50"
              >
                Blogs
              </Link>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-semibold text-slate-800 hover:text-[#dc2626] hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </div>

            <div className="pt-4">
              <a
                href={`tel:${siteData.phoneTel}`}
                className="w-full flex items-center justify-center gap-2 bg-[#dc2626] text-white py-3 rounded-md font-bold text-center shadow"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now: {siteData.phoneNumber}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
