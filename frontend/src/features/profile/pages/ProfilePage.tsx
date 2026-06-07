import { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, MessageSquare, Star, Pencil, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { UserAvatar } from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/authStore";
import {
  useMe,
  useUpdateProfile,
  useUserStats,
} from "@/features/auth/hooks/useAuth";
import { useMyReviews } from "@/features/reviews/hooks/useReviews";
import { useWatchlist } from "@/features/watchlist/hooks/useWatchlist";
import { formatDate, formatYear, getRatingTone, RATING_STAR, RATING_TEXT } from "@/lib/format";
import { tmdbImage } from "@/lib/tmdb";
import { RatingStar } from "@/components/common/RatingStar";
import { EmptyState } from "@/components/common/EmptyState";
import { toast } from "@/components/ui/toaster";
import { getErrorMessage } from "@/lib/api";
import { cn } from "@/lib/cn";

export const ProfilePage: React.FC = () => {
  const storeUser = useAuthStore((s) => s.user);
  const { data: user } = useMe();
  const { data: stats } = useUserStats();
  const me = user ?? storeUser;

  const myReviews = useMyReviews();
  const myWatchlist = useWatchlist();

  if (!me) {
    return (
      <div className="container py-12">
        <EmptyState title="Not signed in" />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      {/* HEADER */}
      <Card>
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <UserAvatar
              avatarUrl={me.avatarUrl}
              displayName={me.displayName}
              username={me.username}
              className="h-24 w-24 ring-2 ring-border"
            />
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-3xl tracking-wide sm:text-4xl">
                  {me.displayName ?? me.username}
                </h1>
                <span className="text-sm text-muted-foreground">@{me.username}</span>
              </div>
              {me.bio ? (
                <p className="max-w-prose text-sm text-foreground/85">{me.bio}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No bio yet.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Joined {formatDate(me.createdAt)}
              </p>
            </div>
            <EditProfileDialog />
          </div>
        </CardContent>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat
          icon={<Bookmark />}
          label="Watchlist"
          value={stats?.watchlistCount ?? 0}
        />
        <Stat
          icon={<MessageSquare />}
          label="Reviews"
          value={stats?.reviewCount ?? 0}
        />
        <Stat
          icon={
            <Star
              className={
                stats?.averageRating
                  ? RATING_STAR[getRatingTone(stats.averageRating)]
                  : undefined
              }
            />
          }
          label="Avg rating"
          value={
            stats?.averageRating ? stats.averageRating.toFixed(1) : "—"
          }
          valueClassName={
            stats?.averageRating
              ? RATING_TEXT[getRatingTone(stats.averageRating)]
              : undefined
          }
        />
      </div>

      {/* TABS */}
      <Tabs defaultValue="reviews">
        <TabsList>
          <TabsTrigger value="reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="pt-4 space-y-3">
          {myReviews.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (myReviews.data?.length ?? 0) === 0 ? (
            <EmptyState
              title="No reviews yet"
              message="Visit a movie and share your thoughts."
            />
          ) : (
            <ul className="space-y-3">
              {myReviews.data!.map((r) => (
                <li
                  key={r.id}
                  className="rounded-xl border border-border/60 bg-card/60 p-4"
                >
                  <Link
                    to={`/${r.mediaType}/${r.tmdbId}`}
                    className="flex items-start gap-3"
                  >
                    <img
                      src={tmdbImage(r.posterPath, "w154")}
                      alt={r.title}
                      className="h-24 w-16 rounded object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{r.title}</h3>
                        <RatingStar value={r.rating} />
                        <span className="text-xs text-muted-foreground">
                          {formatDate(r.updatedAt)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-3 text-sm text-foreground/85">
                        {r.content}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </TabsContent>

        <TabsContent value="watchlist" className="pt-4">
          {myWatchlist.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (myWatchlist.data?.length ?? 0) === 0 ? (
            <EmptyState
              title="Your watchlist is empty"
              action={
                <Button asChild>
                  <Link to="/discover">Discover</Link>
                </Button>
              }
            />
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
              {myWatchlist.data!.map((w) => (
                <Link
                  to={`/${w.mediaType}/${w.tmdbId}`}
                  key={w.id}
                  className="group block"
                >
                  <div className="aspect-[2/3] overflow-hidden rounded-md bg-secondary">
                    <img
                      src={tmdbImage(w.posterPath, "w342")}
                      alt={w.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-1 line-clamp-1 text-xs font-medium">
                    {w.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatYear(w.releaseDate)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Stat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | number;
  valueClassName?: string;
}> = ({ icon, label, value, valueClassName }) => (
  <Card>
    <CardContent className="flex items-center gap-3 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
        {icon}
      </div>
      <div>
        <p className={cn("text-2xl font-semibold tabular-nums", valueClassName)}>
          {value}
        </p>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
    </CardContent>
  </Card>
);

const EditProfileDialog: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const update = useUpdateProfile();
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");

  const onSave = async () => {
    try {
      await update.mutateAsync({
        displayName: displayName.trim() || null,
        bio: bio.trim() || null,
        avatarUrl: avatarUrl.trim() || null,
      });
      toast({ title: "Profile updated", variant: "success" });
      setOpen(false);
    } catch (err) {
      toast({
        title: "Update failed",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-1 h-4 w-4" /> Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="displayName">Display name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
            <Input
              id="avatarUrl"
              placeholder="https://..."
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              maxLength={280}
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onSave} disabled={update.isPending}>
              {update.isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
