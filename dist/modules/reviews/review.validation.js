"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const addReviewSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    rating: zod_1.z.number().min(0).max(5),
    comment: zod_1.z.string().min(1).optional(),
});
const updateReviewSchema = zod_1.z.object({
    rating: zod_1.z.number().min(0).max(5).optional(),
    comment: zod_1.z.string().min(1).optional(),
});
exports.ReviewValidation = {
    addReviewSchema,
    updateReviewSchema,
};
