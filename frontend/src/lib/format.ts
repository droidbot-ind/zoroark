export const formatYear = (date: string | null | undefined): string => {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return String(d.getFullYear());
};

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return "—";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatRuntime = (minutes: number | null | undefined): string => {
  if (!minutes || minutes <= 0) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
};

export const formatRating = (rating: number | null | undefined): string => {
  if (rating === null || rating === undefined) return "—";
  return rating.toFixed(1);
};

export type RatingTone = "bad" | "mid" | "decent" | "good";

export const getRatingTone = (value: number): RatingTone => {
  if (!Number.isFinite(value) || value < 4) return "bad";
  if (value < 6) return "mid";
  if (value < 7) return "decent";
  return "good";
};

export const RATING_TEXT: Record<RatingTone, string> = {
  bad: "text-red-400",
  mid: "text-orange-400",
  decent: "text-amber-400",
  good: "text-emerald-400",
};

export const RATING_STAR: Record<RatingTone, string> = {
  bad: "fill-red-400 stroke-red-400",
  mid: "fill-orange-400 stroke-orange-400",
  decent: "fill-amber-400 stroke-amber-400",
  good: "fill-emerald-400 stroke-emerald-400",
};

export const RATING_BADGE: Record<RatingTone, string> = {
  bad: "border-red-500/20 bg-red-500/15 text-red-400",
  mid: "border-orange-500/20 bg-orange-500/15 text-orange-400",
  decent: "border-amber-500/20 bg-amber-500/15 text-amber-400",
  good: "border-emerald-500/20 bg-emerald-500/15 text-emerald-400",
};

export const ratingVariant = (value: number): `rating-${RatingTone}` =>
  `rating-${getRatingTone(value)}` as const;

export const formatMoney = (n: number | null | undefined): string => {
  if (!n || n <= 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
};
