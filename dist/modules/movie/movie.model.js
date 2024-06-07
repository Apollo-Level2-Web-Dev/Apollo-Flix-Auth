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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const date_fns_1 = require("date-fns");
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
const reviewSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
});
const movieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    releaseDate: {
        type: Date,
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
    },
    reviews: {
        type: [reviewSchema],
    },
    slug: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
}, {
    toJSON: {
        virtuals: true,
    },
});
movieSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const date = (0, date_fns_1.format)(this.releaseDate, "dd-MM-yyyy");
        console.log((0, slugify_1.default)(`${this.title} ${date}`));
        this.slug = (0, slugify_1.default)(`${this.title} ${date}`, {
            lower: true,
        });
        next();
    });
});
movieSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Data is saved");
        next();
    });
});
movieSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
movieSchema.methods.increaseViewCount = function (slug) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield exports.Movie.findOneAndUpdate({ slug }, { $inc: { viewCount: 1 } }, { new: true });
        return result;
    });
};
movieSchema.virtual("avgRating").get(function () {
    if (Number(this.reviews.length) === 0)
        return 0;
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / this.reviews.length;
});
exports.Movie = (0, mongoose_1.model)("Movie", movieSchema);
