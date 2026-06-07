import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MovieCard } from "./MovieCard";
import type { TmdbMedia } from "@/types/api";

interface MovieRowProps {
  title: string;
  items: TmdbMedia[];
  rightSlot?: React.ReactNode;
}

export const MovieRow: React.FC<MovieRowProps> = ({ title, items, rightSlot }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: dir * (ref.current.clientWidth * 0.85),
      behavior: "smooth",
    });
  };

  if (!items.length) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-2xl tracking-wide sm:text-3xl">{title}</h2>
        <div className="flex items-center gap-2">
          {rightSlot}
          <div className="hidden sm:flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
            >
              <ChevronLeft />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      <div ref={ref} className="scroll-row">
        {items.map((m) => (
          <div
            key={`${m.id}-${m.media_type ?? ""}`}
            className="w-[140px] flex-shrink-0 snap-start sm:w-[170px] md:w-[190px]"
          >
            <MovieCard media={m} />
          </div>
        ))}
      </div>
    </section>
  );
};
