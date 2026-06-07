import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/lib/api";

interface ErrorStateProps {
  title?: string;
  message?: string;
  error?: unknown;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  error,
  onRetry,
}) => {
  const detail = error ? getErrorMessage(error) : message;
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border/60 bg-card/50 p-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground break-words">
        {detail ?? "We couldn't load the data. Please try again."}
      </p>
      {onRetry ? (
        <Button onClick={onRetry} variant="outline" className="mt-4" size="sm">
          <RefreshCw className="mr-1 h-4 w-4" />
          Retry
        </Button>
      ) : null}
    </div>
  );
};
