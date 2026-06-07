import { MovieCard } from "./MovieCard";
import type { TmdbMedia } from "@/types/api";

interface MovieGridProps {
  items: TmdbMedia[];
}

export const MovieGrid: React.FC<MovieGridProps> = ({ items }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
    {items.map((m, idx) => (
      <MovieCard
        key={`${m.id}-${m.media_type ?? ""}-${idx}`}
        media={m}
        priority={idx < 6}
      />
    ))}
  </div>
);
