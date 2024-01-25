import "express-async-errors";
import express, { response } from "express";
import { routes } from "./routes";
import { AppError } from "./errors/AppErro";

const teeste = "ola";

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: Error) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      menssage: err.menssage,
    });
  }

  return response.status(500).json({
    status: "Error 500",
    menssage: `Internal server error - ${err.message}`,
  });
});

app.listen(8080, () => console.log("Server is running in port 8080 🔥🚀"));
