import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-16 h-16 rounded-full bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400">
        <Compass className="w-8 h-8 animate-spin-slow" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-amber-100">404 - Page Not Found</h1>
        <p className="text-sm text-amber-200/70 max-w-md mx-auto">
          The auspicious timing or city page you are looking for does not exist or has moved.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-lg shadow-amber-900/40 transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Today's Panchang
      </Link>
    </div>
  );
}