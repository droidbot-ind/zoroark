import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RatingStar } from "@/components/common/RatingStar";
import { formatDate } from "@/lib/format";
import type { Review } from "@/types/api";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No community reviews yet. Be the first to write one.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {reviews.map((r) => {
        const name = r.user?.displayName ?? r.user?.username ?? "Anonymous";
        return (
          <li
            key={r.id}
            className="rounded-xl border border-border/60 bg-card/60 p-4"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={r.user?.avatarUrl ?? undefined} />
                <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold">{name}</span>
                  <RatingStar value={r.rating} />
                  <span className="text-xs text-muted-foreground">
                    {formatDate(r.createdAt)}
                  </span>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {r.content}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
