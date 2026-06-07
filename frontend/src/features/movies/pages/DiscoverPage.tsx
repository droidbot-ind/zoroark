import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Filter } from "lucide-react";
import { MovieGrid } from "@/features/movies/components/MovieGrid";
import { MovieGridSkeleton } from "@/components/common/Skeletons";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDiscover, useMovieGenres } from "@/features/movies/hooks/useMovies";
import { cn } from "@/lib/cn";

const sortOptions: { value: string; label: string }[] = [
  { value: "popularity.desc", label: "Popularity" },
  { value: "vote_average.desc", label: "Rating" },
  { value: "release_date.desc", label: "Newest" },
  { value: "release_date.asc", label: "Oldest" },
  { value: "revenue.desc", label: "Revenue" },
];

export const DiscoverPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") ?? 1);
  const sort = params.get("sort") ?? "popularity.desc";
  const genre = params.get("genre") ?? "";

  const queryParams = useMemo(() => {
    const p: Record<string, string | number> = { sort_by: sort };
    if (genre) p.with_genres = genre;
    return p;
  }, [sort, genre]);

  const discover = useDiscover(page, queryParams);
  const genres = useMovieGenres();

  const setParam = (key: string, value: string) => {
    if (value) params.set(key, value);
    else params.delete(key);
    params.set("page", "1");
    setParams(params);
  };

  const setPage = (p: number) => {
    params.set("page", String(p));
    setParams(params);
  };

  return (
    <div className="container py-8 space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">Discover</h1>
        <p className="text-muted-foreground">
          Filter by genre and sort to find your next favorite.
        </p>
      </header>

      <div className="space-y-3 rounded-xl border border-border/60 bg-card/50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Filter className="h-4 w-4" /> Filters
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Sort by
          </div>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((opt) => (
              <Button
                key={opt.value}
                size="sm"
                variant={sort === opt.value ? "default" : "outline"}
                onClick={() => setParam("sort", opt.value)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
            Genre
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={genre === "" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setParam("genre", "")}
            >
              All
            </Badge>
            {genres.data?.genres.map((g) => (
              <Badge
                key={g.id}
                className={cn(
                  "cursor-pointer transition-colors",
                  genre === String(g.id) ? "" : "hover:bg-secondary"
                )}
                variant={genre === String(g.id) ? "default" : "outline"}
                onClick={() => setParam("genre", String(g.id))}
              >
                {g.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {discover.isLoading ? (
        <MovieGridSkeleton />
      ) : discover.isError ? (
        <ErrorState error={discover.error} onRetry={() => discover.refetch()} />
      ) : (
        <>
          <MovieGrid items={discover.data?.results ?? []} />
          <Pagination
            page={page}
            totalPages={Math.min(discover.data?.total_pages ?? 1, 500)}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
};
