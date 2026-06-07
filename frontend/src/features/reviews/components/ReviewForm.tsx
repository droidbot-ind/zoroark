import { useEffect, useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRatingInput } from "./StarRatingInput";
import {
  useMyMediaReview,
  useUpsertReview,
  useDeleteReview,
} from "../hooks/useReviews";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "@/components/ui/toaster";
import { getErrorMessage } from "@/lib/api";
import { useNavigate } from "react-router-dom";

interface ReviewFormProps {
  tmdbId: number;
  mediaType: "movie" | "tv";
  title: string;
  posterPath: string | null;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  tmdbId,
  mediaType,
  title,
  posterPath,
}) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const navigate = useNavigate();
  const { data: existing } = useMyMediaReview(tmdbId, mediaType);
  const upsert = useUpsertReview();
  const del = useDeleteReview();

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (existing) {
      setRating(existing.rating);
      setContent(existing.content);
    }
  }, [existing]);

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          <p className="mb-3">Sign in to leave your rating and review.</p>
          <Button onClick={() => navigate("/login")}>Sign in</Button>
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating < 1) {
      toast({ title: "Please choose a rating", variant: "destructive" });
      return;
    }
    if (content.trim().length === 0) {
      toast({ title: "Review can't be empty", variant: "destructive" });
      return;
    }
    try {
      await upsert.mutateAsync({
        tmdbId,
        mediaType,
        title,
        posterPath,
        rating,
        content: content.trim(),
      });
      toast({ title: existing ? "Review updated" : "Review posted", variant: "success" });
    } catch (err) {
      toast({
        title: "Could not save review",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    }
  };

  const onDelete = async () => {
    if (!existing) return;
    try {
      await del.mutateAsync(existing.id);
      setRating(0);
      setContent("");
      toast({ title: "Review removed" });
    } catch (err) {
      toast({
        title: "Could not delete",
        description: getErrorMessage(err),
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {existing ? "Your review" : "Write a review"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <StarRatingInput value={rating} onChange={setRating} />
          <Textarea
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            maxLength={5000}
          />
          <div className="flex flex-wrap items-center gap-2">
            <Button type="submit" disabled={upsert.isPending}>
              {upsert.isPending ? (
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              ) : null}
              {existing ? "Update review" : "Post review"}
            </Button>
            {existing ? (
              <Button
                type="button"
                variant="outline"
                onClick={onDelete}
                disabled={del.isPending}
              >
                <Trash2 className="mr-1 h-4 w-4" /> Delete
              </Button>
            ) : null}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
