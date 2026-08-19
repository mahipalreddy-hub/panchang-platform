'use client';

import React, { useState } from 'react';
import { X, Search, MapPin, Check } from 'lucide-react';
import { CityConfig } from '@panchang/types';
import { INDIAN_CITIES } from '@panchang/astro-core';

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: CityConfig) => void;
  currentCity?: CityConfig;
}

export function CitySelectorModal({ isOpen, onClose, onSelectCity, currentCity }: CitySelectorModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = INDIAN_CITIES.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.nameDevanagari.includes(searchTerm)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0F1420] border border-amber-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div>
            <h3 className="text-lg font-serif font-bold text-amber-100">Select City / Location</h3>
            <p className="text-xs text-amber-300/70">Calculates precise local sunrise, sunset & Rahu Kalam</p>
          </div>
          <button onClick={onClose} className="p-1 text-amber-300/70 hover:text-amber-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-amber-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search city or state (e.g. Hyderabad, Varanasi)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-100 text-sm focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Cities List */}
        <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
          {filtered.map(city => {
            const isSelected = currentCity?.slug === city.slug;
            return (
              <button
                key={city.slug}
                onClick={() => {
                  onSelectCity(city);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs transition-all ${
                  isSelected
                    ? 'bg-amber-900/50 border border-amber-400 text-amber-100'
                    : 'bg-amber-950/20 hover:bg-amber-900/30 text-amber-200/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-semibold text-amber-100">{city.name}</span>
                    <span className="text-amber-300/60 ml-2">({city.nameDevanagari})</span>
                    <span className="block text-[10px] text-amber-300/50">{city.state}, India</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}