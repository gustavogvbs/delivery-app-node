import "express-async-errors";
import cors from "cors";
import express, { Request, Response } from "express";

import { routes } from "@routes/index.routes";

import { AppError } from "@errors/AppErro";

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      menssage: err.menssage,
    });
  }

  return res.status(500).json({
    status: "Error 500",
    menssage: `Internal server error - ${err.message}`,
  });
});

export { app };
