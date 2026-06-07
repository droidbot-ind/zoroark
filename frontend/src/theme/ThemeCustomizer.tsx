import { useState } from "react";
import { Paintbrush, Type, Maximize, Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/theme/ThemeContext";
import { FONT_OPTIONS, FONT_STACKS } from "@/theme/types";
import type { FontFamily, SpacingMode } from "@/theme/types";
import { hslToHex, hexToHsl } from "@/theme/storage";
import { cn } from "@/lib/cn";

const SPACING_OPTIONS: { value: SpacingMode; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "relaxed", label: "Relaxed" },
];

const PALETTE = [
  { label: "Amber", hue: 38, sat: 92, light: 50 },
  { label: "Gold", hue: 45, sat: 100, light: 50 },
  { label: "Orange", hue: 24, sat: 95, light: 50 },
  { label: "Red", hue: 0, sat: 85, light: 55 },
  { label: "Rose", hue: 346, sat: 80, light: 55 },
  { label: "Pink", hue: 330, sat: 80, light: 55 },
  { label: "Purple", hue: 272, sat: 70, light: 55 },
  { label: "Violet", hue: 260, sat: 65, light: 55 },
  { label: "Indigo", hue: 240, sat: 60, light: 55 },
  { label: "Blue", hue: 221, sat: 83, light: 53 },
  { label: "Sky", hue: 200, sat: 85, light: 50 },
  { label: "Cyan", hue: 185, sat: 80, light: 45 },
  { label: "Teal", hue: 170, sat: 75, light: 40 },
  { label: "Emerald", hue: 160, sat: 70, light: 42 },
  { label: "Green", hue: 142, sat: 65, light: 45 },
  { label: "Lime", hue: 90, sat: 75, light: 48 },
  { label: "Neutral", hue: 0, sat: 0, light: 40 },
  { label: "Slate", hue: 215, sat: 20, light: 40 },
];

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

  const [showCustomPicker, setShowCustomPicker] = useState(false);

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

            <div className="flex items-center gap-3">
              <span
                className="inline-block h-9 w-9 shrink-0 rounded-lg border-2 border-border"
                style={{
                  backgroundColor: `hsl(${theme.primaryHue}, ${theme.primarySaturation}%, ${theme.primaryLightness}%)`,
                }}
              />
              <div className="flex-1 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Current</span>
                <br />
                {currentHex}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomPicker(!showCustomPicker)}
              >
                <Pipette className="mr-1 h-3.5 w-3.5" />
                Custom
              </Button>
            </div>

            {showCustomPicker ? (
              <input
                type="color"
                value={currentHex}
                onChange={(e) => handleColorPicker(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-md border border-border bg-transparent p-0.5"
              />
            ) : null}

            <Label className="text-xs font-medium">Swatches</Label>
            <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-9">
              {PALETTE.map((p) => (
                <button
                  key={p.hue}
                  type="button"
                  onClick={() => {
                    setPrimaryHue(p.hue);
                    setPrimarySaturation(p.sat);
                    setPrimaryLightness(p.light);
                  }}
                  className={cn(
                    "h-7 w-full rounded-md border transition-transform hover:scale-110",
                    theme.primaryHue === p.hue
                      ? "border-foreground ring-1 ring-foreground"
                      : "border-border",
                  )}
                  style={{
                    backgroundColor: `hsl(${p.hue}, ${p.sat}%, ${p.light}%)`,
                  }}
                  title={p.label}
                />
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
            <Select
              value={theme.fontFamily}
              onValueChange={(v) => setFontFamily(v as FontFamily)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    <span style={{ fontFamily: FONT_STACKS[f.value] }}>
                      {f.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
          </section>

          <hr className="border-border/60" />

          {/* LAYOUT */}
          <section className="space-y-3">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Maximize className="h-3.5 w-3.5" /> Layout
            </h3>

            <Label className="text-xs font-medium">Spacing</Label>
            <div className="flex flex-wrap gap-1.5">
              {SPACING_OPTIONS.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setSpacing(o.value)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium rounded-md border transition-colors",
                    theme.spacing === o.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>

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
