import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface StarRatingInputProps {
  value: number; // 1..10
  onChange: (v: number) => void;
  size?: number;
}

export const StarRatingInput: React.FC<StarRatingInputProps> = ({
  value,
  onChange,
  size = 22,
}) => {
  const [hover, setHover] = useState<number>(0);
  useEffect(() => {
    setHover(0);
  }, [value]);

  const display = hover || value;

  return (
    <div
      className="inline-flex items-center"
      onMouseLeave={() => setHover(0)}
      role="radiogroup"
      aria-label="Rate from 1 to 10"
    >
      {Array.from({ length: 10 }).map((_, i) => {
        const n = i + 1;
        const filled = n <= display;
        return (
          <button
            type="button"
            key={n}
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} of 10`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            className="p-0.5 outline-none focus-visible:ring-1 focus-visible:ring-ring rounded"
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(
                "transition-colors",
                filled
                  ? "fill-amber-400 stroke-amber-400"
                  : "stroke-muted-foreground"
              )}
            />
          </button>
        );
      })}
      <span className="ml-2 text-sm font-semibold tabular-nums">
        {display}/10
      </span>
    </div>
  );
};
