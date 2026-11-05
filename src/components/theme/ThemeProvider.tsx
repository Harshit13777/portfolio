'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type AccentColor = string; // Supports preset names ('emerald', 'blue', etc.) or custom hex ('#8b5cf6')

interface ThemeContextType {
  theme: Theme;
  accent: AccentColor;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to calculate darker/lighter shade for hover
function adjustHexBrightness(hex: string, percent: number): string {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000ff) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

// Convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
  let num = parseInt(hex.replace('#', ''), 16);
  if (isNaN(num)) return `rgba(16, 185, 129, ${alpha})`;
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function applyCustomAccentCSS(color: string) {
  const root = document.documentElement;
  if (!color) return;

  if (color.startsWith('#')) {
    root.setAttribute('data-accent', 'custom');
    const hoverColor = adjustHexBrightness(color, -10);
    const mutedColor = hexToRgba(color, 0.15);
    const borderColor = hexToRgba(color, 0.35);

    root.style.setProperty('--accent', color);
    root.style.setProperty('--accent-hover', hoverColor);
    root.style.setProperty('--accent-muted', mutedColor);
    root.style.setProperty('--accent-border', borderColor);
    root.style.setProperty('--accent-text', '#ffffff');
  } else {
    // Preset name (emerald, blue, violet, amber, rose)
    root.setAttribute('data-accent', color);
    root.style.removeProperty('--accent');
    root.style.removeProperty('--accent-hover');
    root.style.removeProperty('--accent-muted');
    root.style.removeProperty('--accent-border');
    root.style.removeProperty('--accent-text');
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [accent, setAccentState] = useState<AccentColor>('emerald');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check local storage for theme
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme === 'light' || storedTheme === 'dark') {
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setThemeState(initial);
      applyTheme(initial);
    }

    // 2. Check local storage for accent color
    const storedAccent = localStorage.getItem('accent') || 'emerald';
    setAccentState(storedAccent);
    applyCustomAccentCSS(storedAccent);

    setMounted(true);
  }, []);

  const applyTheme = (t: Theme) => {
    const root = document.documentElement;
    if (t === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const setAccent = (newAccent: AccentColor) => {
    setAccentState(newAccent);
    localStorage.setItem('accent', newAccent);
    applyCustomAccentCSS(newAccent);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, accent, toggleTheme, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
