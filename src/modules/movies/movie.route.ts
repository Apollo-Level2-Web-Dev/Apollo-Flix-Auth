import express from "express";
import { MovieControllers } from "./movie.controller";
import { ReviewControllers } from "../reviews/review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { MovieValidation } from "./movie.validation";
import { ReviewValidation } from "../reviews/review.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(MovieValidation.createMovieZodSchema),
  MovieControllers.createMovie
);
router.get("/:slug", MovieControllers.getMovieBySlug);
router.get("/", MovieControllers.getAllMovies);
router.post(
  "/:slug/review",
  validateRequest(ReviewValidation.addReviewSchema),
  ReviewControllers.addReview
);
// router.get("/:slug/reviews", ReviewControllers.getAllReviews);
// router.put("/:slug/review", ReviewControllers.getReviewById);
// router.delete("/:slug/review", ReviewControllers.deleteReview);

export const MovieRoutes = router;
