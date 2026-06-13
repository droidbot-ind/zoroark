import { useEffect, useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Video } from "@/types/api";

interface TrailerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videos: Video[];
  mediaTitle: string;
}

export const TrailerDialog: React.FC<TrailerDialogProps> = ({
  open,
  onOpenChange,
  videos,
  mediaTitle,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === "ArrowRight") setIndex((i) => Math.min(videos.length - 1, i + 1));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange, videos.length]);

  const current = videos[index];
  if (!current) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-0 p-0 overflow-hidden border-border/40 sm:rounded-xl">
        <DialogTitle className="sr-only">{current.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Watch a video for {mediaTitle}.
        </DialogDescription>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${current.key}?autoplay=1&rel=0&modestbranding=1`}
            title={current.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
          {index > 0 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIndex((i) => i - 1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          ) : null}
          {index < videos.length - 1 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIndex((i) => i + 1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white hover:bg-black/60"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-muted-foreground border-t border-border/40">
          <span className="line-clamp-1 font-medium text-foreground/80">
            {current.name}
          </span>
          <div className="flex items-center gap-3 shrink-0">
            {videos.length > 1 ? (
              <span className="tabular-nums text-muted-foreground">
                {index + 1} / {videos.length}
              </span>
            ) : null}
            <a
              href={`https://www.youtube.com/watch?v=${current.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              YouTube
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
