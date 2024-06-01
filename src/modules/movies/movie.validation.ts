import { z } from "zod";

const createMovieZodSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  releaseDate: z.string().min(1),
  genre: z.string().min(1),
});

const updateMovieZodSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  releaseDate: z.date().optional(),
  genre: z.string().min(1).optional(),
});

export const MovieValidation = {
  createMovieZodSchema,
  updateMovieZodSchema,
};
