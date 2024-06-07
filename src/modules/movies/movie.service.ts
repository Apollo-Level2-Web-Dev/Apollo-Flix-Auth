/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TMovie } from "./movie.interface";
import { Movie } from "./movie.model";
const createMovie = async (payload: TMovie) => {
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

  const result = new Movie(payload);

  const slug = result.createSlug(payload);

  result.slug = slug;
  await result.save(); // database save

  return result;
};

const getAllMovies = async (payload: Record<string, unknown>) => {
  let searchTerm = "";

  if (payload?.searchTerm) {
    searchTerm = payload.searchTerm as string;
  }

  const searchAbleFields = ["title", "genre"];
  // {title: {$regex: searchTerm}}
  // {genre: {$regex: searchTerm}}

  const searchedMovies = Movie.find({
    $or: searchAbleFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  // pagination
  // 1st skip =0
  //  2nd skip =2*10 - 1*10
  //  3rd skip =3*10 - 2*10
  //  skip = (page-1)*limit

  let limit: number = Number(payload?.limit || 10);

  let skip: number = 0;

  if (payload?.page) {
    const page: number = Number(payload?.page || 1);
    skip = Number((page - 1) * limit);
  }

  const skipedQuery = searchedMovies.skip(skip);

  const limitQuery = skipedQuery.limit(limit);

  // {page:1, limit:5, sortBy: "-"}

  // sorting

  let sortBy = "-releaseDate";

  if (payload?.sortBy) {
    sortBy = payload.sortBy as string;
  }

  const sortQuery = limitQuery.sort(sortBy);

  // field filtering
  // {fields: a,b,c}

  let fields = " ";

  if (payload.fields) {
    fields = (payload?.fields as string).split(",").join(" ");
  }

  const fieldQuery = sortQuery.select(fields);

  // cpoied from payload object
  const queryObj = { ...payload };
  const excludeFields = ["searchTerm", "page", "limit", "sortBy", "fields"];

  excludeFields.forEach((e) => delete queryObj[e]);

  const result = await fieldQuery.find(queryObj);

  return result;
};

const getMovieBySlug = async (slug: string) => {
  const movie = await Movie.findOne({ slug: slug });
  return movie;
};

export const MovieServices = {
  createMovie,
  getAllMovies,
  getMovieBySlug,
};

//interface => schema => model => query
