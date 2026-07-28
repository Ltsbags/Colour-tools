'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRightLeft,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import {
  getColorFormats,
  rgbToHex,
  hslToRgb,
  hsvToRgb,
  isValidHex,
  sanitizeHex,
} from '@/lib/color-utils';
import { ToastNotification } from './ToastNotification';

export function ColorConverter() {
  const [activeMode, setActiveMode] = useState<'hex' | 'rgb' | 'hsl' | 'hsv'>('hex');

  // Input states
  const [hexInput, setHexInput] = useState('3B82F6');
  const [rgbInput, setRgbInput] = useState({ r: '59', g: '130', b: '246' });
  const [hslInput, setHslInput] = useState({ h: '217', s: '91', l: '60' });
  const [hsvInput, setHsvInput] = useState({ h: '217', s: '76', v: '96' });

  // Current active hex derived from selected tab
  const [activeHex, setActiveHex] = useState('3B82F6');
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const color = getColorFormats(activeHex);

  // HEX Handler
  const handleHexChange = (val: string) => {
    setHexInput(val);
    const clean = val.trim().replace('#', '');
    if (!clean) {
      setError('Please enter a HEX code');
      return;
    }
    if (!isValidHex(clean)) {
      setError('Invalid HEX format (e.g. #FF5733 or #FFF)');
      return;
    }
    setError(null);
    const sanitized = sanitizeHex(clean);
    setActiveHex(sanitized);
  };

  // RGB Handler
  const handleRgbChange = (channel: 'r' | 'g' | 'b', val: string) => {
    const updated = { ...rgbInput, [channel]: val };
    setRgbInput(updated);

    const r = parseInt(updated.r || '0', 10);
    const g = parseInt(updated.g || '0', 10);
    const b = parseInt(updated.b || '0', 10);

    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      setError('RGB values must be integers between 0 and 255');
      return;
    }
    setError(null);
    const hex = rgbToHex(r, g, b).replace('#', '');
    setActiveHex(hex);
  };

  // HSL Handler
  const handleHslChange = (param: 'h' | 's' | 'l', val: string) => {
    const updated = { ...hslInput, [param]: val };
    setHslInput(updated);

    const h = parseInt(updated.h || '0', 10);
    const s = parseInt(updated.s || '0', 10);
    const l = parseInt(updated.l || '0', 10);

    if (isNaN(h) || isNaN(s) || isNaN(l) || h < 0 || h > 360 || s < 0 || s > 100 || l < 0 || l > 100) {
      setError('Hue: 0-360, Saturation/Lightness: 0-100%');
      return;
    }
    setError(null);
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b).replace('#', '');
    setActiveHex(hex);
  };

  // HSV Handler
  const handleHsvChange = (param: 'h' | 's' | 'v', val: string) => {
    const updated = { ...hsvInput, [param]: val };
    setHsvInput(updated);

    const h = parseInt(updated.h || '0', 10);
    const s = parseInt(updated.s || '0', 10);
    const v = parseInt(updated.v || '0', 10);

    if (isNaN(h) || isNaN(s) || isNaN(v) || h < 0 || h > 360 || s < 0 || s > 100 || v < 0 || v > 100) {
      setError('Hue: 0-360, Saturation/Value: 0-100%');
      return;
    }
    setError(null);
    const rgb = hsvToRgb(h, s, v);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b).replace('#', '');
    setActiveHex(hex);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied ${text}!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="converter" className="w-full max-w-7xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <ArrowRightLeft className="w-3.5 h-3.5" /> Multi-Format Engine
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Color Converter
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Type in HEX, RGB, HSL, or HSV to get instant, accurate cross-format color conversions.
            </p>
          </div>

          <Link
            href={`/color/${color.hex.replace('#', '').toLowerCase()}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore #{color.hex.replace('#', '')} Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Input Format Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl w-fit">
          {(['hex', 'rgb', 'hsl', 'hsv'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setActiveMode(mode);
                setError(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeMode === mode
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {mode} Input
            </button>
          ))}
        </div>

        {/* Error Banner */}
        {error && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Interactive Input Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          
          {/* Swatch Preview */}
          <div className="md:col-span-3 flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl shadow-md border border-slate-200/60 dark:border-slate-700/60 shrink-0 transition-colors"
              style={{ backgroundColor: color.hex }}
            />
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-medium">Color Name</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">{color.name}</span>
              <span className="text-xs font-mono text-slate-400">{color.hex}</span>
            </div>
          </div>

          {/* Dynamic Form Input depending on active mode */}
          <div className="md:col-span-9">
            {activeMode === 'hex' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  HEX Code
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-base">
                    #
                  </span>
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexChange(e.target.value)}
                    placeholder="e.g. 3B82F6 or FF5733"
                    className="w-full pl-8 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}

            {activeMode === 'rgb' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-red-500 uppercase">R (Red 0-255)</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbInput.r}
                    onChange={(e) => handleRgbChange('r', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-500 uppercase">G (Green 0-255)</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbInput.g}
                    onChange={(e) => handleRgbChange('g', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-blue-500 uppercase">B (Blue 0-255)</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgbInput.b}
                    onChange={(e) => handleRgbChange('b', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
              </div>
            )}

            {activeMode === 'hsl' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-indigo-500 uppercase">Hue (0-360°)</label>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    value={hslInput.h}
                    onChange={(e) => handleHslChange('h', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-violet-500 uppercase">Sat (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hslInput.s}
                    onChange={(e) => handleHslChange('s', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-fuchsia-500 uppercase">Light (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hslInput.l}
                    onChange={(e) => handleHslChange('l', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
              </div>
            )}

            {activeMode === 'hsv' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-sky-500 uppercase">Hue (0-360°)</label>
                  <input
                    type="number"
                    min="0"
                    max="360"
                    value={hsvInput.h}
                    onChange={(e) => handleHsvChange('h', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-teal-500 uppercase">Sat (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hsvInput.s}
                    onChange={(e) => handleHsvChange('s', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-amber-500 uppercase">Val (0-100%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={hsvInput.v}
                    onChange={(e) => handleHsvChange('v', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm font-bold"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Live Conversion Results Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {[
            { label: 'HEX', val: color.hex, desc: 'Web Standards' },
            { label: 'RGB', val: color.rgbString, desc: 'Red, Green, Blue' },
            { label: 'HSL', val: color.hslString, desc: 'Hue, Saturation, Light' },
            { label: 'HSV', val: color.hsvString, desc: 'Hue, Saturation, Value' },
            { label: 'CMYK', val: color.cmykString, desc: 'Print Standard' },
            { label: 'CSS Background', val: `background-color: ${color.hex};`, desc: 'CSS Rule' },
            { label: 'CSS Text', val: `color: ${color.hex};`, desc: 'Typography' },
            { label: 'Tailwind Class', val: `bg-[${color.hex}]`, desc: 'Utility Class' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between gap-3 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.desc}</span>
                </div>
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white break-all">
                  {item.val}
                </div>
              </div>

              <button
                onClick={() => handleCopy(item.val, item.label)}
                className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                {copiedKey === item.label ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
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
