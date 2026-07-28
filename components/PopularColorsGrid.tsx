'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { POPULAR_CURATED_COLORS, getColorFormats, sanitizeHex } from '@/lib/color-utils';
import { ToastNotification } from './ToastNotification';

export function PopularColorsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Warm' | 'Cool' | 'Neutral'>('All');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const filteredColors = POPULAR_CURATED_COLORS.filter(c =>
    selectedCategory === 'All' ? true : c.category === selectedCategory
  );

  const handleCopy = (e: React.MouseEvent, hex: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setToastMessage(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <section id="popular" className="w-full max-w-7xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Curated Gallery
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Popular Colors
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore frequently used brand, UI, and modern design colors with instant conversion pages.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl">
            {(['All', 'Warm', 'Cool', 'Neutral'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Colors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredColors.map((item) => {
            const cleanHex = sanitizeHex(item.hex);
            const formats = getColorFormats(cleanHex);

            return (
              <Link
                key={item.hex}
                href={`/color/${cleanHex.toLowerCase()}`}
                className="group bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-3 flex flex-col justify-between space-y-3 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                {/* Visual Swatch */}
                <div
                  className="w-full h-24 rounded-xl shadow-inner border border-slate-200/40 dark:border-slate-800 relative flex items-start justify-end p-2 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: item.hex }}
                >
                  <button
                    onClick={(e) => handleCopy(e, item.hex)}
                    className="p-1.5 rounded-lg bg-slate-950/60 backdrop-blur-md text-white hover:bg-slate-950/90 transition-colors opacity-90 group-hover:opacity-100 shadow-sm"
                    title={`Copy ${item.hex}`}
                  >
                    {copiedHex === item.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Color Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {item.name}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{item.hex}</span>
                    <span className="text-[10px] text-slate-400 font-sans">{item.category}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </section>
  );
}
