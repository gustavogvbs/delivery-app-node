import { Router } from "express";

import { registerRouter } from "@routes/register.routes";
import { uploadRouter } from "@routes/upload.routes";
import { userRouter } from "@routes/user.routes";

import { categoryRouter } from "./category.routes";

const routes = Router();

routes.use("/users", userRouter);

routes.use("/upload", uploadRouter);

routes.use("/auth", registerRouter);

routes.use("/category", categoryRouter);

export { routes };
