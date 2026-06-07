import { useSearchParams } from "react-router-dom";
import type { UseQueryResult } from "@tanstack/react-query";
import type { TmdbMedia, TmdbPage } from "@/types/api";
import { MovieGrid } from "@/features/movies/components/MovieGrid";
import { MovieGridSkeleton } from "@/components/common/Skeletons";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination } from "@/components/common/Pagination";

interface MediaListPageProps {
  title: string;
  subtitle?: string;
  useQueryHook: (page: number) => UseQueryResult<TmdbPage<TmdbMedia>>;
}

export const MediaListPage: React.FC<MediaListPageProps> = ({
  title,
  subtitle,
  useQueryHook,
}) => {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") ?? 1);
  const query = useQueryHook(page);

  const setPage = (p: number) => {
    params.set("page", String(p));
    setParams(params);
  };

  return (
    <div className="container py-8 space-y-6">
      <header className="space-y-1">
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">{title}</h1>
        {subtitle ? (
          <p className="text-muted-foreground">{subtitle}</p>
        ) : null}
      </header>

      {query.isLoading ? (
        <MovieGridSkeleton />
      ) : query.isError ? (
        <ErrorState error={query.error} onRetry={() => query.refetch()} />
      ) : (
        <>
          <MovieGrid items={query.data?.results ?? []} />
          <Pagination
            page={page}
            totalPages={Math.min(query.data?.total_pages ?? 1, 500)}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
};
