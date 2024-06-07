"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const review_service_1 = require("./review.service");
const addReview = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const reviewData = req.body;
    const result = yield review_service_1.ReviewServices.addReview(slug, reviewData);
    res.json({
        success: true,
        message: 'Review is created successfully!',
        data: result,
    });
}));
// const getAllReviews = async (req: Request, res: Response) => {
//   try {
//     const result = await ReviewServices.getAllReviews();
//     res.status(200).json({
//       success: true,
//       message: "Reviews are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch reviews!",
//       error: err,
//     });
//   }
// };
// const getReviewById = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.getReviewBySlug(slug);
//     res.status(200).json({
//       success: true,
//       message: "Reviews are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch reviews!",
//       error: err,
//     });
//   }
// };
// const updateReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.updateReview(slug, req.body);
//     res.status(200).json({
//       success: true,
//       message: "Reviews are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch reviews!",
//       error: err,
//     });
//   }
// };
// const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { slug } = req.params;
//     const result = await ReviewServices.deleteReview(slug);
//     res.status(200).json({
//       success: true,
//       message: "Reviews are fetched successfully !",
//       data: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: "Could not fetch reviews!",
//       error: err,
//     });
//   }
// };
exports.ReviewControllers = {
    addReview,
    //   getAllReviews,
    //   getReviewById,
    //   updateReview,
    //   deleteReview,
};
