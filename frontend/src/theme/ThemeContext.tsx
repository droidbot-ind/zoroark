import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { ThemeSettings, FontFamily, SpacingMode } from "./types";
import { FONT_STACKS, SPACING_SCALES } from "./types";
import { DEFAULT_THEME } from "./defaults";
import { loadTheme, saveTheme } from "./storage";

interface ThemeContextValue {
  theme: ThemeSettings;
  setPrimaryHue: (h: number) => void;
  setPrimarySaturation: (s: number) => void;
  setPrimaryLightness: (l: number) => void;
  setFontFamily: (f: FontFamily) => void;
  setFontScale: (s: number) => void;
  setRadius: (r: number) => void;
  setSpacing: (s: SpacingMode) => void;
  reset: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const applyTheme = (theme: ThemeSettings) => {
  const root = document.documentElement;
  root.style.setProperty("--primary", `${theme.primaryHue} ${theme.primarySaturation}% ${theme.primaryLightness}%`);
  root.style.setProperty("--ring", `${theme.primaryHue} ${theme.primarySaturation}% ${theme.primaryLightness}%`);
  root.style.setProperty("--font-family", FONT_STACKS[theme.fontFamily]);
  root.style.setProperty("--font-scale", String(theme.fontScale));
  root.style.setProperty("--radius", `${theme.radius}rem`);
  root.style.setProperty("--spacing-scale", String(SPACING_SCALES[theme.spacing]));
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeSettings>(loadTheme);

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const patch = useCallback(
    (partial: Partial<ThemeSettings>) => setTheme((t) => ({ ...t, ...partial })),
    [],
  );

  const value: ThemeContextValue = {
    theme,
    setPrimaryHue: (h) => patch({ primaryHue: h }),
    setPrimarySaturation: (s) => patch({ primarySaturation: s }),
    setPrimaryLightness: (l) => patch({ primaryLightness: l }),
    setFontFamily: (f) => patch({ fontFamily: f }),
    setFontScale: (s) => patch({ fontScale: s }),
    setRadius: (r) => patch({ radius: r }),
    setSpacing: (s) => patch({ spacing: s }),
    reset: () => setTheme({ ...DEFAULT_THEME }),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
