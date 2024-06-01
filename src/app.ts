import express, { Request, Response } from "express";
import { MovieRoutes } from "./modules/movies/movie.route";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
const app = express();

//parsers
app.use(express.json());

app.use("/api/movies", MovieRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next!");
});

app.use(globalErrorHandler);

//Not Found
app.use(notFound);

export default app;
