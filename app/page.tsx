import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Palette,
  ArrowRightLeft,
  Sliders,
  Zap,
} from 'lucide-react';
import { getHomeMetadata, SITE_NAME, BASE_URL } from '@/lib/seo';
import { ColorPickerSection } from '@/components/ColorPickerSection';
import { ColorConverter } from '@/components/ColorConverter';
import { PaletteGenerator } from '@/components/PaletteGenerator';
import { CssGeneratorTool } from '@/components/CssGeneratorTool';
import { PopularColorsGrid } from '@/components/PopularColorsGrid';
import { AdSensePlaceholder } from '@/components/AdSensePlaceholder';

export const metadata: Metadata = getHomeMetadata();

export default function HomePage() {
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: 'Fast, modern color utility for designers and developers to convert color formats, generate palettes, explore shades, and copy CSS code.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/color/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      
      {/* Website Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />

      <div className="w-full">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20 border-b border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-white via-slate-50/80 to-transparent dark:from-slate-950 dark:via-slate-900/40 dark:to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-600 dark:text-indigo-300 text-xs font-semibold tracking-wide shadow-sm">
              <Zap className="w-3.5 h-3.5 fill-indigo-600 dark:fill-indigo-300" />
              <span>Fast MVP Color Utility for Designers & Developers</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
              Color Tools for{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Designers & Developers
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Convert colors instantly, generate beautiful palettes, explore color formats, inspect WCAG contrast, and copy ready-to-use code.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="#picker"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <Sliders className="w-4 h-4" />
                <span>Explore Color Picker</span>
              </Link>

              <Link
                href="#converter"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold transition-all shadow-sm"
              >
                <ArrowRightLeft className="w-4 h-4 text-emerald-500" />
                <span>Color Converter</span>
              </Link>

              <Link
                href="#palettes"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold transition-all shadow-sm"
              >
                <Palette className="w-4 h-4 text-violet-500" />
                <span>Palette Generator</span>
              </Link>
            </div>

          </div>
        </section>

        {/* Top Reserved AdSense Slot */}
        <AdSensePlaceholder slotType="banner" className="my-8" />

        {/* CORE SECTION 1: Color Picker & Live Swatch Inspector */}
        <ColorPickerSection initialHex="FF5733" />

        {/* CORE SECTION 2: Multi-Format Color Converter */}
        <ColorConverter />

        {/* AdSense Slot between converter and palettes */}
        <AdSensePlaceholder slotType="inline" className="my-8" />

        {/* CORE SECTION 3: Harmony Palette Generator */}
        <PaletteGenerator initialHex="3B82F6" />

        {/* CORE SECTION 4: CSS & Shadow Generator */}
        <CssGeneratorTool />

        {/* CORE SECTION 5: Popular Colors Gallery */}
        <PopularColorsGrid />
      </div>

    </main>
  );
}
