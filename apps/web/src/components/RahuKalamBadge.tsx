'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock } from 'lucide-react';
import { TimeInterval } from '@panchang/types';

interface RahuKalamBadgeProps {
  rahuKalam: TimeInterval;
  cityName: string;
}

export function RahuKalamBadge({ rahuKalam, cityName }: RahuKalamBadgeProps) {
  const [status, setStatus] = useState<'upcoming' | 'active' | 'passed'>('upcoming');

  useEffect(() => {
    // Helper to evaluate if Rahu Kalam is active
    const checkStatus = () => {
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      const parseMin = (t: string) => {
        const [time, period] = t.split(' ');
        const [h, m] = time.split(':').map(Number);
        let hrs = h % 12;
        if (period === 'PM') hrs += 12;
        return hrs * 60 + m;
      };

      try {
        const start = parseMin(rahuKalam.start);
        const end = parseMin(rahuKalam.end);

        if (nowMinutes >= start && nowMinutes <= end) {
          setStatus('active');
        } else if (nowMinutes > end) {
          setStatus('passed');
        } else {
          setStatus('upcoming');
        }
      } catch (e) {
        setStatus('upcoming');
      }
    };

    checkStatus();
    const timer = setInterval(checkStatus, 60000);
    return () => clearInterval(timer);
  }, [rahuKalam]);

  return (
    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
      status === 'active'
        ? 'bg-rose-950/40 border-rose-600/60 shadow-lg shadow-rose-950/30'
        : status === 'passed'
        ? 'bg-emerald-950/30 border-emerald-600/40'
        : 'bg-amber-950/30 border-amber-600/40'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${
          status === 'active' ? 'bg-rose-900/60 text-rose-300 animate-pulse' : 'bg-amber-900/40 text-amber-300'
        }`}>
          {status === 'active' ? <AlertTriangle className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-200">
              Rahu Kalam (राहु काल)
            </span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
              status === 'active'
                ? 'bg-rose-600 text-white'
                : status === 'passed'
                ? 'bg-emerald-800 text-emerald-100'
                : 'bg-amber-800 text-amber-100'
            }`}>
              {status === 'active' ? '● Active Now - Avoid Starting Ventures' : status === 'passed' ? 'Passed for Today' : 'Upcoming'}
            </span>
          </div>
          <p className="text-base font-serif font-bold text-amber-100 mt-0.5">
            {rahuKalam.start} – {rahuKalam.end} <span className="text-xs font-sans text-amber-300/60 font-normal">({cityName})</span>
          </p>
        </div>
      </div>
      <p className="text-xs text-amber-300/70 max-w-xs sm:text-right">
        Inauspicious 90-min solar window. Avoid weddings, travel, purchases, or contract signings.
      </p>
    </div>
  );
}