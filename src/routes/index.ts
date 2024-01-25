import { Router } from "express";

import { uploadRouter } from "@routes/upload.router";
import { userRouter } from "@routes/user.router";

const routes = Router();

// const teste = "Gustavo";

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

export { routes };
