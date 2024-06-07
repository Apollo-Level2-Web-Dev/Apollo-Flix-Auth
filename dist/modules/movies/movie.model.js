"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const date_fns_1 = require("date-fns");
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
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
        required: [true, "Release Date is required"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
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
    totalRating: {
        type: Number,
        default: 0,
    },
});
/* Way-2: Using pre hook middleware
     
     movieSchema.pre("save", async function (next) {
     const date = format(this.releaseDate, "dd-MM-yyyy");

  //creating slug
  this.slug = slugify(`${this.title}-${date}}`, {
  lower: true,
  });
   
next();
// }
);

*/
movieSchema.method("createSlug", function createSlug(payload) {
    const date = (0, date_fns_1.format)(payload.releaseDate, "dd-MM-yyyy");
    //creating slug
    const slug = (0, slugify_1.default)(`${payload.title}-${date}}`, {
        lower: true,
    });
    return slug;
});
exports.Movie = (0, mongoose_1.model)("Movie", movieSchema);
