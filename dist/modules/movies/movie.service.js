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
const createMovie = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    /*
    Way1: Using business logic here....
  
     title - releaseDate
     WE will get: Inception Two 2010-07-16T00:00:00.000Z
     We want:  inception-two -2010-07-16
      
     const date = format(payload.releaseDate, "dd-MM-yyyy");
  
     //creating slug
     const slug = slugify(`${payload.title}-${date}}`, {
         lower: true,
     });
     //const result = await Movie.create(payload);
  */
    /* Way3: Using instance method logic here....
  
    
    const result = new Movie(payload);
    
    const slug = result.createSlug(payload);
    
    result.slug = slug;
    await result.save(); // database save
  
    return result;
    */
    const result = new movie_model_1.Movie(payload);
    const slug = result.createSlug(payload);
    result.slug = slug;
    yield result.save(); // database save
    return result;
});
const getAllMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield movie_model_1.Movie.find();
    return result;
});
const getMovieBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield movie_model_1.Movie.findOne({ slug: slug });
    return movie;
});
exports.MovieServices = {
    createMovie,
    getAllMovies,
    getMovieBySlug,
};
//interface => schema => model => query
