import { MediaListPage } from "./MediaListPage";
import {
  useTrending,
  usePopular,
  useTopRated,
  useUpcoming,
} from "@/features/movies/hooks/useMovies";

export const TrendingPage: React.FC = () => (
  <MediaListPage
    title="Trending"
    subtitle="What everyone is watching this week"
    useQueryHook={(p) => useTrending("week", p)}
  />
);

export const PopularPage: React.FC = () => (
  <MediaListPage
    title="Popular"
    subtitle="The most popular films right now"
    useQueryHook={usePopular}
  />
);

export const TopRatedPage: React.FC = () => (
  <MediaListPage
    title="Top Rated"
    subtitle="Highest-rated films of all time"
    useQueryHook={useTopRated}
  />
);

export const UpcomingPage: React.FC = () => (
  <MediaListPage
    title="Upcoming"
    subtitle="Films coming soon to theaters"
    useQueryHook={useUpcoming}
  />
);
