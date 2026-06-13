import { Router } from "express";
import { tmdbController } from "../controllers/tmdb.controller";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.get("/trending", asyncHandler(tmdbController.trending));
router.get("/movies/popular", asyncHandler(tmdbController.popularMovies));
router.get("/movies/top-rated", asyncHandler(tmdbController.topRatedMovies));
router.get("/movies/upcoming", asyncHandler(tmdbController.upcomingMovies));
router.get("/movies/now-playing", asyncHandler(tmdbController.nowPlayingMovies));
router.get("/movies/discover", asyncHandler(tmdbController.discoverMovies));
router.get("/movies/genres", asyncHandler(tmdbController.movieGenres));
router.get("/movies/:id", asyncHandler(tmdbController.movieDetail));

router.get("/tv/popular", asyncHandler(tmdbController.popularTv));
router.get("/tv/top-rated", asyncHandler(tmdbController.topRatedTv));
router.get("/tv/genres", asyncHandler(tmdbController.tvGenres));
router.get("/tv/:id", asyncHandler(tmdbController.tvDetail));

router.get("/person/:id", asyncHandler(tmdbController.personDetail));

router.get("/search", asyncHandler(tmdbController.search));

export default router;
