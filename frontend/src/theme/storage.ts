import type { ThemeSettings } from "./types";
import { DEFAULT_THEME } from "./defaults";

const KEY = "zoroark-theme-settings";

export const loadTheme = (): ThemeSettings => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_THEME };
    return { ...DEFAULT_THEME, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_THEME };
  }
};

export const saveTheme = (settings: ThemeSettings): void => {
  localStorage.setItem(KEY, JSON.stringify(settings));
};

/** Convert HSL to a hex string suitable for `<input type="color">`. */
export const hslToHex = (h: number, s: number, l: number): string => {
  const sNorm = s / 100;
  const lNorm = l / 100;
  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/** Convert a hex string (e.g. `#f59e0b`) to HSL values. */
export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const clean = hex.replace("#", "");
  const r = Number.parseInt(clean.slice(0, 2), 16) / 255;
  const g = Number.parseInt(clean.slice(2, 4), 16) / 255;
  const b2 = Number.parseInt(clean.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b2);
  const min = Math.min(r, g, b2);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  switch (max) {
    case r:
      h = ((g - b2) / d + (g < b2 ? 6 : 0)) * 60;
      break;
    case g:
      h = ((b2 - r) / d + 2) * 60;
      break;
    case b2:
      h = ((r - g) / d + 4) * 60;
      break;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};
