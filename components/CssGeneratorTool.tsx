'use client';

import React, { useState } from 'react';
import { Code2, Copy, Check, Sparkles, Sliders } from 'lucide-react';
import {
  generateCssSnippets,
  getColorFormats,
  getRandomHex,
  sanitizeHex,
} from '@/lib/color-utils';
import { ToastNotification } from './ToastNotification';

export function CssGeneratorTool() {
  const [selectedHex, setSelectedHex] = useState('3B82F6');
  const [shadowBlur, setShadowBlur] = useState(25);
  const [shadowSpread, setShadowSpread] = useState(-5);
  const [shadowOpacity, setShadowOpacity] = useState(0.35);
  const [gradientAngle, setGradientAngle] = useState(135);
  const [secondHex, setSecondHex] = useState('8B5CF6');

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const color1 = getColorFormats(selectedHex);
  const color2 = getColorFormats(secondHex);

  const boxShadowCss = `box-shadow: 0 10px ${shadowBlur}px ${shadowSpread}px rgba(${color1.rgb.r}, ${color1.rgb.g}, ${color1.rgb.b}, ${shadowOpacity});`;
  const linearGradientCss = `background: linear-gradient(${gradientAngle}deg, ${color1.hex} 0%, ${color2.hex} 100%);`;
  const glassmorphismCss = `background: rgba(${color1.rgb.r}, ${color1.rgb.g}, ${color1.rgb.b}, 0.15);\nbackdrop-filter: blur(12px);\nborder: 1px solid rgba(${color1.rgb.r}, ${color1.rgb.g}, ${color1.rgb.b}, 0.25);`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setToastMessage(`Copied CSS snippet!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="css-generator" className="w-full max-w-7xl mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Code2 className="w-3.5 h-3.5" /> Frontend Ready
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              CSS & Shadow Generator
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Customize gradients, glassmorphism, and colored box shadows with real-time CSS code output.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color1.hex}
              onChange={(e) => setSelectedHex(sanitizeHex(e.target.value))}
              className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
              title="Primary Color"
            />
            <input
              type="color"
              value={color2.hex}
              onChange={(e) => setSecondHex(sanitizeHex(e.target.value))}
              className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
              title="Secondary Color"
            />
          </div>
        </div>

        {/* 2-Column Controls & Live Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Controls */}
          <div className="lg:col-span-6 space-y-5 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Shadow & Gradient Sliders
            </h3>

            {/* Shadow Blur Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Shadow Blur Radius</span>
                <span className="font-mono">{shadowBlur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={shadowBlur}
                onChange={(e) => setShadowBlur(parseInt(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Shadow Opacity Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Shadow Opacity</span>
                <span className="font-mono">{Math.round(shadowOpacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={shadowOpacity * 100}
                onChange={(e) => setShadowOpacity(parseInt(e.target.value) / 100)}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Gradient Angle Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-600 dark:text-slate-400">
                <span>Gradient Direction Angle</span>
                <span className="font-mono">{gradientAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={gradientAngle}
                onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Right Live Visual Card */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[260px]">
            <div
              className="w-full max-w-xs h-40 rounded-2xl flex items-center justify-center p-6 text-white font-bold text-center transition-all"
              style={{
                background: `linear-gradient(${gradientAngle}deg, ${color1.hex} 0%, ${color2.hex} 100%)`,
                boxShadow: `0 10px ${shadowBlur}px ${shadowSpread}px rgba(${color1.rgb.r}, ${color1.rgb.g}, ${color1.rgb.b}, ${shadowOpacity})`,
              }}
            >
              <div className="bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-mono tracking-wider shadow-sm">
                Live CSS Preview
              </div>
            </div>
          </div>
        </div>

        {/* Copyable CSS Snippets Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          {/* Card 1: Box Shadow */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Colored Box Shadow
              </span>
              <button
                onClick={() => handleCopy(boxShadowCss, 'shadow')}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-800"
              >
                {copiedKey === 'shadow' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="p-3 bg-white dark:bg-slate-900 rounded-xl text-[11px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200 dark:border-slate-800">
              {boxShadowCss}
            </pre>
          </div>

          {/* Card 2: Linear Gradient */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Linear Gradient
              </span>
              <button
                onClick={() => handleCopy(linearGradientCss, 'gradient')}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-800"
              >
                {copiedKey === 'gradient' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="p-3 bg-white dark:bg-slate-900 rounded-xl text-[11px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200 dark:border-slate-800">
              {linearGradientCss}
            </pre>
          </div>

          {/* Card 3: Glassmorphism */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Glassmorphism
              </span>
              <button
                onClick={() => handleCopy(glassmorphismCss, 'glass')}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-indigo-600 border border-slate-200 dark:border-slate-800"
              >
                {copiedKey === 'glass' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <pre className="p-3 bg-white dark:bg-slate-900 rounded-xl text-[11px] font-mono text-slate-800 dark:text-slate-200 overflow-x-auto border border-slate-200 dark:border-slate-800">
              {glassmorphismCss}
            </pre>
          </div>

        </div>

      </div>

      {toastMessage && (
        <ToastNotification message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </section>
  );
}
