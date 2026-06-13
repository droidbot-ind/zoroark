import { Link } from "react-router-dom";
import { useState } from "react";
import { Play, Info, Star } from "lucide-react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { TrailerDialog } from "@/features/movies/components/TrailerDialog";
import { moviesApi } from "@/features/movies/api/movies.api";
import { tmdbBackdrop } from "@/lib/tmdb";
import { formatYear, getRatingTone, RATING_STAR, RATING_TEXT } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { TmdbMedia, MovieDetail } from "@/types/api";

interface HeroBannerProps {
  media: TmdbMedia;
}

const getTitle = (m: TmdbMedia) => m.title ?? m.name ?? "Featured";
const getDate = (m: TmdbMedia) => m.release_date ?? m.first_air_date;
const getType = (m: TmdbMedia) => (m.media_type === "tv" || (m.name && !m.title) ? "tv" : "movie");

export const HeroBanner: React.FC<HeroBannerProps> = ({ media }) => {
  const type = getType(media);
  const title = getTitle(media);
  const tone = getRatingTone(media.vote_average ?? 0);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const detailQuery = useQuery({
    queryKey: ["hero-detail", type, media.id],
    queryFn: () =>
      type === "tv" ? moviesApi.tvDetail(media.id) : moviesApi.movieDetail(media.id),
    staleTime: 1000 * 60 * 10,
  });

  const detail = detailQuery.data as MovieDetail | undefined;
  const trailers = (detail?.videos?.results ?? []).filter(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser")
  );

  return (
    <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden sm:h-[72vh]">
      {media.backdrop_path ? (
        <img
          src={tmdbBackdrop(media.backdrop_path, "original")}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
      )}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 gradient-overlay" />

      <div className="relative z-10 container flex h-full flex-col justify-end pb-12 sm:justify-center sm:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-1 w-8 rounded-full bg-primary" />
            Featured {type === "tv" ? "Series" : "Film"}
          </div>
          <h1 className="font-display text-4xl tracking-wide sm:text-6xl">
            {title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className={cn("inline-flex items-center gap-1", RATING_TEXT[tone])}>
              <Star className={cn("h-4 w-4", RATING_STAR[tone])} />
              {media.vote_average?.toFixed(1) ?? "—"}
            </span>
            <span>{formatYear(getDate(media))}</span>
          </div>
          {media.overview ? (
            <p className="line-clamp-3 max-w-prose text-sm text-foreground/85 sm:text-base">
              {media.overview}
            </p>
          ) : null}
          <div className="flex flex-wrap gap-2 pt-1">
            {trailers.length > 0 ? (
              <Button size="lg" onClick={() => setTrailerOpen(true)}>
                <Play className="mr-1 h-5 w-5 fill-current" /> Play trailer
              </Button>
            ) : null}
            <Button asChild size="lg" variant={trailers.length > 0 ? "secondary" : "default"}>
              <Link to={`/${type}/${media.id}`}>
                <Info className="mr-1 h-5 w-5" /> View details
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {trailers.length > 0 ? (
        <TrailerDialog
          open={trailerOpen}
          onOpenChange={setTrailerOpen}
          videos={trailers}
          mediaTitle={title}
        />
      ) : null}
    </div>
  );
};
