import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MovieCard } from "@/features/movies/components/MovieCard";
import type { TmdbMedia } from "@/types/api";

const media: TmdbMedia = {
  id: 1,
  title: "Inception",
  poster_path: "/inception.jpg",
  backdrop_path: null,
  vote_average: 8.4,
  release_date: "2010-07-16",
  overview: "",
};

describe("MovieCard", () => {
  it("renders title, year and rating", () => {
    render(
      <MemoryRouter>
        <MovieCard media={media} />
      </MemoryRouter>
    );
    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("8.4")).toBeInTheDocument();
  });
});
