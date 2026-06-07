import { Router } from "express";
import { reviewController } from "../controllers/review.controller";
import { requireAuth, optionalAuth } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../utils/asyncHandler";
import { reviewUpsertSchema } from "../validators/review.validator";

const router = Router();

router.get("/mine", requireAuth, asyncHandler(reviewController.listMine));
router.get(
  "/media/:tmdbId",
  optionalAuth,
  asyncHandler(reviewController.listForMedia)
);
router.get(
  "/media/:tmdbId/mine",
  requireAuth,
  asyncHandler(reviewController.findMine)
);
router.post(
  "/",
  requireAuth,
  validate(reviewUpsertSchema),
  asyncHandler(reviewController.upsert)
);
router.delete("/:id", requireAuth, asyncHandler(reviewController.remove));

export default router;
