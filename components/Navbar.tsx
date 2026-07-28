'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Palette,
  Shuffle,
  Search,
  Sparkles,
  Layers,
  Code2,
  Menu,
  X,
  Check,
  ExternalLink,
} from 'lucide-react';
import { getRandomHex, COLOR_NAMES, sanitizeHex, isValidHex } from '@/lib/color-utils';
import { Logo } from '@/components/Logo';

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Instant Live Search filtering derived directly during render
  const searchQueryTrimmed = searchQuery.trim().toLowerCase();
  const searchResults = React.useMemo(() => {
    if (!searchQueryTrimmed) return [];
    if (isValidHex(searchQueryTrimmed)) {
      const clean = sanitizeHex(searchQueryTrimmed);
      const matchedName = COLOR_NAMES.find(c => c.hex.toLowerCase() === `#${clean}`.toLowerCase())?.name || 'Custom Color';
      return [{ hex: `#${clean}`, name: matchedName }];
    }
    return COLOR_NAMES.filter(c =>
      c.name.toLowerCase().includes(searchQueryTrimmed) || c.hex.toLowerCase().includes(searchQueryTrimmed)
    ).slice(0, 8);
  }, [searchQueryTrimmed]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const clean = sanitizeHex(searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/color/${clean.toLowerCase()}`);
  };

  const handleSelectColor = (hex: string) => {
    const clean = sanitizeHex(hex);
    setIsSearchOpen(false);
    setSearchQuery('');
    router.push(`/color/${clean.toLowerCase()}`);
  };

  const handleRandomColor = () => {
    const randomHex = getRandomHex();
    router.push(`/color/${randomHex.toLowerCase()}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Global Instant Search Bar */}
        <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Search color name (e.g. Emerald, #FF5733, Crimson)..."
              className="w-full pl-10 pr-10 py-2 bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>

          {/* Search Dropdown Results */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 py-1 divide-y divide-slate-100 dark:divide-slate-800">
              {searchResults.map((item) => (
                <button
                  key={item.hex + item.name}
                  onClick={() => handleSelectColor(item.hex)}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-md shadow-inner border border-slate-200/50 dark:border-slate-700/50"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                      {item.hex.toUpperCase()}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Nav Actions */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/#converter" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Converter
          </Link>
          <Link href="/#picker" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Picker
          </Link>
          <Link href="/#palettes" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Palettes
          </Link>
          <Link href="/#css-generator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            CSS Generator
          </Link>
          <Link href="/#popular" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Popular Colors
          </Link>
        </nav>

        {/* Right CTA / Randomizer */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleRandomColor}
            className="flex items-center gap-2 px-3.5 py-2 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95"
            title="Surprise me with a random color"
          >
            <Shuffle className="w-4 h-4" />
            <span>Random</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search HEX, RGB or Color Name..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm"
            />
          </form>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium pt-2">
            <Link
              href="/#converter"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600"
            >
              Color Converter
            </Link>
            <Link
              href="/#picker"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600"
            >
              Color Picker
            </Link>
            <Link
              href="/#palettes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600"
            >
              Palette Generator
            </Link>
            <Link
              href="/#css-generator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600"
            >
              CSS Generator
            </Link>
            <Link
              href="/#popular"
              onClick={() => setIsMobileMenuOpen(false)}
              className="col-span-2 px-3 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600"
            >
              Popular Colors Gallery
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
