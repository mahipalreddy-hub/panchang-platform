'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Sparkles, Check, Compass } from 'lucide-react';
import { MuhuratCategory } from '@panchang/types';

export function MuhuratFinderWidget() {
  const [selectedType, setSelectedType] = useState<MuhuratCategory>('wedding');

  const categories: { id: MuhuratCategory; name: string; icon: string }[] = [
    { id: 'wedding', name: 'Vivah (Wedding)', icon: '💍' },
    { id: 'griha-pravesh', name: 'Griha Pravesh', icon: '🏡' },
    { id: 'vehicle-purchase', name: 'Vehicle Purchase', icon: '🚗' },
    { id: 'property-purchase', name: 'Property Registration', icon: '📜' },
    { id: 'business-opening', name: 'Business Opening', icon: '🏬' },
    { id: 'namakaran', name: 'Namakaran', icon: '👶' }
  ];

  return (
    <div className="vedic-card p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" /> Astrological Matchmaker
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            Interactive Muhurat Finder
          </h2>
          <p className="text-xs text-amber-300/70 mt-0.5">
            Select an event to calculate auspicious dates and certified Lagna timings.
          </p>
        </div>

        <Link
          href={`/muhurat-finder?type=${selectedType}`}
          className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium transition-all shadow-md"
        >
          Explore All Dates <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Category Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedType(cat.id)}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedType === cat.id
                ? 'bg-amber-900/60 border-amber-400 shadow-md shadow-amber-900/30'
                : 'bg-amber-950/20 border-amber-500/20 hover:bg-amber-950/40 text-amber-200/80'
            }`}
          >
            <span className="text-xl mb-1 block">{cat.icon}</span>
            <span className="text-xs font-medium text-amber-100 block">{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Quick Launch CTA */}
      <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-amber-200/80">
          <span className="font-semibold text-amber-300">Evaluating 12+ Vedic parameters:</span> Tithi, Nakshatra, Yoga, Bhadra avoidance, planetary combustion & Rahu Kalam filtering.
        </div>
        <Link
          href={`/muhurat-finder?type=${selectedType}`}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-semibold hover:from-amber-500 hover:to-amber-400 transition-all shadow-md"
        >
          Calculate {categories.find(c => c.id === selectedType)?.name} Muhurat <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}