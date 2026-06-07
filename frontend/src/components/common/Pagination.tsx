import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

export const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
  className,
}) => {
  if (totalPages <= 1) return null;

  const maxButtons = 5;
  let start = Math.max(1, page - Math.floor(maxButtons / 2));
  const end = Math.min(totalPages, start + maxButtons - 1);
  start = Math.max(1, end - maxButtons + 1);
  const pages = range(start, end);

  return (
    <nav
      className={cn("mt-8 flex flex-wrap items-center justify-center gap-1.5", className)}
      aria-label="Pagination"
    >
      <Button
        size="icon"
        variant="outline"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </Button>

      {start > 1 ? (
        <>
          <Button size="sm" variant="ghost" onClick={() => onChange(1)}>
            1
          </Button>
          {start > 2 ? <span className="px-1 text-muted-foreground">…</span> : null}
        </>
      ) : null}

      {pages.map((p) => (
        <Button
          key={p}
          size="sm"
          variant={p === page ? "default" : "ghost"}
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Button>
      ))}

      {end < totalPages ? (
        <>
          {end < totalPages - 1 ? (
            <span className="px-1 text-muted-foreground">…</span>
          ) : null}
          <Button size="sm" variant="ghost" onClick={() => onChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      ) : null}

      <Button
        size="icon"
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight />
      </Button>
    </nav>
  );
};
