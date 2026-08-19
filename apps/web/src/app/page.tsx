import React from 'react';
import Link from 'next/link';
import { defaultApiClient } from '@panchang/api-client';
import { PanchangHero } from '../components/PanchangHero';
import { RahuKalamBadge } from '../components/RahuKalamBadge';
import { ChoghadiyaTable } from '../components/ChoghadiyaTable';
import { MuhuratFinderWidget } from '../components/MuhuratFinderWidget';
import { KundaliGrid } from '../components/KundaliGrid';
import { StructuredData } from '../components/StructuredData';
import { Calendar, ArrowRight, Sparkles, Sun, Moon, ShieldCheck, HelpCircle } from 'lucide-react';

export const revalidate = 43200; // ISR: 12 hours

export default async function HomePage() {
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultCity = 'delhi';

  const [panchang, festivalsData, blogPosts] = await Promise.all([
    defaultApiClient.getPanchang(defaultCity, todayStr),
    defaultApiClient.getFestivals(2026),
    defaultApiClient.getBlogPosts()
  ]);

  return (
    <div className="space-y-10">
      {/* Structured SEO Data (Event, FAQ, Breadcrumbs) */}
      <StructuredData panchang={panchang} />

      {/* Main Hero: Today's Panchang */}
      <PanchangHero panchang={panchang} />

      {/* Live Rahu Kalam Monitor */}
      <RahuKalamBadge rahuKalam={panchang.inauspicious.rahuKalam} cityName={panchang.cityName} />

      {/* Quick Muhurat Matchmaker Widget */}
      <MuhuratFinderWidget />

      {/* Day & Night Choghadiya Table */}
      <ChoghadiyaTable choghadiya={panchang.choghadiya} />

      {/* Two Column Section: Auspicious Timings & Planetary Kundali */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Auspicious & Inauspicious Summary */}
        <div className="vedic-card p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" /> Shubh & Ashubh Windows
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Auspicious & Inauspicious Timings
            </h2>
            <p className="text-xs text-amber-300/70">
              Precise solar divisions for {panchang.cityName} on {panchang.date}.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {/* Abhijit Muhurat */}
            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
              <div>
                <span className="font-semibold text-emerald-300 block">Abhijit Muhurat (अभिजीत मुहूर्त)</span>
                <span className="text-amber-200/70">Best 48-min midday window for all deeds</span>
              </div>
              <span className="font-mono font-bold text-emerald-200 text-sm">
                {panchang.auspicious.abhijitMuhurat.start} – {panchang.auspicious.abhijitMuhurat.end}
              </span>
            </div>

            {/* Brahma Muhurat */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-300 block">Brahma Muhurat (ब्रह्म मुहूर्त)</span>
                <span className="text-amber-200/70">Meditation & spiritual study</span>
              </div>
              <span className="font-mono font-bold text-amber-200 text-sm">
                {panchang.auspicious.brahmaMuhurat.start} – {panchang.auspicious.brahmaMuhurat.end}
              </span>
            </div>

            {/* Vijaya Muhurat */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-300 block">Vijaya Muhurat (विजय मुहूर्त)</span>
                <span className="text-amber-200/70">Victory in endeavors & legal actions</span>
              </div>
              <span className="font-mono font-bold text-amber-200 text-sm">
                {panchang.auspicious.vijayaMuhurat.start} – {panchang.auspicious.vijayaMuhurat.end}
              </span>
            </div>

            {/* Yamaganda */}
            <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-center justify-between">
              <div>
                <span className="font-semibold text-rose-300 block">Yamaganda (यमगण्ड)</span>
                <span className="text-amber-200/70">Avoid long journeys and signing deeds</span>
              </div>
              <span className="font-mono font-bold text-rose-200 text-sm">
                {panchang.inauspicious.yamaganda.start} – {panchang.inauspicious.yamaganda.end}
              </span>
            </div>

            {/* Gulika Kalam */}
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="font-semibold text-amber-300 block">Gulika Kalam (गुलिक काल)</span>
                <span className="text-amber-200/70">Saturn's son son window</span>
              </div>
              <span className="font-mono font-bold text-amber-200 text-sm">
                {panchang.inauspicious.gulikaKalam.start} – {panchang.inauspicious.gulikaKalam.end}
              </span>
            </div>
          </div>
        </div>

        {/* Planetary Positions */}
        {panchang.planetaryPositions && (
          <KundaliGrid planets={panchang.planetaryPositions} />
        )}
      </div>

      {/* Upcoming Major Festivals Showcase */}
      <div className="vedic-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" /> Sacred Hindu Calendar
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Upcoming Festivals & Vrats
            </h2>
          </div>
          <Link
            href="/festivals"
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
          >
            View Full 2026 Calendar <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {festivalsData.festivals.slice(0, 3).map(fest => (
            <div key={fest.id} className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/25 space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-400">
                <span>{fest.date}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/50 text-amber-200 uppercase">
                  {fest.category}
                </span>
              </div>
              <h4 className="text-lg font-serif font-bold text-amber-100">{fest.name}</h4>
              <p className="text-xs text-amber-200/70 line-clamp-2">{fest.significance}</p>
              {fest.pujaMuhurat && (
                <div className="pt-2 border-t border-amber-500/15 text-[11px] text-amber-300">
                  <span className="font-semibold">{fest.pujaMuhurat.description}:</span> {fest.pujaMuhurat.start} – {fest.pujaMuhurat.end}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Vedic Astrology Guides */}
      <div className="vedic-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" /> Knowledge & Wisdom
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Vedic Astrology & Muhurat Guides
            </h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium">
            Read All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map(post => (
            <article key={post.id} className="p-5 rounded-xl bg-amber-950/20 border border-amber-500/20 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] uppercase font-semibold text-amber-400 tracking-wider">
                  {post.category.replace('-', ' ')}
                </span>
                <h3 className="text-base font-serif font-bold text-amber-100 mt-1 hover:text-amber-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-amber-200/70 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between text-[11px] text-amber-300/60">
                <span>By {post.author.name}</span>
                <span>{post.readTimeMinutes} min read</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* SEO FAQ Accordion */}
      <div className="vedic-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
          <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
          Frequently Asked Questions About Panchang
        </h2>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <h3 className="font-semibold text-amber-200 text-sm mb-1">What is a Panchang and why is it important?</h3>
            <p className="text-amber-100/70 leading-relaxed">
              Panchang (literally meaning five limbs) is the traditional Hindu astronomical calendar based on the movements of the Sun and Moon. The five components—Tithi (Lunar Day), Nakshatra (Constellation), Yoga (Luni-Solar combination), Karana (Half Lunar Day), and Vara (Weekday)—determine the auspiciousness of time for personal and professional decisions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <h3 className="font-semibold text-amber-200 text-sm mb-1">Why do Panchang timings vary between cities?</h3>
            <p className="text-amber-100/70 leading-relaxed">
              Vedic panchang calculations are strictly solar-aligned. Because the exact moments of local Sunrise and Sunset depend on a city's latitude and longitude, time divisions like Rahu Kalam, Choghadiya, and Abhijit Muhurat differ across Indian cities such as Delhi, Mumbai, Hyderabad, and Chennai.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
            <h3 className="font-semibold text-amber-200 text-sm mb-1">What is Abhijit Muhurat?</h3>
            <p className="text-amber-100/70 leading-relaxed">
              Abhijit Muhurat is the 8th Muhurat of the day (approximately 24 minutes before and 24 minutes after local midday). Blessed by Lord Vishnu, it is considered universally auspicious for starting ventures, traveling, or conducting ceremonies without prior complex chart matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}