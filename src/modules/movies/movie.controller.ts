/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { MovieServices } from "./movie.service";
import { catchAsync } from "../../utils/catchAsync";

const createMovie = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const movieData = req.body;
    const result = await MovieServices.createMovie(movieData);

    res.json({
      success: true,
      message: "Movie is created successfully !",
      data: result,
    });
  }
);

const getAllMovies = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await MovieServices.getAllMovies(req.query);

    res.status(200).json({
      success: true,
      message: "Movies are fetched successfully !",
      data: result,
    });
  }
);

const getMovieBySlug = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.params;
    const result = await MovieServices.getMovieBySlug(slug);

    res.status(200).json({
      success: true,
      message: "Movies are fetched successfully !",
      data: result,
    });
  }
);

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getMovieBySlug,
};
