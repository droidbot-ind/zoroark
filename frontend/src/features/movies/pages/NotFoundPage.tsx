import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

export const NotFoundPage: React.FC = () => (
  <div className="container py-24 flex flex-col items-center text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
      <Film className="h-7 w-7 text-primary" />
    </div>
    <h1 className="mt-6 font-display text-5xl tracking-wide">404</h1>
    <p className="mt-2 text-lg text-muted-foreground">
      We couldn't find this scene.
    </p>
    <Button asChild className="mt-6">
      <Link to="/">Back home</Link>
    </Button>
  </div>
);
