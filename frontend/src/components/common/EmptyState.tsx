import { Film } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nothing here yet",
  message = "Start exploring to fill this space.",
  icon,
  action,
}) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 bg-card/30 p-12 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-muted-foreground">
      {icon ?? <Film className="h-7 w-7" />}
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);
