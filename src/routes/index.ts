import { Router } from "express";

import { registerRouter } from "@routes/register.router";
import { uploadRouter } from "@routes/upload.router";
import { userRouter } from "@routes/user.router";

const routes = Router();

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

routes.use("/register", registerRouter);

export { routes };
