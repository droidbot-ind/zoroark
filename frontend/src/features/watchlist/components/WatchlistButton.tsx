import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useAddToWatchlist,
  useIsInWatchlist,
  useRemoveFromWatchlist,
} from "../hooks/useWatchlist";
import { useAuthStore } from "@/stores/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/toaster";
import { getErrorMessage } from "@/lib/api";

interface WatchlistButtonProps {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number | null;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "secondary" | "outline";
}

export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  tmdbId,
  mediaType,
  title,
  posterPath,
  releaseDate,
  voteAverage,
  size = "default",
  variant = "secondary",
}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { data, isLoading } = useIsInWatchlist(tmdbId, mediaType);
  const add = useAddToWatchlist();
  const remove = useRemoveFromWatchlist();

  const inWatchlist = data?.inWatchlist ?? false;
  const pending = add.isPending || remove.isPending || isLoading;

  const onClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    try {
      if (inWatchlist) {
        await remove.mutateAsync({ tmdbId, mediaType });
        toast({ title: "Removed from watchlist" });
      } else {
        await add.mutateAsync({
          tmdbId,
          mediaType,
          title,
          posterPath,
          releaseDate,
          voteAverage,
        });
        toast({ title: "Added to watchlist", variant: "success" });
      }
    } catch (err) {
      toast({
        title: "Action failed",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={pending}
      size={size}
      variant={inWatchlist ? "default" : variant}
    >
      {pending ? (
        <Loader2 className="mr-1 h-4 w-4 animate-spin" />
      ) : inWatchlist ? (
        <BookmarkCheck className="mr-1 h-4 w-4" />
      ) : (
        <Bookmark className="mr-1 h-4 w-4" />
      )}
      {inWatchlist ? "In Watchlist" : "Watchlist"}
    </Button>
  );
};
