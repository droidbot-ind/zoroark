import { Paintbrush, Type, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/theme/ThemeContext";
import { FONT_OPTIONS, SPACING_SCALES } from "@/theme/types";
import type { FontFamily, SpacingMode } from "@/theme/types";
import { hslToHex, hexToHsl } from "@/theme/storage";
import { cn } from "@/lib/cn";

const SPACING_OPTIONS: { value: SpacingMode; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "relaxed", label: "Relaxed" },
];

const PRESETS = [
  { label: "Amber", hue: 38 },
  { label: "Netflix", hue: 357 },
  { label: "Blue", hue: 221 },
  { label: "Green", hue: 142 },
  { label: "Rose", hue: 346 },
  { label: "Purple", hue: 272 },
];

const ChipGroup: React.FC<{
  options: { value: string; label: string }[];
  selected: string;
  onChange: (v: any) => void;
}> = ({ options, selected, onChange }) => (
  <div className="flex flex-wrap gap-1.5">
    {options.map((o) => (
      <button
        key={o.value}
        type="button"
        onClick={() => onChange(o.value)}
        className={cn(
          "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
          selected === o.value
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-muted-foreground hover:text-foreground",
        )}
      >
        {o.label}
      </button>
    ))}
  </div>
);

export const ThemeCustomizer: React.FC = () => {
  const {
    theme,
    setPrimaryHue,
    setPrimarySaturation,
    setPrimaryLightness,
    setFontFamily,
    setFontScale,
    setRadius,
    setSpacing,
    reset,
  } = useTheme();

  const currentHex = hslToHex(
    theme.primaryHue,
    theme.primarySaturation,
    theme.primaryLightness,
  );

  const handleColorPicker = (hex: string) => {
    const { h, s, l } = hexToHsl(hex);
    setPrimaryHue(h);
    setPrimarySaturation(s);
    setPrimaryLightness(l);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Customise theme">
          <Paintbrush className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Customise theme</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* COLOUR */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Paintbrush className="h-3.5 w-3.5" /> Colour
            </h3>

            <div className="flex items-center gap-4">
              <input
                type="color"
                value={currentHex}
                onChange={(e) => handleColorPicker(e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border border-border bg-transparent p-0.5"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label className="text-xs text-muted-foreground">
                    Preview
                  </Label>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {currentHex}
                  </span>
                </div>
                <div
                  className="h-2 w-full rounded-full"
                  style={{
                    backgroundColor: `hsl(${theme.primaryHue}, ${theme.primarySaturation}%, ${theme.primaryLightness}%)`,
                  }}
                />
              </div>
            </div>

            <Label className="text-xs font-medium">Presets</Label>
            <div className="flex flex-wrap gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.hue}
                  type="button"
                  onClick={() => setPrimaryHue(p.hue)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-colors",
                    theme.primaryHue === p.hue
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-muted-foreground/40",
                  )}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: `hsl(${p.hue}, ${theme.primarySaturation}%, ${theme.primaryLightness}%)`,
                    }}
                  />
                  {p.label}
                </button>
              ))}
            </div>
          </section>

          <hr className="border-border/60" />

          {/* TYPOGRAPHY */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Type className="h-3.5 w-3.5" /> Typography
            </h3>

            <Label className="text-xs font-medium">Font</Label>
            <ChipGroup
              options={FONT_OPTIONS}
              selected={theme.fontFamily}
              onChange={setFontFamily}
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Size scale</Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {theme.fontScale}×
                </span>
              </div>
              <Slider
                value={[theme.fontScale]}
                min={0.8}
                max={1.2}
                step={0.05}
                onValueChange={([v]) => setFontScale(v)}
              />
            </div>

            <p className="rounded-md bg-secondary/50 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
              The quick brown fox jumps over the lazy dog.
            </p>
          </section>

          <hr className="border-border/60" />

          {/* LAYOUT */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Maximize className="h-3.5 w-3.5" /> Layout
            </h3>

            <Label className="text-xs font-medium">Spacing</Label>
            <ChipGroup
              options={SPACING_OPTIONS}
              selected={theme.spacing}
              onChange={setSpacing}
            />

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Roundness</Label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {theme.radius}rem
                </span>
              </div>
              <Slider
                value={[theme.radius]}
                min={0}
                max={1.5}
                step={0.125}
                onValueChange={([v]) => setRadius(v)}
              />
            </div>
          </section>

          <hr className="border-border/60" />

          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={reset}>
              Reset defaults
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
