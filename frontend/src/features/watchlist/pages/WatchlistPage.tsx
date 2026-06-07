import { Link } from "react-router-dom";
import { Bookmark, Trash2, Star } from "lucide-react";
import { useWatchlist, useRemoveFromWatchlist } from "../hooks/useWatchlist";
import { MovieGridSkeleton } from "@/components/common/Skeletons";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tmdbImage } from "@/lib/tmdb";
import { formatYear, getRatingTone, RATING_STAR, ratingVariant } from "@/lib/format";
import { cn } from "@/lib/cn";
import { toast } from "@/components/ui/toaster";
import { getErrorMessage } from "@/lib/api";

export const WatchlistPage: React.FC = () => {
  const { data, isLoading, isError, error, refetch } = useWatchlist();
  const remove = useRemoveFromWatchlist();

  const onRemove = async (tmdbId: number, mediaType: "movie" | "tv") => {
    try {
      await remove.mutateAsync({ tmdbId, mediaType });
      toast({ title: "Removed from watchlist" });
    } catch (err) {
      toast({
        title: "Could not remove",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container py-8 space-y-6">
      <header>
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">
          My Watchlist
        </h1>
        <p className="text-muted-foreground">
          {data?.length ?? 0} item{(data?.length ?? 0) === 1 ? "" : "s"}
        </p>
      </header>

      {isLoading ? (
        <MovieGridSkeleton />
      ) : isError ? (
        <ErrorState error={error} onRetry={() => refetch()} />
      ) : (data?.length ?? 0) === 0 ? (
        <EmptyState
          title="Your watchlist is empty"
          message="Add titles from any movie page to save them here."
          icon={<Bookmark className="h-7 w-7" />}
          action={
            <Button asChild>
              <Link to="/discover">Discover movies</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {data!.map((item) => (
            <div key={item.id} className="group relative">
              <Link to={`/${item.mediaType}/${item.tmdbId}`} className="block">
                <div className="aspect-[2/3] overflow-hidden rounded-lg bg-secondary">
                  <img
                    src={tmdbImage(item.posterPath, "w342")}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-2 space-y-0.5">
                  <h3 className="line-clamp-1 text-sm font-semibold">{item.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatYear(item.releaseDate)}</span>
                    {item.voteAverage ? (
                      <Badge variant={ratingVariant(item.voteAverage)} className="px-1 py-0">
                        <Star
                          className={cn(
                            "mr-0.5 h-3 w-3",
                            RATING_STAR[getRatingTone(item.voteAverage)]
                          )}
                        />
                        {item.voteAverage.toFixed(1)}
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </Link>
              <Button
                size="icon"
                variant="destructive"
                aria-label="Remove from watchlist"
                onClick={() => onRemove(item.tmdbId, item.mediaType as "movie" | "tv")}
                className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
