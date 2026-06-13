export interface ThemeSettings {
  primaryHue: number;
  primarySaturation: number;
  primaryLightness: number;
  fontFamily: FontFamily;
  fontScale: number;
  radius: number;
  spacing: SpacingMode;
}

export type FontFamily =
  | "inter"
  | "montserrat"
  | "outfit"
  | "dm-sans"
  | "space-grotesk"
  | "lora"
  | "playfair"
  | "jetbrains-mono"
  | "system";

export type SpacingMode = "compact" | "normal" | "relaxed";

export interface FontOption {
  value: FontFamily;
  label: string;
  family: string;
  weights: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { value: "inter", label: "Inter", family: "Inter", weights: "300..800" },
  { value: "montserrat", label: "Montserrat", family: "Montserrat", weights: "300..900" },
  { value: "outfit", label: "Outfit", family: "Outfit", weights: "300..700" },
  { value: "dm-sans", label: "DM Sans", family: "DM+Sans", weights: "300..700" },
  { value: "space-grotesk", label: "Space Grotesk", family: "Space+Grotesk", weights: "300..700" },
  { value: "lora", label: "Lora", family: "Lora", weights: "400..700" },
  { value: "playfair", label: "Playfair Display", family: "Playfair+Display", weights: "400..900" },
  { value: "jetbrains-mono", label: "JetBrains Mono", family: "JetBrains+Mono", weights: "300..800" },
  { value: "system", label: "System UI", family: "", weights: "" },
];

export const FONT_STACKS: Record<FontFamily, string> = {
  inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
  montserrat: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
  outfit: '"Outfit", ui-sans-serif, system-ui, sans-serif',
  "dm-sans": '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  "space-grotesk": '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
  lora: '"Lora", Georgia, serif',
  playfair: '"Playfair Display", Georgia, serif',
  "jetbrains-mono": '"JetBrains Mono", ui-monospace, monospace',
  system: "ui-sans-serif, system-ui, -apple-system, sans-serif",
};

export const SPACING_SCALES: Record<SpacingMode, number> = {
  compact: 0.7,
  normal: 1,
  relaxed: 1.35,
};
