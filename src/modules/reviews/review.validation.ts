import { z } from "zod";

const addReviewSchema = z.object({
  email: z.string().email(),
  rating: z.number().min(0).max(5),
  comment: z.string().min(1).optional(),
});

const updateReviewSchema = z.object({
  rating: z.number().min(0).max(5).optional(),
  comment: z.string().min(1).optional(),
});

export const ReviewValidation = {
  addReviewSchema,
  updateReviewSchema,
};
