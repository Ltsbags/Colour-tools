'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Palette,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Code,
} from 'lucide-react';
import {
  getHarmonies,
  getColorFormats,
  getRandomHex,
  sanitizeHex,
} from '@/lib/color-utils';
import { ToastNotification } from './ToastNotification';

interface PaletteGeneratorProps {
  initialHex?: string;
}

export function PaletteGenerator({ initialHex = '3B82F6' }: PaletteGeneratorProps) {
  const [baseHex, setBaseHex] = useState(sanitizeHex(initialHex));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const harmonies = getHarmonies(baseHex);
  const currentColor = getColorFormats(baseHex);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied: ${text}`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyPalette = (colors: { hex: string }[], type: string) => {
    const hexList = colors.map((c) => c.hex).join(', ');
    navigator.clipboard.writeText(hexList);
    setCopiedKey(type);
    setToastMessage(`Copied ${type} palette hexes!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="palettes" className="w-full max-w-7xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Palette className="w-3.5 h-3.5" /> Harmony Schemes
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Color Palette Generator
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Generate complementary, analogous, triadic, and monochromatic schemes balanced for UI design.
            </p>
          </div>

          {/* Quick Color Switcher */}
          <div className="flex items-center gap-3">
            <label className="text-xs font-bold text-slate-500 uppercase">Base Color:</label>
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <input
                type="color"
                value={`#${baseHex}`}
                onChange={(e) => setBaseHex(sanitizeHex(e.target.value))}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 uppercase pr-1">
                #{baseHex}
              </span>
            </div>
          </div>
        </div>

        {/* Harmonies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {harmonies.map((scheme) => (
            <div
              key={scheme.type}
              className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {scheme.type}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {scheme.description}
                  </p>
                </div>

                <button
                  onClick={() => handleCopyPalette(scheme.colors, scheme.type)}
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Copy All Hex Codes"
                >
                  {copiedKey === scheme.type ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Hexes</span>
                    </>
                  )}
                </button>
              </div>

              {/* Swatch Bar */}
              <div className="h-28 w-full rounded-xl overflow-hidden flex shadow-inner border border-slate-200/60 dark:border-slate-800">
                {scheme.colors.map((c, idx) => (
                  <div
                    key={c.hex + idx}
                    className="flex-1 h-full relative group transition-all hover:flex-[1.5] cursor-pointer flex flex-col justify-end p-2"
                    style={{ backgroundColor: c.hex }}
                    onClick={() => handleCopy(c.hex, `${scheme.type}-${idx}`)}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 backdrop-blur-sm text-white p-1.5 rounded-lg text-center">
                      <div className="text-[10px] font-mono font-bold uppercase">{c.hex}</div>
                      <div className="text-[9px] font-medium truncate max-w-full">{c.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Hex Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {scheme.colors.map((c, idx) => (
                  <Link
                    key={c.hex + idx}
                    href={`/color/${c.hex.replace('#', '').toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-slate-300/40"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.hex}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </section>
  );
}
