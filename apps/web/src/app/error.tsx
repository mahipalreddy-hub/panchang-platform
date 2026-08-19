'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, ArrowLeft } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100">Something went wrong</h1>
        <p className="text-sm text-amber-200/70 max-w-md mx-auto">
          An error occurred while calculating or retrieving astrological data.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all shadow-md"
        >
          <RefreshCcw className="w-4 h-4" /> Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-amber-900/40 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
      </div>
    </div>
  );
}