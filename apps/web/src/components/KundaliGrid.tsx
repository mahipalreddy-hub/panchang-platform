import React from 'react';
import { PlanetPosition } from '@panchang/types';
import { Sparkles } from 'lucide-react';

interface KundaliGridProps {
  planets: PlanetPosition[];
}

export function KundaliGrid({ planets }: KundaliGridProps) {
  return (
    <div className="vedic-card p-6 sm:p-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
          <Sparkles className="w-4 h-4" /> Graha Sthiti & Sidereal Longitudes
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
          Planetary Positions (ग्रह स्थिति)
        </h2>
        <p className="text-xs text-amber-300/70 mt-0.5">
          Calculated with Lahiri (Chitra Paksha) Ayanamsha for today's sunrise.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-amber-200/90">
          <thead className="bg-amber-950/40 text-amber-300 uppercase text-[10px] tracking-wider border-b border-amber-500/20">
            <tr>
              <th className="py-3 px-4">Planet (ग्रह)</th>
              <th className="py-3 px-4">Sign (राशि)</th>
              <th className="py-3 px-4">Degree (अंश)</th>
              <th className="py-3 px-4">Nakshatra (नक्षत्र)</th>
              <th className="py-3 px-4">Pada</th>
              <th className="py-3 px-4">Motion (गति)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-500/10">
            {planets.map((planet, i) => (
              <tr key={i} className="hover:bg-amber-950/20 transition-colors">
                <td className="py-3 px-4 font-semibold text-amber-100">
                  {planet.name} <span className="text-amber-300/60 font-normal">({planet.nameDevanagari})</span>
                </td>
                <td className="py-3 px-4">
                  {planet.sign} <span className="text-amber-300/60">({planet.signDevanagari})</span>
                </td>
                <td className="py-3 px-4 font-mono text-amber-300">{planet.degree}°</td>
                <td className="py-3 px-4">{planet.nakshatra}</td>
                <td className="py-3 px-4">{planet.pada}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    planet.isRetrograde ? 'bg-rose-900/60 text-rose-200' : 'bg-emerald-900/60 text-emerald-200'
                  }`}>
                    {planet.isRetrograde ? 'Vakri (Retrograde)' : 'Margi (Direct)'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}