import { Paintbrush, Type, Maximize, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/theme/ThemeContext";
import { FONT_STACKS } from "@/theme/types";
import type { FontFamily, SpacingMode } from "@/theme/types";
import { cn } from "@/lib/cn";

const FONT_OPTIONS: { value: FontFamily; label: string }[] = [
  { value: "inter", label: "Inter" },
  { value: "system", label: "System" },
  { value: "serif", label: "Serif" },
  { value: "mono", label: "Mono" },
];

const SPACING_OPTIONS: { value: SpacingMode; label: string }[] = [
  { value: "compact", label: "Compact" },
  { value: "normal", label: "Normal" },
  { value: "relaxed", label: "Relaxed" },
];

const SliderControl: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step, suffix, onChange }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <Label className="text-xs font-medium">{label}</Label>
      <span className="text-xs tabular-nums text-muted-foreground">
        {value}{suffix ?? ""}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-secondary accent-primary"
    />
  </div>
);

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

        <div className="space-y-5 pt-2">
          {/* COLOUR */}
          <section className="space-y-2">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Paintbrush className="h-3.5 w-3.5" /> Colour
            </h3>
            <SliderControl
              label="Hue"
              value={theme.primaryHue}
              min={0}
              max={360}
              step={1}
              suffix="°"
              onChange={setPrimaryHue}
            />
            <SliderControl
              label="Saturation"
              value={theme.primarySaturation}
              min={0}
              max={100}
              step={1}
              suffix="%"
              onChange={setPrimarySaturation}
            />
            <SliderControl
              label="Lightness"
              value={theme.primaryLightness}
              min={10}
              max={80}
              step={1}
              suffix="%"
              onChange={setPrimaryLightness}
            />
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">Preview</span>
              <span
                className="inline-block h-5 w-10 rounded border border-border"
                style={{
                  backgroundColor: `hsl(${theme.primaryHue}, ${theme.primarySaturation}%, ${theme.primaryLightness}%)`,
                }}
              />
            </div>
          </section>

          <hr className="border-border/60" />

          {/* TYPOGRAPHY */}
          <section className="space-y-2">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Type className="h-3.5 w-3.5" /> Typography
            </h3>
            <Label className="text-xs font-medium">Font</Label>
            <ChipGroup
              options={FONT_OPTIONS}
              selected={theme.fontFamily}
              onChange={setFontFamily}
            />
            <SliderControl
              label="Scale"
              value={theme.fontScale}
              min={0.8}
              max={1.2}
              step={0.05}
              suffix="×"
              onChange={setFontScale}
            />
            <p
              className="mt-1 text-xs text-muted-foreground"
              style={{ fontFamily: FONT_STACKS[theme.fontFamily] }}
            >
              The quick brown fox jumps over the lazy dog.
            </p>
          </section>

          <hr className="border-border/60" />

          {/* LAYOUT */}
          <section className="space-y-2">
            <h3 className="flex items-center gap-1.5 text-sm font-semibold">
              <Maximize className="h-3.5 w-3.5" /> Layout
            </h3>
            <Label className="text-xs font-medium">Spacing</Label>
            <ChipGroup
              options={SPACING_OPTIONS}
              selected={theme.spacing}
              onChange={setSpacing}
            />
            <SliderControl
              label="Roundness"
              value={theme.radius}
              min={0}
              max={1.5}
              step={0.125}
              suffix="rem"
              onChange={setRadius}
            />
          </section>

          <hr className="border-border/60" />

          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={reset}>
              Reset defaults
            </Button>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPrimaryHue(357)}
              >
                Netflix
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPrimaryHue(221)}
              >
                Blue
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPrimaryHue(120)}
              >
                Green
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
