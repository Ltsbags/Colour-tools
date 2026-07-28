'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Copy,
  Check,
  ArrowLeft,
  Palette,
  Code2,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Layers,
  Sliders,
  Share2,
} from 'lucide-react';
import {
  getColorFormats,
  getHarmonies,
  getShadesAndTints,
  generateCssSnippets,
  POPULAR_CURATED_COLORS,
  sanitizeHex,
} from '@/lib/color-utils';
import { ToastNotification } from '@/components/ToastNotification';
import { AdSensePlaceholder } from '@/components/AdSensePlaceholder';

interface ColorDetailClientProps {
  hex: string;
}

export function ColorDetailClient({ hex }: ColorDetailClientProps) {
  const cleanHex = sanitizeHex(hex);
  const color = getColorFormats(cleanHex);
  const harmonies = getHarmonies(cleanHex);
  const { shades, tints } = getShadesAndTints(cleanHex);
  const cssSnippets = generateCssSnippets(cleanHex);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied ${text}!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${color.hex} Color Code (${color.name})`,
        text: `Check out #${cleanHex} (${color.name}) color specs, RGB, HSL, and palettes!`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      setToastMessage('Page link copied to clipboard!');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Navigation & Share */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors shadow-sm"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Color</span>
        </button>
      </div>

      {/* Hero Color Swatch Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Swatch Box */}
          <div
            className="lg:col-span-6 h-72 sm:h-80 md:h-96 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-inner border border-slate-200/60 dark:border-slate-700/60 transition-colors relative overflow-hidden"
            style={{ backgroundColor: color.hex }}
          >
            <div className="flex items-center justify-between">
              <span
                className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-sm"
                style={{
                  backgroundColor: color.isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)',
                  color: color.isDark ? '#FFFFFF' : '#000000',
                }}
              >
                {color.name}
              </span>

              <button
                onClick={() => handleCopy(color.hex, 'hero-hex')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md shadow-md flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: color.isDark ? '#FFFFFF' : '#000000',
                  color: color.isDark ? '#000000' : '#FFFFFF',
                }}
              >
                {copiedKey === 'hero-hex' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>Copy HEX</span>
              </button>
            </div>

            <div className="space-y-1">
              <h1
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-mono tracking-tight"
                style={{ color: color.isDark ? '#FFFFFF' : '#000000' }}
              >
                {color.hex}
              </h1>
              <p
                className="text-sm font-mono opacity-90 font-medium"
                style={{ color: color.isDark ? '#FFFFFF' : '#000000' }}
              >
                {color.rgbString} • {color.hslString}
              </p>
            </div>
          </div>

          {/* Quick Specifications Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" /> Color Specifications
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                #{cleanHex} Color Information
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Full technical values across digital and print color models.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'HEX Code', val: color.hex },
                { label: 'RGB Values', val: `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}` },
                { label: 'HSL Values', val: `${color.hsl.h}°, ${color.hsl.s}%, ${color.hsl.l}%` },
                { label: 'HSV Values', val: `${color.hsv.h}°, ${color.hsv.s}%, ${color.hsv.v}%` },
                { label: 'CMYK Values', val: `${color.cmyk.c}%, ${color.cmyk.m}%, ${color.cmyk.y}%, ${color.cmyk.k}%` },
                { label: 'Relative Luminance', val: `${Math.round(color.luminance * 100)}%` },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col justify-between"
                >
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 truncate">
                      {item.val}
                    </span>
                    <button
                      onClick={() => handleCopy(item.val, item.label)}
                      className="p-1 text-slate-400 hover:text-indigo-600 transition-colors"
                      title={`Copy ${item.label}`}
                    >
                      {copiedKey === item.label ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* WCAG Accessibility Audit */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> WCAG 2.1 Contrast Check
                </span>
                <span className="text-xs text-slate-500">
                  White: <strong>{color.contrastWhite}:1</strong> | Black: <strong>{color.contrastBlack}:1</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">On White BG:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      color.contrastWhite >= 4.5
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {color.contrastWhite >= 4.5 ? 'PASS (AA)' : 'FAIL (<4.5)'}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">On Black BG:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                      color.contrastBlack >= 4.5
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {color.contrastBlack >= 4.5 ? 'PASS (AA)' : 'FAIL (<4.5)'}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* AdSense Slot */}
      <AdSensePlaceholder slotType="banner" />

      {/* Color Tints & Shades */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Shades & Tints Spectrum
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Lighter tints (mixing with white) and darker shades (mixing with black).
          </p>
        </div>

        {/* Tints Row */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
            Tints (Lightening)
          </span>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {tints.map((item, idx) => (
              <button
                key={item.hex + idx}
                onClick={() => handleCopy(item.hex, `tint-${idx}`)}
                className="group flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-full h-14 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: item.hex }}
                />
                <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                  {item.hex}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Shades Row */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
            Shades (Darkening)
          </span>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {shades.map((item, idx) => (
              <button
                key={item.hex + idx}
                onClick={() => handleCopy(item.hex, `shade-${idx}`)}
                className="group flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-full h-14 rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-transform group-hover:scale-105"
                  style={{ backgroundColor: item.hex }}
                />
                <span className="font-mono text-[10px] font-semibold text-slate-600 dark:text-slate-400">
                  {item.hex}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Harmonies & Palettes */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Color Harmonies & Palettes for #{cleanHex}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Complementary, Analogous, Triadic, Monochromatic, and Tetradic color combinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {harmonies.map((scheme) => (
            <div
              key={scheme.type}
              className="p-5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {scheme.type}
                </span>
                <button
                  onClick={() => handleCopy(scheme.colors.map(c => c.hex).join(', '), `scheme-${scheme.type}`)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy Scheme
                </button>
              </div>

              <div className="h-24 w-full rounded-xl overflow-hidden flex border border-slate-200 dark:border-slate-800">
                {scheme.colors.map((c, i) => (
                  <Link
                    key={c.hex + i}
                    href={`/color/${c.hex.replace('#', '').toLowerCase()}`}
                    className="flex-1 h-full relative group transition-all hover:flex-[1.4] cursor-pointer flex flex-col justify-end p-2"
                    style={{ backgroundColor: c.hex }}
                    title={`View ${c.hex} page`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/80 text-white p-1 rounded text-center">
                      <div className="text-[10px] font-mono font-bold">{c.hex}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ready-to-Use CSS Code */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            CSS Code Snippets for #{cleanHex}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Copy production-ready CSS styles directly into your codebase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: 'CSS Variables', code: cssSnippets.cssVars },
            { title: 'Tailwind CSS Class', code: cssSnippets.tailwind },
            { title: 'Background Color', code: cssSnippets.background },
            { title: 'Text Color', code: cssSnippets.text },
            { title: 'Box Shadow', code: cssSnippets.boxShadow },
            { title: 'Linear Gradient', code: cssSnippets.linearGradient },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  {item.title}
                </span>
                <button
                  onClick={() => handleCopy(item.code, item.title)}
                  className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600"
                >
                  {copiedKey === item.title ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="p-3 bg-white dark:bg-slate-900 rounded-xl text-[11px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200 dark:border-slate-800">
                {item.code}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Educational & SEO Text Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-4 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          About #{cleanHex} ({color.name})
        </h2>
        <p>
          The color hex <strong>#{cleanHex}</strong> (also known as <strong>{color.name}</strong>) is composed of <strong>{color.rgb.r}</strong> Red, <strong>{color.rgb.g}</strong> Green, and <strong>{color.rgb.b}</strong> Blue in the sRGB color space. In HSL color representation, it has a hue angle of <strong>{color.hsl.h}°</strong>, saturation of <strong>{color.hsl.s}%</strong>, and lightness of <strong>{color.hsl.l}%</strong>.
        </p>
        <p>
          In print media (CMYK), <strong>#{cleanHex}</strong> corresponds to <strong>{color.cmyk.c}%</strong> Cyan, <strong>{color.cmyk.m}%</strong> Magenta, <strong>{color.cmyk.y}%</strong> Yellow, and <strong>{color.cmyk.k}%</strong> Key (Black). Its calculated relative luminance is {Math.round(color.luminance * 100)}%, making it a {color.isDark ? 'dark' : 'light'} shade for background pairing.
        </p>
      </div>

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
