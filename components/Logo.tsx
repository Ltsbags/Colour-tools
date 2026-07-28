'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  href?: string;
}

export function LogoIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Multi-color Spectrum Gradients */}
        <linearGradient id="mcPinkOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF2A85" />
          <stop offset="100%" stopColor="#FF7A00" />
        </linearGradient>

        <linearGradient id="mcCyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>

        <linearGradient id="mcVioletPink" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        <linearGradient id="mcEmeraldYellow" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#FACC15" />
        </linearGradient>

        <linearGradient id="mcFlaskBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#A855F7" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#F43F5E" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="1" />
        </linearGradient>

        <filter id="glowMulti" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Lab Flask Outline in Cyan/Violet */}
      <path
        d="M15 4H21M16 4V11L9.2 23.5C8.1 25.5 9.6 28 11.9 28H24.1C26.4 28 27.9 25.5 26.8 23.5L20 11V4"
        stroke="url(#mcCyanBlue)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Multi-colour Bubbling Liquid Layers inside Flask */}
      {/* Bottom Liquid Layer (Teal/Yellow) */}
      <path
        d="M10.8 25.5C10.2 25.5 9.8 24.8 10.1 24.2L12.5 19.8C15 21 21 21 23.5 19.8L25.9 24.2C26.2 24.8 25.8 25.5 25.2 25.5H10.8Z"
        fill="url(#mcEmeraldYellow)"
      />

      {/* Middle Liquid Layer (Pink/Orange) */}
      <path
        d="M12.5 19.8L14.8 15.6C17 16.8 19 16.8 21.2 15.6L23.5 19.8C21 21 15 21 12.5 19.8Z"
        fill="url(#mcPinkOrange)"
        opacity="0.9"
      />

      {/* Top Liquid Wave Layer (Violet/Pink) */}
      <path
        d="M14.8 15.6L16.5 12.5C17.5 13.2 18.5 13.2 19.5 12.5L21.2 15.6C19 16.8 17 16.8 14.8 15.6Z"
        fill="url(#mcVioletPink)"
        opacity="0.85"
      />

      {/* Floating Multi-Colour Bubbles / Swatches */}
      <circle cx="18" cy="7" r="1.8" fill="#FF2A85" filter="url(#glowMulti)" />
      <circle cx="13.5" cy="10" r="1.3" fill="#00F0FF" />
      <circle cx="22.5" cy="9" r="1.5" fill="#FACC15" />
      <circle cx="18" cy="18" r="1.2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="21" cy="22" r="1" fill="#FFFFFF" opacity="0.8" />
    </svg>
  );
}

export function Logo({
  size = 'md',
  showSubtitle = false,
  className = '',
  href = '/',
}: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9.5 h-9.5',
    lg: 'w-12 h-12',
  };

  const svgSizes = {
    sm: 'w-4.5 h-4.5',
    md: 'w-6 h-6',
    lg: 'w-7.5 h-7.5',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
  };

  const content = (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* Multi-Colour Rainbow Gradient Border Ring */}
      <div
        className={`${iconSizes[size]} rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-400 via-emerald-400 via-cyan-400 to-violet-600 p-[2px] shadow-sm hover:shadow-md transition-all group-hover:scale-105 flex items-center justify-center`}
      >
        <div className="w-full h-full bg-slate-950 dark:bg-slate-950 rounded-[14px] flex items-center justify-center p-1">
          <LogoIcon className={svgSizes[size]} />
        </div>
      </div>

      {/* Multi-Colour Gradient Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-tight">
          <span
            className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-600 dark:from-rose-400 dark:via-purple-300 dark:to-cyan-300 bg-clip-text text-transparent`}
          >
            Colour
          </span>
          <span
            className={`${textSizes[size]} font-black tracking-tight bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500 dark:from-cyan-300 dark:via-emerald-300 dark:to-amber-300 bg-clip-text text-transparent`}
          >
            Lab
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] font-bold tracking-wider uppercase bg-gradient-to-r from-rose-500 via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
            Multi-Colour Dev Hub
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="hover:opacity-95 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}

