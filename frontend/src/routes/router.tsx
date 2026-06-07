import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { HomePage } from "@/features/movies/pages/HomePage";
import { DiscoverPage } from "@/features/movies/pages/DiscoverPage";
import {
  TrendingPage,
  PopularPage,
  TopRatedPage,
  UpcomingPage,
} from "@/features/movies/pages/ListPages";
import { MediaDetailPage } from "@/features/movies/pages/MediaDetailPage";
import { SearchPage } from "@/features/search/pages/SearchPage";
import { LoginPage } from "@/features/auth/components/LoginPage";
import { RegisterPage } from "@/features/auth/components/RegisterPage";
import { WatchlistPage } from "@/features/watchlist/pages/WatchlistPage";
import { ProfilePage } from "@/features/profile/pages/ProfilePage";
import { PersonPage } from "@/features/movies/pages/PersonPage";
import { NotFoundPage } from "@/features/movies/pages/NotFoundPage";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "discover", element: <DiscoverPage /> },
        { path: "trending", element: <TrendingPage /> },
        { path: "popular", element: <PopularPage /> },
        { path: "top-rated", element: <TopRatedPage /> },
        { path: "upcoming", element: <UpcomingPage /> },
        { path: "search", element: <SearchPage /> },
        { path: "movie/:id", element: <MediaDetailPage mediaType="movie" /> },
        { path: "tv/:id", element: <MediaDetailPage mediaType="tv" /> },
        { path: "person/:id", element: <PersonPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        {
          path: "watchlist",
          element: (
            <ProtectedRoute>
              <WatchlistPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
