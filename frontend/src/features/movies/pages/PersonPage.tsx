import { Link, useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Star,
  Clapperboard,
  Tv,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { usePersonDetail } from "@/features/movies/hooks/useMovies";
import { tmdbImage } from "@/lib/tmdb";
import { formatDate, formatYear, getRatingTone, RATING_STAR, RATING_TEXT } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { PersonCredit } from "@/types/api";

export const PersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const numId = Number(id);
  const { data: person, isLoading, isError, error, refetch } = usePersonDetail(numId);

  if (!Number.isFinite(numId) || numId <= 0) {
    return (
      <div className="container py-12">
        <EmptyState title="Invalid person ID" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container py-8 space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <Skeleton className="mx-auto h-72 w-52 rounded-xl sm:mx-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container py-12">
        <ErrorState error={error} onRetry={() => refetch()} />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container py-12">
        <EmptyState title="Person not found" />
      </div>
    );
  }

  const allCredits: PersonCredit[] = [
    ...(person.movie_credits?.cast ?? []).map((c) => ({ ...c, media_type: "movie" as const })),
    ...(person.tv_credits?.cast ?? []).map((c) => ({ ...c, media_type: "tv" as const })),
  ];
  const crewCredits: PersonCredit[] = [
    ...(person.movie_credits?.crew ?? []).map((c) => ({ ...c, media_type: "movie" as const })),
    ...(person.tv_credits?.crew ?? []).map((c) => ({ ...c, media_type: "tv" as const })),
  ];

  const sortedByRating = [...allCredits].sort(
    (a, b) => b.vote_average - a.vote_average,
  );
  const knownFor = sortedByRating.slice(0, 12);

  const sortedByDate = [...allCredits].sort((a, b) => {
    const da = a.release_date ?? a.first_air_date ?? "";
    const db = b.release_date ?? b.first_air_date ?? "";
    return db.localeCompare(da);
  });

  const distinctDepartments = [
    ...new Set(crewCredits.map((c) => c.department).filter(Boolean)),
  ];

  const age =
    person.birthday
      ? new Date().getFullYear() - new Date(person.birthday).getFullYear()
      : null;

  return (
    <div className="container py-8 space-y-8">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="-ml-2">
        <Link to=".." relative="route">
          <ChevronLeft className="mr-1 h-4 w-4" /> Back
        </Link>
      </Button>

      {/* HEADER */}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="shrink-0">
          {person.profile_path ? (
            <img
              src={tmdbImage(person.profile_path, "w342")}
              alt={person.name}
              className="h-72 w-52 rounded-xl border border-border/60 object-cover shadow-lg"
            />
          ) : (
            <div className="flex h-72 w-52 items-center justify-center rounded-xl bg-secondary text-muted-foreground">
              <Clapperboard className="h-12 w-12" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3 text-center sm:text-left">
          <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
            {person.name}
          </h1>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground sm:justify-start">
            {person.known_for_department ? (
              <Badge variant="secondary">{person.known_for_department}</Badge>
            ) : null}
            {person.birthday ? (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(person.birthday)}
                {age !== null ? (
                  <span className="text-xs opacity-70">({age} yrs)</span>
                ) : null}
              </span>
            ) : null}
            {person.place_of_birth ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {person.place_of_birth}
              </span>
            ) : null}
            {person.homepage ? (
              <a
                href={person.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Website
              </a>
            ) : null}
          </div>

          {person.biography ? (
            <div className="max-w-prose text-sm leading-relaxed text-foreground/85">
              <p className="line-clamp-6">{person.biography}</p>
            </div>
          ) : (
            <p className="text-sm italic text-muted-foreground">
              No biography available.
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            {distinctDepartments.slice(0, 4).map((d) => (
              <Badge key={d} variant="outline">
                {d}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* KNOWN FOR */}
      {knownFor.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-wide sm:text-3xl">
            Known for
          </h2>
          <div className="scroll-row">
            {knownFor.map((c) => (
              <Link
                key={c.credit_id}
                to={`/${c.media_type === "tv" ? "tv" : "movie"}/${c.id}`}
                className="group w-32 shrink-0 space-y-1.5"
              >
                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-secondary">
                  {c.poster_path ? (
                    <img
                      src={tmdbImage(c.poster_path, "w185")}
                      alt={c.title ?? c.name ?? ""}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                      <Clapperboard className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <p className="line-clamp-1 text-xs font-medium">
                  {c.title ?? c.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {c.vote_average > 0 ? (
                    <>
                      <Star
                        className={cn(
                          "h-3 w-3",
                          RATING_STAR[getRatingTone(c.vote_average)],
                        )}
                      />
                      <span
                        className={cn(
                          RATING_TEXT[getRatingTone(c.vote_average)],
                        )}
                      >
                        {c.vote_average.toFixed(1)}
                      </span>
                    </>
                  ) : null}
                  {c.release_date || c.first_air_date ? (
                    <span>
                      {formatYear(c.release_date ?? c.first_air_date ?? "")}
                    </span>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* FILMOGRAPHY */}
      {sortedByDate.length > 0 ? (
        <section className="space-y-3">
          <h2 className="font-display text-2xl tracking-wide sm:text-3xl">
            Filmography
          </h2>
          <div className="space-y-1">
            {sortedByDate.map((c) => {
              const date = c.release_date ?? c.first_air_date;
              const isTv = c.media_type === "tv" || !!c.episode_count;
              return (
                <Link
                  key={c.credit_id}
                  to={`/${isTv ? "tv" : "movie"}/${c.id}`}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-secondary/60"
                >
                  <div className="flex h-9 w-6 shrink-0 items-center justify-center rounded bg-secondary text-muted-foreground">
                    {isTv ? (
                      <Tv className="h-3.5 w-3.5" />
                    ) : (
                      <Clapperboard className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {c.title ?? c.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {c.character
                        ? `as ${c.character}`
                        : c.job
                          ? c.job
                          : isTv
                            ? "TV Series"
                            : "Film"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                    {c.vote_average > 0 ? (
                      <span
                        className={cn(
                          "tabular-nums",
                          RATING_TEXT[getRatingTone(c.vote_average)],
                        )}
                      >
                        {c.vote_average.toFixed(1)}
                      </span>
                    ) : null}
                    {date ? (
                      <span className="tabular-nums">{formatYear(date)}</span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </div>
  );
};
