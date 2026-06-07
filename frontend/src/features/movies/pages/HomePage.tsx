import { useMemo } from "react";
import { HeroBanner } from "@/features/movies/components/HeroBanner";
import { MovieRow } from "@/features/movies/components/MovieRow";
import { MovieRowSkeleton } from "@/components/common/Skeletons";
import { ErrorState } from "@/components/common/ErrorState";
import {
  useTrending,
  usePopular,
  useTopRated,
  useUpcoming,
  useNowPlaying,
  usePopularTv,
} from "@/features/movies/hooks/useMovies";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HomePage: React.FC = () => {
  const trending = useTrending("week", 1);
  const popular = usePopular(1);
  const topRated = useTopRated(1);
  const upcoming = useUpcoming(1);
  const nowPlaying = useNowPlaying(1);
  const popularTv = usePopularTv(1);

  const featured = useMemo(() => {
    const results = trending.data?.results ?? [];
    const withBackdrop = results.filter((r) => r.backdrop_path);
    if (withBackdrop.length === 0) return null;
    return withBackdrop[Math.floor(Math.random() * Math.min(5, withBackdrop.length))];
  }, [trending.data]);

  return (
    <div className="space-y-12">
      {trending.isLoading ? (
        <div className="h-[60vh] min-h-[420px] w-full skeleton rounded-none" />
      ) : featured ? (
        <HeroBanner media={featured} />
      ) : null}

      <div className="container space-y-12">
        <Row
          title="Trending This Week"
          query={trending}
          rightSlot={
            <Button asChild variant="link" size="sm">
              <Link to="/trending">See all</Link>
            </Button>
          }
        />
        <Row
          title="Popular Movies"
          query={popular}
          rightSlot={
            <Button asChild variant="link" size="sm">
              <Link to="/popular">See all</Link>
            </Button>
          }
        />
        <Row title="Now Playing" query={nowPlaying} />
        <Row
          title="Top Rated"
          query={topRated}
          rightSlot={
            <Button asChild variant="link" size="sm">
              <Link to="/top-rated">See all</Link>
            </Button>
          }
        />
        <Row title="Coming Soon" query={upcoming} />
        <Row title="Popular Series" query={popularTv} />
      </div>
    </div>
  );
};

interface RowProps {
  title: string;
  query: ReturnType<typeof useTrending>;
  rightSlot?: React.ReactNode;
}

const Row: React.FC<RowProps> = ({ title, query, rightSlot }) => {
  if (query.isLoading) {
    return (
      <div className="space-y-3">
        <h2 className="font-display text-2xl tracking-wide sm:text-3xl">{title}</h2>
        <MovieRowSkeleton />
      </div>
    );
  }
  if (query.isError) {
    return (
      <ErrorState
        title={`Couldn't load "${title}"`}
        error={query.error}
        onRetry={() => query.refetch()}
      />
    );
  }
  return (
    <MovieRow
      title={title}
      items={query.data?.results ?? []}
      rightSlot={rightSlot}
    />
  );
};
