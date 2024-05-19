import express from "express";
import { MovieControllers } from "./movie.controller";

const router = express.Router();

router.post("/", MovieControllers.createMovie);
router.get("/:slug", MovieControllers.getMovieBySlug);
router.get("/", MovieControllers.getAllMovies);

export const MovieRoutes = router;
