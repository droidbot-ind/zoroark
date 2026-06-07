import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { getRatingTone, RATING_STAR, RATING_TEXT } from "@/lib/format";

interface RatingStarProps {
  value: number; // 0..10
  className?: string;
  showText?: boolean;
}

export const RatingStar: React.FC<RatingStarProps> = ({
  value,
  className,
  showText = true,
}) => {
  const tone = getRatingTone(value);
  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <Star className={cn("h-4 w-4", RATING_STAR[tone])} />
      {showText ? (
        <span className={cn("text-sm font-semibold tabular-nums", RATING_TEXT[tone])}>
          {value > 0 ? value.toFixed(1) : "—"}
        </span>
      ) : null}
    </div>
  );
};
