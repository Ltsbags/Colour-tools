'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  Eye,
  Sliders,
  ExternalLink,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import {
  getColorFormats,
  getRandomHex,
  rgbToHex,
  hslToRgb,
  sanitizeHex,
} from '@/lib/color-utils';
import { ToastNotification } from './ToastNotification';

interface ColorPickerSectionProps {
  initialHex?: string;
  onColorChange?: (hex: string) => void;
}

export function ColorPickerSection({
  initialHex = 'FF5733',
  onColorChange,
}: ColorPickerSectionProps) {
  const [currentHex, setCurrentHex] = useState<string>(sanitizeHex(initialHex));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const [prevInitialHex, setPrevInitialHex] = useState(initialHex);
  if (initialHex !== prevInitialHex) {
    setPrevInitialHex(initialHex);
    setCurrentHex(sanitizeHex(initialHex));
  }

  const color = getColorFormats(currentHex);

  const updateHex = (newHex: string) => {
    const clean = sanitizeHex(newHex);
    setCurrentHex(clean);
    if (onColorChange) onColorChange(clean);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(label);
    setToastMessage(`Copied ${text} to clipboard!`);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleRandom = () => {
    const random = getRandomHex();
    updateHex(random);
  };

  return (
    <section id="picker" className="w-full max-w-7xl mx-auto my-8 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sliders className="w-3.5 h-3.5" /> Interactive Inspector
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Color Picker & Live Inspector
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select any color, adjust sliders, inspect all web formats, and check WCAG contrast instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRandom}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Random Color
            </button>
            <Link
              href={`/color/${color.hex.replace('#', '').toLowerCase()}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Full Color Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Live Swatch Display & Visual Picker */}
          <div className="lg:col-span-5 space-y-5">
            {/* Visual Color Box */}
            <div
              className="relative w-full h-64 sm:h-72 rounded-2xl shadow-inner border border-slate-200/60 dark:border-slate-700/60 p-6 flex flex-col justify-between transition-colors duration-200 overflow-hidden group"
              style={{ backgroundColor: color.hex }}
            >
              {/* Top Bar inside Swatch */}
              <div className="flex items-center justify-between z-10">
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md shadow-sm"
                  style={{
                    backgroundColor: color.isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                    color: color.isDark ? '#FFFFFF' : '#000000',
                  }}
                >
                  {color.name}
                </span>

                <label
                  htmlFor="native-color-input"
                  className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-md shadow-md transition-transform hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: color.isDark ? '#FFFFFF' : '#000000',
                    color: color.isDark ? '#000000' : '#FFFFFF',
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pick Color</span>
                  <input
                    id="native-color-input"
                    type="color"
                    value={color.hex}
                    onChange={(e) => updateHex(e.target.value)}
                    className="sr-only"
                  />
                </label>
              </div>

              {/* Bottom Large Text inside Swatch */}
              <div className="z-10 space-y-1">
                <div
                  className="text-3xl sm:text-4xl font-extrabold font-mono tracking-wider drop-shadow-sm"
                  style={{ color: color.isDark ? '#FFFFFF' : '#000000' }}
                >
                  {color.hex}
                </div>
                <div
                  className="text-xs font-mono font-medium opacity-90"
                  style={{ color: color.isDark ? '#FFFFFF' : '#000000' }}
                >
                  {color.rgbString}
                </div>
              </div>
            </div>

            {/* Quick Contrast Badges */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col gap-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Vs White (#FFFFFF)
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                    {color.contrastWhite}:1
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      color.contrastWhite >= 4.5
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {color.contrastWhite >= 4.5 ? 'WCAG AA' : 'Low Contrast'}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col gap-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  Vs Black (#000000)
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-slate-800 dark:text-slate-200">
                    {color.contrastBlack}:1
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                      color.contrastBlack >= 4.5
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {color.contrastBlack >= 4.5 ? 'WCAG AA' : 'Low Contrast'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Sliders & All Format Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* RGB Sliders Section */}
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>RGB Channels</span>
                <span className="font-mono text-slate-500">{color.rgbString}</span>
              </div>

              {/* Red Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-red-500 font-bold">R (Red)</span>
                  <span className="font-mono">{color.rgb.r}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={color.rgb.r}
                  onChange={(e) => {
                    const newHex = rgbToHex(parseInt(e.target.value), color.rgb.g, color.rgb.b);
                    updateHex(newHex);
                  }}
                  className="w-full accent-red-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>

              {/* Green Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-emerald-500 font-bold">G (Green)</span>
                  <span className="font-mono">{color.rgb.g}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={color.rgb.g}
                  onChange={(e) => {
                    const newHex = rgbToHex(color.rgb.r, parseInt(e.target.value), color.rgb.b);
                    updateHex(newHex);
                  }}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>

              {/* Blue Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                  <span className="text-blue-500 font-bold">B (Blue)</span>
                  <span className="font-mono">{color.rgb.b}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={color.rgb.b}
                  onChange={(e) => {
                    const newHex = rgbToHex(color.rgb.r, color.rgb.g, parseInt(e.target.value));
                    updateHex(newHex);
                  }}
                  className="w-full accent-blue-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Quick Copy Grid for All Formats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'HEX', value: color.hex },
                { label: 'RGB', value: color.rgbString },
                { label: 'HSL', value: color.hslString },
                { label: 'HSV', value: color.hsvString },
                { label: 'CMYK', value: color.cmykString },
                { label: 'CSS Var', value: `var(--color-primary, ${color.hex});` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors group"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {item.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                      {item.value}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.value, item.label)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    title={`Copy ${item.label}`}
                  >
                    {copiedFormat === item.label ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </section>
  );
}
