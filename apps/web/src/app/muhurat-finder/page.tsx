import React from 'react';
import { Metadata } from 'next';
import { defaultApiClient } from '@panchang/api-client';
import { MuhuratCategory } from '@panchang/types';
import { Clock, Calendar, CheckCircle2, AlertTriangle, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Interactive Shubh Muhurat Finder 2026 | Wedding, Griha Pravesh & Vehicle Timing',
  description: 'Find auspicious dates, certified Lagna timings, and planetary windows for Vivah (Marriage), Griha Pravesh, Property, and Vehicle purchases.',
  keywords: ['muhurat finder', 'wedding muhurat 2026', 'griha pravesh muhurat 2026', 'shubh muhurat dates', 'vehicle purchase auspicious timings']
};

interface MuhuratPageProps {
  searchParams: {
    type?: MuhuratCategory;
    city?: string;
    from?: string;
    to?: string;
  };
}

export default async function MuhuratFinderPage({ searchParams }: MuhuratPageProps) {
  const type = searchParams.type || 'wedding';
  const city = searchParams.city || 'delhi';
  const today = new Date().toISOString().split('T')[0];
  const from = searchParams.from || today;
  
  const future = new Date();
  future.setDate(future.getDate() + 90);
  const to = searchParams.to || future.toISOString().split('T')[0];

  const muhuratData = await defaultApiClient.getMuhurat(type, from, to, city);

  const categories: { id: MuhuratCategory; label: string }[] = [
    { id: 'wedding', label: 'Vivah (Wedding)' },
    { id: 'griha-pravesh', label: 'Griha Pravesh' },
    { id: 'vehicle-purchase', label: 'Vehicle Purchase' },
    { id: 'property-purchase', label: 'Property Registration' },
    { id: 'business-opening', label: 'Business Opening' },
    { id: 'namakaran', label: 'Namakaran' },
    { id: 'mundan', label: 'Mundan' },
    { id: 'vidyarambha', label: 'Vidyarambha' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="vedic-card-glow p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <Sparkles className="w-4 h-4" /> Vedic Astrology Matchmaker
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          Shubh Muhurat Finder
        </h1>
        <p className="text-sm text-amber-200/80 max-w-3xl leading-relaxed">
          Filter certified auspicious windows evaluated using classical Vedic astronomy, Nakshatra lordships, and complete Bhadra/Rahu Kalam avoidance.
        </p>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map(c => (
            <Link
              key={c.id}
              href={`/muhurat-finder?type=${c.id}&city=${city}`}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                type === c.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-amber-950/40 text-amber-200/80 hover:bg-amber-900/40 border border-amber-500/20'
              }`}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-serif font-bold text-amber-200">
          Found {muhuratData.totalWindows} Auspicious Dates for {categories.find(c => c.id === type)?.label} ({from} to {to})
        </span>
      </div>

      {/* Muhurat Windows Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {muhuratData.windows.map((win, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-vedic-card border border-amber-500/25 space-y-4 hover:border-amber-400/50 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase text-amber-400 font-semibold">{win.dayOfWeek}</span>
                <h3 className="text-xl font-serif font-bold text-amber-100">{win.date}</h3>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                  Score: {win.score}/100
                </span>
              </div>
            </div>

            {/* Time Slot Highlight */}
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-between text-xs">
              <span className="text-amber-200/80 font-medium">Auspicious Window:</span>
              <span className="font-mono font-bold text-amber-100 text-sm">
                {win.startTime} – {win.endTime} <span className="text-[11px] font-sans font-normal text-amber-300/60">({win.durationFormatted})</span>
              </span>
            </div>

            {/* Panchang factors */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/10">
                <span className="text-amber-400/70 text-[10px] uppercase block">Tithi</span>
                <span className="text-amber-100 font-medium">{win.tithi}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/10">
                <span className="text-amber-400/70 text-[10px] uppercase block">Nakshatra</span>
                <span className="text-amber-100 font-medium">{win.nakshatra}</span>
              </div>
            </div>

            {/* Favorable points */}
            <div className="space-y-1.5 pt-2 border-t border-amber-500/15">
              {win.favorableFactors.map((fact, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{fact}</span>
                </div>
              ))}
              {win.cautions.map((caut, cIdx) => (
                <div key={cIdx} className="flex items-center gap-2 text-[11px] text-amber-300/80">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
                  <span>{caut}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}