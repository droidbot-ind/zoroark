import { Router } from "express";
import authRoutes from "./auth.routes";
import tmdbRoutes from "./tmdb.routes";
import watchlistRoutes from "./watchlist.routes";
import reviewRoutes from "./review.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ success: true, data: { status: "ok", uptime: process.uptime() } });
});

router.use("/auth", authRoutes);
router.use("/tmdb", tmdbRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/reviews", reviewRoutes);

export default router;
