import React from 'react';
import { Metadata } from 'next';
import { defaultApiClient } from '@panchang/api-client';
import { Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import { formatDateToIndian } from '@panchang/ui';

export const metadata: Metadata = {
  title: 'Hindu Festival Calendar 2026 - All Vrats, Dates & Puja Muhurat',
  description: 'Complete list of Hindu festivals, Ekadashi, Purnima, Sankranti, and Maha Shivratri dates with exact puja timings and spiritual significance.',
  keywords: ['hindu festivals 2026', 'ekadashi calendar 2026', 'diwali date 2026', 'holi 2026 date', 'maha shivratri 2026 muhurat']
};

export default async function FestivalsPage() {
  const festivalsData = await defaultApiClient.getFestivals(2026);

  return (
    <div className="space-y-8">
      <div className="vedic-card-glow p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
          <Sparkles className="w-4 h-4" /> Sacred Almanac
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
          Hindu Festival Calendar 2026
        </h1>
        <p className="text-sm text-amber-200/80 max-w-3xl leading-relaxed">
          Comprehensive dates, tithi timings, and certified Puja Muhurats for all major Sanatana Dharma festivals, fasts, and regional commemorations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {festivalsData.festivals.map(fest => (
          <div key={fest.id} className="p-6 rounded-2xl bg-vedic-card border border-amber-500/25 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase text-amber-400 font-semibold">{fest.dayOfWeek} • {fest.lunarMonth} {fest.paksha}</span>
                <h3 className="text-2xl font-serif font-bold text-amber-100 mt-0.5">
                  {fest.name} <span className="text-base font-normal text-amber-300/80">({fest.nameDevanagari})</span>
                </h3>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-900/40 border border-amber-500/30 text-amber-200 font-mono">
                {fest.date}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-amber-100/80 leading-relaxed">
              {fest.significance}
            </p>

            {fest.pujaMuhurat && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300">{fest.pujaMuhurat.description}:</span>
                <span className="font-mono font-bold text-amber-100">
                  {fest.pujaMuhurat.start} – {fest.pujaMuhurat.end}
                </span>
              </div>
            )}

            {fest.rituals && (
              <div className="space-y-1 text-xs">
                <span className="font-semibold text-amber-400">Key Rituals:</span>
                <ul className="list-disc list-inside text-amber-200/70 space-y-0.5">
                  {fest.rituals.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}