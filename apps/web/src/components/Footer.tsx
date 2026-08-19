import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Heart } from 'lucide-react';
import { INDIAN_CITIES } from '@panchang/astro-core';

export function Footer() {
  const topCities = INDIAN_CITIES.slice(0, 10);
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <footer className="w-full bg-[#05080E] border-t border-amber-500/20 pt-14 pb-8 text-amber-100/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-amber-500/15">
          {/* Col 1: About */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold gold-gradient-text">ॐ</span>
              <span className="text-lg font-serif font-bold text-amber-100">Vedic Panchang</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-200/60">
              Authentic Vedic astrology engine providing highly accurate daily panchang, muhurat timings, and Hindu festival calendars computed via Jean Meeus ephemeris and Lahiri Ayanamsha.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-amber-400/80">
              <Shield className="w-4 h-4" /> Drik Ganita Astrological Standard
            </div>
          </div>

          {/* Col 2: Top City Panchang */}
          <div>
            <h4 className="text-sm font-serif font-semibold text-amber-200 tracking-wider uppercase mb-3">
              City Panchang Today
            </h4>
            <ul className="space-y-1.5 text-xs">
              {topCities.map(city => (
                <li key={city.slug}>
                  <Link
                    href={`/panchang/${city.slug}/${todayStr}`}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {city.name} Panchang
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Muhurat & Tools */}
          <div>
            <h4 className="text-sm font-serif font-semibold text-amber-200 tracking-wider uppercase mb-3">
              Auspicious Muhurats
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li><Link href="/muhurat-finder?type=wedding" className="hover:text-amber-400">Vivah (Wedding) Muhurat</Link></li>
              <li><Link href="/muhurat-finder?type=griha-pravesh" className="hover:text-amber-400">Griha Pravesh Timings</Link></li>
              <li><Link href="/muhurat-finder?type=vehicle-purchase" className="hover:text-amber-400">Vehicle Purchase Muhurat</Link></li>
              <li><Link href="/muhurat-finder?type=property-purchase" className="hover:text-amber-400">Property Registration Muhurat</Link></li>
              <li><Link href="/muhurat-finder?type=business-opening" className="hover:text-amber-400">Shop / Business Opening</Link></li>
              <li><Link href="/muhurat-finder?type=namakaran" className="hover:text-amber-400">Namakaran Sanskar</Link></li>
            </ul>
          </div>

          {/* Col 4: Festivals & Mobile */}
          <div>
            <h4 className="text-sm font-serif font-semibold text-amber-200 tracking-wider uppercase mb-3">
              Festivals & Companion App
            </h4>
            <ul className="space-y-1.5 text-xs mb-4">
              <li><Link href="/festivals" className="hover:text-amber-400">Maha Shivratri 2026</Link></li>
              <li><Link href="/festivals" className="hover:text-amber-400">Holi & Dhulandi 2026</Link></li>
              <li><Link href="/festivals" className="hover:text-amber-400">Chaitra Navratri & Ugadi</Link></li>
              <li><Link href="/festivals" className="hover:text-amber-400">Diwali & Lakshmi Puja</Link></li>
            </ul>
            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 text-xs">
              <span className="text-amber-300 font-medium">Daily Mobile Push Notifications</span>
              <p className="text-amber-200/60 mt-1">Get today’s Tithi and Rahu Kalam alert every morning at 6:00 AM.</p>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/50">
          <p>© {new Date().getFullYear()} Vedic Panchang Platform. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Indian Vedic Tradition
          </p>
        </div>
      </div>
    </footer>
  );
}