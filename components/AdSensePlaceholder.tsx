import React from 'react';

interface AdSensePlaceholderProps {
  slotType?: 'banner' | 'sidebar' | 'inline' | 'footer';
  className?: string;
}

export const AdSensePlaceholder: React.FC<AdSensePlaceholderProps> = ({
  slotType = 'inline',
  className = '',
}) => {
  const heightClasses = {
    banner: 'h-24 md:h-28',
    sidebar: 'h-64 md:h-80',
    inline: 'h-24 md:h-28',
    footer: 'h-20 md:h-24',
  };

  return (
    <div
      className={`relative w-full max-w-7xl mx-auto my-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3 flex flex-col items-center justify-center text-center transition-all ${heightClasses[slotType]} ${className}`}
      aria-label="Advertisement Space"
    >
      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/50 dark:bg-slate-800/50 px-2 py-0.5 rounded mb-1">
        Advertisement Space
      </span>
      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
        Reserved for Google AdSense
      </p>
    </div>
  );
};
