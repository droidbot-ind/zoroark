import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Calendar, Star, Play } from "lucide-react";
import {
  useMovieDetail,
  useTvDetail,
} from "@/features/movies/hooks/useMovies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DetailPageSkeleton } from "@/components/common/Skeletons";
import { ErrorState } from "@/components/common/ErrorState";
import { tmdbBackdrop, tmdbImage } from "@/lib/tmdb";
import {
  formatDate,
  formatMoney,
  formatRuntime,
  formatYear,
  getRatingTone,
  RATING_STAR,
  RATING_TEXT,
} from "@/lib/format";
import { cn } from "@/lib/cn";
import { WatchlistButton } from "@/features/watchlist/components/WatchlistButton";
import { ReviewForm } from "@/features/reviews/components/ReviewForm";
import { ReviewList } from "@/features/reviews/components/ReviewList";
import { MovieRow } from "@/features/movies/components/MovieRow";
import { TrailerDialog } from "@/features/movies/components/TrailerDialog";
import { useMediaReviews } from "@/features/reviews/hooks/useReviews";
import { RatingStar } from "@/components/common/RatingStar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { MovieDetail } from "@/types/api";

interface Props {
  mediaType: "movie" | "tv";
}

export const MediaDetailPage: React.FC<Props> = ({ mediaType }) => {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const movieQuery = useMovieDetail(id, mediaType === "movie");
  const tvQuery = useTvDetail(id, mediaType === "tv");
  const query = mediaType === "movie" ? movieQuery : tvQuery;
  const reviewsQuery = useMediaReviews(id, mediaType);

  if (query.isLoading) {
    return (
      <div className="container py-8">
        <DetailPageSkeleton />
      </div>
    );
  }
  if (query.isError || !query.data) {
    return (
      <div className="container py-12">
        <ErrorState
          title="Couldn't load this title"
          error={query.error}
          onRetry={() => query.refetch()}
        />
      </div>
    );
  }

  const data = query.data as MovieDetail & {
    name?: string;
    first_air_date?: string;
    number_of_seasons?: number;
    episode_run_time?: number[];
  };

  const title = data.title ?? data.name ?? "Untitled";
  const releaseDate = data.release_date ?? data.first_air_date ?? null;
  const runtime =
    data.runtime ??
    (Array.isArray(data.episode_run_time) ? data.episode_run_time[0] : undefined);
  const trailer = data.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const tone = getRatingTone(data.vote_average ?? 0);
  const director = data.credits?.crew.find((c) => c.job === "Director");

  return (
    <div className="space-y-10">
      {/* HERO */}
      <div className="relative">
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden sm:h-[65vh]">
          {data.backdrop_path ? (
            <img
              src={tmdbBackdrop(data.backdrop_path, "original")}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        </div>

        <div className="container relative -mt-40 sm:-mt-56">
          <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-8">
            <div className="mx-auto w-44 sm:w-52 md:mx-0 md:w-full">
              <div className="aspect-[2/3] overflow-hidden rounded-xl border border-border/60 shadow-2xl bg-secondary">
                <img
                  src={tmdbImage(data.poster_path, "w500")}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="font-display text-4xl tracking-wide sm:text-6xl">
                  {title}
                </h1>
                {data.tagline ? (
                  <p className="mt-1 text-base italic text-muted-foreground">
                    {data.tagline}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className={cn("inline-flex items-center gap-1", RATING_TEXT[tone])}>
                  <Star className={cn("h-4 w-4", RATING_STAR[tone])} />
                  <span className="font-semibold">
                    {data.vote_average?.toFixed(1) ?? "—"}
                  </span>
                  <span className="text-xs opacity-80">
                    ({data.vote_count?.toLocaleString() ?? 0})
                  </span>
                </span>
                {releaseDate ? (
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatYear(releaseDate)}
                  </span>
                ) : null}
                {runtime ? (
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {formatRuntime(runtime)}
                  </span>
                ) : null}
              </div>

              {data.genres?.length ? (
                <div className="flex flex-wrap gap-2">
                  {data.genres.map((g) => (
                    <Badge key={g.id} variant="outline">
                      {g.name}
                    </Badge>
                  ))}
                </div>
              ) : null}

              {data.overview ? (
                <p className="max-w-prose text-sm leading-relaxed text-foreground/90 sm:text-base">
                  {data.overview}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2 pt-2">
                {trailer ? (
                  <Button onClick={() => setTrailerOpen(true)}>
                    <Play className="mr-1 h-4 w-4 fill-current" /> Watch trailer
                  </Button>
                ) : null}
                <WatchlistButton
                  tmdbId={data.id}
                  mediaType={mediaType}
                  title={title}
                  posterPath={data.poster_path}
                  releaseDate={releaseDate}
                  voteAverage={data.vote_average ?? null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-10">
        {/* META */}
        <Separator />
        <section className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-sm">
          {director ? (
            <Meta label="Director" value={director.name} />
          ) : null}
          <Meta label="Release date" value={formatDate(releaseDate)} />
          {mediaType === "movie" && data.budget ? (
            <Meta label="Budget" value={formatMoney(data.budget)} />
          ) : null}
          {mediaType === "movie" && data.revenue ? (
            <Meta label="Revenue" value={formatMoney(data.revenue)} />
          ) : null}
          {data.status ? <Meta label="Status" value={data.status} /> : null}
        </section>

        {/* CAST */}
        {data.credits?.cast?.length ? (
          <section className="space-y-3">
            <h2 className="font-display text-2xl tracking-wide sm:text-3xl">
              Top Cast
            </h2>
            <div className="scroll-row">
              {data.credits.cast.slice(0, 20).map((c) => (
                <Link
                  key={`${c.id}-${c.character}`}
                  to={`/person/${c.id}`}
                  className="w-[130px] flex-shrink-0 snap-start text-center"
                >
                  <Avatar className="mx-auto h-24 w-24">
                    <AvatarImage src={tmdbImage(c.profile_path, "w185")} />
                    <AvatarFallback>
                      {c.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="mt-2 line-clamp-1 text-sm font-semibold">
                    {c.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {c.character}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {/* REVIEWS */}
        <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <ReviewForm
            tmdbId={data.id}
            mediaType={mediaType}
            title={title}
            posterPath={data.poster_path}
          />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl tracking-wide">Reviews</h2>
              {reviewsQuery.data?.aggregate.count ? (
                <RatingStar value={reviewsQuery.data.aggregate.averageRating} />
              ) : null}
            </div>
            {reviewsQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">Loading reviews…</p>
            ) : reviewsQuery.isError ? (
              <ErrorState error={reviewsQuery.error} onRetry={() => reviewsQuery.refetch()} />
            ) : (
              <ReviewList reviews={reviewsQuery.data?.items ?? []} />
            )}
          </div>
        </section>

        {/* SIMILAR */}
        {data.similar?.results?.length ? (
          <MovieRow title="More like this" items={data.similar.results.slice(0, 20)} />
        ) : null}

        {/* RECOMMENDED */}
        {data.recommendations?.results?.length ? (
          <MovieRow
            title="Recommended"
            items={data.recommendations.results.slice(0, 20)}
          />
        ) : null}
      </div>

      {trailer ? (
        <TrailerDialog
          open={trailerOpen}
          onOpenChange={setTrailerOpen}
          videoKey={trailer.key}
          videoName={trailer.name}
          mediaTitle={title}
        />
      ) : null}
    </div>
  );
};

const Meta: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    <p className="mt-1 font-semibold">{value}</p>
  </div>
);
