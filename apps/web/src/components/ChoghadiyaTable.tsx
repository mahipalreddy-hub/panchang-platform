'use client';

import React, { useState } from 'react';
import { ChoghadiyaTimings, ChoghadiyaSlot } from '@panchang/types';
import { Sun, Moon, Sparkles, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { formatAuspiciousnessBadge } from '@panchang/ui';

interface ChoghadiyaTableProps {
  choghadiya: ChoghadiyaTimings;
}

export function ChoghadiyaTable({ choghadiya }: ChoghadiyaTableProps) {
  const [activeTab, setActiveTab] = useState<'day' | 'night'>('day');
  const slots = activeTab === 'day' ? choghadiya.day : choghadiya.night;

  return (
    <div className="vedic-card p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" /> Instant Muhurat Calculator
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            Day & Night Choghadiya (चौघड़िया)
          </h2>
          <p className="text-xs text-amber-300/70 mt-0.5">
            4-Ghadi time divisions for urgent travel, purchases, and trade decisions.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-amber-950/60 p-1 rounded-xl border border-amber-500/30">
          <button
            onClick={() => setActiveTab('day')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'day'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-200/70 hover:text-amber-100'
            }`}
          >
            <Sun className="w-4 h-4" /> Day Choghadiya
          </button>
          <button
            onClick={() => setActiveTab('night')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'night'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-amber-200/70 hover:text-amber-100'
            }`}
          >
            <Moon className="w-4 h-4" /> Night Choghadiya
          </button>
        </div>
      </div>

      {/* Slots Grid / Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {slots.map((slot, index) => {
          const badge = formatAuspiciousnessBadge(slot.quality);
          return (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all ${badge.bgColor} ${badge.borderColor}`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-amber-200/70">Slot {index + 1}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${badge.textColor}`}>
                  {badge.label}
                </span>
              </div>

              <h4 className="text-lg font-serif font-bold text-amber-100">
                {slot.name} <span className="text-sm font-normal text-amber-300/80">({slot.nameDevanagari})</span>
              </h4>

              <p className="text-xs font-sans text-amber-200/90 font-medium mt-1">
                {slot.start} – {slot.end}
              </p>

              <div className="pt-2 mt-2 border-t border-amber-500/15 flex items-center justify-between text-[11px] text-amber-300/60">
                <span>Ruler: {slot.ruler}</span>
                <span className="capitalize">{slot.quality} time</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}