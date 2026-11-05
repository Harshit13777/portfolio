'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Palette, Dices, Check, Pipette } from 'lucide-react';
import { useTheme } from './ThemeProvider';

// Preset curated swatches (no text names displayed)
const PRESET_SWATCHES = [
  { id: 'emerald', hex: '#10b981' },
  { id: 'blue', hex: '#3b82f6' },
  { id: 'violet', hex: '#8b5cf6' },
  { id: 'amber', hex: '#f59e0b' },
  { id: 'rose', hex: '#f43f5e' },
  { id: '#06b6d4', hex: '#06b6d4' }, // Cyan
  { id: '#d946ef', hex: '#d946ef' }, // Fuchsia
  { id: '#84cc16', hex: '#84cc16' }, // Lime
];

// Vibrant color palette pool for random selection
const RANDOM_PALETTE = [
  '#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#f43f5e',
  '#06b6d4', '#d946ef', '#84cc16', '#ec4899', '#14b8a6',
  '#6366f1', '#eab308', '#f97316', '#0284c7', '#a855f7'
];

export function ThemeCustomizer() {
  const { theme, accent, toggleTheme, setAccent } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl w-16 h-8" />
    );
  }

  // Active color indicator
  const activeHex = accent.startsWith('#')
    ? accent
    : PRESET_SWATCHES.find((s) => s.id === accent)?.hex || '#10b981';

  const handleRandomColor = () => {
    const candidates = RANDOM_PALETTE.filter((c) => c.toLowerCase() !== activeHex.toLowerCase());
    const randomChoice = candidates[Math.floor(Math.random() * candidates.length)];
    setAccent(randomChoice);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccent(e.target.value);
  };

  return (
    <div className="relative flex items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800" ref={menuRef}>
      {/* Light / Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-700" />
        )}
      </button>

      {/* Palette Popover Trigger (Visual Color Circle + Palette Icon) */}
      <button
        onClick={() => setPaletteOpen(!paletteOpen)}
        aria-label="Customize accent color"
        title="Customize accent color"
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
      >
        <span
          className="w-3.5 h-3.5 rounded-full ring-1 ring-black/20 dark:ring-white/20 transition-transform hover:scale-110"
          style={{ backgroundColor: activeHex }}
        />
        <Palette className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
      </button>

      {/* Color Swatches & Picker Popover */}
      {paletteOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-3">
          {/* Header Row: Swatches Label + Random Shuffle Button */}
          <div className="flex items-center justify-between pb-1.5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
              Theme Palette
            </span>

            {/* Random Color Dice Button */}
            <button
              onClick={handleRandomColor}
              title="Pick random color"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors active:scale-95"
            >
              <Dices className="w-3.5 h-3.5 text-accent" />
              <span>Random</span>
            </button>
          </div>

          {/* Quick Color Swatches (Circles only, no text names) */}
          <div className="grid grid-cols-4 gap-2.5">
            {PRESET_SWATCHES.map((swatch) => {
              const isSelected =
                accent === swatch.id ||
                (accent.startsWith('#') && accent.toLowerCase() === swatch.hex.toLowerCase());

              return (
                <button
                  key={swatch.id}
                  onClick={() => setAccent(swatch.id)}
                  aria-label={`Select color ${swatch.hex}`}
                  className="relative group flex items-center justify-center p-1 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ring-1 ring-black/10 dark:ring-white/10 ${
                      isSelected ? 'ring-2 ring-zinc-950 dark:ring-white scale-105' : ''
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Color Picker Selector */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => colorInputRef.current?.click()}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/60 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full ring-1 ring-black/20 dark:ring-white/20"
                  style={{ backgroundColor: activeHex }}
                />
                <span>Custom Color Picker</span>
              </div>
              <Pipette className="w-3.5 h-3.5 text-zinc-500" />
            </button>

            {/* Hidden Native Color Picker Input */}
            <input
              ref={colorInputRef}
              type="color"
              value={activeHex}
              onChange={handleCustomColorChange}
              className="sr-only"
              aria-label="Pick custom color"
            />
          </div>
        </div>
      )}
    </div>
  );
}
