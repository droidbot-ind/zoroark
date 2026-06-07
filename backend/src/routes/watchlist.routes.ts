import { Router } from "express";
import { watchlistController } from "../controllers/watchlist.controller";
import { requireAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { watchlistAddSchema } from "../validators/watchlist.validator";

const router = Router();
router.use(requireAuth);

router.get("/", asyncHandler(watchlistController.list));
router.post("/", validate(watchlistAddSchema), asyncHandler(watchlistController.add));
router.get("/:tmdbId/check", asyncHandler(watchlistController.check));
router.delete("/:tmdbId", asyncHandler(watchlistController.remove));

export default router;
