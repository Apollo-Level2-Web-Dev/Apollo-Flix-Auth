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
exports.MovieControllers = void 0;
const movie_service_1 = require("./movie.service");
const createMovie = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movieData = req.body;
        const result = yield movie_service_1.MovieServices.createMovie(movieData);
        res.status(200).json({
            success: true,
            message: "Movie is created successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
});
const getAllMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movie_service_1.MovieServices.getAllMovies(req.query);
        res.status(200).json({
            success: true,
            message: "Movies are fetched successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch movies!",
            error: err,
        });
    }
});
const getMoviesBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movie_service_1.MovieServices.getMovieBySlug(req.params.slug);
        res.status(200).json({
            success: true,
            message: "Movies are fetched successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch movies!",
            error: err,
        });
    }
});
const getTrendingMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movie_service_1.MovieServices.getTrendingMovies();
        res.status(200).json({
            success: true,
            message: "Movies are fetched successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch movies!",
            error: err,
        });
    }
});
const getNewReleaseMovies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield movie_service_1.MovieServices.getNewReleaseMovies();
        res.status(200).json({
            success: true,
            message: "Movies are fetched successfully !",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Could not fetch movies!",
            error: err,
        });
    }
});
exports.MovieControllers = {
    createMovie,
    getAllMovies,
    getTrendingMovies,
    getMoviesBySlug,
    getNewReleaseMovies,
};
