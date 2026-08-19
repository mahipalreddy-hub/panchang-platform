import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { defaultApiClient } from '@panchang/api-client';
import { INDIAN_CITIES } from '@panchang/astro-core';
import { PanchangHero } from '../../../../components/PanchangHero';
import { RahuKalamBadge } from '../../../../components/RahuKalamBadge';
import { ChoghadiyaTable } from '../../../../components/ChoghadiyaTable';
import { KundaliGrid } from '../../../../components/KundaliGrid';
import { StructuredData } from '../../../../components/StructuredData';
import { ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { formatDateToIndian } from '@panchang/ui';

interface PageProps {
  params: {
    city: string;
    date: string;
  };
}

export const revalidate = 86400; // ISR: 24 hours

export async function generateStaticParams() {
  const topCities = INDIAN_CITIES.slice(0, 10);
  const today = new Date();
  const params: { city: string; date: string }[] = [];

  // Generate today and tomorrow for top 10 cities
  for (let i = 0; i < 2; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    for (const city of topCities) {
      params.push({ city: city.slug, date: dateStr });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city, date } = params;
  const panchang = await defaultApiClient.getPanchang(city, date);
  const formattedDate = formatDateToIndian(date);

  return {
    title: `${panchang.cityName} Panchang ${formattedDate} - Today Tithi, Nakshatra & Rahu Kalam`,
    description: `Complete Vedic Panchang for ${panchang.cityName} on ${formattedDate}. Tithi: ${panchang.tithi.name} (${panchang.tithi.paksha} Paksha), Nakshatra: ${panchang.nakshatra.name}. Rahu Kalam: ${panchang.inauspicious.rahuKalam.start} - ${panchang.inauspicious.rahuKalam.end}. Abhijit Muhurat: ${panchang.auspicious.abhijitMuhurat.start}.`,
    keywords: [
      `${city} panchang today`,
      `panchang ${city} ${date}`,
      `rahu kalam ${city} today`,
      `${city} tithi today`,
      `${city} nakshatra today`,
      `choghadiya ${city}`
    ],
    alternates: {
      canonical: `https://vedicpanchang.internal/panchang/${city}/${date}`
    }
  };
}

export default async function PanchangDatePage({ params }: PageProps) {
  const { city, date } = params;

  let panchang;
  try {
    panchang = await defaultApiClient.getPanchang(city, date);
  } catch (e) {
    notFound();
  }

  // Calculate prev and next dates
  const currDateObj = new Date(date);
  const prevDateObj = new Date(currDateObj);
  prevDateObj.setDate(currDateObj.getDate() - 1);
  const prevDateStr = prevDateObj.toISOString().split('T')[0];

  const nextDateObj = new Date(currDateObj);
  nextDateObj.setDate(currDateObj.getDate() + 1);
  const nextDateStr = nextDateObj.toISOString().split('T')[0];

  return (
    <div className="space-y-8">
      <StructuredData panchang={panchang} />

      {/* Date Navigation Bar */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-amber-950/30 border border-amber-500/20">
        <Link
          href={`/panchang/${city}/${prevDateStr}`}
          className="flex items-center gap-1 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-100"
        >
          <ChevronLeft className="w-4 h-4" /> Previous Day ({prevDateStr})
        </Link>

        <div className="text-center">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">Viewing Date</span>
          <span className="text-sm sm:text-base font-serif font-bold text-amber-100">
            {formatDateToIndian(date)}
          </span>
        </div>

        <Link
          href={`/panchang/${city}/${nextDateStr}`}
          className="flex items-center gap-1 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-100"
        >
          Next Day ({nextDateStr}) <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Hero */}
      <PanchangHero panchang={panchang} />

      {/* Live Rahu Kalam Monitor */}
      <RahuKalamBadge rahuKalam={panchang.inauspicious.rahuKalam} cityName={panchang.cityName} />

      {/* Day & Night Choghadiya */}
      <ChoghadiyaTable choghadiya={panchang.choghadiya} />

      {/* Solar, Lunar & Seasonal Astronomical Details */}
      <div className="vedic-card p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" /> Cosmic Coordinates
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            Sun, Moon & Samvatsara Details for {panchang.cityName}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <span className="text-amber-400 font-medium block">Sun Sign (सूर्य राशि)</span>
            <span className="text-base font-serif font-bold text-amber-100 mt-1 block">
              {panchang.solarLunar.sunSign}
            </span>
            <span className="text-amber-300/60">Solar Month: {panchang.solarLunar.solarMonth}</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <span className="text-amber-400 font-medium block">Moon Sign (चन्द्र राशि)</span>
            <span className="text-base font-serif font-bold text-amber-100 mt-1 block">
              {panchang.solarLunar.moonSign}
            </span>
            <span className="text-amber-300/60">Lunar Month: {panchang.solarLunar.lunarMonthPurnimanta}</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <span className="text-amber-400 font-medium block">Ritu & Ayana (ऋतु व अयन)</span>
            <span className="text-base font-serif font-bold text-amber-100 mt-1 block">
              {panchang.solarLunar.ritu}
            </span>
            <span className="text-amber-300/60">{panchang.solarLunar.ayana}</span>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <span className="text-amber-400 font-medium block">Samvat Era (संवत्)</span>
            <span className="text-base font-serif font-bold text-amber-100 mt-1 block">
              Vikram {panchang.solarLunar.vikramSamvat}
            </span>
            <span className="text-amber-300/60">Shaka {panchang.solarLunar.shakaSamvat} • {panchang.solarLunar.samvatsara}</span>
          </div>
        </div>
      </div>

      {/* Planetary Positions */}
      {panchang.planetaryPositions && (
        <KundaliGrid planets={panchang.planetaryPositions} />
      )}
    </div>
  );
}