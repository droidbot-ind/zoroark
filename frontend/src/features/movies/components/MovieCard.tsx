import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear, getRatingTone, RATING_STAR, ratingVariant } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { TmdbMedia } from "@/types/api";

interface MovieCardProps {
  media: TmdbMedia;
  className?: string;
  priority?: boolean;
}

const getTitle = (m: TmdbMedia) =>
  m.title ?? m.name ?? m.original_title ?? m.original_name ?? "Untitled";

const getDate = (m: TmdbMedia) => m.release_date ?? m.first_air_date;

const getMediaType = (m: TmdbMedia): "movie" | "tv" | "person" => {
  if (m.media_type === "person") return "person";
  if (m.media_type === "tv") return "tv";
  if (m.name && !m.title) return "tv";
  return "movie";
};

export const MovieCard: React.FC<MovieCardProps> = ({
  media,
  className,
  priority = false,
}) => {
  const mediaType = getMediaType(media);
  const title = mediaType === "person" ? media.name ?? "Unknown" : getTitle(media);
  const posterPath = mediaType === "person" ? media.profile_path : media.poster_path;
  const to =
    mediaType === "person"
      ? `/person/${media.id}`
      : mediaType === "tv"
      ? `/tv/${media.id}`
      : `/movie/${media.id}`;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn("group", className)}
    >
      <Link to={to} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-secondary">
          <img
            src={tmdbImage(posterPath ?? null, "w342")}
            alt={title}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          {media.vote_average && mediaType !== "person" ? (
            <Badge
              variant={ratingVariant(media.vote_average)}
              className="absolute right-2 top-2 backdrop-blur-md bg-black/50"
            >
              <Star
                className={cn(
                  "mr-1 h-3 w-3",
                  RATING_STAR[getRatingTone(media.vote_average)]
                )}
              />
              {media.vote_average.toFixed(1)}
            </Badge>
          ) : null}
        </div>
        <div className="mt-2 space-y-0.5">
          <h3 className="line-clamp-1 text-sm font-semibold leading-snug">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground">
            {mediaType === "person"
              ? media.known_for_department ?? "Person"
              : formatYear(getDate(media))}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};
