import { useEffect } from "react";
import { ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TrailerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  videoKey: string;
  videoName?: string;
  mediaTitle: string;
}

export const TrailerDialog: React.FC<TrailerDialogProps> = ({
  open,
  onOpenChange,
  videoKey,
  videoName,
  mediaTitle,
}) => {
  const title = videoName ?? `${mediaTitle} trailer`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-0 p-0 overflow-hidden border-border/40 sm:rounded-xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">
          Watch the official trailer for {mediaTitle}.
        </DialogDescription>
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-muted-foreground border-t border-border/40">
          <span className="line-clamp-1 font-medium text-foreground/80">
            {title}
          </span>
          <a
            href={`https://www.youtube.com/watch?v=${videoKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open on YouTube
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};
