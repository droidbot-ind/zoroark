import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearch } from "../hooks/useSearch";
import { MovieGrid } from "@/features/movies/components/MovieGrid";
import { MovieGridSkeleton } from "@/components/common/Skeletons";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";

export const SearchPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const page = Number(params.get("page") ?? 1);

  const [value, setValue] = useState(q);

  useEffect(() => {
    setValue(q);
  }, [q]);

  const search = useSearch(q, page);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = value.trim();
    if (!next) return;
    setParams({ q: next, page: "1" });
  };

  const setPage = (p: number) => setParams({ q, page: String(p) });

  return (
    <div className="container py-8 space-y-6">
      <header className="space-y-3">
        <h1 className="font-display text-4xl tracking-wide sm:text-5xl">Search</h1>
        <form onSubmit={onSubmit} className="relative flex max-w-2xl gap-2">
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Search movies, TV shows, people..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        {q ? (
          <p className="text-sm text-muted-foreground">
            {search.data
              ? `${search.data.total_results.toLocaleString()} results for `
              : "Searching for "}
            <span className="text-foreground font-medium">"{q}"</span>
          </p>
        ) : null}
      </header>

      {!q ? (
        <EmptyState
          title="Search the catalog"
          message="Try a title, an actor, or a director."
        />
      ) : search.isLoading ? (
        <MovieGridSkeleton />
      ) : search.isError ? (
        <ErrorState error={search.error} onRetry={() => search.refetch()} />
      ) : (search.data?.results.length ?? 0) === 0 ? (
        <EmptyState title="No results" message="Try a different query." />
      ) : (
        <>
          <MovieGrid items={search.data?.results ?? []} />
          <Pagination
            page={page}
            totalPages={Math.min(search.data?.total_pages ?? 1, 500)}
            onChange={setPage}
          />
        </>
      )}
    </div>
  );
};
