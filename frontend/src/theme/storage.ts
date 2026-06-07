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
