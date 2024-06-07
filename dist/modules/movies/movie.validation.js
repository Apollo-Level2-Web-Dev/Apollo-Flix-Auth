"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieValidation = void 0;
const zod_1 = require("zod");
const createMovieZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    releaseDate: zod_1.z.string().min(1),
    genre: zod_1.z.string().min(1),
});
const updateMovieZodSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().min(1).optional(),
    releaseDate: zod_1.z.date().optional(),
    genre: zod_1.z.string().min(1).optional(),
});
exports.MovieValidation = {
    createMovieZodSchema,
    updateMovieZodSchema,
};
