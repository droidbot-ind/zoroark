export interface ThemeSettings {
  primaryHue: number;
  primarySaturation: number;
  primaryLightness: number;
  fontFamily: FontFamily;
  fontScale: number;
  radius: number;
  spacing: SpacingMode;
}

export type FontFamily = "inter" | "system" | "serif" | "mono";
export type SpacingMode = "compact" | "normal" | "relaxed";

export const FONT_STACKS: Record<FontFamily, string> = {
  inter: "Inter, ui-sans-serif, system-ui, sans-serif",
  system: "ui-sans-serif, system-ui, -apple-system, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
};

export const SPACING_SCALES: Record<SpacingMode, number> = {
  compact: 0.85,
  normal: 1,
  relaxed: 1.15,
};
