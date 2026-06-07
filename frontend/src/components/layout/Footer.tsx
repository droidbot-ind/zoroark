import { Link } from "react-router-dom";
import { Film } from "lucide-react";

const exploreLinks = [
  { to: "/trending", label: "Trending" },
  { to: "/popular", label: "Popular" },
  { to: "/top-rated", label: "Top Rated" },
  { to: "/upcoming", label: "Upcoming" },
];

const accountLinks = [
  { to: "/profile", label: "Profile" },
  { to: "/watchlist", label: "Watchlist" },
];

export const Footer: React.FC = () => (
  <footer className="border-t border-border/40 bg-background mt-16">
    <div className="container py-10 grid gap-8 md:grid-cols-3">
      <div>
        <Link
          to="/"
          className="flex w-fit items-center gap-2 font-display text-xl transition-opacity hover:opacity-80"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
            <Film className="h-3.5 w-3.5" />
          </span>
          MOVIE NIGHT
        </Link>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs">
          Discover, track, and review the films and TV that move you. Data
          provided by TMDB.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:col-span-2">
        <div>
          <h4 className="text-sm font-semibold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {exploreLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {accountLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-border/40">
      <div className="container py-4 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Movie Night. All rights reserved.</span>
        <span>
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </span>
      </div>
    </div>
  </footer>
);
