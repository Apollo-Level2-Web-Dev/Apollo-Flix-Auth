"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("./movie.controller");
const router = express_1.default.Router();
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const movieData = req.body;
//     const result = await Movie.create(movieData);
//     res.status(200).json({
//       success: true,
//       message: "Movie is created successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       error: err,
//     });
//   }
// });
router.post("/", movie_controller_1.MovieControllers.createMovie);
router.get("/", movie_controller_1.MovieControllers.getAllMovies);
router.get("/trending", movie_controller_1.MovieControllers.getTrendingMovies);
router.get("/new-release", movie_controller_1.MovieControllers.getNewReleaseMovies);
//router.get("/upcoming", MovieControllers.);
router.get("/:slug", movie_controller_1.MovieControllers.getMoviesBySlug);
exports.MovieRoutes = router;
