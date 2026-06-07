import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Menu, X, Film, Bookmark, User, LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ThemeCustomizer } from "@/theme/ThemeCustomizer";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/cn";
import ShinyText from "@/components/ShinyText";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/discover", label: "Discover" },
  { to: "/trending", label: "Trending" },
  { to: "/popular", label: "Popular" },
  { to: "/top-rated", label: "Top Rated" },
  { to: "/upcoming", label: "Upcoming" },
];

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-display text-2xl tracking-wide shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Film className="h-4 w-4" />
          </span>
          <ShinyText
            text="ZOROARK"
            color="#f5f5f5"
            shineColor="#fbbf24"
            spread={160}
            speed={4}
            delay={2}
            className="hidden sm:inline-block"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <form
          onSubmit={onSearch}
          className="ml-auto hidden md:flex items-center relative w-full max-w-sm"
        >
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, TV, people..."
            className="pl-9"
            aria-label="Search"
          />
        </form>

        <div className="ml-auto md:ml-2 flex items-center gap-1">
          <ThemeCustomizer />
          <ThemeToggle />
          {isAuthenticated && user ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <UserAvatar
                      avatarUrl={user.avatarUrl}
                      displayName={user.displayName}
                      username={user.username}
                    />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user.displayName ?? user.username}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/watchlist")}>
                  <Bookmark className="mr-2 h-4 w-4" /> Watchlist
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                <LogIn className="mr-1 h-4 w-4" /> Sign in
              </Button>
              <Button size="sm" onClick={() => navigate("/register")}>
                Sign up
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="lg:hidden border-t border-border/40 bg-background">
          <div className="container py-3 space-y-3">
            <form onSubmit={onSearch} className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="pl-9"
              />
            </form>
            <nav className="grid grid-cols-2 gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 text-sm rounded-md",
                      isActive
                        ? "text-foreground bg-secondary"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </nav>
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Sign in
                </Button>
                <Button onClick={() => navigate("/register")}>Sign up</Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
};
