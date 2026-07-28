'use client';

import React, { useEffect } from 'react';
import { Check, Copy } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function ToastNotification({ message, onClose, duration = 2500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xl rounded-2xl border border-slate-700 dark:border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
      <div className="text-xs font-semibold tracking-wide">
        {message}
      </div>
    </div>
  );
}
