import "express-async-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";

import { routes } from "@routes/index.routes";

import { AppError } from "@errors/AppErro";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["content-type"],
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      return callback(null, true);
    },
  }),
);

app.use(express.json());

app.use(routes);

app.use((err: Error, __: Request, res: Response) => {
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
