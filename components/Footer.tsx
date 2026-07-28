'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Palette, Github, Heart, Shield, FileText, Mail, Info, Check } from 'lucide-react';
import { AdSensePlaceholder } from './AdSensePlaceholder';

export function Footer() {
  const [modalType, setModalType] = useState<'privacy' | 'disclaimer' | 'about' | 'contact' | null>(null);

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* AdSense Slot before footer links */}
        <AdSensePlaceholder slotType="footer" className="mb-10 opacity-75" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
                <Palette className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Colour Lab</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fast, modern color utility for UI designers and web developers. Convert formats, build color palettes, inspect contrast, and export production-ready CSS snippets.
            </p>
            <div className="text-xs text-slate-500 font-mono">
              Built for maximum speed & high performance.
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Core Tools</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#converter" className="hover:text-white transition-colors">
                  HEX to RGB & HSL Converter
                </Link>
              </li>
              <li>
                <Link href="/#picker" className="hover:text-white transition-colors">
                  Live Color Picker & Inspector
                </Link>
              </li>
              <li>
                <Link href="/#palettes" className="hover:text-white transition-colors">
                  Harmony Palette Generator
                </Link>
              </li>
              <li>
                <Link href="/#css-generator" className="hover:text-white transition-colors">
                  CSS & Shadow Generator
                </Link>
              </li>
              <li>
                <Link href="/#popular" className="hover:text-white transition-colors">
                  Popular Colors Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Colors */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Popular Colors</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
              <Link href="/color/ff5733" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5733]" />
                Persimmon (#FF5733)
              </Link>
              <Link href="/color/3b82f6" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                Sapphire (#3B82F6)
              </Link>
              <Link href="/color/10b981" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                Emerald (#10B981)
              </Link>
              <Link href="/color/8b5cf6" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                Mystic (#8B5CF6)
              </Link>
              <Link href="/color/f59e0b" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                Amber (#F59E0B)
              </Link>
              <Link href="/color/ef4444" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                Ruby (#EF4444)
              </Link>
            </div>
          </div>

          {/* Col 4: Quick Legal Links & Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Info & Policies</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setModalType('about')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  About Color Tools
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('privacy')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('disclaimer')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType('contact')}
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400" />
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Color Tools & Converter. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for developers & designers worldwide.
          </p>
        </div>
      </div>

      {/* Info Modals */}
      {modalType && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 text-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800"
            >
              ✕
            </button>

            {modalType === 'privacy' && (
              <>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" /> Privacy Policy
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Color Tools respects your privacy. All color calculations and conversions are performed entirely client-side in your web browser. We do not track, collect, or store personal user input or color queries.
                </p>
                <p className="text-xs text-slate-400">
                  Google AdSense or standard privacy compliant analytics may use non-identifying technical cookies for ad delivery and statistics once enabled.
                </p>
              </>
            )}

            {modalType === 'disclaimer' && (
              <>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" /> Disclaimer
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Color representations, WCAG contrast calculations, and palette outputs are generated based on mathematical models (sRGB, HSL, HSV, CMYK). Display accuracy depends on your physical monitor settings and calibration.
                </p>
              </>
            )}

            {modalType === 'about' && (
              <>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-400" /> About Color Tools
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Color Tools is a lightweight, high-performance web utility built for developers, UI/UX designers, and digital artists. It provides instant color format conversions, WCAG accessibility evaluation, color shade generation, and CSS snippet exporting with zero server latency.
                </p>
              </>
            )}

            {modalType === 'contact' && (
              <>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="w-5 h-5 text-sky-400" /> Contact & Feedback
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have questions, feature suggestions, or feedback? Feel free to reach out directly:
                </p>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 font-mono text-xs text-indigo-300">
                  support@colortools.dev
                </div>
              </>
            )}

            <button
              onClick={() => setModalType(null)}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors mt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
