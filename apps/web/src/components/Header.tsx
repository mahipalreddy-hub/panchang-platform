'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, Compass, BookOpen, Menu, X, Sparkles } from 'lucide-react';
import { CityConfig } from '@panchang/types';

interface HeaderProps {
  currentCity?: CityConfig;
  onOpenCitySelector?: () => void;
}

export function Header({ currentCity, onOpenCitySelector }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const todayDate = new Date().toISOString().split('T')[0];
  const citySlug = currentCity?.slug || 'delhi';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-vedic-bg/90 border-b border-vedic-saffron/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Emblem */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-red-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-vedic-bg rounded-full flex items-center justify-center">
                <span className="text-xl font-serif font-bold gold-gradient-text">ॐ</span>
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-serif font-bold text-amber-100 tracking-wide flex items-center gap-1.5">
                Vedic Panchang <Sparkles className="w-4 h-4 text-amber-400 opacity-80" />
              </span>
              <p className="text-xs text-amber-300/70 font-sans tracking-wider uppercase">Vedic Astronomy & Muhurat</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/panchang/${citySlug}/${todayDate}`}
              className="text-sm font-medium text-amber-100/90 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4 text-amber-500" /> Today's Panchang
            </Link>
            <Link
              href="/muhurat-finder"
              className="text-sm font-medium text-amber-100/90 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Clock className="w-4 h-4 text-amber-500" /> Muhurat Finder
            </Link>
            <Link
              href="/festivals"
              className="text-sm font-medium text-amber-100/90 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-4 h-4 text-amber-500" /> Festivals 2026
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-amber-100/90 hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-amber-500" /> Astrology Guides
            </Link>
          </nav>

          {/* City Selector Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCitySelector}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs sm:text-sm hover:bg-amber-900/40 hover:border-amber-400 transition-all shadow-sm"
              title="Change City"
            >
              <MapPin className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="font-medium">{currentCity?.name || 'New Delhi'}</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-amber-200 hover:text-amber-400 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-vedic-card/95 border-b border-amber-500/20 px-4 pt-2 pb-6 space-y-3">
          <Link
            href={`/panchang/${citySlug}/${todayDate}`}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-amber-100 hover:text-amber-400"
          >
            <Calendar className="w-4 h-4 text-amber-400" /> Today's Panchang
          </Link>
          <Link
            href="/muhurat-finder"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-amber-100 hover:text-amber-400"
          >
            <Clock className="w-4 h-4 text-amber-400" /> Muhurat Finder
          </Link>
          <Link
            href="/festivals"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-amber-100 hover:text-amber-400"
          >
            <Compass className="w-4 h-4 text-amber-400" /> Festival Calendar
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 py-2 text-amber-100 hover:text-amber-400"
          >
            <BookOpen className="w-4 h-4 text-amber-400" /> Astrology Guides
          </Link>
        </div>
      )}
    </header>
  );
}