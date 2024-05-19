import express, { Request, Response } from "express";
import { MovieRoutes } from "./modules/movies/movie.route";
const app = express();

//parsers
app.use(express.json());

app.use("/api/movies", MovieRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

export default app;
