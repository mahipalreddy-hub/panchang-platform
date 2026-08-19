import React from 'react';
import { PanchangData } from '@panchang/types';
import { Sun, Moon, Sunrise, Sunset, Sparkles, Star, Compass, Clock } from 'lucide-react';
import { formatDateToIndian } from '@panchang/ui';

interface PanchangHeroProps {
  panchang: PanchangData;
}

export function PanchangHero({ panchang }: PanchangHeroProps) {
  const { tithi, nakshatra, yoga, karana, solarLunar, dayOfWeek, dayOfWeekDevanagari, cityName, date } = panchang;

  return (
    <div className="space-y-6">
      {/* Header Title Card */}
      <div className="vedic-card-glow p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl font-serif text-amber-300">
          ॐ
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" /> Drik Ganita Vedic Almanac
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100">
              Daily Panchang for {cityName}
            </h1>
            <p className="text-sm sm:text-base text-amber-200/80 mt-1 font-serif">
              {dayOfWeek} ({dayOfWeekDevanagari}) • {formatDateToIndian(date)} • Vikram Samvat {solarLunar.vikramSamvat}
            </p>
          </div>

          {/* Sun & Moon Quick Glance */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/20">
              <Sunrise className="w-5 h-5 text-amber-400" />
              <div>
                <span className="text-[10px] uppercase text-amber-300/70 block">Sunrise</span>
                <span className="text-sm font-bold text-amber-100">{solarLunar.sunrise}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/20">
              <Sunset className="w-5 h-5 text-rose-400" />
              <div>
                <span className="text-[10px] uppercase text-amber-300/70 block">Sunset</span>
                <span className="text-sm font-bold text-amber-100">{solarLunar.sunset}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Five Limbs of Panchang (Pancha-Anga) Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-amber-500/20">
          {/* Limb 1: Tithi */}
          <div className="p-4 rounded-xl bg-vedic-card border border-amber-500/25 relative">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span className="font-semibold uppercase tracking-wider">1. Tithi (तिथि)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/50 text-amber-200">
                {tithi.paksha} Paksha
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              {tithi.name} <span className="text-sm font-normal text-amber-300/70">({tithi.nameDevanagari})</span>
            </h3>
            <p className="text-xs text-amber-200/70 mt-1">Upto {tithi.endTime}</p>
            <p className="text-[11px] text-amber-300/60 mt-2 line-clamp-2">{tithi.description}</p>
          </div>

          {/* Limb 2: Nakshatra */}
          <div className="p-4 rounded-xl bg-vedic-card border border-amber-500/25 relative">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span className="font-semibold uppercase tracking-wider">2. Nakshatra (नक्षत्र)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/50 text-amber-200">
                Pada {nakshatra.pada}
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              {nakshatra.name} <span className="text-sm font-normal text-amber-300/70">({nakshatra.nameDevanagari})</span>
            </h3>
            <p className="text-xs text-amber-200/70 mt-1">Lord: {nakshatra.ruler} • Upto {nakshatra.endTime}</p>
            <p className="text-[11px] text-amber-300/60 mt-2 line-clamp-2">{nakshatra.description}</p>
          </div>

          {/* Limb 3: Yoga */}
          <div className="p-4 rounded-xl bg-vedic-card border border-amber-500/25 relative">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span className="font-semibold uppercase tracking-wider">3. Yoga (योग)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/50 text-amber-200">
                Yoga #{yoga.number}
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              {yoga.name} <span className="text-sm font-normal text-amber-300/70">({yoga.nameDevanagari})</span>
            </h3>
            <p className="text-xs text-amber-200/70 mt-1">Upto {yoga.endTime}</p>
            <p className="text-[11px] text-amber-300/60 mt-2 line-clamp-2">{yoga.meaning}</p>
          </div>

          {/* Limb 4: Karana */}
          <div className="p-4 rounded-xl bg-vedic-card border border-amber-500/25 relative">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-1">
              <span className="font-semibold uppercase tracking-wider">4. Karana (करण)</span>
              <span className={`text-[10px] px-2 py-0.5 rounded ${karana.isBhadra ? 'bg-rose-900 text-rose-200' : 'bg-emerald-900 text-emerald-200'}`}>
                {karana.isBhadra ? 'Bhadra Active' : 'Bhadra Free'}
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-amber-100">
              {karana.name} <span className="text-sm font-normal text-amber-300/70">({karana.nameDevanagari})</span>
            </h3>
            <p className="text-xs text-amber-200/70 mt-1">{karana.type} Karana • Upto {karana.endTime}</p>
            <p className="text-[11px] text-amber-300/60 mt-2">
              {karana.isBhadra ? 'Vishti Karana: Avoid starting auspicious works.' : 'Favorable for general productive actions.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}