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
exports.MovieServices = void 0;
const movie_model_1 = require("./movie.model");
const createMovie = (movieData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.create(movieData);
    return result;
});
const getAllMovies = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let searchTerm = "";
    if (payload === null || payload === void 0 ? void 0 : payload.searchTerm) {
        searchTerm = payload.searchTerm;
    }
    // srachable of fileds= titles, genre
    const searchableFields = ["title", "genre"];
    const searchedMovies = movie_model_1.Movie.find({
        $or: searchableFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
        })),
    });
    // paginating
    const limit = Number((payload === null || payload === void 0 ? void 0 : payload.limit) || 10);
    let skip = 0;
    if (payload === null || payload === void 0 ? void 0 : payload.page) {
        const page = Number((payload === null || payload === void 0 ? void 0 : payload.page) || 1);
        skip = Number((page - 1) * limit);
    }
    const paginateQuery = searchedMovies.skip(skip);
    const limitQuery = paginateQuery.limit(limit);
    // sorting
    let sortBy = "releaseDate";
    if (payload === null || payload === void 0 ? void 0 : payload.sortBy) {
        sortBy = payload.sortBy;
    }
    const sortQuery = limitQuery.sort(sortBy);
    // field filtering
    const fields = ((_b = (_a = payload === null || payload === void 0 ? void 0 : payload.fields) === null || _a === void 0 ? void 0 : _a.split(",")) === null || _b === void 0 ? void 0 : _b.join(" ")) || "-__v";
    const fieldSelectionQuery = sortQuery.select(fields);
    // filtering
    const queryObj = Object.assign({}, payload);
    const excluseFields = [
        "page",
        "limit",
        "sortBy",
        "minRating",
        "maxRating",
        "fields",
        "searchTerm",
    ];
    excluseFields.forEach((e) => delete queryObj[e]);
    const result = yield fieldSelectionQuery.find(queryObj);
    return result;
});
const getMovieBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    if (!movie) {
        throw new Error("Not Found");
    }
    const result = movie.increaseViewCount(slug);
    return result;
});
const getTrendingMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.find({ viewCount: { $gt: 15 } });
    return result;
});
const getNewReleaseMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    // Calculate the date 7 days ago
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds
    // Query for movies released within the last 7 days
    const result = yield movie_model_1.Movie.find({
        releaseDate: {
            $gte: sevenDaysAgo,
            $lte: now,
        },
    });
    return result;
});
exports.MovieServices = {
    createMovie,
    getAllMovies,
    getTrendingMovies,
    getMovieBySlug,
    getNewReleaseMovies,
};
