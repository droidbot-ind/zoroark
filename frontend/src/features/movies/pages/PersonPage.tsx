import { Link, useParams } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PersonPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container py-24 flex flex-col items-center text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <User className="h-7 w-7 text-muted-foreground" />
      </div>
      <h1 className="mt-6 font-display text-4xl tracking-wide">Person</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Person pages are not implemented yet.
      </p>
      {id ? (
        <p className="mt-1 text-xs text-muted-foreground/60">
          TMDB ID: {id}
        </p>
      ) : null}
      <div className="mt-6 flex gap-3">
        <Button asChild variant="outline">
          <Link to="..">
            <ArrowLeft className="mr-1 h-4 w-4" /> Go back
          </Link>
        </Button>
        <Button asChild>
          <Link to="/">Back home</Link>
        </Button>
      </div>
    </div>
  );
};
