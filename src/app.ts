import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";

import { routes } from "@routes/index.routes";

import { handleError } from "@middleware/handleError";

const app = express();

app.use(express.json());
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

app.use(routes);

app.use(handleError);

export { app };
